// Theme toggle
const themeToggle = document.getElementById('themeToggle');

// Safe storage wrapper
const safeStorage = {
    getItem(key) {
        try { return localStorage.getItem(key); } catch (e) { return null; }
    },
    setItem(key, value) {
        try { localStorage.setItem(key, value); } catch (e) { console.warn('LocalStorage error:', e); }
    },
    removeItem(key) {
        try { localStorage.removeItem(key); } catch (e) { console.warn('LocalStorage error:', e); }
    }
};

// Init theme
const savedTheme = safeStorage.getItem('srs_theme') || 'dark';
if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.innerText = '🌙';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        safeStorage.setItem('srs_theme', 'dark');
        themeToggle.innerText = '☀️';
        showToast('สลับเป็นโหมด Dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        safeStorage.setItem('srs_theme', 'light');
        themeToggle.innerText = '🌙';
        showToast('สลับเป็นโหมด Light');
    }
});

// Global States
let mode = 'srs'; // 'srs' or 'browse'
let currentIndex = 0; // used for browse mode
let activeData = []; // study list
let cardStates = {}; // SRS states dictionary
let sessionInitialLength = 0; // total due at start
let studyAheadMode = false;
let lastAction = null;
let currentToastEl = null;
let currentToastTimeout = null;

// Element references
const cardContainer = document.getElementById('cardContainer');
const flashcard = document.getElementById('flashcard');
const wordEng = document.getElementById('wordEng');
const wordPos = document.getElementById('wordPos');
const wordTh = document.getElementById('wordTh');
const wordEx = document.getElementById('wordEx');
const wordNote = document.getElementById('wordNote');
const ttsBtn = document.getElementById('ttsBtn');

const currentStatus = document.getElementById('currentStatus');
const percentStatus = document.getElementById('percentStatus');
const progressBar = document.getElementById('progressBar');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');

// SRS Elements
const modeSrsBtn = document.getElementById('modeSrsBtn');
const modeBrowseBtn = document.getElementById('modeBrowseBtn');
const srsStatsBar = document.getElementById('srsStatsBar');
const browseButtonsRow = document.getElementById('browseButtonsRow');
const srsDebugPanel = document.getElementById('srsDebugPanel');
const progressSection = document.getElementById('progressSection');
const keyboardGuide = document.getElementById('keyboardGuide');
const caughtUpContainer = document.getElementById('caughtUpContainer');
const srsBtnRow = document.getElementById('srsBtnRow');
const backClickHint = document.getElementById('backClickHint');

const btnAgain = document.getElementById('btnAgain');
const btnHard = document.getElementById('btnHard');
const btnGood = document.getElementById('btnGood');
const btnEasy = document.getElementById('btnEasy');

// Debug buttons
const simulateDayBtn = document.getElementById('simulateDayBtn');
const studyAheadBtn = document.getElementById('studyAheadBtn');
const resetSrsBtn = document.getElementById('resetSrsBtn');

// Toast Notification Function
function showToast(message, onUndo = null) {
    if (currentToastEl) {
        currentToastEl.remove();
        clearTimeout(currentToastTimeout);
    }

    const toast = document.createElement('div');
    currentToastEl = toast;

    toast.style.position = 'fixed';
    toast.style.bottom = '2rem';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%) translateY(100px)';
    toast.style.background = 'rgba(15, 23, 42, 0.95)';
    toast.style.border = '1px solid var(--accent-primary)';
    toast.style.color = '#fff';
    toast.style.padding = '0.75rem 1.5rem';
    toast.style.borderRadius = '12px';
    toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
    toast.style.zIndex = '9999';
    toast.style.fontFamily = 'Sarabun, sans-serif';
    toast.style.fontSize = '0.9rem';
    toast.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s';
    toast.style.opacity = '0';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    
    const msgSpan = document.createElement('span');
    msgSpan.innerText = message;
    toast.appendChild(msgSpan);

    if (onUndo) {
        const undoBtn = document.createElement('button');
        undoBtn.innerText = 'ย้อนกลับ ↩';
        undoBtn.className = 'toast-undo-btn';
        undoBtn.onclick = (e) => {
            e.stopPropagation();
            onUndo();
            toast.style.transform = 'translateX(-50%) translateY(100px)';
            toast.style.opacity = '0';
            setTimeout(() => { if(toast.parentNode) toast.remove(); }, 300);
        };
        toast.appendChild(undoBtn);
    }
    
    document.body.appendChild(toast);
    
    toast.offsetHeight;
    
    toast.style.transform = 'translateX(-50%) translateY(0)';
    toast.style.opacity = '1';
    
    currentToastTimeout = setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        toast.style.opacity = '0';
        setTimeout(() => {
            if (toast.parentNode) toast.remove();
        }, 300);
    }, onUndo ? 4000 : 2500);
}

function undoLastAction() {
    if (!lastAction) return;
    
    const { card, previousState, rating } = lastAction;
    
    cardStates[card.english] = previousState;
    saveCardStates();
    
    if (rating === 'again' || rating === 'hard') {
        for (let i = activeData.length - 1; i >= 0; i--) {
            if (activeData[i].english === card.english) {
                activeData.splice(i, 1);
                break;
            }
        }
        sessionInitialLength--;
    }
    
    activeData.unshift(card);
    updateStats();
    flashcard.classList.remove('is-flipped');
    updateCardContent();
    
    showToast("↩ ย้อนกลับเรียบร้อยแล้ว");
    lastAction = null;
}


// Time helper
function getNow() {
    return Date.now() + Number(safeStorage.getItem('srs_time_offset') || 0);
}

// Load card states
function loadCardStates() {
    const data = safeStorage.getItem('srs_card_states');
    cardStates = data ? JSON.parse(data) : {};
}

// Save card states
function saveCardStates() {
    safeStorage.setItem('srs_card_states', JSON.stringify(cardStates));
}

// Update Stats only (no queue rebuild)
function updateStats() {
    const now = getNow();
    let newCount = 0;
    let learningCount = 0;
    let dueCount = 0;

    vocabularyData.forEach(card => {
        const state = cardStates[card.english];
        if (!state) {
            newCount++;
        } else if (state.interval === 0) {
            learningCount++;
        } else if (state.nextReview <= now) {
            dueCount++;
        }
    });

    document.getElementById('srsNewCount').innerText = `New: ${newCount}`;
    document.getElementById('srsLearningCount').innerText = `Learning: ${learningCount}`;
    document.getElementById('srsDueCount').innerText = `Due: ${dueCount}`;
}

// Build initial session queue
function buildSessionQueue() {
    loadCardStates();
    const now = getNow();
    
    if (studyAheadMode) {
        activeData = [...vocabularyData];
    } else {
        activeData = vocabularyData.filter(card => {
            const state = cardStates[card.english];
            if (!state) return true; // New
            if (state.nextReview <= now) return true; // Due
            return false;
        });
    }
    sessionInitialLength = activeData.length;
    updateStats();
}

// Initialize Mode
function initMode(newMode) {
    mode = newMode;
    
    if (mode === 'srs') {
        modeSrsBtn.classList.add('active');
        modeBrowseBtn.classList.remove('active');
        
        srsStatsBar.style.display = 'flex';
        srsDebugPanel.style.display = 'flex';
        browseButtonsRow.style.display = 'none';
        srsBtnRow.style.display = 'flex';
        backClickHint.innerText = 'แตะคำหลัก/เว้นด้านล่างเพื่อพลิกการ์ดกลับ';
        
        keyboardGuide.innerHTML = 'ใช้คีย์บอร์ดลัด: <span class="kbd">Space</span> พลิกการ์ด | <span class="kbd">1</span> Again | <span class="kbd">2</span> Hard | <span class="kbd">3</span> Good | <span class="kbd">4</span> Easy';
        
        studyAheadMode = false;
        buildSessionQueue();
        currentIndex = 0;
    } else {
        modeSrsBtn.classList.remove('active');
        modeBrowseBtn.classList.add('active');
        
        srsStatsBar.style.display = 'none';
        srsDebugPanel.style.display = 'none';
        browseButtonsRow.style.display = 'flex';
        srsBtnRow.style.display = 'none';
        backClickHint.innerText = 'แตะเพื่อสลับหน้า / Click to Flip';
        
        keyboardGuide.innerHTML = 'ใช้คีย์บอร์ดลัด: <span class="kbd">←</span> ย้อนกลับ | <span class="kbd">Space</span> พลิกการ์ด | <span class="kbd">→</span> ถัดไป';
        
        activeData = [...vocabularyData];
        currentIndex = 0;
    }
    
    flashcard.classList.remove('is-flipped');
    updateCardContent();
}

// Update Card Content & Progress Bar
function updateCardContent() {
    if (mode === 'browse') {
        caughtUpContainer.style.display = 'none';
        cardContainer.style.display = 'block';
        progressSection.style.display = 'block';
        
        if (activeData.length === 0) return;
        const item = activeData[currentIndex];
        setCardText(item);

        const total = activeData.length;
        const currentNum = currentIndex + 1;
        const percentage = Math.round((currentNum / total) * 100);
        
        currentStatus.innerText = `Card ${currentNum} of ${total}`;
        percentStatus.innerText = `${percentage}% Complete`;
        progressBar.style.width = `${percentage}%`;
    } else { // srs mode
        if (activeData.length === 0) {
            cardContainer.style.display = 'none';
            progressSection.style.display = 'none';
            caughtUpContainer.style.display = 'flex';
            
            if (studyAheadMode) {
                document.getElementById('caughtUpMsg').innerText = "คุณทบทวนการ์ดล่วงหน้าเสร็จเรียบร้อยหมดแล้ว!";
            } else {
                document.getElementById('caughtUpMsg').innerText = "คุณได้ทบทวนคำศัพท์สำหรับวันนี้หมดแล้ว สมองต้องการเวลาในการจดจำคำศัพท์เหล่านี้นะครับ";
            }
        } else {
            caughtUpContainer.style.display = 'none';
            cardContainer.style.display = 'block';
            progressSection.style.display = 'block';

            const item = activeData[0]; // Always study the first card in activeData queue
            setCardText(item);

            const completed = sessionInitialLength - activeData.length;
            const percentage = sessionInitialLength > 0 ? Math.round((completed / sessionInitialLength) * 100) : 100;
            
            currentStatus.innerText = `Card ${completed + 1} of ${sessionInitialLength}`;
            percentStatus.innerText = `${percentage}% Complete`;
            progressBar.style.width = `${percentage}%`;
        }
    }
}

function setCardText(item) {
    wordEng.innerText = item.english;
    wordPos.innerText = item.pos;
    wordTh.innerText = item.thai;
    wordEx.innerText = item.example ? `"${item.example}"` : "";
    wordNote.innerText = item.note || "";
}

function flipCard() {
    flashcard.classList.toggle('is-flipped');
}

function nextCard() {
    if (activeData.length === 0) return;
    currentIndex = (currentIndex + 1) % activeData.length;
    updateCardContent();
}

function prevCard() {
    if (activeData.length === 0) return;
    currentIndex = (currentIndex - 1 + activeData.length) % activeData.length;
    updateCardContent();
}

function shuffleCards() {
    for (let i = activeData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [activeData[i], activeData[j]] = [activeData[j], activeData[i]];
    }
    currentIndex = 0;
    updateCardContent();
    
    shuffleBtn.style.transform = "scale(0.95)";
    setTimeout(() => { shuffleBtn.style.transform = ""; }, 100);
    showToast("🔀 สลับการ์ดในชุดปัจจุบันเรียบร้อยแล้ว!");
}

// Text-to-Speech
ttsBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent card flip
    if ('speechSynthesis' in window) {
        const text = wordEng.innerText;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US'; // default to US English
        window.speechSynthesis.speak(utterance);
    } else {
        showToast('เบราว์เซอร์ของคุณไม่รองรับระบบเสียงอ่านครับ');
    }
});

// SRS Rating Logic
function rateCard(rating, event) {
    if (event) event.stopPropagation();
    
    if (activeData.length === 0) return;
    const card = activeData[0];
    const now = getNow();
    
    if (!cardStates[card.english]) {
        cardStates[card.english] = {
            easeFactor: 2.5,
            interval: 0,
            repetition: 0,
            nextReview: 0
        };
    }
    
    const state = cardStates[card.english];
    
    lastAction = {
        card: card,
        previousState: JSON.parse(JSON.stringify(state)),
        rating: rating
    };

    
    if (rating === 'again') {
        state.repetition = 0;
        state.interval = 0; 
        state.nextReview = now + 1 * 60 * 1000;
        
        activeData.push(card); // Re-queue at the end
        sessionInitialLength++; // Increment total session size
        showToast("🟥 จะนำการ์ดกลับมาให้ทบทวนซ้ำอีกครั้งในรอบนี้", () => undoLastAction());
    } else if (rating === 'hard') {
        state.repetition = Math.max(0, state.repetition - 1);
        state.interval = 0; 
        state.nextReview = now + 5 * 60 * 1000;
        
        activeData.push(card);
        sessionInitialLength++;
        showToast("🟨 จะสุ่มการ์ดนี้กลับมาอีกครั้งในช่วงท้าย", () => undoLastAction());
    } else if (rating === 'good') {
        if (state.repetition === 0) {
            state.interval = 1; 
        } else if (state.repetition === 1) {
            state.interval = 3; 
        } else {
            state.interval = Math.round(state.interval * state.easeFactor);
        }
        state.repetition += 1;
        state.nextReview = now + state.interval * 24 * 60 * 60 * 1000;
        showToast(`🟩 ดีมาก! เว้นระยะทบทวนการ์ดนี้อีก ${state.interval} วัน`, () => undoLastAction());
    } else if (rating === 'easy') {
        state.easeFactor = Math.min(3.0, state.easeFactor + 0.15);
        if (state.repetition === 0) {
            state.interval = 3; 
        } else {
            state.interval = Math.round(state.interval * state.easeFactor * 1.3);
        }
        state.repetition += 1;
        state.nextReview = now + state.interval * 24 * 60 * 60 * 1000;
        showToast(`🟦 ง่ายมาก! เว้นระยะทบทวนการ์ดนี้อีก ${state.interval} วัน`, () => undoLastAction());
    }
    
    saveCardStates();
    
    // Animate transition
    if (flashcard.classList.contains('is-flipped')) {
        flashcard.classList.remove('is-flipped');
        setTimeout(() => {
            activeData.shift(); // Remove current card
            updateStats();
            updateCardContent();
        }, 300);
    } else {
        activeData.shift();
        updateStats();
        updateCardContent();
    }
}

// Touch Gestures (Swipe)
let touchStartX = 0;
let touchStartY = 0;

cardContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, {passive: true});

cardContainer.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Determine if it was a horizontal or vertical swipe
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        // Horizontal Swipe
        if (mode === 'browse') {
            if (deltaX < 0) nextCard(); // Swipe Left -> Next
            if (deltaX > 0) prevCard(); // Swipe Right -> Prev
        }
    } else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        // Vertical Swipe
        flipCard();
    }
});

// Visual Feedback function
function triggerFeedback(btnElement) {
    if (!btnElement) return;
    btnElement.classList.add('active-feedback');
    setTimeout(() => {
        btnElement.classList.remove('active-feedback');
    }, 200);
}

// Event Listeners
cardContainer.addEventListener('click', flipCard);
modeSrsBtn.addEventListener('click', () => initMode('srs'));
modeBrowseBtn.addEventListener('click', () => initMode('browse'));

nextBtn.addEventListener('click', nextCard);
prevBtn.addEventListener('click', prevCard);
shuffleBtn.addEventListener('click', shuffleCards);

btnAgain.addEventListener('click', (e) => rateCard('again', e));
btnHard.addEventListener('click', (e) => rateCard('hard', e));
btnGood.addEventListener('click', (e) => rateCard('good', e));
btnEasy.addEventListener('click', (e) => rateCard('easy', e));

simulateDayBtn.addEventListener('click', () => {
    const currentOffset = Number(safeStorage.getItem('srs_time_offset') || 0);
    safeStorage.setItem('srs_time_offset', currentOffset + 24 * 60 * 60 * 1000);
    studyAheadMode = false;
    
    buildSessionQueue();
    flashcard.classList.remove('is-flipped');
    currentIndex = 0;
    updateCardContent();
    
    const hours = Math.round(Number(safeStorage.getItem('srs_time_offset') || 0) / (1000 * 60 * 60));
    showToast(`⏰ จำลองเวลาผ่านไป 1 วันแล้ว! (เวลาสะสม: +${Math.round(hours / 24)} วัน)`);
});

studyAheadBtn.addEventListener('click', () => {
    studyAheadMode = true;
    buildSessionQueue();
    flashcard.classList.remove('is-flipped');
    currentIndex = 0;
    updateCardContent();
    showToast("📖 เข้าสู่โหมดเรียนล่วงหน้า! ทบทวนการ์ดคำศัพท์ทั้งหมด");
});

resetSrsBtn.addEventListener('click', () => {
    if (confirm("ต้องการเริ่มการเรียนรู้ใหม่ทั้งหมดหรือไม่? ประวัติการจำจะถูกลบออกทั้งหมด")) {
        safeStorage.removeItem('srs_card_states');
        safeStorage.removeItem('srs_time_offset');
        studyAheadMode = false;
        cardStates = {};
        buildSessionQueue();
        flashcard.classList.remove('is-flipped');
        currentIndex = 0;
        updateCardContent();
        showToast("🔄 เริ่มเรียนรู้ใหม่ทั้งหมดเรียบร้อยแล้ว!");
    }
});

// Keyboard Support
document.addEventListener('keydown', (e) => {
    if (mode === 'browse') {
        if (e.code === 'ArrowRight') {
            nextCard();
        } else if (e.code === 'ArrowLeft') {
            prevCard();
        } else if (e.code === 'Space') {
            e.preventDefault();
            flipCard();
        }
    } else if (mode === 'srs' && activeData.length > 0) {
        if (e.code === 'Space') {
            e.preventDefault();
            flipCard();
        } else if (flashcard.classList.contains('is-flipped')) {
            if (e.key === '1') {
                triggerFeedback(btnAgain);
                rateCard('again');
            } else if (e.key === '2') {
                triggerFeedback(btnHard);
                rateCard('hard');
            } else if (e.key === '3') {
                triggerFeedback(btnGood);
                rateCard('good');
            } else if (e.key === '4') {
                triggerFeedback(btnEasy);
                rateCard('easy');
            }
        }
    }
});

// Initialize SRS mode on load
initMode('srs');
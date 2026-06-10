import re

with open('flashcards.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Add lastAction global variable near other states
js = js.replace("let studyAheadMode = false;", "let studyAheadMode = false;\nlet lastAction = null;\nlet currentToastEl = null;\nlet currentToastTimeout = null;")

# 2. Rewrite showToast
toast_func_new = """function showToast(message, onUndo = null) {
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
"""
js = re.sub(r'function showToast.*?2500\);\n}', toast_func_new, js, flags=re.DOTALL)

# 3. Modify rateCard to record lastAction and pass undo callback
rate_func_search = r'(function rateCard\(rating, event\) \{.*?const state = cardStates\[card\.english\];)'
rate_func_replace = r'\1\n    \n    lastAction = {\n        card: card,\n        previousState: JSON.parse(JSON.stringify(state)),\n        rating: rating\n    };\n'
js = re.sub(rate_func_search, rate_func_replace, js, flags=re.DOTALL)

js = js.replace('showToast("🟥 จะนำการ์ดกลับมาให้ทบทวนซ้ำอีกครั้งในรอบนี้");', 'showToast("🟥 จะนำการ์ดกลับมาให้ทบทวนซ้ำอีกครั้งในรอบนี้", () => undoLastAction());')
js = js.replace('showToast("🟨 จะสุ่มการ์ดนี้กลับมาอีกครั้งในช่วงท้าย");', 'showToast("🟨 จะสุ่มการ์ดนี้กลับมาอีกครั้งในช่วงท้าย", () => undoLastAction());')
js = js.replace('showToast(`🟩 ดีมาก! เว้นระยะทบทวนการ์ดนี้อีก ${state.interval} วัน`);', 'showToast(`🟩 ดีมาก! เว้นระยะทบทวนการ์ดนี้อีก ${state.interval} วัน`, () => undoLastAction());')
js = js.replace('showToast(`🟦 ง่ายมาก! เว้นระยะทบทวนการ์ดนี้อีก ${state.interval} วัน`);', 'showToast(`🟦 ง่ายมาก! เว้นระยะทบทวนการ์ดนี้อีก ${state.interval} วัน`, () => undoLastAction());')

with open('flashcards.js', 'w', encoding='utf-8') as f:
    f.write(js)

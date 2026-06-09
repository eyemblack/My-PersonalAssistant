import re

with open('flashcards.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add variables to :root
root_repl = """        :root {
            --bg-gradient: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
            --card-front-bg: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            --card-back-bg: linear-gradient(135deg, #311042 0%, #1e1b4b 100%);
            --accent-primary: #a855f7;
            --accent-secondary: #ec4899;
            --text-light: #f8fafc;
            --text-muted: #94a3b8;
            --text-example: #cbd5e1;
            --border-glow: rgba(168, 85, 247, 0.4);
            --transition-speed: 0.6s;
            --glass-bg: rgba(255, 255, 255, 0.05);
            --glass-border: rgba(255, 255, 255, 0.08);
            --glass-border-light: rgba(255, 255, 255, 0.1);
            --glass-hover: rgba(255, 255, 255, 0.1);
            --glass-hover-border: rgba(255, 255, 255, 0.2);
            --kbd-bg: rgba(255, 255, 255, 0.15);
            --kbd-border: rgba(255, 255, 255, 0.2);
            --kbd-text: #e2e8f0;
        }

        [data-theme="light"] {
            --bg-gradient: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            --card-front-bg: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
            --card-back-bg: linear-gradient(135deg, #faf5ff 0%, #fdf2f8 100%);
            --text-light: #0f172a;
            --text-muted: #64748b;
            --text-example: #334155;
            --border-glow: rgba(168, 85, 247, 0.5);
            --glass-bg: rgba(0, 0, 0, 0.03);
            --glass-border: rgba(0, 0, 0, 0.08);
            --glass-border-light: rgba(0, 0, 0, 0.1);
            --glass-hover: rgba(0, 0, 0, 0.08);
            --glass-hover-border: rgba(0, 0, 0, 0.15);
            --kbd-bg: rgba(0, 0, 0, 0.06);
            --kbd-border: rgba(0, 0, 0, 0.1);
            --kbd-text: #1e293b;
        }

        .theme-toggle {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            font-size: 1.2rem;
            cursor: pointer;
            background: var(--glass-bg);
            border: 1px solid var(--glass-border-light);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            color: var(--text-light);
        }
        .theme-toggle:hover {
            transform: scale(1.1);
            background: var(--glass-hover);
        }
"""
content = re.sub(r'        :root \{.*?\n        \}', root_repl, content, flags=re.DOTALL)

# Replace transparent whites
content = content.replace('rgba(255, 255, 255, 0.08)', 'var(--glass-border)')
content = content.replace('rgba(255, 255, 255, 0.02)', 'rgba(0,0,0,0) /* shadow fallback */')
content = re.sub(r'inset 0 0 20px rgba\(255, 255, 255, 0.02\)', 'inset 0 0 20px var(--glass-bg)', content)

content = content.replace('rgba(255, 255, 255, 0.05)', 'var(--glass-bg)')
content = content.replace('rgba(255, 255, 255, 0.1)', 'var(--glass-border-light)')
content = content.replace('rgba(255, 255, 255, 0.2)', 'var(--glass-hover-border)')
content = content.replace('rgba(255, 255, 255, 0.15)', 'var(--kbd-bg)')
content = content.replace('rgba(255, 255, 255, 0.03)', 'var(--glass-bg)')
content = content.replace('color: #cbd5e1;', 'color: var(--text-example);')
content = content.replace('color: #e2e8f0;', 'color: var(--kbd-text);')

# Add the toggle button
header_html = """    <div class="theme-toggle" id="themeToggle" title="สลับโหมด Light/Dark">
        ☀️
    </div>

    <header>"""
content = content.replace('    <header>', header_html)

# Add the script
script_html = """        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        
        // Init theme
        const savedTheme = localStorage.getItem('srs_theme') || 'dark';
        if (savedTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggle.innerText = '🌙';
        }

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('srs_theme', 'dark');
                themeToggle.innerText = '☀️';
                showToast('สลับเป็นโหมด Dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('srs_theme', 'light');
                themeToggle.innerText = '🌙';
                showToast('สลับเป็นโหมด Light');
            }
        });

        // Global States"""
content = content.replace('        // Global States', script_html)

with open('flashcards.html', 'w', encoding='utf-8') as f:
    f.write(content)

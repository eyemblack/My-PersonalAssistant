import re

with open('flashcards.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract CSS
css_match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
if css_match:
    css_content = css_match.group(1).strip()
    with open('flashcards.css', 'w', encoding='utf-8') as f:
        f.write(css_content)
    
    # Replace style tag with link
    content = content.replace(css_match.group(0), '<link rel="stylesheet" href="flashcards.css">')

# Extract JS
js_match = re.search(r'<script>\s*(// Theme toggle.*?)</script>', content, re.DOTALL)
if js_match:
    js_content = js_match.group(1).strip()
    with open('flashcards.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    # Replace script tag with external script link
    content = content.replace(js_match.group(0), '<script src="flashcards.js"></script>')

with open('flashcards.html', 'w', encoding='utf-8') as f:
    f.write(content)

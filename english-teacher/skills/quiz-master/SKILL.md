---
name: quiz-master
description: Generates a grammar quiz based on GRAMMAR_ROADMAP.md, evaluates the user's answers, and automatically updates their progress in the roadmap if they pass.
---

# Quiz Master & Roadmap Tracker Skill

This skill allows you to conduct a short grammar quiz for the user based on their chosen topic from the roadmap. Once the user answers and scores high enough (e.g., 4 out of 5), you will automatically update their progress in the roadmap.

## Usage Instructions

1. **Triggering the Quiz:**
   - When the user asks "ขอฝึกหัวข้อที่ [X]" or asks for a grammar quiz, open and read `/Users/opentechbox/Desktop/PA/english-teacher/GRAMMAR_ROADMAP.md`.
   - Find the requested topic in the roadmap.
   - Generate 5 multiple-choice or fill-in-the-blank questions related to that specific grammar topic. Ensure the vocabulary used in the questions is at the A1-A2 level and uses relatable daily life examples (e.g., tech, running, daily routines).

2. **Conducting the Quiz:**
   - Present the 5 questions to the user in a friendly manner. Wait for them to reply with their answers.

3. **Evaluating and Explaining:**
   - Once the user answers, score their quiz. 
   - Give gentle corrections and simple explanations in Thai for any mistakes.

4. **Updating the Roadmap (The Tracker part):**
   - If the user scores at least 4 out of 5, congratulate them for passing!
   - Tell them you are updating their progress.
   - Use the `replace_file_content` tool on `/Users/opentechbox/Desktop/PA/english-teacher/GRAMMAR_ROADMAP.md` to change the unchecked box `- [ ]` to a checked box `- [x]` for that specific topic.
   - For example, change `- [ ] **6. Past Simple Tense...**` to `- [x] **6. Past Simple Tense...**`.

5. **Follow-up:**
   - Suggest the next topic on the roadmap for their next session.

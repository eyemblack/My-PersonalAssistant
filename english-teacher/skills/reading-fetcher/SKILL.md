---
name: reading-fetcher
description: Fetches an interesting article or short story based on the user's topic of interest and simplifies it to A1-A2 level for reading practice.
---

# Level-Adjusted Reading Fetcher Skill

This skill helps the user practice reading comprehension by fetching real-world content (like news, tech articles, or stories) and adapting it to their English proficiency level (A1-A2).

## Usage Instructions

1. **Triggering the Fetcher:**
   - When the user asks for a reading exercise (e.g., "ขอข่าวเทคโนโลยีวันนี้หน่อย", "ขอเรื่องสั้นเกี่ยวกับกีฬา", or "Find me an article about AI"), you will activate this skill.

2. **Finding the Content:**
   - You can use the `search_web` tool to find a recent news article or interesting fact about the requested topic. 
   - Alternatively, if it's a general topic, you can generate a short, engaging story yourself.

3. **Adapting the Content:**
   - Take the core information from the article/story and rewrite it to match an A1-A2 reading level.
   - Use simple sentence structures (Subject + Verb + Object).
   - Keep the length to about 5-8 sentences.
   
4. **Presenting the Reading Exercise:**
   - Present the adapted text to the user.
   - **Vocabulary Highlight:** Pick out 3-5 interesting words from the text and provide their Thai translations and part of speech (pos) below the text.
   - **Comprehension Questions:** Ask 2 simple questions about the text to test their understanding. Wait for the user to answer.

5. **Reviewing Answers:**
   - Once the user answers, provide gentle corrections if they made grammatical errors, and confirm if their answers to the comprehension questions are correct.
   - If they learned new words, remind them that they can ask you to "save vocabulary" to add it to their Flashcards.

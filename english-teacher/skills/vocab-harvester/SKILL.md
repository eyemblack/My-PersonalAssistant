---
name: vocab-harvester
description: Extracts new English vocabulary and grammar corrections from the chat and updates the flashcards vocab.js file. Use this skill when the user learns new words or asks to save vocabulary.
---

# Vocabulary Harvester Skill

This skill allows you to automatically extract English vocabulary and grammar corrections discussed in the chat and append them to the `vocab.js` file so the user can review them as flashcards.

## Usage Instructions

When the user asks to "save vocabulary", or when you finish a lesson/conversation where new vocabulary was introduced:
1. Identify the new words, their part of speech (pos), Thai translation, an example sentence from the chat, and a brief note.
2. You must update `/Users/opentechbox/Desktop/PA/english-teacher/vocab.js`.
3. The file contains a JavaScript array `const vocabularyData = [ ... ];`.
4. Use the `replace_file_content` tool (or `multi_replace_file_content`) to insert the new vocabulary objects at the end of the array (just before the closing `];`). 
5. Make sure to maintain valid JavaScript syntax by adding a comma `,` after the last existing object if necessary.

## Format for new vocabulary object:
```javascript
    ,{
        english: "Word",
        pos: "(n.)",
        thai: "คำแปล",
        example: "Example sentence.",
        note: "Additional notes."
    }
```

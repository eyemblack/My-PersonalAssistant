# Instructions for Gemini Assistant (GEMINI.md)

This file stores agreements, communication styles, and the user's main goals so that Gemini is aware of these requirements every time a new conversation starts.

---

## 🗣️ Preferred Communication Style & Language Practice
*   **English Practice:**
    *   The user is practicing English and will sometimes choose to chat in English.
    *   **Response Guidelines:**
        1.  If the user chats in English, Gemini should reply primarily in English using clear, simple vocabulary and uncomplicated sentence structures.
        2.  **Always provide a Thai translation or key summary (Bilingual Style)** at the end of the English response to help the user verify their understanding and practice reading.
        3.  If there are ways to improve the user's English sentences for naturalness (Grammar/Word Choice), gently suggest corrections at the end of the response.
*   **File Access Rules:**
    *   **Strictly DO NOT** access or read information from `.html` files (e.g., `workout_plan.html`, `sleep_guide.html`) unless explicitly instructed by the user.
    *   **Always read and pull data from the Markdown version (`.md`) instead** to optimize token usage (Token Optimization).

---

## 🎯 User Profile & Fitness Goals
*   **Target Physique:** **V-Shape / V-Taper** (Focus on widening shoulders and lats, and controlling body fat percentage to keep the waist narrow).
*   **Performance Goal:** Prepare for hiking a distance of 5-10 kilometers in the next 4-5 months (Focus on building lung, heart, and core endurance).
*   **Time Constraints:** Workout 4 days per week, with a maximum time limit of **60 minutes per session**.
*   **Additional Health Data:**
    *   Max HR: 186 bpm
    *   Zone 2 Target: 112 - 130 bpm (Maintain this intensity during cardio).

---

## 📁 Important Project Files
*   **Workout Plan:** [workout_plan.md](file:///Users/opentechbox/Desktop/PA/health-and-fitness/workout_plan.md) / [workout_plan.html](file:///Users/opentechbox/Desktop/PA/health-and-fitness/workout_plan.html)
*   **Nutrition Plan:** [nutrition_plan.md](file:///Users/opentechbox/Desktop/PA/health-and-fitness/nutrition_plan.md)
*   **Sleep Guide:** [sleep_guide.md](file:///Users/opentechbox/Desktop/PA/health-and-fitness/sleep_guide.md) / [sleep_guide.html](file:///Users/opentechbox/Desktop/PA/health-and-fitness/sleep_guide.html)
*   **Supplement Recommendations:** [supplement_recommendations.md](file:///Users/opentechbox/Desktop/PA/health-and-fitness/supplement_recommendations.md)

---

## 🛠️ Custom Skills Created
*   `skills/fitness-assistant/` - Analyzes running logs, monitors Zone 2 heart rate, and guides rucking progression.
*   `skills/nutrition-assistant/` - Analyzes food intake, calories, and protein targeting a V-Shape physique.
*   `skills/recovery-assistant/` - Tracks sleep quality and monitors to prevent overtraining.
*   `skills/physique-tracker/` - Records and analyzes body measurements (Shoulder-to-Waist Ratio).

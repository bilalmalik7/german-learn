# 🇩🇪 Deutsch in 30 Tagen – Learn German step by step

An animated, beginner-friendly website that takes you from your first „Hallo“ to relative clauses, the passive and Konjunktiv II in **30 days of 2–3 hours each**.

## What’s inside

| | |
|---|---|
| 🗺️ **30-day plan** | 4 weeks (A1.1 → A1.2 → A2 → B1 structures). Each day unlocks after the previous one, with a timed study plan of about 2 h 45 min. |
| 📚 **Vocabulary** | 790 words with article colour code (der / die / das), plurals, irregular verb forms, example sentences and audio. |
| 📘 **Grammar A–Z** | 62 topics with rules, tables, audio examples, tips and common mistakes – from personal pronouns to Konjunktiv I. Searchable, filterable by level. |
| 🎬 **Animated dialogues** | Bruno the Berlin bear plus 37 illustrated people who breathe, blink, look at whoever is speaking, change expression (smile, worry, curiosity) and lip-sync with mouth shapes that follow the audio. 33 lesson scenes. Role-play mode: you speak one character’s lines. |
| 🧩 **Exercises** | 532 hand-written exercises plus auto-generated ones: multiple choice, gap-fill, sentence building, translation, dictation, der/die/das, matching. Instant feedback with explanations; mistakes come back once. |
| 🎤 **Speaking** | Speech recognition scores your pronunciation word by word (Chrome/Edge). Free speaking tasks with model answers. Record-yourself fallback in other browsers. |
| ✍️ **Writing studio** | 20 writing tasks (A1–B1: emails, formal letters, stories, opinions) plus free writing, with required content points, word goal, umlaut buttons, autosave and model answers. On claude.ai the **AI analysis** marks every mistake in your text, explains each rule, sorts mistakes by type (cases, verbs, word order, spelling …), checks task coverage, shows the corrected text as a word-by-word diff plus a more natural version, and tracks your scores over time. Mistakes go into the mistake notebook with one click. An offline **quick check** finds common learner mistakes everywhere (cases after prepositions, verb position, Perfekt with sein, capitals, spelling …). Plus a writing task in every lesson. |
| 🏋️ **Grammar Trainer** | Unlimited generated drills: conjugation of 45 key verbs (Präsens, Perfekt, Präteritum), articles in every case (der/den/dem, ein/einen/einem, kein, mein) and adjective endings – each answer shows the full table. |
| 📖 **Stories** | 4 graded listening & reading stories (A1 → B1) read aloud sentence by sentence, with comprehension questions. |
| 🎤 **Speak** | A daily 10-minute speaking workout (sounds → shadowing → say it in German → real-life lines → answer questions), **shadowing** of every lesson, scene and story sentence (normal / slow / hidden text), **“Say it in German”** with 300+ sentences (English prompt → you speak → every wrong word and ending is marked: einen ≠ einem), a question drill, pronunciation tips for missed sounds, your tricky words, and a daily goal with streak. No speech recognition? Record yourself and compare with the model, or say it and self-check. On claude.ai: **AI conversations** with 8 characters, now with a hands-free **📞 call mode**. |
| ✨ **AI tutor (claude.ai only)** | Bruno corrects your writing tasks and free-speaking answers (score, mistakes with rules, corrected version) and answers questions about any grammar topic. Hidden automatically elsewhere. |
| 🎬 **Real-life scenes** | 22 animated situations: airport, first day at the office, Bürgeramt, restaurant, train station, hotel, supermarket, doctor & pharmacy, bank, job interview, clothes shop, post office, police (stolen bike), dinner at friends’, flat viewing, hairdresser, phone contract, emergency call 112 & emergency room, immigration office, gym, a noisy neighbour and the farmers’ market. 43 animated places with passers-by, lighting moods, a camera that follows the speaker, announcements and narration. Learn the phrases first, then **say your lines out loud** (speak mode) at 167 “your turn” moments – or choose them. |
| 👤 **Student login & teacher portal (claude.ai)** | The teacher gets a **Teacher portal** button and a portal card on the home page: add students to a list (name, email), follow the step-by-step sharing guide, preview the student login, and see each invited student switch from “✉️ Invited” to live progress once they log in. Students sign in with their claude.ai account (no extra password) and complete the **Student login** once: name, email / WhatsApp, native language, goals, level and daily time. Their progress is backed up privately to their account and restored automatically on any new device. |
| 📊 **Teacher dashboard (claude.ai)** | The course owner sees every student: registration details, status (active / paused / finished / archived), private teacher notes, an **activity timeline – who did what and when** (lessons, finished days, scenes, writing scores, speaking workouts, messages), current day, scores, XP, streak, study time (today / 7 days / total, chart per day), trainer accuracy, scenes, stories, writing and speaking stats – plus CSV export of all students and an inbox to answer questions and correct texts (with an optional AI draft). |
| 📨 **My teacher (claude.ai)** | Learners send questions or texts for correction (also straight from each writing task) and get the answers with an unread badge. Learners need **Contributor** access (or Editor by email) to save data. |
| ❗ **Mistake notebook** | Every exercise you get wrong is saved; practise them until the list is empty. |
| 🔁 **Review** | Spaced-repetition flashcards (Leitner boxes), mixed grammar quiz, searchable word list. |
| 🗣️ **Pronunciation** | Alphabet, every German sound with examples, and a minimal-pairs listening game. |
| ⭐ **Motivation** | Bruno reacts to every answer, streak combos, sound effects, keyboard shortcuts (1–4, Enter), XP, day streak, activity chart, a certificate after Day 30. Light & dark mode. |
| 📱 **Made for phones** | Bottom tab bar (Start · Plan · Real life · Speak · More) with a “More” sheet, sideways-scrolling tabs, compact stats, a taller scene stage, big touch targets, no zoom-in when typing, the tab bar hides while the keyboard is open, and landscape support. |

## How to run it

It’s a static site – no build step, no server code.

- **Easiest:** open `index.html` in Chrome or Edge.
- **Best (microphone works reliably):** serve it over http(s), e.g.
  ```bash
  python3 -m http.server 8000
  # then open http://localhost:8000
  ```
- **Online:** enable *GitHub Pages* for this repository (Settings → Pages → deploy from branch, root folder).

### Audio & microphone

- Audio uses your device’s built-in German text-to-speech voice. For the most natural sound use Chrome (“Google Deutsch”), Edge (“Microsoft Katja/Conrad Online”) or Safari (“Anna”). If you hear no German voice, add German in your operating system’s speech settings. You can choose the voice and speed in ⚙️ Settings.
- Pronunciation scoring uses the browser’s speech recognition (Chrome / Edge, internet connection needed). Allow microphone access when asked.

### Your progress

Progress is stored in your browser (`localStorage`). Use **Settings → Export / Import** to move it to another device.

## Project structure

```
index.html            app shell
css/style.css         design, animations, light/dark themes
js/core.js            helpers, progress store, text-to-speech, speech recognition, confetti
js/characters.js      animated SVG characters
js/exercises.js       exercise engine
js/dialogue.js        dialogue scenes & role-play
js/trainer.js         grammar drills & stories
js/tutor.js           AI tutor & AI conversations (claude.ai)
js/speak.js           speaking practice: scoring, workout, shadowing, say it in German
js/scenarios.js       real-life scene player, camera & animated backgrounds
js/writing.js         writing studio: AI analysis, quick check, history
js/cloud.js           study-time tracking, activity log, teacher inbox, dashboard (claude.ai db)
js/accounts.js        student registration, account page, cloud backup of progress
js/app.js             router and all pages
js/data/grammar*.js   grammar topics (Weeks 1–2, 3–4, reference)
js/data/week1-4.js    the 30 daily lessons
js/data/sounds.js     pronunciation guide
js/data/practice.js   verb tables, drill nouns, conversation questions, scenarios, stories
js/data/scenarios*.js the 22 real-life scenes
js/data/writing.js    writing studio tasks and model answers
```

### Adding or editing content

Each day in `js/data/weekN.js` is a plain object: `vocab` entries are `[german, forms, english, example, exampleEnglish]`; exercises are `{ t: 'mc' | 'fill' | 'order' | 'tr' | 'listen', … }`. In grammar HTML, `{{Deutsch|English}}` renders an example with an audio button and `[[Deutsch]]` makes a word clickable.

## A note on expectations

30 days × 2–3 hours ≈ 75–90 hours of focused study. That builds a solid **A1–A2 foundation and introduces every core B1 grammar structure** – you’ll understand how German sentences work and handle everyday conversations. Perfect, automatic grammar in fast speech comes from continued daily practice after the 30 days: keep using the review section, find a tandem partner and keep speaking.

Viel Erfolg! 🍀

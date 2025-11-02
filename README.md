
# Voice App

**Version:** 1.0.0  
**Author:** Chinaza Maduakor  

---

## Description
The **Voice App** allows users to **press and hold** a button to record audio, then transition through a simulated **Press-to-Talk (PTT)** voice flow — similar to voice assistants or push-to-talk messaging systems.  
It captures local audio, simulates API processing, and visually communicates the interaction states.

---

## Overview
This is a small Expo (React Native, TypeScript) app that demonstrates a Press-to-Talk (PTT) voice interaction flow — similar to voice assistants or push-to-talk messaging. It focuses on capturing voice input locally, processing simulated responses, and displaying clear state transitions.

---

## Tech Stack

- **React Native (Expo)**
- **TypeScript**
- **Expo-Audio** (replaces deprecated expo-av audio recording)
- **StubVoiceApi** (simulated backend for fake responses)

---

##  Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd voice-ai-app

2. **Install dependencies:**
     ```bash
    npm install

3. **Running the App:**
    ```bash
    npx expo start

## Key Features

-  Press-to-Talk Recording — Capture local voice input with Expo-Audio (expo-av has deprecated).

- Simulated Voice API — Returns fake transcripts or clarifications using timed Promises.

- State Transitions — Visually indicate Listening → Processing → Result flow.

- Clarification Support — Handles “clarification turns” when additional input is needed.

- Error Handling — Gracefully manages permission denials, recording errors, or network issues.

## Project Structure

    voice-ai-app/
    │── app/
    │    ├── components/
    │    │   ├── ClarificationBanner.tsx
    │    │   ├── ErrorBanner.tsx
    │    │   ├── Overlay.tsx
    │    │   ├── PTTButton.tsx
    │    │   └── TranscriptList.tsx
    │    ├── services/
    │    │   ├── AudioService.ts
    │    │   └── VoiceApi.ts 
    │    └── types.ts  
    └── App.tsx

VOICE APP
Version: 1.0.0
Author: Chinaza Maduakor
Description: The app allows users to press and hold a button to record audio, then transition.

Overview
This is a small Expo (React Native, TypeScript) app that demonstrates a Press-to-Talk (PTT) voice interaction flow — similar to voice assistants or push-to-talk messaging. It focuses on capturing voice input locally, processing simulated responses, and displaying clear state transitions.

Tech Stack
React Native (Expo)
Typescript
Expo-Audio 
StubVoiceApi (simulated backend)


Installation
Clone the repository:

git clone <repo-url>
cd voice-ai-app

Install dependencies:
npm install


Running the App
Start Metro Bundler

npx expo start 

Key Features

Press-to-Talk Recording — Capture local voice input with Expo-Audio (expo-av has deprecated).

Simulated Voice API — Returns fake transcripts or clarifications using timed Promises.

State Transitions — Visually indicate Listening → Processing → Result flow.

Clarification Support — Handles “clarification turns” when additional input is needed.

Error Handling — Gracefully manages permission denials, recording errors, or network issues.

Project Structure

    voice-ai-app/
    │── app/
    │    ├── components/
    │    │   ├── ClarificationBanner.tsx
    │    │   ├── ErrorBanner.tsx
    │    │   ├── Overlay.tsx
    │    │   └── PTTButton.tsx
    │    │   ├── TranscriptList.tsx
    │    ├── services/
    │    │   ├── AudioService.ts
    │    │   └── VoiceApi.ts 
    │    └── types.ts  
    └──  App.tsx



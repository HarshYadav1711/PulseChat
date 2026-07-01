# PulseChat

A basic real-time chat application built for a software development internship assessment.

## Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Mobile   | React Native (Expo) + TypeScript    |
| Backend  | Node.js + Express + Socket.IO       |
| Storage  | In-memory (no external database)    |

## Features

- Send and receive messages in real time via Socket.IO
- Dummy login with a display name (no real authentication)
- Timestamp on every message
- Message history on join
- Clean separation between UI, services, and server layers

## Project structure

```
PulseChat/
├── mobile/                 # React Native client
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── config/         # Client configuration
│       ├── screens/        # Login and chat screens
│       ├── services/       # REST + Socket.IO clients
│       ├── types/          # Shared TypeScript types
│       └── utils/          # Formatting helpers
└── server/                 # Node.js backend
    └── src/
        ├── config/         # Environment config
        ├── routes/         # REST endpoints
        ├── services/       # Business logic
        ├── socket/         # Socket.IO event handlers
        └── types/          # Shared TypeScript types
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm
- For Android: [Android Studio](https://developer.android.com/studio) with an emulator or a physical device
- For Expo Go testing: [Expo Go](https://expo.dev/go) on your phone

## Quick start

### 1. Install dependencies

```bash
cd server && npm install
cd ../mobile && npm install
```

### 2. Start the backend

```bash
cd server
npm run dev
```

The server listens on `http://localhost:3001`.

### 3. Start the mobile app

In a second terminal:

```bash
cd mobile
npm start
```

Then press `a` for Android emulator, `w` for web, or scan the QR code with Expo Go.

### Server URL on physical devices

The app defaults to:

- **Android emulator:** `http://10.0.2.2:3001`
- **iOS simulator / web:** `http://localhost:3001`

For a **physical device**, set your machine's LAN IP before starting Expo:

```bash
# Windows PowerShell
$env:EXPO_PUBLIC_SERVER_URL="http://192.168.x.x:3001"
npm start
```

Replace `192.168.x.x` with your computer's local IP address. Phone and computer must be on the same network.

## API overview

### REST

| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| GET    | `/health`          | Health check             |
| POST   | `/api/auth/login`  | Dummy login              |
| GET    | `/api/messages`    | Fetch message history    |

### Socket.IO events

| Event          | Direction       | Description                    |
| -------------- | --------------- | ------------------------------ |
| `join`         | Client → Server | Join chat and receive history  |
| `history`      | Server → Client | Recent messages                |
| `send_message` | Client → Server | Send a new message             |
| `new_message`  | Server → Client | Broadcast of a new message     |
| `error`        | Server → Client | Validation or runtime errors   |

## Building an APK

### Option A — Local release build (recommended if Android SDK is installed)

```bash
cd mobile
npx expo prebuild --platform android
cd android
./gradlew assembleRelease
```

The APK is generated at:

`mobile/android/app/build/outputs/apk/release/app-release.apk`

On Windows, use `gradlew.bat assembleRelease` instead of `./gradlew`.

### Option B — EAS Build (cloud, free tier)

```bash
npm install -g eas-cli
cd mobile
eas login
eas build:configure
eas build --platform android --profile preview
```

EAS produces a downloadable APK without a local Android SDK.

### Option C — Screen recording

If APK generation is not possible, record a short demo showing:

1. Login with a display name
2. Sending a message
3. Receiving a message from another client (second emulator, Expo Go, or web)

## Scripts

### Server

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start with hot reload    |
| `npm run build` | Compile TypeScript       |
| `npm start`     | Run compiled server      |

### Mobile

| Command          | Description              |
| ---------------- | ------------------------ |
| `npm start`      | Start Expo dev server    |
| `npm run android`| Open on Android          |
| `npm run web`    | Open in browser          |

## Design notes

- **No cloud database** — messages are stored in memory on the server for simplicity.
- **No real authentication** — login accepts any display name and returns a dummy token.
- **No extra features** — no groups, media, typing indicators, or push notifications.

These choices keep the project focused on core requirements: clean structure, client–server communication, and basic chat functionality.

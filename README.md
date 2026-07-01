# PulseChat

Production-grade monorepo for a real-time chat application.

## Structure

```
PulseChat/
├── mobile/          React Native client (Expo, TypeScript)
├── server/          Node.js backend (Express, Socket.IO)
├── eslint.config.mjs
├── .prettierrc
└── README.md
```

## Stack

| Package  | Technologies                                                       |
| -------- | ------------------------------------------------------------------ |
| `mobile` | React Native, Expo, TypeScript, React Navigation, Socket.IO Client |
| `server` | Node.js, Express, TypeScript, Socket.IO                            |

## Prerequisites

- Node.js 18+
- npm 9+

## Setup

```bash
npm install
```

## Scripts

| Command                | Description                     |
| ---------------------- | ------------------------------- |
| `npm run dev:server`   | Start the backend in watch mode |
| `npm run dev:mobile`   | Start the Expo dev server       |
| `npm run build:server` | Compile the backend             |
| `npm run typecheck`    | Type-check all workspaces       |
| `npm run lint`         | Lint all workspaces             |
| `npm run format`       | Format all files with Prettier  |
| `npm run format:check` | Verify Prettier formatting      |

## Package layout

### `server/src`

| Directory   | Purpose                               |
| ----------- | ------------------------------------- |
| `config/`   | Environment and runtime configuration |
| `routes/`   | Express route modules                 |
| `services/` | Business logic                        |
| `socket/`   | Socket.IO event handlers              |
| `types/`    | Shared TypeScript types               |

### `mobile/src`

| Directory     | Purpose                   |
| ------------- | ------------------------- |
| `navigation/` | React Navigation setup    |
| `screens/`    | Screen components         |
| `components/` | Reusable UI components    |
| `services/`   | API and Socket.IO clients |
| `config/`     | Client configuration      |
| `types/`      | Shared TypeScript types   |
| `utils/`      | Utility functions         |

## Absolute imports

Both packages use `@/` as an alias for `src/`:

```typescript
import { env } from "@/config/env";
```

- **Server:** resolved at build time via `tsc-alias`
- **Mobile:** resolved at runtime via `babel-plugin-module-resolver`

## Development

Start the backend:

```bash
npm run dev:server
```

In a second terminal, start the mobile app:

```bash
npm run dev:mobile
```

The server listens on `http://localhost:3001` and exposes `GET /api/health`.

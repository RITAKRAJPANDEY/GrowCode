# WinterBreakers

WinterBreakers is a task-management and realtime collaboration app with an authenticated workflow, daily task tracking, and a working group chat experience. The current build is centered on a usable product experience: users can sign in, manage tasks, and exchange live messages through a Socket.IO server powered by the root server.ts file.

## Current Status

The repository now includes a working foundation for:

- a Next.js app shell and landing page
- authentication API routes for signup, login, logout, and token refresh
- task APIs for creating and reading tasks
- frontend pages and shared UI components for auth, tasks, and chat
- a live group chat experience backed by a Socket.IO server
- PostgreSQL connection helpers and environment-based configuration

## Completed Implementation

### Core Product Experience
- Signup, login, logout, and token refresh flows with validation
- Task creation and retrieval for everyday planning and tracking
- Group chat support with realtime message exchange in a shared room
- Reusable UI for auth, task actions, and chat interactions

### Technical Foundation
- JWT-based access-token handling and refresh-token support through cookies
- Password hashing with bcrypt / bcryptjs
- Service, repository, and validation layers for auth and task logic
- PostgreSQL integration and environment-based configuration
- A Socket.IO server in the root server.ts file for realtime messaging

### Chat and Realtime
- Group chat is available through the app’s chat interface
- The root Socket.IO server is operational and handles room-based messaging
- The current experience is focused on a lightweight but functional realtime chat flow

### Containerization
- Dockerfile and docker-compose.yaml are included for container-based setup
- The repository includes a web service and PostgreSQL service for local development use

## Theoretical / Future Ideas

The following items are not part of the finished implementation and are listed here only as theory or future direction:

- full task editing and deletion workflow
- advanced task dashboard and analytics
- a complete chat experience with persistent messages and richer UI
- full Socket.IO room management, presence, and user interactions
- broader production hardening and deployment improvements

## Tech Stack

- Next.js 16.2.6
- React 19.2.4
- TypeScript and JavaScript
- Tailwind CSS 4
- PostgreSQL with pg
- Axios for API requests
- Zod for validation
- Zustand for state management
- JWT and bcrypt libraries
- Socket.IO and socket.io-client for realtime communication
- MUI / Emotion, Radix UI, lucide-react, Three.js

## Project Structure

```text
winterbreakers/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   ├── logout/
│   │   │   │   ├── refresh/
│   │   │   │   └── signup/
│   │   │   └── task/
│   │   ├── addtask/
│   │   ├── login/
│   │   ├── logout/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   ├── errors/
│   ├── lib/
│   ├── middleware/
│   ├── modules/
│   │   ├── auth/
│   │   └── task/
│   └── services/
├── public/
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

## API Routes

### Authentication
- POST /api/auth/signup
- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/refresh

### Task Routes
- POST /api/task
- GET /api/task

## Available Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
node server.ts
```

## Local Setup

### Prerequisites
- Node.js 18+ recommended
- PNPM
- PostgreSQL instance

### Install dependencies

```bash
git clone <repo-url>
cd winterbreakers
pnpm install
```

### Environment variables

Create a .env.local file in the project root with the values required by the app:

```env
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_NAME=your_db_name
DB_PORT=5432
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESHTOKENSECRET=your_refresh_token_secret
```

The environment validation in src/lib/env.ts expects these values to be present at runtime.

### Run the app

Start the realtime Socket.IO server from the project root:

```bash
node server.ts
```

Then start the Next.js app in a separate terminal:

```bash
pnpm dev
```

Open http://localhost:3000 for the web app. The Socket.IO server runs on port 3001 by default.

### Docker setup

A Docker-based setup is also included for running the app with PostgreSQL:

```bash
docker compose up --build
```

This uses the provided Dockerfile and docker-compose.yaml to start the web app and database services. The Socket.IO server is separate from the main Next.js app and can be configured with the SOCKET_PORT environment variable.

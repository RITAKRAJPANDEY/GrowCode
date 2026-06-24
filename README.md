# WinterBreakers

WinterBreakers is a Next.js task-management app with a working foundation for authentication, task handling, and the main UI flow. This README focuses on what is already implemented in the repository, while leaving advanced or incomplete ideas clearly marked as theoretical.

## Current Status

The repository currently contains a functional base for:

- a Next.js app shell and landing page
- authentication API routes for signup, login, logout, and token refresh
- task API routes for creating and reading tasks
- basic frontend pages and shared UI components for auth and task actions
- a chat route scaffold and Socket.IO server setup
- PostgreSQL connection helpers and environment-based configuration

## Completed Implementation

### Authentication
- Signup and login flow with request validation
- JWT-based access-token handling
- Refresh-token support through cookies
- Logout route and basic auth middleware
- Password hashing with bcrypt / bcryptjs

### Task Handling
- Task creation endpoint wired through the API layer
- Task retrieval endpoint available in the task route handler
- Validation for incoming task data
- Service and repository modules for task logic

### UI and Experience
- Landing page and navigation structure
- Login and task-related pages
- Reusable UI components for loading, actions, and shared layout
- Tailwind and component-based styling support

### Chat and Realtime
- Chat route scaffold is present under the chat page flow
- A Socket.IO server is included for realtime room-based messaging
- The current chat implementation is a basic foundation rather than a full production chat experience

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

```bash
pnpm dev
```

Then open http://localhost:3000.

### Docker setup

A Docker-based setup is also included for running the app with PostgreSQL:

```bash
docker compose up --build
```

This uses the provided Dockerfile and docker-compose.yaml to start the web app and database services. The Socket.IO server is separate from the main Next.js app and can be configured with the SOCKET_PORT environment variable.

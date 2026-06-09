# WinterBreakers

WinterBreakers is a Next.js task-management app with JWT-based authentication, task creation/fetch workflows, and a polished landing page. The current codebase combines a Next.js 16 frontend with server-side API routes, PostgreSQL access, and shared UI components.

## Overview

This repository is the working implementation of the project, not just a starter template. It includes:

- a modern Next.js app shell and animated landing page
- authentication routes for signup, login, logout, and refresh
- task API routes for creating and retrieving tasks
- service-layer helpers for frontend API communication and token refresh
- PostgreSQL integration via the app's database utility and environment validation

## Current Features

### Authentication
- User signup and login flow with request validation
- JWT access token issuance and refresh-token handling
- Secure cookie-based refresh-token support
- Logout route and token refresh logic
- Password hashing with bcrypt / bcryptjs

### Task Management
- Task creation endpoint wired through the API layer
- Task retrieval endpoint available in the task route handler
- Validation using Zod for incoming data
- Task service modules in the project structure for business logic

### UI and Experience
- Landing page with animated visuals and hero content
- Navigation and login/logout entry points
- Reusable components for loading, action buttons, and dashboard visuals
- Tailwind + MUI / Emotion styling support

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

The env validation in src/lib/env.ts expects these values to be present at runtime.

### Run the app

```bash
pnpm dev
```

Then open http://localhost:3000.

## Notes for the Current Codebase

- Access tokens are stored in localStorage on the client side.
- Refresh tokens are handled through secure cookies.
- The shared API client in src/services/apiClient.js adds the auth header and handles refresh on 401 responses.
- Authentication logic is implemented in src/modules/auth, and task logic is implemented in src/modules/task.
- The landing page entry point is src/app/page.tsx.

## Next Steps

Possible follow-up work for this project includes:
- expanding task CRUD beyond create/fetch
- improving task listing and dashboard analytics
- adding stronger UI states for errors and loading
- hardening deployment and environment handling

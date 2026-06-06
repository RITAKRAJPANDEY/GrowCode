# WinterBreakers

WinterBreakers is a Next.js task management application with secure authentication, task creation, and interactive dashboard visuals.

## 🚀 Overview

This repository contains a full-stack Next.js app built with React, PostgreSQL, and server-side API routes. It focuses on user authentication, task creation, and a modern UI experience.

---

## 📋 Features

### ✅ Authentication
- User signup with validation
- User login with JWT access token issuance
- Secure refresh token storage in httpOnly cookies
- Logout and refresh token revocation
- Password hashing using bcrypt

### ✅ Task Management
- Task creation API endpoint
- Task payload validation with Zod
- Add task UI flow
- Task retrieval route scaffolded and pending completion

### ✅ UI/UX
- Landing page with animated visuals
- Login screen and navigation bar
- Loading and action button components
- Styled using Tailwind, Emotion, and MUI

---

## 🛠 Tech Stack

- Next.js 16.2.6
- React 19.2.4
- TailwindCSS 4
- TypeScript / JavaScript
- PostgreSQL
- Axios
- bcrypt / bcryptjs
- jsonwebtoken
- Zod
- Zustand
- Three.js
- MUI / Emotion
- Radix UI

---

## 📁 Project Structure

```
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
│   │   │       ├── addtask/
│   │   │       └── gettask/
│   │   ├── addtask/
│   │   ├── login/
│   │   ├── logout/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   ├── errors/
│   ├── middleware/
│   ├── modules/
│   │   ├── auth/
│   │   └── task/
│   ├── services/
│   └── lib/
├── public/
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── README.md
```

---

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/refresh`

### Task Routes
- `POST /api/task/addtask`
- `GET /api/task/gettask` (scaffolded)

---

## 📦 Available Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

---

## 🚀 Setup

### Prerequisites
- Node.js v16+
- PNPM
- PostgreSQL

### Install

```bash
git clone <repo-url>
cd winterbreakers
pnpm install
```

### Environment

Create a `.env.local` file in the project root with the following values:

```env
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_NAME=your_db_name
DB_PORT=5432
ACCESS_TOKEN_SECRET=your_jwt_secret
```

### Run

```bash
pnpm dev
```

Open `http://localhost:3000` in your browser.

---

## 🧠 Notes

- Access tokens are stored on the client side.
- Refresh tokens are stored in secure httpOnly cookies.
- The authentication system is handled in `src/modules/auth`.
- Axios is configured in `src/services/apiClient.js` for `/api` requests with token refresh support.
- Task retrieval is not yet completed in `src/modules/task`.

---

## 📌 Project Overview

- `src/app/page.tsx` is the landing page.
- `src/app/login/page.jsx` renders the login UI.
- `src/components` holds reusable UI components.
- `src/lib/db.js` configures PostgreSQL using environment variables.

---

## 📚 Further Development

- Complete task retrieval and task management workflows
- Add update/delete task operations
- Add database migrations and seed scripts
- Improve dashboard analytics and visuals

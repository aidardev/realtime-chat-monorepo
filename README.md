# Realtime Chat

Realtime Chat is a full-stack real-time messaging application. The project is implemented as a monorepo powered by Turborepo and includes a React/Vite frontend, an Express backend, and a shared data schema/models managed via Prisma.

## Features

- User registration and authentication (JWT)
- 1-on-1 and group chats
- Real-time messaging via Socket.IO
- Typing indicators
- User profiles with avatar upload functionality
- Admin panel for user management
- Shared validation schemas using Zod and shared workspace packages

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Redux Toolkit, RTK Query, React Router, Tailwind CSS, Socket.IO client
- **Backend:** Express, TypeScript, Socket.IO, JWT, Prisma, PostgreSQL, Multer, Zod
- **Monorepo:** pnpm, Turborepo, workspace packages

## Project Structure

- `apps/front-react` — Client-side application
- `apps/backend` — API and WebSocket server
- `packages/database` — Prisma client and database migrations
- `packages/schema` — Shared validation schemas and TypeScript types
- `packages/ui` — Shared UI components

## Prerequisites

- Node.js 18+
- pnpm 9+
- PostgreSQL

## Quick Start

1. Install dependencies:

```bash
pnpm install

```

2. Set up your PostgreSQL database and configure the environment variables.

Example back-end configuration values:

```env
PORT=3001
NODE_ENV=development
DATABASE_URL="postgresql://postgres:admin@localhost:5432/chat_db?schema=public"
JWT_ACCESS_SECRET="your_access_secret"
JWT_REFRESH_SECRET="your_refresh_secret"

```

3. Generate the Prisma client and push the schema to the database:

```bash
pnpm --filter @realtime-chat/database db:generate
pnpm --filter @realtime-chat/database db:push

```

4. Start the development server:

```bash
pnpm dev

```

Once started:

- **Frontend** will be available at: http://localhost:5173
- **Backend** will be available at: http://localhost:3001

## Running Services Separately

If you need to run specific applications individually:

```bash
pnpm --filter backend dev
pnpm --filter front-react dev

```

## Core API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `GET /api/conversations`
- `POST /api/conversations`
- `GET /api/conversations/:id/messages`
- `POST /api/conversations/:id/messages`

## Useful Commands

```bash
pnpm build        # Build all applications and packages
pnpm lint         # Run linter across the workspace
pnpm check-types  # Verify TypeScript types

```

## Note

This project is under active development. The README will be updated as new features and optimizations are introduced.

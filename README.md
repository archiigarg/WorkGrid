# WorkGrid

WorkGrid is a full-stack project management dashboard for planning projects, tracking tasks, organizing teams, and searching across work items. The client is a Next.js app with Redux, RTK Query, MUI, Tailwind, authentication through Amplify, and interactive dashboard views. The server is an Express + Prisma API backed by PostgreSQL.

Deployed app: https://main.d2tkk76lwohpr8.amplifyapp.com/

## What It Does

- Project dashboard with task, project, and team navigation
- Priority views for Urgent, High, Medium, Low, and Backlog work
- Timeline, search, settings, users, and teams pages
- Project and task creation flows
- Task status updates and project-level task filtering
- Authentication through Amplify
- Data visualization on the home dashboard for task priority and project status

## Tech Stack

### Client

- Next.js 14
- React 18
- TypeScript
- Redux Toolkit
- RTK Query
- Material UI
- Tailwind CSS
- AWS Amplify UI
- Recharts
- react-dnd

### AWS Services

- AWS Amplify for frontend hosting and authentication integration
- Amazon Cognito for authentication
- Amazon EC2 for server-side application hosting
- Amazon VPC for network isolation and private infrastructure setup
- AWS Lambda for serverless/background processing where needed
- Amazon RDS for the PostgreSQL database layer

### Server

- Node.js
- Express
- TypeScript
- Prisma
- PostgreSQL
- CORS, Helmet, Morgan, Body Parser

## Repository Structure

- `client/` - Next.js frontend
- `server/` - Express + Prisma backend

## Client Features

- Global app shell with sidebar and navbar
- Home dashboard with charts and task grid
- Project detail pages with multiple views
- Priority-specific task pages
- Search, settings, users, teams, and timeline pages
- Authentication sign-in and sign-out flow through Amplify

## Server Features

- REST API for projects, tasks, users, teams, and search
- Prisma models for users, teams, projects, tasks, attachments, comments, project-team links, and task assignments
- PostgreSQL persistence

## API Routes

- `GET /` - basic server health response
- `GET /projects` - list projects
- `POST /projects` - create a project
- `GET /tasks?projectId=...` - list tasks for a project
- `GET /tasks/all` - list all tasks
- `POST /tasks` - create a task
- `PATCH /tasks/:taskId/status` - update task status
- `GET /tasks/user/:userId` - list tasks assigned to a user
- `GET /users` - list users
- `POST /users` - create a user
- `GET /users/:cognitoId` - fetch a user by auth ID
- `GET /teams` - list teams
- `GET /search?query=...` - search across content

## Prerequisites

- Node.js 18+ recommended
- npm
- PostgreSQL database for the server
- AWS user pool for authentication

## Environment Variables

### Client (`client/.env.local`)

- `NEXT_PUBLIC_API_BASE_URL` - base URL of the backend API
- `NEXT_PUBLIC_COGNITO_USER_POOL_ID` - user pool ID
- `NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID` - app client ID

### Server (`server/.env`)

- `PORT` - server port, defaults to `3000`
- `DATABASE_URL` - PostgreSQL connection string used by Prisma

## Setup

### 1. Install dependencies

```bash
cd client
npm install

cd ../server
npm install
```

### 2. Configure environment variables

Create `client/.env.local` and `server/.env` with the values above.

### 3. Set up the database

Run Prisma migrations and seed data from the server folder:

```bash
cd server
npx prisma migrate deploy
npm run seed
```

If you are developing locally and need to generate a new migration, use Prisma migration tooling from the server directory.

## Running Locally

### Client

```bash
cd client
npm run dev
```

The app runs on `http://localhost:3000` by default.

### Server

```bash
cd server
npm run dev
```

If you are running the client and server at the same time, set the API to a different port such as `3001` and point `NEXT_PUBLIC_API_BASE_URL` at that address.

The API listens on `http://localhost:3000` unless `PORT` is set.

## Available Scripts

### Client

- `npm run dev` - start the Next.js development server
- `npm run build` - build the frontend for production
- `npm run start` - start the production frontend server
- `npm run lint` - run Next.js linting

### Server

- `npm run dev` - build TypeScript in watch mode and run the API with nodemon
- `npm run build` - compile the server to `dist/`
- `npm run start` - build and run the compiled server
- `npm run seed` - seed the database with Prisma seed data

## Data Model

The Prisma schema includes:

- Users
- Teams
- Projects
- Tasks
- Task assignments
- Attachments
- Comments
- Project-team links

## Deployment Notes

- The frontend is deployed on AWS Amplify at the link above.
- The client reads the API base URL from `NEXT_PUBLIC_API_BASE_URL`.
- The server uses Prisma with PostgreSQL and serves the REST endpoints consumed by the frontend.
- The infrastructure is built around AWS services including EC2, VPC, Lambda, RDS, and Amplify.

## License

No license file is currently included in the repository.
# 🛠️ Setup Guide — Undercover

Complete step-by-step guide to get the Undercover game running on your local machine.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

| Software | Version | Download |
|---|---|---|
| **Node.js** | v18 or higher | [nodejs.org](https://nodejs.org/) |
| **npm** | v9 or higher | Comes with Node.js |
| **PostgreSQL** | v14 or higher | [postgresql.org](https://www.postgresql.org/download/) |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |

You will also need a **Google Cloud Console** project for OAuth 2.0 credentials.

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Tanveer-rajpurohit/Undercover.git
cd Undercover
```

---

## 2️⃣ Set Up PostgreSQL Database

### Create the database

Open your PostgreSQL shell (`psql`) or use a GUI tool like **pgAdmin**:

```sql
CREATE DATABASE undercover;
```

### Verify the connection

Ensure PostgreSQL is running and accessible at `localhost:5432` (default port).

---

## 3️⃣ Configure Environment Variables

Create a `.env` file inside the `backend/` directory:

```bash
cd backend
```

Create the file `backend/.env` with the following contents:

```env
# ──────────────────────────────────────
# DATABASE
# ──────────────────────────────────────
# Replace USER and PASSWORD with your PostgreSQL credentials
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/undercover?schema=public"

# ──────────────────────────────────────
# SERVER
# ──────────────────────────────────────
PORT=8000

# ──────────────────────────────────────
# GOOGLE OAUTH 2.0
# ──────────────────────────────────────
# Get these from https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# ──────────────────────────────────────
# JWT
# ──────────────────────────────────────
# Use a strong, random secret in production
JWT_SECRET="your-secure-random-jwt-secret"
```

### Setting Up Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Navigate to **APIs & Services → Credentials**
4. Click **Create Credentials → OAuth Client ID**
5. Select **Web Application** as the application type
6. Add the following:
   - **Authorized JavaScript origins**: `http://localhost:5173`
   - **Authorized redirect URIs**: `http://localhost:8000/auth/google/callback`
7. Copy the **Client ID** and **Client Secret** into your `.env` file

---

## 4️⃣ Install Dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd ../frontend
npm install
```

---

## 5️⃣ Set Up the Database Schema

Navigate to the backend directory and run Prisma migrations:

```bash
cd backend

# Generate the Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init
```

This will create all the required tables: `User`, `Game`, `ChatMessage`, `GameHistory`, and `WordPair`.

### Seed the Word Pairs

The word pairs are automatically seeded by the application on first startup. The app loads **120+ curated word pairs** across three difficulty tiers (Basic, Standard, Advanced) from the built-in `wordPairs.ts` file.

If you want to verify the database setup:

```bash
npx prisma studio
```

This opens a browser-based database GUI at `http://localhost:5555`.

---

## 6️⃣ Start the Development Servers

You need **two terminal windows** — one for the backend and one for the frontend.

### Terminal 1 — Backend Server

```bash
cd backend
npm start
```

The backend server will start at **http://localhost:8000** using `nodemon` for hot-reloading.

You should see:
```
Server is running on http://localhost:8000
```

### Terminal 2 — Frontend Dev Server

```bash
cd frontend
npm run dev
```

The frontend will start at **http://localhost:5173** with Vite's hot module replacement (HMR).

You should see:
```
  VITE v6.x.x  ready in XXXms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

---

## 7️⃣ Verify the Setup

1. Open **http://localhost:5173** in your browser
2. Click **Login with Google** — you should be redirected to Google's OAuth consent screen
3. After signing in, you'll be redirected back to the app with an auth token
4. Try creating a new game room and sharing the room code with another browser tab/window
5. Join from the second tab and start a game!

---

## 🔧 Common Issues & Troubleshooting

### Database connection failed
```
Error: P1001: Can't reach database server at `localhost:5432`
```
**Solution**: Ensure PostgreSQL is running. On Windows, check **Services** for the PostgreSQL service. On macOS/Linux:
```bash
sudo systemctl start postgresql
```

### Google OAuth callback error
```
Error: redirect_uri_mismatch
```
**Solution**: Ensure the redirect URI in Google Cloud Console exactly matches:
```
http://localhost:8000/auth/google/callback
```

### Port already in use
```
Error: listen EADDRINUSE: address already in use :::8000
```
**Solution**: Kill the process occupying the port:
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:8000 | xargs kill -9
```

### Prisma client not generated
```
Error: @prisma/client did not initialize yet
```
**Solution**: Run the Prisma client generator:
```bash
cd backend
npx prisma generate
```

---

## 🏗️ Build for Production

### Backend
```bash
cd backend
npm run build
```

### Frontend
```bash
cd frontend
npm run build
npm run preview  # Preview the production build
```

The production frontend bundle will be output to `frontend/dist/`.

---

## 📌 Quick Reference

| Action | Command | Directory |
|---|---|---|
| Start backend | `npm start` | `backend/` |
| Start frontend | `npm run dev` | `frontend/` |
| Run migrations | `npx prisma migrate dev` | `backend/` |
| Open DB GUI | `npx prisma studio` | `backend/` |
| Build frontend | `npm run build` | `frontend/` |
| Build backend | `npm run build` | `backend/` |
| Lint frontend | `npm run lint` | `frontend/` |

---

<p align="center">
  <strong>Having trouble? Open an <a href="https://github.com/Tanveer-rajpurohit/Undercover/issues">issue</a> and we'll help! 🚀</strong>
</p>

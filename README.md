<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Socket.IO-4.x-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.IO" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</p>

# 🕵️ Undercover — Real-Time Multiplayer Social Deduction Game

> A full-stack, real-time multiplayer social deduction platform where players receive secret words, describe them cleverly, and vote to eliminate impostors — all powered by WebSockets, voice chat, and modern web technologies.

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Game Mechanics](#-game-mechanics)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database Schema](#-database-schema)
- [API Reference](#-api-reference)
- [Socket Events](#-socket-events)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**Undercover** is a feature-rich, real-time multiplayer social deduction game built as a full-stack web application. Players join rooms, receive secretly assigned roles — **Civilian**, **Undercover**, or **Mr. White** — each with a different word (or no word at all). Through rounds of description, discussion, and strategic voting, players must identify and eliminate the impostors among them.

The project demonstrates proficiency in:
- **Real-time bidirectional communication** via WebSockets (Socket.IO)
- **OAuth 2.0 authentication** with Google Sign-In
- **Relational database design** with Prisma ORM and PostgreSQL
- **State management** across distributed clients in a multiplayer environment
- **Voice communication** integration using WebRTC (PeerJS / ZegoCloud)
- **Modern frontend architecture** with React, TypeScript, and GSAP animations

---

## ✨ Key Features

### 🎮 Multiplayer Game Engine
- **Real-time room management** — Create, join, and leave game rooms with unique room codes
- **Dynamic role assignment** — Fisher-Yates shuffle algorithm for truly random, unbiased role distribution
- **Configurable game modes** — Customize the number of Civilians, Undercovers, and Mr. Whites per session
- **Voting & elimination system** — Democratic voting rounds with automatic tallying and elimination
- **Win condition detection** — Intelligent game state evaluation to determine Civilian, Undercover, or Mr. White victory
- **Game state persistence** — Full game state stored in PostgreSQL with automatic round resets

### 🌐 Online & Offline Modes
- **Online multiplayer** — Real-time gameplay via WebSocket rooms with live player synchronization
- **Offline / Local play** — Pass-and-play mode for in-person game nights without requiring accounts

### 💬 Real-Time Communication
- **In-game chat** — Live messaging within game rooms with persistent message history
- **Voice chat** — Integrated voice communication via ZegoCloud UIKit and PeerJS for hands-free discussion rounds

### 🔐 Authentication & Profiles
- **Google OAuth 2.0** — Seamless one-click sign-in via Passport.js with JWT session management (30-day tokens)
- **User profiles** — Profile pictures, game history tracking, and personalized dashboards

### 📚 Word Library System
- **120+ curated word pairs** across three difficulty tiers: Basic, Standard, and Advanced
- **Category-based filtering** — Select word difficulty or play with all categories mixed
- **Database-seeded pairs** — Word pairs stored in PostgreSQL for easy expansion and management

### 🎨 Polished UI/UX
- **GSAP animations** — Smooth, cinematic transitions and micro-interactions throughout the interface
- **Responsive design** — Tailwind CSS-powered layouts optimized for desktop and mobile
- **Swiper carousels** — Touch-friendly component sliders for game selection and navigation
- **Lucide icons** — Clean, consistent iconography across all UI elements

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | Component-based UI with hooks and context API |
| **TypeScript** | Type-safe development across the entire frontend |
| **Vite** | Lightning-fast HMR and optimized production builds |
| **Tailwind CSS** | Utility-first responsive styling |
| **Socket.IO Client** | Real-time bidirectional event communication |
| **GSAP** | High-performance animations and transitions |
| **React Router v7** | Client-side routing with nested layouts |
| **PeerJS** | WebRTC-based peer-to-peer voice communication |
| **ZegoCloud UIKit** | Pre-built voice/video call UI components |
| **Swiper** | Touch-enabled carousel and slider components |
| **Lucide React** | Modern SVG icon library |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express** | RESTful API server with middleware pipeline |
| **TypeScript** | End-to-end type safety on the server |
| **Socket.IO** | WebSocket server for real-time game events |
| **Prisma ORM** | Type-safe database client with migration support |
| **PostgreSQL** | Relational database for persistent game state |
| **Passport.js** | Google OAuth 2.0 authentication strategy |
| **JSON Web Tokens** | Stateless session management |
| **PeerJS Server** | WebRTC signaling server for voice connections |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (React)                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────────┐   │
│  │  Router   │  │ Context  │  │  Hooks   │  │  Components   │   │
│  │ (Pages)   │  │ (Socket, │  │(useWord, │  │ (Game, Lobby, │   │
│  │          │  │  Game)   │  │ useActive│  │  Chat, Voice) │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───────┬───────┘   │
│       └──────────────┴─────────────┴────────────────┘           │
│                          │              │                        │
│              HTTP/REST Calls    Socket.IO Events                 │
└──────────────────────────┼──────────────┼────────────────────────┘
                           │              │
┌──────────────────────────┼──────────────┼────────────────────────┐
│                      SERVER (Express + Socket.IO)                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────────┐   │
│  │  Routes   │  │Controllers│  │Middleware│  │ Socket Handler │   │
│  │ /auth    │  │ Room,Game │  │  JWT Auth│  │ (Game Engine)  │   │
│  │ /rooms   │  │           │  │          │  │               │   │
│  │ /offline │  │           │  │          │  │               │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───────┬───────┘   │
│       └──────────────┴─────────────┴────────────────┘           │
│                              │                                   │
│                     Prisma ORM Client                            │
└──────────────────────────────┼───────────────────────────────────┘
                               │
                    ┌──────────┴──────────┐
                    │   PostgreSQL DB      │
                    │  ┌────┐ ┌────────┐  │
                    │  │User│ │  Game   │  │
                    │  ├────┤ ├────────┤  │
                    │  │Chat│ │WordPair │  │
                    │  ├────┤ ├────────┤  │
                    │  │    │ │History  │  │
                    │  └────┘ └────────┘  │
                    └─────────────────────┘
```

---

## 🎲 Game Mechanics

### Roles

| Role | Description | Word Assignment |
|---|---|---|
| **Civilian** | Majority faction. Must identify and eliminate impostors. | Receives **Word A** (e.g., "Cat") |
| **Undercover** | Hidden among civilians. Must survive until the end. | Receives **Word B** — similar but different (e.g., "Dog") |
| **Mr. White** | No word at all. Must bluff and survive purely on deception. | Receives no word |

### Flow

```mermaid
graph TD
    A[🏠 Create / Join Room] --> B[⏳ Waiting Lobby]
    B --> C{Host Starts Game}
    C --> D[🎭 Roles & Words Assigned]
    D --> E[💬 Description Round]
    E --> F[🗳️ Voting Phase]
    F --> G{Player Eliminated}
    G --> H{Win Condition Met?}
    H -->|No| E
    H -->|Civilians Win| I[🎉 Civilian Victory]
    H -->|Undercover Wins| J[🕵️ Undercover Victory]
    H -->|Mr. White Wins| K[👻 Mr. White Victory]
```

### Win Conditions
- **Civilians win** when all Undercovers and Mr. Whites are eliminated
- **Undercover wins** when the number of remaining Undercovers equals the remaining Civilians
- **Mr. White wins** when the number of remaining Mr. Whites equals the remaining Civilians

---

## 📁 Project Structure

```
Undercover/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Database models (User, Game, Chat, WordPair)
│   │   └── migrations/            # Database migration history
│   ├── src/
│   │   ├── app.ts                 # Express server entry point
│   │   ├── config/
│   │   │   ├── socket.ts          # Socket.IO game engine (675 lines)
│   │   │   ├── googleAuth.ts      # Passport Google OAuth strategy
│   │   │   └── prismaClient.ts    # Prisma singleton instance
│   │   ├── controller/
│   │   │   ├── roomController.ts  # Room CRUD operations
│   │   │   └── offlineGame.ts     # Offline word pair fetching
│   │   ├── middleware/
│   │   │   └── isLoggedIn.ts      # JWT authentication guard
│   │   ├── router/
│   │   │   ├── auth.ts            # Google OAuth routes
│   │   │   ├── room.ts            # Room management routes
│   │   │   └── game.ts            # Offline game routes
│   │   ├── utils/
│   │   │   └── TokenToUser.ts     # JWT token decoder utility
│   │   └── wordPairs.ts           # 120+ word pair seed data
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── main.tsx               # App entry with router & providers
│   │   ├── App.tsx                # Root component
│   │   ├── context/
│   │   │   ├── SocketContext.tsx   # Global Socket.IO connection provider
│   │   │   └── PlayGround.tsx     # Game state context provider
│   │   ├── hook/
│   │   │   ├── useActiveGameList.ts # Active games polling hook
│   │   │   └── useWord.ts          # Word pair fetching hook
│   │   ├── components/
│   │   │   ├── game/
│   │   │   │   ├── Lobby/         # Room creation, player management
│   │   │   │   ├── online/        # Chat, voice call, game cards, modals
│   │   │   │   ├── playgame/      # Core gameplay, voting, elimination
│   │   │   │   └── utils/         # Shared game UI components
│   │   │   ├── home/              # Landing page components
│   │   │   ├── navbar/            # Navigation bar
│   │   │   ├── profile/           # User profile components
│   │   │   └── setting/           # Settings page components
│   │   └── router/
│   │       ├── Login.tsx           # Google OAuth login page
│   │       ├── online/            # Online game page routes
│   │       └── offine/            # Offline game page routes
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── README.md
├── SETUP.md
└── LICENSE
```

---

## 🚀 Getting Started

> For detailed step-by-step setup instructions, see **[SETUP.md](./SETUP.md)**.

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/Tanveer-rajpurohit/Undercover.git
cd Undercover

# 2. Install dependencies
cd backend && npm install
cd ../frontend && npm install

# 3. Configure environment variables (see SETUP.md)
cp backend/.env.example backend/.env

# 4. Set up the database
cd backend
npx prisma migrate dev
npx prisma db seed

# 5. Start development servers
# Terminal 1 - Backend:
cd backend && npm start

# Terminal 2 - Frontend:
cd frontend && npm run dev
```

The app will be available at `http://localhost:5173` with the API server running on `http://localhost:8000`.

---

## 🔑 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/undercover?schema=public"

# Server
PORT=8000

# Google OAuth 2.0
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# JWT
JWT_SECRET="your-secure-jwt-secret"
```

---

## 🗃️ Database Schema

The application uses **5 interconnected models** managed by Prisma ORM:

```prisma
model User {
  id             Int           @id @default(autoincrement())
  name           String
  email          String        @unique
  googleId       String        @unique
  profilePicture String
  ChatMessage    ChatMessage[]
  Game           Game[]
  GameHistory    GameHistory[]
}

model Game {
  id          Int           @id @default(autoincrement())
  roomCode    String        @unique
  hostId      Int
  players     Json                    // Serialized player array
  roles       Json?                   // Assigned roles (post-start)
  mode        String        @default("public")
  WordType    String                  // Difficulty filter
  status      String                  // waiting | ongoing | completed
  createdAt   DateTime      @default(now())
}

model WordPair {
  id       Int    @id @default(autoincrement())
  wordType String                    // Basic | Standard | Advanced
  pair1    String                    // Civilian word
  pair2    String                    // Undercover word
}
```

---

## 📡 API Reference

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/auth/google` | Initiate Google OAuth 2.0 flow |
| `GET` | `/auth/google/callback` | OAuth callback — returns JWT token |

### Rooms
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/rooms/create` | Create a new game room |
| `POST` | `/rooms/join` | Join an existing room by code |
| `POST` | `/rooms/remove` | Remove a player from a room |
| `GET` | `/rooms/show` | List all active (waiting) rooms |

### Offline Game
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/offline/getword` | Fetch a random word pair by difficulty |

---

## 🔌 Socket Events

| Event | Direction | Payload | Description |
|---|---|---|---|
| `check-game-status` | Client → Server | `token` | Check if user is in an active game |
| `joinRoom` | Client → Server | `{ roomCode, token }` | Join a game room |
| `leaveRoom` | Client → Server | `{ roomCode, token }` | Leave a game room |
| `startGame` | Client → Server | `{ roomCode, civilians, undercovers, mrWhite }` | Start game with role configuration |
| `sendMessage` | Client → Server | `{ gameId, userId, message, roomCode }` | Send a chat message |
| `VoteIncrease` | Client → Server | `{ roomCode, To, currentUserId }` | Cast a vote against a player |
| `playerJoined` | Server → Client | `{ roomData }` | Broadcast when a player joins |
| `startGameSuccess` | Server → Client | `{ game }` | Game started with roles assigned |
| `PlayerEliminated` | Server → Client | `{ roles }` | A player has been voted out |
| `GameOver` | Server → Client | `{ winCondition }` | Game ended — CivilianWin / UndercoverWin / MrWhiteWin |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Guidelines
- Follow TypeScript strict mode conventions
- Write meaningful commit messages
- Ensure all existing functionality works before submitting
- Add comments for complex logic

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.

---

<p align="center">
  <strong>Built with ❤️ by <a href="https://github.com/Tanveer-rajpurohit">Tanveer Rajpurohit</a></strong>
</p>

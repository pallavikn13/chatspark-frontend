# ChatSpark - Full-Stack AI Chatbot

ChatSpark is a full-stack AI Chatbot application for CSE developers and students. It features a React (Vite / TanStack) single-page frontend, a Java 21 Spring Boot 3.x backend, PostgreSQL database persistence, JWT authentication, and Google Gemini AI API integration.

---

## Tech Stack & Architecture

```text
React Frontend (Vite + TailwindCSS + TanStack Router)
             │
             ▼ REST API (JWT Bearer Token)
Spring Boot 3.x Backend (Java 21, Spring Security, JPA)
        │                      │
        ▼                      ▼
  PostgreSQL 16         Google Gemini AI API
 (Database)            (LLM Integration)
```

- **Frontend**: React 19, TypeScript, Vite, TanStack Router, TanStack Query, TailwindCSS v4, Lucide Icons
- **Backend**: Java 21, Spring Boot 3.4.x, Spring Web, Spring Data JPA, Spring Security, BCrypt, JJWT 0.12.6
- **Database**: PostgreSQL 16/18
- **AI Engine**: Google Gemini API (`gemini-2.5-flash` / `gemini-1.5-flash`)

---

## Environment Variables

Copy `.env.example` to `.env` or set the following environment variables:

```ini
# Backend Environment Variables
SERVER_PORT=8080
DATABASE_URL=jdbc:postgresql://localhost:5432/chatspark
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
JPA_DDL_AUTO=update
JWT_SECRET=404E635266556A586E3272357538782F413F4428472B4B6250655368566D5971
JWT_EXPIRATION_MS=86400000
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000,http://localhost:8080

# Frontend Environment Variables
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## How to Run the Application

### Option A: Using Native PostgreSQL (Recommended for Windows)

Since PostgreSQL is already installed and running natively on Windows:

1. **The database `chatspark` is already created!** You do not need to run Docker or type SQL commands.
2. **Start Backend**:
   ```powershell
   cd backend
   java -jar target/backend-0.0.1-SNAPSHOT.jar
   ```
3. **Start Frontend** (in a new terminal):
   ```powershell
   npm run dev
   ```

---

### Option B: Using Docker (If Native PostgreSQL is stopped)

If you stop native PostgreSQL and want to run via Docker:

1. **Start Database via Docker**:
   ```bash
   docker compose up -d
   ```
2. **Start Backend**:
   ```powershell
   cd backend
   java -jar target/backend-0.0.1-SNAPSHOT.jar
   ```
3. **Start Frontend**:
   ```powershell
   npm run dev
   ```

---

## REST API Endpoints

### Authentication APIs
- `POST /api/auth/register` - Register a new user (`fullName`, `email`, `password`)
- `POST /api/auth/login` - Authenticate user (`email`, `password`) -> Returns JWT token & User
- `GET  /api/auth/me` - Fetch authenticated user profile (`Authorization: Bearer <token>`)

### Conversation APIs
- `GET    /api/conversations` - List current user's conversations
- `POST   /api/conversations` - Create new conversation (`title`)
- `GET    /api/conversations/{id}` - Fetch single conversation
- `PUT    /api/conversations/{id}` - Update conversation title
- `DELETE /api/conversations/{id}` - Delete conversation & associated messages

### Message & Chat APIs
- `GET  /api/conversations/{id}/messages` - List messages in conversation
- `POST /api/conversations/{id}/messages` - Send user message (`content`), generates AI response via Gemini, persists both, and auto-updates title on initial prompt.

---

## Test Credentials

```text
Email:    pallavi@example.com
Password: password123
```

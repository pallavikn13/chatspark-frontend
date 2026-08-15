# Chat Companion UI

Build the frontend implementation of my AI Chatbot project based on the attached Stitch UI/UX design.

The Stitch design is the source of truth for the visual design. Recreate its layout, styling, spacing, colors, typography, components, and overall user experience as accurately as possible.

IMPORTANT

This task is ONLY for the frontend.

I will build the backend separately using Java + Spring Boot + PostgreSQL later.

Therefore:

Do NOT create a backend.

Do NOT create a database.

Do NOT add Supabase.

Do NOT add Firebase.

Do NOT add authentication services.

Do NOT create server-side APIs.

Do NOT add features that are not present in the Stitch design.

Do NOT redesign the application unnecessarily.

Do NOT add payments, subscriptions, admin panels, analytics, teams, social login, or other unrelated features.

Build the frontend so that I can easily connect it to my Java Spring Boot REST APIs later.

TECH STACK

Use:

React

TypeScript

Vite

Tailwind CSS

Modern reusable React components

Lucide React or another suitable icon library

Keep the code clean, modular and beginner-friendly.

APPLICATION

This is an AI Chatbot web application.

The main functionality should be:

Authentication UI

Create:

Login page

Register page

For now, authentication should be frontend-only/mock functionality.

Do NOT connect it to any external authentication provider.

Structure the code so that later I can replace the mock authentication with Java Spring Boot APIs.

Chat Dashboard

Implement the main chatbot interface shown in the Stitch design.

It should contain:

Sidebar

Application logo/name

New Chat button

Search conversations if present in the Stitch design

Conversation history

Conversation titles

Delete conversation option if present in the design

User profile section

Logout button

Main Chat Area

Chat header

Empty state when there is no conversation

User messages

AI messages

Message timestamps

AI avatar

User avatar

Loading/typing indicator

Message input area

Send button

Chat Functionality

Even though there is no backend yet, make the frontend interactive using local/mock state.

The user should be able to:

Create a new chat

Select an existing conversation

Send a message

See the message appear immediately

Display a realistic mock AI response

See the AI typing/loading state

Switch between conversations

Delete conversations if included in the design

Clear/reset the current chat where appropriate

Do NOT pretend that the AI response is actually coming from an AI API.

Use mock responses temporarily.

BACKEND-READY ARCHITECTURE

Design the frontend data structure around these simple concepts:

User
Conversation
Message


Example:

User
 └── Conversations
      └── Messages


Create a clean service/API layer such as:

src/
├── components/
├── pages/
├── layouts/
├── services/
├── hooks/
├── types/
├── utils/
└── data/


Create placeholder service functions for future backend integration, for example:

authService
chatService
conversationService


These should currently use mock/local data.

Later I should be able to replace:

mock API


with:

Java Spring Boot REST API


without rewriting the UI components.

FUTURE JAVA BACKEND API

Do not implement these APIs now.

However, keep the frontend structure compatible with APIs such as:

POST   /api/auth/register
POST   /api/auth/login

GET    /api/conversations
POST   /api/conversations
GET    /api/conversations/{id}
DELETE /api/conversations/{id}

GET    /api/conversations/{id}/messages
POST   /api/conversations/{id}/messages


Do not make real network requests to these endpoints yet.

UI REQUIREMENTS

The final frontend must closely follow the attached Stitch design.

Pay special attention to:

Overall layout

Sidebar width

Header

Chat message positioning

Input box

Button shapes

Border radius

Typography

Font sizes

Spacing

Icons

Shadows

Backgrounds

Empty states

Responsive behavior

Mobile layout

Do not randomly change the Stitch design just because another design looks better.

If something is not specified in the Stitch design, choose the simplest professional solution rather than adding new functionality.

RESPONSIVENESS

Make the application fully responsive.

Desktop:

Sidebar visible

Large chat area

Tablet:

Adjust spacing and sidebar appropriately

Mobile:

Sidebar becomes a menu/drawer

Chat occupies the full screen

Message input remains accessible

Buttons remain touch-friendly

CODE QUALITY

Write clean production-quality frontend code.

Use:

Reusable components

TypeScript types

Proper React state management

Clear folder structure

No unnecessary dependencies

No duplicated components

No hard-coded repeated values where reusable constants are appropriate

Do not put the entire application inside one large component.

MOCK DATA

Use realistic mock data for demonstration.

Example:

Conversation:
"Learn Java Arrays"

User:
"Can you explain arrays in Java?"

AI:
"Sure! An array in Java is a collection of elements..."


Include several conversations so the sidebar looks realistic.

FINAL RESULT

The result should feel like a real, polished AI chatbot application, not a static UI prototype.

The frontend should:

Match the Stitch design closely.

Have working navigation.

Have working chat interactions using mock data.

Have responsive layouts.

Have clean React/TypeScript code.

Be easy to connect to a Java Spring Boot backend later.

Contain no unnecessary features or backend implementation.

Before finishing, verify that:

All buttons shown in the design work appropriately.

Navigation works.

Chat creation works.

Messages can be sent.

Mock AI responses appear.

Conversation switching works.

Responsive layout works.

There are no broken routes.

There are no console errors.

The application builds successfully.

Most important: Treat the attached Stitch design as the visual source of truth. Do not add unnecessary functionality. Build the frontend effectively and make it beautiful while keeping it simple and backend-ready for my future Java Spring Boot implementation.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/395c852d-d7d7-41b9-be1e-8deac1d99a06).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

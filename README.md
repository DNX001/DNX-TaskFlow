<div align="center">

# DNX TaskFlow

**Organise your work. Prioritise what matters. Finish strong.**

A polished full-stack MERN task management application built with React, Node.js, Express and MongoDB Atlas.

</div>

---

## Overview

DNX TaskFlow is a focused productivity application that demonstrates a complete full-stack workflow: a React frontend communicates with an Express REST API, which validates requests and persists task data in MongoDB Atlas through Mongoose.

The project was developed feature-by-feature with an emphasis on planning, validation, testing, readable code, safe secret handling, version control and deployment readiness.

## Features

- Create tasks with **Low**, **Medium** or **High** priority
- Reject empty and whitespace-only task titles
- View tasks stored persistently in MongoDB Atlas
- Display newest tasks first
- Filter tasks by priority
- Mark individual tasks as complete
- Mark all pending tasks as complete
- Clear visual distinction between pending and completed tasks
- **System / Light / Dark** appearance modes
- Theme preference persisted with `localStorage`
- Responsive layout for desktop and smaller screens
- Loading, success and error states in the UI
- Backend validation for invalid priorities and MongoDB ObjectIds

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19, Vite |
| Backend | Node.js, Express 5 |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| Styling | Custom CSS |
| API Testing | Thunder Client |
| Version Control | Git & GitHub |
| Environment Variables | dotenv |

## Architecture

```text
Browser
  │
  ▼
React + Vite frontend
  │  HTTP / JSON
  ▼
Express REST API
  │
  ▼
Mongoose
  │
  ▼
MongoDB Atlas
```

The frontend is responsible for user interaction and presentation. The Express backend owns validation and API behavior, while Mongoose handles the application's MongoDB data model.

## Project Structure

```text
DNX-TaskFlow/
├── backend/
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── tasks.js
│   ├── server.js
│   ├── package.json
│   └── .gitignore
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── AddTaskForm.jsx
    │   │   └── TaskList.jsx
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

> The backend `.env` file and `node_modules` directories are intentionally excluded from version control.

## Task Data Model

Each task is stored as a MongoDB document with the following fields:

```js
{
  title: String,
  priority: "Low" | "Medium" | "High",
  completed: Boolean,
  createdAt: Date
}
```

Defaults:

- `priority` → `"Medium"`
- `completed` → `false`
- `createdAt` → current date/time

## REST API

Base path:

```text
/api/tasks
```

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/tasks` | Fetch all tasks |
| `GET` | `/api/tasks?priority=High` | Filter tasks by priority |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/complete-all` | Mark all pending tasks complete |
| `PUT` | `/api/tasks/:id/complete` | Mark one task complete |

### Example: create a task

```http
POST /api/tasks
Content-Type: application/json
```

```json
{
  "title": "Prepare project documentation",
  "priority": "High"
}
```

Example successful response:

```json
{
  "message": "Task created successfully.",
  "task": {
    "title": "Prepare project documentation",
    "priority": "High",
    "completed": false
  }
}
```

## Validation & Edge Cases

The backend explicitly handles cases such as:

- missing task titles
- whitespace-only titles
- invalid priorities
- malformed MongoDB ObjectIds
- nonexistent task IDs
- attempts to complete an already-completed task
- filters with no matching tasks

For example, an unsupported priority returns a `400 Bad Request` instead of being silently accepted.

## Getting Started Locally

### Prerequisites

Make sure you have:

- Node.js
- npm
- Git
- a MongoDB Atlas account and cluster

### 1. Clone the repository

```bash
git clone https://github.com/DNX001/DNX-TaskFlow.git
cd DNX-TaskFlow
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```

Never commit the `.env` file or your MongoDB credentials.

Start the backend:

```bash
npm run dev
```

The API should run at:

```text
http://localhost:5000
```

A successful root request returns:

```text
DNX TaskFlow API is running
```

### 3. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The development frontend runs at:

```text
http://localhost:5173
```

## Testing Workflow

The application was tested incrementally rather than only after completion.

Examples of verified cases include:

- valid task creation
- empty title rejection
- whitespace-only title rejection
- invalid priority rejection
- fetching all tasks
- filtering by Low / Medium / High
- empty filter results
- valid task completion
- invalid task ID handling
- already-completed task handling
- frontend task creation and automatic list refresh
- individual and bulk completion
- light, dark and system theme behavior

## Security Notes

- MongoDB credentials are stored only in `.env`
- `.env` is excluded with `.gitignore`
- `node_modules` is not committed
- Database inputs are validated before persistence
- MongoDB ObjectIds are validated before lookup

For a production system, additional measures such as authentication, authorization, restricted CORS origins, rate limiting and stricter deployment-level security would be appropriate.

## Deployment

The project is designed for a split deployment:

```text
Public React frontend
        │
        ▼
Public Express backend
        │
        ▼
MongoDB Atlas
```

The backend can be deployed as a Render Web Service and the frontend as a Render Static Site. Public deployment URLs can be added here once deployment is complete.

## Development Approach

The project was built in small, testable slices:

```text
Understand → Plan → Implement → Inspect → Run → Test → Debug → Improve → Verify
```

Meaningful Git commits were created after tested feature milestones instead of committing the entire application only at the end.

## Possible Future Improvements

- task deletion and editing
- due dates
- search
- categories/tags
- authentication and per-user task lists
- pagination
- automated tests
- accessibility audit
- production CORS restrictions

## Author

**Debjyoti Nath (DNX)**

GitHub: [@DNX001](https://github.com/DNX001)

---

<div align="center">

Built as a full-stack MERN project with an emphasis on correctness, testing, usability and clean engineering practices.

</div>

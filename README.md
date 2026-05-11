# Team Task Manager

A full-stack MERN application for managing team projects, tasks, and collaboration with role-based access control.

---

## Live Demo

### Frontend
https://team-task-manager-alpha-six.vercel.app

### Backend
https://team-task-manager-production-2949.up.railway.app

---

## Features

### Authentication
- User Signup & Login
- JWT Authentication
- Protected Routes
- Persistent Login

### Project Management
- Create Projects
- View Projects
- Delete Projects
- Team Collaboration

### Task Management
- Create Tasks
- Update Task Status
- Delete Tasks
- Overdue Task Detection
- Task Filtering & Search

### Team Management
- Add Members to Projects
- Team Member Display
- Role-Based Access Control

### Dashboard
- Total Projects
- Total Tasks
- Overdue Tasks
- Recent Tasks Overview

---

## Test Credentials

### Admin Account

Email:
```bash
admin@test.com
```

Password:
```bash
admin123
```

This account has ADMIN access and can:
- Create Projects
- Add Members
- Create Tasks
- Delete Tasks
- Delete Projects

---

### Member Account

You can create a new account using the signup page to test MEMBER functionality.

---

## Role-Based Access Control

### ADMIN
- Create Projects
- Delete Projects
- Add Members
- Create Tasks
- Delete Tasks

### MEMBER
- View Projects
- View Tasks
- Update Task Status

---

## Admin Access Note

By default, all newly registered users are assigned the `MEMBER` role.

To manually create an ADMIN account:

1. Open MongoDB Atlas
2. Go to the `users` collection
3. Update the user's role field:

```json
"role": "ADMIN"
```

4. Save changes
5. Logout and login again

This approach was intentionally used to avoid public admin registration and maintain secure role management.

---

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Deployment
- Frontend: Vercel
- Backend: Railway
- Database: MongoDB Atlas

---

## Installation

### Clone Repository

```bash
git clone YOUR_GITHUB_REPO_URL
```

---

## Backend Setup

```bash
cd server
npm install
npm run dev
```

Create `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

---

## API Routes

### Auth
- POST `/api/auth/signup`
- POST `/api/auth/login`

### Projects
- GET `/api/projects`
- POST `/api/projects`
- DELETE `/api/projects/:id`

### Tasks
- GET `/api/tasks`
- POST `/api/tasks/:projectId`
- PUT `/api/tasks/:taskId`
- DELETE `/api/tasks/:taskId`

---

## Folder Structure

```bash
client/
server/
```

---

## Deployment

### Frontend
Deployed using Vercel.

### Backend
Deployed using Railway.

### Database
MongoDB Atlas.

---

## Future Improvements

- Task Assignment System
- Activity Logs
- Notifications
- Drag & Drop Tasks
- File Attachments

---

## Author

Vaibhav Dhiman

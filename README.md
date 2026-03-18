# Task Management API

A secure backend REST API for task and workflow management with JWT authentication and role-based access control.

## ✅ Tech Stack

- Node.js + Express
- Sequelize ORM + MySQL
- JWT authentication
- bcrypt password hashing
- Zod input validation

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js 18+ (recommended)
- npm (comes with Node.js)
- MySQL server running locally (or a hosted MySQL instance)

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env` file in the project root (see next section).

### 3) Run database migrations + seed data

```bash
# Run migrations
npx sequelize-cli db:migrate

# Seed initial admin user (admin@example.com / admin123)
npx sequelize-cli db:seed:all
```

### 4) Start the server

```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

---

## 🛠️ Environment Variables

Create a `.env` file in the project root with the following values:

```env
PORT=5000
JWT_SECRET=your_jwt_secret_here

DB_HOST=127.0.0.1
DB_PORT=3306
DB_DIALECT=mysql
DB_DATABASE=local
DB_USERNAME=root
DB_PASSWORD=
```

> 💡 `JWT_SECRET` must be a long, random string in production.

---

## 🗄️ Database Setup & Migration

The project uses Sequelize CLI for migrations and seeders.

1) Make sure your database exists (e.g., `local`).
2) Run migrations:

```bash
npx sequelize-cli db:migrate
```

3) Seed initial data (creates an admin user):

```bash
npx sequelize-cli db:seed:all
```

---

## 📡 API Usage

All authenticated endpoints require the header:

```
Authorization: Bearer <token>
```

### 🔐 Authentication

#### POST /api/auth/login

Request body:

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

Response includes a JWT token for authenticated requests.

---

### ✅ Tasks Endpoints

> All task endpoints require `Authorization: Bearer <token>`.

#### POST /api/tasks — Create task (ADMIN only)

Request body example:

```json
{
  "title": "Fix login bug",
  "description": "Optional description",
  "priority": "HIGH",
  "status": "PENDING",
  "assignedTo": "<user-uuid>",
  "dueDate": "2025-12-31T00:00:00.000Z"
}
```

#### GET /api/tasks — List tasks

Query params: `page`, `limit`, `status`, `priority`

- ADMIN sees all tasks
- USER sees only assigned tasks

#### GET /api/tasks/:id — Get task by ID

- ADMIN: any task
- USER: only tasks assigned to them

#### PUT /api/tasks/:id — Update task

- ADMIN: can update all fields
- USER: can update only `status`

#### DELETE /api/tasks/:id — Delete task (ADMIN only)

---

## 🔐 Authorization Matrix

| Role  | Create | List          | Get           | Update              | Delete |
|-------|--------|---------------|---------------|---------------------|--------|
| ADMIN | ✅     | All tasks     | Any task      | All fields          | ✅     |
| USER  | ❌     | Assigned only | Assigned only | `status` field only | ❌     |

### Common HTTP Status Codes

- `401 Unauthorized` — missing or invalid JWT
- `403 Forbidden` — valid JWT but insufficient permissions
- `404 Not Found` — resource not found

---

## 🧪 Notes

- The seeded admin user is `admin@example.com` / `admin123`.
- Use `POST /api/auth/login` to obtain a JWT and include it in the `Authorization` header for all secure routes.

# Task Management API

A secure backend REST API for task and workflow management with JWT authentication and role-based access control.

## Tech Stack

- Node.js + Express
- Sequelize ORM + MySQL
- JWT authentication
- bcrypt password hashing
- Zod input validation

---

## Setup Instructions

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root:

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

---

## Database Setup & Migration

```bash
# Run migrations
npx sequelize-cli db:migrate

# Seed initial admin user (admin@example.com / admin123)
npx sequelize-cli db:seed:all
```

---

## Running the Server

```bash
# Development
npm run dev

# Production
npm start
```

---

## API Usage

### Authentication

#### POST /api/auth/login
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```
Returns a JWT token. Use it as `Authorization: Bearer <token>` on all other requests.

---

### Tasks

All task endpoints require `Authorization: Bearer <token>` header.

#### POST /api/tasks — Create task (ADMIN only)
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
- USER sees only their assigned tasks

#### GET /api/tasks/:id — Get task by ID
- ADMIN: any task
- USER: only assigned tasks

#### PUT /api/tasks/:id — Update task
- ADMIN: can update all fields
- USER: can only update `status`

#### DELETE /api/tasks/:id — Delete task (ADMIN only)

---

## Authorization

| Role  | Create | List          | Get           | Update              | Delete |
|-------|--------|---------------|---------------|---------------------|--------|
| ADMIN | ✅     | All tasks     | Any task      | All fields          | ✅     |
| USER  | ❌     | Assigned only | Assigned only | `status` field only | ❌     |

HTTP status codes:
- `401 Unauthorized` — missing or invalid JWT
- `403 Forbidden` — valid JWT but insufficient role/ownership

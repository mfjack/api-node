# 🚀 Task Management API

A complete REST API for user and task management, built with **Node.js**, **TypeScript**, **Prisma** and **PostgreSQL**.

## 📋 Features

### 👥 Users

- ✅ Create user
- ✅ List all users
- ✅ Get user by ID
- ✅ Update user
- ✅ Delete user

### 📝 Tasks

- ✅ Create task for a user
- ✅ List all tasks
- ✅ Get task by ID
- ✅ Update task (status, title, description)
- ✅ Delete task
- ✅ List tasks from a specific user

## 🛠️ Technologies

- **Node.js** - JavaScript runtime
- **TypeScript** - Static typing
- **Express** - Web framework
- **Prisma** - ORM and query builder
- **PostgreSQL** - Database
- **Zod** - Data validation
- **TSX** - TypeScript execution

## 📁 Project Structure

```
src/
├── config/         # Configurations (database)
├── controllers/    # Route controllers
├── middlewares/    # Middlewares (validation)
├── routes/         # Route definitions
├── schemas/        # Validation schemas (Zod)
├── services/       # Business logic
├── types/          # TypeScript interfaces
└── server.ts       # Application entry point
```

## ⚡ How to Run the Project

### 📋 Prerequisites

- **Node.js** (version 18+ recommended)
- **PostgreSQL** (local or remote)
- **Git**

### 🚀 Installation

1. **Clone the repository**

```bash
git clone <your-repository-url>
cd project
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure the database**
   - Create an `.env` file in the project root
   - Add your PostgreSQL connection string:

**Para PostgreSQL local:**

```bash
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
```

**Para Neon DB (recomendado):**

```bash
DATABASE_URL="postgresql://username:password@ep-xxxxx-pooler.sa-east-1.aws.neon.tech/database?sslmode=require&channel_binding=require"
```

> ⚠️ **Replace** `username`, `password`, `ep-xxxxx` and `database` with your actual data

4. **Run database migrations**

```bash
npx prisma migrate dev
```

5. **Generate Prisma client**

```bash
npx prisma generate
```

6. **Start the server**

```bash
npm run dev
```

The server will be running at `http://localhost:3000` 🎉

## 📚 API Documentation

### 👥 Usuários

| Method   | Endpoint           | Description          |
| -------- | ------------------ | -------------------- |
| `POST`   | `/users`           | Create user          |
| `GET`    | `/users`           | List users           |
| `GET`    | `/users/:id`       | Get user by ID       |
| `PUT`    | `/users/:id`       | Update user          |
| `DELETE` | `/users/:id`       | Delete user          |
| `GET`    | `/users/:id/tasks` | List user tasks      |
| `POST`   | `/users/:id/tasks` | Create task for user |

### 📝 Tarefas

| Method   | Endpoint     | Description    |
| -------- | ------------ | -------------- |
| `GET`    | `/tasks`     | List all tasks |
| `GET`    | `/tasks/:id` | Get task by ID |
| `PUT`    | `/tasks/:id` | Update task    |
| `DELETE` | `/tasks/:id` | Delete task    |

### 📄 Usage Examples

#### Create User

```bash
POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@email.com"
}
```

#### Create Task for User

```bash
POST /users/:userId/tasks
Content-Type: application/json

{
  "title": "Study TypeScript",
  "description": "Learn Zod validation"
}
```

#### Update Task Status

```bash
PUT /tasks/:taskId
Content-Type: application/json

{
  "status": "done"
}
```

## ⚙️ Available Scripts

- `npm run dev` - Start server in development mode
- `npx prisma studio` - Open visual database interface
- `npx prisma migrate dev` - Run migrations
- `npx prisma generate` - Generate Prisma client

## 🏗️ Architecture

The project follows **Clean Architecture** principles with clear separation of responsibilities:

- **Controllers**: Receive HTTP requests and return responses
- **Services**: Contain business logic
- **Middlewares**: Validation and request processing
- **Types**: TypeScript definitions for type safety
- **Schemas**: Data validation with Zod

## 🔒 Validations

- **Users**: Name (minimum 2 characters) and valid email
- **Tasks**: Required title, optional description, status enum
- **Middlewares**: Automatic validation with detailed error responses

## 🗄️ Database

### Data Model

```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
  tasks     Task[]
}

model Task {
  id          String   @id @default(uuid())
  title       String
  description String?
  status      String   @default("pending")
  userId      String
  createdAt   DateTime @default(now())
  user        User     @relation(fields: [userId], references: [id])
}
```

## 🚀 Deploy

For production deployment:

1. Configure environment variables in your provider
2. Run `npx prisma migrate deploy`
3. Start with `npm start` (add script if needed)

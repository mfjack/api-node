# 🚀 Task Management API

Uma API REST completa para gerenciamento de usuários e tarefas, construída com **Node.js**, **TypeScript**, **Prisma** e **PostgreSQL**.

## 📋 Funcionalidades

### 👥 Usuários

- ✅ Criar usuário
- ✅ Listar todos os usuários
- ✅ Buscar usuário por ID
- ✅ Atualizar usuário
- ✅ Deletar usuário

### 📝 Tarefas

- ✅ Criar tarefa para um usuário
- ✅ Listar todas as tarefas
- ✅ Buscar tarefa por ID
- ✅ Atualizar tarefa (status, título, descrição)
- ✅ Deletar tarefa
- ✅ Listar tarefas de um usuário específico

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Tipagem estática
- **Express** - Framework web
- **Prisma** - ORM e query builder
- **PostgreSQL** - Banco de dados
- **Zod** - Validação de dados
- **TSX** - Execução TypeScript

## 📁 Estrutura do Projeto

```
src/
├── config/         # Configurações (database)
├── controllers/    # Controladores das rotas
├── middlewares/    # Middlewares (validação)
├── routes/         # Definição das rotas
├── schemas/        # Schemas de validação (Zod)
├── services/       # Lógica de negócio
├── types/          # Interfaces TypeScript
└── server.ts       # Entrada da aplicação
```

## ⚡ Como Rodar o Projeto

### 📋 Pré-requisitos

- **Node.js** (versão 18+ recomendada)
- **PostgreSQL** (local ou remoto)
- **Git**

### 🚀 Instalação

1. **Clone o repositório**

```bash
git clone <url-do-seu-repositorio>
cd project
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure o banco de dados**
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione sua string de conexão PostgreSQL:

**Para PostgreSQL local:**

```bash
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
```

**Para Neon DB (recomendado):**

```bash
DATABASE_URL="postgresql://username:password@ep-xxxxx-pooler.sa-east-1.aws.neon.tech/database?sslmode=require&channel_binding=require"
```

> ⚠️ **Substitua** `username`, `password`, `ep-xxxxx` e `database` pelos seus dados reais

4. **Execute as migrações do banco**

```bash
npx prisma migrate dev
```

5. **Gere o cliente Prisma**

```bash
npx prisma generate
```

6. **Inicie o servidor**

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000` 🎉

## 📚 Documentação da API

### 👥 Usuários

| Método   | Endpoint           | Descrição                 |
| -------- | ------------------ | ------------------------- |
| `POST`   | `/users`           | Criar usuário             |
| `GET`    | `/users`           | Listar usuários           |
| `GET`    | `/users/:id`       | Buscar usuário por ID     |
| `PUT`    | `/users/:id`       | Atualizar usuário         |
| `DELETE` | `/users/:id`       | Deletar usuário           |
| `GET`    | `/users/:id/tasks` | Listar tarefas do usuário |
| `POST`   | `/users/:id/tasks` | Criar tarefa para usuário |

### 📝 Tarefas

| Método   | Endpoint     | Descrição               |
| -------- | ------------ | ----------------------- |
| `GET`    | `/tasks`     | Listar todas as tarefas |
| `GET`    | `/tasks/:id` | Buscar tarefa por ID    |
| `PUT`    | `/tasks/:id` | Atualizar tarefa        |
| `DELETE` | `/tasks/:id` | Deletar tarefa          |

### 📄 Exemplos de Uso

#### Criar Usuário

```bash
POST /users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com"
}
```

#### Criar Tarefa para Usuário

```bash
POST /users/:userId/tasks
Content-Type: application/json

{
  "title": "Estudar TypeScript",
  "description": "Aprender validação com Zod"
}
```

#### Atualizar Status da Tarefa

```bash
PUT /tasks/:taskId
Content-Type: application/json

{
  "status": "done"
}
```

## ⚙️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npx prisma studio` - Abre interface visual do banco
- `npx prisma migrate dev` - Executa migrações
- `npx prisma generate` - Gera cliente Prisma

## 🏗️ Arquitetura

O projeto segue os princípios de **Clean Architecture** com separação clara de responsabilidades:

- **Controllers**: Recebem requests HTTP e retornam responses
- **Services**: Contêm a lógica de negócio
- **Middlewares**: Validação e processamento de requests
- **Types**: Definições TypeScript para type safety
- **Schemas**: Validação de dados com Zod

## 🔒 Validações

- **Usuários**: Nome (mínimo 2 caracteres) e email válido
- **Tarefas**: Título obrigatório, descrição opcional, status enum
- **Middlewares**: Validação automática com retorno de erros detalhados

## 🗄️ Banco de Dados

### Modelo de Dados

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

Para deploy em produção:

1. Configure as variáveis de ambiente no seu provedor
2. Execute `npx prisma migrate deploy`
3. Inicie com `npm start` (adicionar script se necessário)

---

**Desenvolvido com ❤️ usando as melhores práticas de desenvolvimento**

# Gerenciador de Contatos - API

API RESTful em **Node.js**, **Express**, **TypeScript** e **Prisma** para gerenciar usuários, posts e comentários.

---

## Tecnologias

- Node.js | TypeScript | Express | Prisma (PostgreSQL)
- Zod (validação) | Cors & Helmet (segurança)

---

## Instalação

```bash
git clone https://github.com/VitorHBS/gerenciador-contatos.git
cd gerenciador-contatos
npm install
```

Crie o arquivo `.env` baseado em `.env.example`:

```env
PORT=3000
DATABASE_URL="postgresql://<usuario>:<senha>@<host>:<porta>/<nome_do_banco>?schema=public"
```

Rode as migrations:

```bash
npx prisma migrate dev --name init
```

Inicie a aplicação:

```bash
npm run dev
```

---

## Rotas Principais

- **Usuários**
  - `POST /user` → cria usuário
  - `GET /users` → lista todos
  - `GET /user/:id` → consulta por ID
  - `PUT /user/:id` → atualiza
  - `DELETE /user/:id` → remove

- **Posts**
  - `POST /user/:id/post` → cria post
  - `GET /posts` → lista todos
  - `DELETE /post/:postId` → remove post

- **Comentários**
  - `POST /user/:userId/post/:postId` → cria comentário
# 📊 Fastify API - Gerenciamento de Metas

API desenvolvida com **Fastify**, utilizando **Zod** para validação de dados e documentação automatizada via **Swagger**.

## 🚀 Funcionalidades

- Criar, listar e deletar metas.
- Validação de dados com **Zod**.
- Documentação automática com **Swagger/OpenAPI**.

## 🛠️ Tecnologias Utilizadas

- **Node.js**
- **Fastify**
- **Zod** (validação de esquemas)
- **Swagger** (documentação automatizada)
- **Drizzle ORM** (manipulação de banco de dados)
- **PostgreSQL**
- **Docker** (containerização)


## 📚 Requisitos

- Node.js v18 ou superior
- PostgreSQL

## 📦 Como Executar o Projeto

### 1. Clone o repositório

```bash
$ git clone https://github.com/HenriqMarxs/API-Gerenciamento-de-tarefas.git
$ cd seu-repositorio
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DATABASE_URL=postgres://usuario:senha@localhost:5432/seu_banco
PORT=3000
```

### 3. Instale as dependências

```bash
$ npm install
# ou
$ yarn install
```
### 4. Execute as migrações do banco de dados

```bash
$ docker compose up -d --biuld
```

### 5. Execute as migrações do banco de dados

```bash
$ npm run migrate
```

### 6. Inicie o servidor

```bash
$ npm run dev
```

A API estará disponível em: [http://localhost:3000](http://localhost:3000)

## 📖 Documentação da API (Swagger)

Após iniciar o servidor, acesse a documentação interativa do Swagger em:

👉 [http://localhost:3000/docs](http://localhost:3000/docs)

## 📌 Exemplos de Rotas

### ➤ Deletar uma meta

**Rota:** `DELETE /delete-goal`

**Request Body:**

```json
{
  "goalId": "id_da_meta"
}
```

**Respostas:**

- `200 OK`: Meta deletada com sucesso
- `400 Bad Request`: Erro ao deletar a meta (ex: goalId inválido)
- `500 Internal Server Error`: Erro interno do servidor



## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para utilizá-lo e aprimorá-lo!

---

💡 \*\*Desenvolvido por \*\*[**Henrique Marques**](https://github.com/HenriqMarxs)


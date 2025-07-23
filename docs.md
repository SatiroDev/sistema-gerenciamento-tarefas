# 📄 Documentação da API - TaskManagement 

## 📦 Versão

- Versão da API: 1.0

- Status: Estável

- Última atualização: 23 Julho de 2025

## 🔐 Autenticação

Algumas rotas exigem que o usuário esteja autenticado usando um token JWT.

Após fazer o login com sucesso (`POST /login`), a resposta incluirá um `token` e um `refreshToken`.

Você deve enviar o `token` no **cabeçalho (header)** das requisições autenticadas, da seguinte forma:

- Authorization: Bearer <seu_token_aqui>

### 🔄 Refresh Token

Quando o token expira, você pode usar o `refreshToken` para obter um novo.


---
## 📌 Rotas relacionadas ao usuário

### POST /register
```plaintext
POST | http://localhost:3000/register
```
- Descrição: rota que serve para registrar um usuário

---
- **📥 Exemplo de requisição válida**
```json
{
    "name": "fulano de tal",
    "email": "fulano@gmail.com",
    "password": "fulanin"
}
```

- ✅ **Resposta - 201 Created**

```json
{
    "error": false,
    "message": "Usuário criado com sucesso!",
    "createdUser": {
        "id": 1,
        "name": "fulano de tal",
        "email": "fulano@gmail.com"
    }
}
```
---
- **⚠️ Exemplo de requisição com erro**
```json
{
    "name": "exemplo",
    "email": "exemplo@gmail.com",
    "password": "senh"
}
```

- **❌ Resposta - 400 Bad Request**
```json
{
    "error": true,
    "message": "\"password\" length must be at least 5 characters long"
}
```
- Motivo do erro: senha tem que ter no mínimo 5 caracteres

### 💥 Quando essa rota pode retornar erro?

- **Email já existe** (emails não podem se repetir, cada usuário tem o seu próprio)
- **Email com o formato errado**
- **Senha tem menos de 5 caracteres**
- **Nome tem menos de 3 caracteres**
- **Algum campo é deixado em branco**
---

### POST /login

```json
POST | http://localhost:3000/login
```
- Descrição: rota que serve para o usuário fazer login


---
- **📥 Exemplo de requisição válida**
```json
{
    "email": "fulano@gmail.com",
    "password": "fulanin"
}
```
- ✅ **Resposta - 200 OK**

```json
{
    "error": false,
    "message": "Login realizado com sucesso!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzUzMjMyNzY5LCJleHAiOjE3NTMyMzk5Njl9.XlczqmTmqCAAyew-Dw_L8WIeJarCZJm6bWt6jLsGb7o",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzUzMjMyNzY5LCJleHAiOjE3NTMyNTc5Njl9.f1NB816jGRxWI8RDGyFCLQtN9ejRlt_sUwbEl_6KEUo"
}
```
- ⚠️ **Atenção:** Dar certo se o usuário com o email e senha já estiver registrado!

---
- **🚫 Exemplo de requisição com erro**
```json
{
    "email": "naoexiste@gmail.com",
    "password": "senha123"
}
```

- **❌ Resposta - 404 Not Found**
```json
{
    "error": true,
    "message": "Usuário com o email 'naoexiste@gmail.com' não encontrado!"
}
```

### 💥 Quando essa rota pode retornar erro?

- **Email informado não pertence a nenhum usuário**
- **Senha incorreta**
- **Algum campo é deixado em branco**

---
---
## 📌 Rota refresh

### POST /refresh
```json
POST | http://localhost:3000/refresh
```
- Descrição: rota que serve para o usuário receber um novo token, sem precisar fazer login novamente toda vez que o token expirar

---
- **📥 Exemplo de requisição válida**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzUzMjgxNjM2LCJleHAiOjE3NTMzMDY4MzZ9.Ydr7IikL66KKGhhQN1zhl00D8lqjxn9o4IEwpjv5czg"
}
```

- ✅ **Resposta - 201 Created**

```json
{
    "error": false,
    "message": "Novo token criado com sucesso!",
    "newToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzUzMjgxODI3LCJleHAiOjE3NTMyODkwMjd9.0ryscFsrOudIsYCluqaqY8kD4eyGLIjvsVrWAq-Vkm4"
}
```
---
- **⚠️ Exemplo de requisição com erro**
```json
{
    "refreshToken": "refreshAleatorioParaBurlarOSistema"
}
```

- **❌ Resposta - 403 Forbidden**
```json
{
    "error": true,
    "message": "Refresh token expirado ou inválido!"
}
```
- Motivo do erro: o refresh token não foi o que veio depois que o usuário fez login

### 💥 Quando essa rota pode retornar erro?

- **refresh token é preenchido com outra informação sem ser o refresh certo (o que vem depois do login)**
- **o campo refreshToken é deixando em branco**
---


## 📌 Rotas relacionadas as tarefas
- **Requisitos para funcionar:** Usuário tem que está **autenticado com token válido!**

### POST /task

```json
POST | http://localhost:3000/task
```
- Descrição: rota que serve para registrar uma tarefa


---
- **📥 Exemplo de requisição válida**
```json
{
    "title": "Estudar",
    "description": "Estudar programação",
    "status": "em andamento"
}
```

- ✅ **Resposta - 201 Created**

```json
{
    "error": false,
    "message": "Tarefa criada com sucesso!",
    "createdTask": {
        "id": 1,
        "title": "Estudar",
        "description": "Estudar programação",
        "status": "em andamento",
        "idUser": 1
    }
}
```

- ⚠️ **Atenção:** Pode tirar o status, e preencher so title e description, status será "pendente" automáticamente

---
- **🚫 Exemplo de requisição com erro**
```json
{
    "title": "exemplo",
    "description": "exemplo123",
    "status": "aleatório"
}
```

- **❌ Resposta - 400 Bad Request**
```json
{
    "error": true,
    "message": "Data truncated for column 'status' at row 1"
}
```
- Motivo do erro: status pode so ser preenchido com "pendente", "em andamento" ou "concluido"

### 💥 Quando essa rota pode retornar erro?

- **Status é preenchido sem ser ("pendente", "em andamento", ou "concluido")** 
- **title tem menos de 3 caracteres**
- **description tem menos de 3 caracteres**
- **title ou description é deixado em branco**
---


### GET /task

```json
GET | http://localhost:3000/task
```

- Descrição: rota que serve para mostrar tarefas do usuário (não precisa de body, usa somente a URL)

- **📥 Caso o usuário possua tarefas cadastradas**
---

- ✅ **Resposta - 200 OK**

```json
{
    "error": false,
    "message": "Tarefa(s) do usuário com o ID '1' encontrada(s)!",
    "taskOfUser": [
        {
            "idTask": 1,
            "title": "Test funcionando!",
            "description": "falta somente o README!!",
            "status": "pendente",
            "idUser": 1,
            "creationDate": "2025-07-23T12:57:14.000Z"
        },
        {
            "idTask": 2,
            "title": "Estudar",
            "description": "Estudar programação",
            "status": "em andamento",
            "idUser": 1,
            "creationDate": "2025-07-23T12:57:50.000Z"
        }
    ]
}
```


---
- **⚠️ Caso o usuário ainda não tenha nenhuma tarefa cadastrada**


- ✅ **Resposta - 200 OK**
```json
{
    "error": false,
    "message": "Usuário com o ID '5' não tem nenhuma tarefa adicionada!"
}
```
---



### PUT /task/:id
```json
PUT | http://localhost:3000/task/2
```
- Descrição: rota que serve para editar uma tarefa já existente pelo ID!

---
- **📥 Exemplo de requisição válida**
```json
{
    "title": "Docs",
    "description": "Finalizar o docs",
    "status": "em andamento"
}
```

- ✅ **Resposta - 200 OK**

```json
{
    "error": false,
    "message": "Alterações feitas com sucesso!",
    "fieldsChanged": [
        "title",
        "description"
    ]
}
```
---
- **🚫 Exemplo de requisição com erro**
```json
{
    "title": "e",
    "description": "exemplo321",
    "status": "em andamento"
}
```

- **❌ Resposta - 400 Bad Request**
```json
{
    "error": true,
    "message": "\"title\" length must be at least 3 characters long"
}
```
- Motivo do erro: title tem menos de 3 caracteres

### 💥 Quando essa rota pode retornar erro?

- **Status é preenchido sem ser ("pendente", "em andamento", ou "concluido")** 
- **title tem menos de 3 caracteres**
- **description tem menos de 3 caracteres**
---

### DELETE /task/:id
```json
DELETE | http://localhost:3000/task/2
```
- Descrição: rota que serve para deletar uma tarefa já existente pelo ID! Não precisa de body usa somente a URL

---

- **📥 Se o usuário tiver tarefa adicionada**

- ✅ **Resposta - 200 OK**

```json
{
    "error": false,
    "message": "Tarefa com o ID '2' deletado com sucesso!"
}
```


---
- **⚠️ Se o usuário não tiver tarefa com o ID fornecido**


- ✅ **Resposta - 200 OK**
```json
{
    "error": true,
    "message": "Nenhuma tarefa corresponde ao ID de usuário e ID da tarefa fornecidos!"
}
```
---

## 🙋‍♂️ Autor

Documentação feita por **José Satiro**  
GitHub: [SatiroDev](https://github.com/SatiroDev)

---

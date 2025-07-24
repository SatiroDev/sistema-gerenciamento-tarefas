# 📝 Sistema de Gerenciamento de Tarefas (To-Do List)

## 📘 Descrição breve do projeto

API para gerenciamento de usuários e tarefas, utilizando boas práticas nas separações de arquivos. Inclui cadastro e login de usuários, cadastro, listagem, atualização e exclusão de tarefas **(usuário pode atualizar ou excluir somente suas próprias tarefas)**, também contendo validações dos dados e criptografia de senha com bcrypt para maior segurança do usuário!

---

## 💡 Tecnologias utilizadas:

- **Node.js** com **Express** para criação da API RESTful

- **MySQL** como sistema de banco de dados

- **JWT** para autenticação

- **bcrypt** para criptografar senhas

- **Joi** para validação de dados

- **Dotenv** para gerenciar variáveis de ambiente

- **Postman** para testar rotas

---

## 📌 Funcionalidades:

- Cadastro e login de usuários

- Cadastro de usuário com **nome, email e senha**  

- Login com **email e senha**

- **Senhas criptografadas com bcrypt**

- **Autenticação usando JWT (token e refresh token)**

- **Refresh token**: Usado para o usuário não ter que fazer o login toda vez que o **token expirar**

---

## Organização do projeto
``` bash
taskManagement/
├── bcrypt/           # pasta que contem arquivos para criptografar e comparar senhas
├── controller/       # pasta que contem as lógicas principais
├── db/               # pasta que contem a conexão com banco de dados, criação das tabelas...
├── middlewares/     # pasta que contem arquivos que validam o token e refresh token, filtra os dados...
├── routes/           # pasta onde estão localizadas as rotas
├── secretKey/        # pasta onde estão localizada a secret_key e secret_refresh_key
├── services/         # pasta que contem as principais funções da aplicação
├── validation/       # pasta que contem arquivos que validam os dados dos usuários
├── index.js          # arquivo principal onde inicia a aplicação
.env   
package.json/
```

## ⚙️ Variáveis de Ambiente (.env)

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=taskManagement

SECRET_KEY=sua_chave_secreta_segura
REFRESH_SECRET_KEY=sua_chave_secreta_de_refresh
```

---

## ▶️ Como rodar o projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/SatiroDev/sistema-gerenciamento-tarefas
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Inicie o servidor:**

   ```bash
   node taskManagement/index.js
   ```

4. **A API estará rodando em:**  
   [http://localhost:3000](http://localhost:3000)



---

## 📮 Rotas principais

| Método | Rota              | Acesso                      | Descrição                     |
|--------|-------------------|-----------------------------|-------------------------------|
| POST   | `/register`       | Público                     | Cadastrar usuário             |
| POST   | `/login`          | Público                     | Login com JWT                 |
| POST   | `/refresh`        | Público (com refreshToken)  | Gera novo token JWT           |
| GET    | `/task`           | Autenticado                 | Listar suas tarefas           |
| POST   | `/task`           | Autenticado                 | Cadastrar nova tarefa         |
| PUT    | `/task/:id`       | Autenticado                 | Atualizar sua tarefa pelo ID  |
| DELETE | `/task/:id`       | Autenticado                 | Deletar tarefa pelo ID        |

---

## 🧐 Curiosidade

Este projeto foi desenvolvido como uma simulação de um cenário real de freelancer, onde um "cliente fictício" (simulado com ajuda do ChatGPT) fez o pedido de uma API para gerenciamento de tarefas, com prazos e requisitos definidos.

- Prazo de entrega: 10 dias
- Entregue em: 3 dias


---

## 🙋‍♂️ Autor

**José Satiro**  
Estudante do IFCE - Campus Maranguape  
GitHub: [SatiroDev](https://github.com/SatiroDev)

---
📚 [Documentação completa da API](./docs.md)
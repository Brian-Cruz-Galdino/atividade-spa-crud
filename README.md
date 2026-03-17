# 🌌 Gogh Livraria - CRUD com React 19

Projeto desenvolvido para a disciplina de Single Page Application, implementando uma API RESTful completa e um front-end moderno utilizando o novo Hook `use` do React 19. 

O design da interface foi inspirado na obra **"A Noite Estrelada" de Van Gogh**, utilizando técnicas de **Glassmorphism** (Efeito de Vidro) com Tailwind CSS para criar uma experiência visual imersiva e responsiva.

## 🚀 Tecnologias Utilizadas
* **Front-end:** React 19, Vite, Tailwind CSS (Glassmorphism), Lucide React (Ícones).
* **Back-end:** Node.js, Express, CORS.
* **Conceitos aplicados:** Hook `use`, `<Suspense>`, `<ErrorBoundary>`, Promises Estáveis, UX Feedback.
* **A Tecnologia:** A nossa API foi feita usando Node.js com o microframework Express.
* **O Banco de Dados:** Como a atividade não exigia um banco de dados real (como MySQL ou MongoDB), nossa API usa uma estrutura de dados "em memória". Ou seja, os livros ficam salvos em um Array (let books = []) enquanto o servidor estiver ligado.

## ⚙️ Como executar o projeto

### 1. Iniciando a API (Back-end)
1. Abra um terminal e acesse a pasta `backend`.
2. Instale as dependências: `npm install`
3. Rode o servidor: `node server.js`
4. A API estará rodando em `http://localhost:3000`

### 2. Iniciando o Front-end
1. Abra um segundo terminal e acesse a pasta `frontend`.
2. Instale as dependências: `npm install`
3. Rode a aplicação: `npm run dev`
4. Acesse no navegador o link gerado pelo Vite (ex: `http://localhost:5173`)

## ✨ Funcionalidades
* **Create:** Adição de novos livros com validação de campos.
* **Read:** Listagem de livros consumida via hook `use` com interface de carregamento (`Suspense`).
* **Update:** Edição inline dos dados do livro.
* **Delete:** Remoção de livros com confirmação de segurança.
* **Feedback Visual:** Toast de sucesso, mensagens de erro customizadas e Error Boundaries.
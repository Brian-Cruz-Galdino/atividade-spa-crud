const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Banco de dados em memória (com a sua lista personalizada)
let books = [
  { id: 1, title: 'O Trem Do Amanha', author: 'Robert Calvo' },
  { id: 2, title: 'Noite Macabra', author: 'Agata Crist' },
  { id: 3, title: 'Vento Seco', author: 'Bruno Morais' }
];

let nextId = 4; // Como temos 3 livros iniciais, o próximo será o 4!

// 1. READ (GET)
app.get('/books', (req, res) => {
  setTimeout(() => res.json(books), 800); // Delay artificial para ver o Suspense agir!
});

// 2. CREATE (POST)
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Título e Autor são obrigatórios.' });
  }
  const newBook = { id: nextId++, title, author };
  books.push(newBook);
  res.status(201).json(newBook); // 201: Created
});

// 3. UPDATE (PUT)
app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;
  const index = books.findIndex(b => b.id === parseInt(id));
  
  if (index === -1) return res.status(404).json({ error: 'Livro não encontrado.' });
  if (!title || !author) return res.status(400).json({ error: 'Título e Autor são obrigatórios.' });

  books[index] = { id: parseInt(id), title, author };
  res.status(200).json(books[index]);
});

// 4. DELETE (DELETE)
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const index = books.findIndex(b => b.id === parseInt(id));
  
  if (index === -1) return res.status(404).json({ error: 'Livro não encontrado.' });
  
  books.splice(index, 1);
  res.status(204).send(); // 204: No Content
});

app.listen(3000, () => console.log('API rodando na porta 3000'));
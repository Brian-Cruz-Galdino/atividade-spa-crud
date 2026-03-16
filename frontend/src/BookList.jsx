// src/BookList.jsx
import { use } from 'react';
import { Pencil, Trash2, BookText } from 'lucide-react';

export default function BookList({ booksPromise, onEdit, onDelete }) {
  const books = use(booksPromise);

  if (books.length === 0) {
    return (
      <div className="bg-slate-900/40 backdrop-blur-xl border border-blue-400/20 p-10 text-center rounded-3xl">
        <p className="text-yellow-200 text-2xl font-light">O céu está vazio.</p>
        <p className="text-blue-300 mt-2">Adicione um livro para iluminar a biblioteca.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {books.map((book) => (
        <li 
          key={book.id} 
          className="p-5 bg-slate-900/40 backdrop-blur-md border border-blue-400/20 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 hover:bg-slate-800/60 hover:-translate-y-1 hover:border-yellow-400/50 hover:shadow-[0_8px_25px_rgba(253,224,71,0.15)] transition-all duration-300"
        >
          {/* Ícone e Textos */}
          <div className="flex items-center gap-5 w-full">
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-4 rounded-full shadow-[0_0_15px_rgba(253,224,71,0.4)]">
              <BookText size={28} className="text-slate-900" />
            </div>
            <div>
              <h3 className="font-bold text-2xl text-yellow-50 tracking-wide">{book.title}</h3>
              <p className="text-md text-cyan-200 font-light mt-1">{book.author}</p>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex space-x-2 w-full md:w-auto justify-end">
            <button 
              onClick={() => onEdit(book)} 
              className="p-3 text-cyan-300 hover:text-cyan-50 hover:bg-cyan-900/50 rounded-full transition-colors flex items-center gap-2"
              title="Editar"
            >
              <Pencil size={20} /> <span className="md:hidden">Editar</span>
            </button>
            <button 
              onClick={() => onDelete(book.id)} 
              className="p-3 text-pink-400 hover:text-pink-50 hover:bg-pink-900/50 rounded-full transition-colors flex items-center gap-2"
              title="Excluir"
            >
              <Trash2 size={20} /> <span className="md:hidden">Excluir</span>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
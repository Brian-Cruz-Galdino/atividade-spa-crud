// src/App.jsx
import { useState, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Moon, Star, Sparkles, Cloud, LogOut } from 'lucide-react';
import BookList from './BookList';
import Login from './Login'; // <-- Importamos a tela de login aqui!

const API_URL = 'http://localhost:3000/books';

const fetchBooks = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Falha ao carregar os livros.');
  return res.json();
};

export default function App() {
  // ESTADO DE AUTENTICAÇÃO
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [booksPromise, setBooksPromise] = useState(() => fetchBooks());
  const [form, setForm] = useState({ id: null, title: '', author: '' });
  const [feedback, setFeedback] = useState('');

  const refreshBooks = () => setBooksPromise(fetchBooks());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = form.id ? 'PUT' : 'POST';
    const url = form.id ? `${API_URL}/${form.id}` : API_URL;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: form.title, author: form.author })
      });

      if (!res.ok) throw new Error('Erro ao salvar livro.');
      
      setFeedback(form.id ? '✨ Magia feita: Livro atualizado!' : '✨ Magia feita: Livro adicionado!');
      setForm({ id: null, title: '', author: '' });
      refreshBooks();
      setTimeout(() => setFeedback(''), 3000);
    } catch (error) {
      setFeedback('Erro cósmico ao processar a requisição.');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Deseja mandar esta obra para o buraco negro?')) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setFeedback('Livro removido da constelação!');
      refreshBooks();
      setTimeout(() => setFeedback(''), 3000);
    } catch (error) {
      setFeedback('Erro ao excluir livro.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-8 relative overflow-hidden font-sans text-slate-100">
      
      {/* --- CÉU ESTRELADO (Fica no fundo das duas telas) --- */}
      <Moon className="absolute top-12 right-20 text-yellow-300 opacity-90 drop-shadow-[0_0_20px_rgba(253,224,71,0.8)] pointer-events-none" size={120} />
      <Star className="absolute top-1/4 left-16 text-yellow-200 opacity-70 animate-pulse drop-shadow-[0_0_10px_rgba(253,224,71,0.6)] pointer-events-none" size={45} />
      <Star className="absolute bottom-1/4 right-1/3 text-yellow-100 opacity-50 animate-pulse pointer-events-none" size={30} style={{ animationDelay: '1s' }} />
      <Sparkles className="absolute top-1/3 right-12 text-cyan-300 opacity-40 animate-pulse pointer-events-none" size={70} style={{ animationDelay: '0.5s' }} />
      <Cloud className="absolute bottom-10 left-10 text-blue-800 opacity-30 w-64 h-32 pointer-events-none" />
      <Cloud className="absolute top-20 left-1/3 text-indigo-900 opacity-20 w-48 h-24 pointer-events-none" />
      {/* -------------------------------------------------- */}

      {/* SE NÃO ESTIVER LOGADO, MOSTRA O LOGIN */}
      {!isAuthenticated ? (
        <Login onLogin={() => setIsAuthenticated(true)} />
      ) : (
        /* SE ESTIVER LOGADO, MOSTRA A LIVRARIA (O CRUD) */
        <div className="max-w-3xl mx-auto relative z-10">
          
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 drop-shadow-[0_0_15px_rgba(253,224,71,0.3)]">
              🌌 GoGh Livraria
            </h1>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center gap-2 bg-slate-900/50 hover:bg-red-500/20 text-blue-200 hover:text-red-400 px-4 py-2 rounded-xl border border-blue-400/20 transition-colors"
              title="Sair"
            >
              <LogOut size={18} /> Sair
            </button>
          </div>

          {feedback && (
            <div className="mb-6 p-4 bg-blue-900/60 backdrop-blur-md border border-cyan-400/50 text-cyan-100 text-lg font-medium text-center rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              {feedback}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-slate-900/40 backdrop-blur-xl border border-blue-400/20 shadow-[0_8px_30px_rgb(0,0,0,0.5)] p-6 rounded-3xl mb-10">
            <h2 className="text-xl font-bold text-blue-200 mb-4 flex items-center gap-2">
              {form.id ? <Sparkles size={20}/> : <Star size={20}/>} 
              {form.id ? 'Reescrevendo as Estrelas' : 'Nova Constelação (Livro)'}
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Título da Obra"
                required
                className="flex-1 bg-slate-950/50 border border-blue-500/30 p-4 rounded-xl text-yellow-50 placeholder-blue-300/50 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Autor"
                required
                className="flex-1 bg-slate-950/50 border border-blue-500/30 p-4 rounded-xl text-yellow-50 placeholder-blue-300/50 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
                value={form.author}
                onChange={e => setForm({ ...form, author: e.target.value })}
              />
              <button type="submit" className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 font-bold px-8 py-4 rounded-xl hover:from-yellow-400 hover:to-yellow-500 hover:shadow-[0_0_20px_rgba(234,179,8,0.5)] transition-all">
                {form.id ? 'SALVAR' : 'CRIAR'}
              </button>
              
              {form.id && (
                <button type="button" onClick={() => setForm({ id: null, title: '', author: '' })} className="bg-slate-800 text-blue-200 font-bold px-5 py-4 rounded-xl hover:bg-slate-700 transition-colors">
                  X
                </button>
              )}
            </div>
          </form>

          <ErrorBoundary fallback={<div className="p-6 bg-red-900/60 backdrop-blur-md border border-red-500/50 text-red-100 rounded-3xl text-center">Ocorreu um eclipse no servidor (Erro na API).</div>}>
            <Suspense fallback={<div className="text-center text-yellow-300 font-medium text-xl animate-pulse bg-slate-900/40 backdrop-blur-md p-8 rounded-3xl border border-blue-400/20">🔭 Observando os astros (Carregando)...</div>}>
              <BookList 
                booksPromise={booksPromise} 
                onEdit={(book) => setForm(book)}
                onDelete={handleDelete}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}
    </div>
  );
}
// src/Login.jsx
import { useState } from 'react';
import { User, KeyRound, Sparkles } from 'lucide-react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Credenciais de teste para o professor
    if (username === 'brian' && password === '0209') {
      onLogin(); // Libera o acesso!
    } else {
      setError('Credenciais incorretas. Tente brian / 0209');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 relative z-10">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 drop-shadow-[0_0_15px_rgba(253,224,71,0.3)]">
          🌌 GoGh Livraria
        </h1>
        <p className="text-blue-300 mt-3 font-light text-lg">Acesse sua biblioteca estelar</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900/40 backdrop-blur-xl border border-blue-400/20 shadow-[0_8px_30px_rgb(0,0,0,0.5)] p-8 rounded-3xl">
        
        {error && (
          <div className="mb-6 p-3 bg-red-900/60 border border-red-500/50 text-red-200 text-center rounded-xl font-medium">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div className="relative">
            <User className="absolute left-4 top-4 text-blue-300/50" size={20} />
            <input
              type="text"
              placeholder="Usuário"
              required
              className="w-full bg-slate-950/50 border border-blue-500/30 py-4 pl-12 pr-4 rounded-xl text-yellow-50 placeholder-blue-300/50 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="relative">
            <KeyRound className="absolute left-4 top-4 text-blue-300/50" size={20} />
            <input
              type="password"
              placeholder="Senha"
              required
              className="w-full bg-slate-950/50 border border-blue-500/30 py-4 pl-12 pr-4 rounded-xl text-yellow-50 placeholder-blue-300/50 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 font-bold px-8 py-4 rounded-xl hover:from-yellow-400 hover:to-yellow-500 hover:shadow-[0_0_20px_rgba(234,179,8,0.5)] transition-all mt-6">
            <Sparkles size={20} /> ENTRAR
          </button>
        </div>
      </form>
    </div>
  );
}
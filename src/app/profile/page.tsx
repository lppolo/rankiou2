"use client";
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { getPoints, setPoints } from "../../lib/game";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [points, setPointsState] = useState<number>(0);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user);
    });
    try {
      setUsername(localStorage.getItem('rankiou_username') || '');
      setCity(localStorage.getItem('rankiou_city') || '');
      setPointsState(getPoints());
    } catch {}
  }, []);

  const handleSave = () => {
    const clean = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
    if (!clean) { alert('Defina um @username válido.'); return; }
    try {
      const firstTime = !localStorage.getItem('rankiou_username');
      localStorage.setItem('rankiou_username', clean);
      localStorage.setItem('rankiou_city', city.trim());
      if (firstTime) {
        // bônus inicial de 50 pontos na primeira configuração
        setPoints(getPoints() + 50);
      }
      setPointsState(getPoints());
      alert('Perfil atualizado!');
    } catch {}
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-sans">
        <h1 className="text-3xl font-bold mb-4 text-yellow-400">Perfil</h1>
        <div className="bg-gray-900 rounded-lg p-6 shadow w-full max-w-md">
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-1">@username</label>
            <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="seu_usuario" className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none" />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-1">Cidade</label>
            <input value={city} onChange={e=>setCity(e.target.value)} placeholder="Sua cidade" className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none" />
          </div>
          <button onClick={handleSave} className="w-full px-4 py-2 bg-cyan-400 text-black rounded font-bold">Salvar</button>
          <p className="text-xs text-gray-500 mt-2">Você não está logado, mas pode salvar perfil local para filtros locais.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-sans">
      <h1 className="text-3xl font-bold mb-4 text-yellow-400">Perfil</h1>
      <div className="bg-gray-900 rounded-lg p-6 shadow w-full max-w-md flex flex-col gap-4 items-stretch">
        <div className="flex flex-col items-center">
          <img src={user.user_metadata?.avatar_url || "/images/avatar.png"} alt="Avatar" className="w-24 h-24 rounded-full mb-2 border-4 border-yellow-400" />
          <div className="text-lg font-bold">{user.user_metadata?.full_name || user.email}</div>
          <div className="text-sm text-gray-400">{user.email}</div>
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">@username</label>
          <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="seu_usuario" className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Cidade</label>
          <input value={city} onChange={e=>setCity(e.target.value)} placeholder="Sua cidade" className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none" />
        </div>
        <div className="flex items-center justify-between text-sm text-gray-300">
          <span>Pontos:</span>
          <span className="font-bold text-yellow-300">{points}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={handleSave} className="flex-1 px-4 py-2 bg-cyan-400 text-black rounded font-bold">Salvar</button>
          <button onClick={handleLogout} className="px-4 py-2 bg-yellow-400 text-black rounded font-bold">Sair</button>
        </div>
      </div>
    </div>
  );
}

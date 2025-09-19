"use client";
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-sans">
        <h1 className="text-3xl font-bold mb-4 text-yellow-400">Perfil</h1>
        <p>Você não está logado.</p>
        <a href="/login" className="mt-4 px-6 py-2 bg-yellow-400 rounded text-black font-bold">Entrar</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-sans">
      <h1 className="text-3xl font-bold mb-4 text-yellow-400">Perfil</h1>
      <div className="bg-gray-900 rounded-lg p-6 shadow w-full max-w-md flex flex-col gap-4 items-center">
        <img src={user.user_metadata?.avatar_url || "/images/avatar.png"} alt="Avatar" className="w-24 h-24 rounded-full mb-2 border-4 border-yellow-400" />
        <div className="text-lg font-bold">{user.user_metadata?.full_name || user.email}</div>
        <div className="text-sm text-gray-400">{user.email}</div>
        <button onClick={handleLogout} className="mt-6 px-6 py-2 bg-yellow-400 rounded text-black font-bold">Sair</button>
      </div>
    </div>
  );
}

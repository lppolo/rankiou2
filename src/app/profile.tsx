import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Profile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-sans">
        <h1 className="text-2xl font-bold mb-4">Carregando perfil...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-sans">
      <h1 className="text-4xl font-bold mb-8 text-yellow-400">Perfil do Usuário</h1>
      <div className="bg-gray-900 rounded-lg p-6 shadow w-full max-w-md flex flex-col items-center">
        <p className="mb-2"><strong>ID:</strong> {user.id}</p>
        <p className="mb-2"><strong>Email:</strong> {user.email}</p>
        <p className="mb-2"><strong>Nome:</strong> {user.user_metadata?.name || 'Não definido'}</p>
        <button
          className="mt-6 px-6 py-2 bg-yellow-400 rounded-lg text-black font-bold text-lg shadow hover:bg-yellow-300 transition"
          onClick={async () => {
            await supabase.auth.signOut();
            window.location.href = '/login';
          }}
        >
          Sair
        </button>
      </div>
    </div>
  );
}

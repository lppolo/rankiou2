
"use client";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
	const handleLogin = async () => {
		await supabase.auth.signInWithOAuth({ provider: 'google' });
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-sans">
			<h1 className="text-4xl font-bold mb-8 text-yellow-400">Entrar no Rankiou</h1>
			<button
				onClick={handleLogin}
				className="px-8 py-3 bg-yellow-400 rounded-lg text-black font-bold text-lg shadow hover:bg-yellow-300 transition"
			>
				Entrar com Google
			</button>
		</div>
	);
}



"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";

export default function LoginPage() {
	const router = useRouter();

		useEffect(() => {
			const { data } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
				if (session && session.user) {
					router.push("/profile");
				}
			});
			return () => {
				data.subscription.unsubscribe();
			};
		}, [router]);

	const handleLogin = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: typeof window !== "undefined" ? `${window.location.origin}/profile` : undefined,
			},
		});
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

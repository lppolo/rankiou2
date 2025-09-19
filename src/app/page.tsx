export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-sans">
      <header className="w-full flex justify-center py-8">
        <h1 className="text-5xl font-extrabold tracking-tight text-yellow-400 drop-shadow-lg">RANKIOU</h1>
      </header>
      <main className="flex flex-col items-center gap-8 w-full max-w-xl px-4">
        <p className="text-lg text-center mb-4">Bem-vindo ao maior site de rankings do Brasil!<br />Descubra, vote e crie enquetes sobre tudo.</p>
        <a href="/login" className="px-8 py-3 bg-yellow-400 rounded-lg text-black font-bold text-lg shadow hover:bg-yellow-300 transition">Entrar</a>
        <div className="mt-8 w-full flex flex-col gap-4">
          <div className="bg-gray-900 rounded-lg p-4 shadow">
            <h2 className="text-xl font-bold text-yellow-300 mb-2">Como funciona?</h2>
            <ul className="list-disc list-inside text-gray-200 text-base">
              <li>Vote em enquetes e ganhe pontos.</li>
              <li>Use pontos para criar suas próprias enquetes.</li>
              <li>Colecione e evolua Rankards!</li>
            </ul>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 shadow">
            <h2 className="text-xl font-bold text-yellow-300 mb-2">Recursos:</h2>
            <ul className="list-disc list-inside text-gray-200 text-base">
              <li>Feed global, local e rolê da semana.</li>
              <li>Login com Google.</li>
              <li>Design responsivo e moderno.</li>
            </ul>
          </div>
        </div>
      </main>
      <footer className="w-full text-center py-6 text-gray-500 text-sm mt-12">
        &copy; 2025 Rankiou. Todos os direitos reservados.
      </footer>
    </div>
  );
}

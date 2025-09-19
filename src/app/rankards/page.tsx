export default function RankardsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-sans">
      <h1 className="text-4xl font-bold mb-8 text-yellow-400">Meus Rankards</h1>
      <p className="mb-4 text-lg text-gray-200">Colecione, evolua e veja todos os seus Rankards desbloqueados!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Aqui serão exibidos os cards de Rankards do usuário */}
        <div className="bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-yellow-300 mb-2">CAVALO DE PAU</span>
          <span className="text-sm text-gray-400 mb-2">Raro - Animal</span>
          <span className="text-xs text-gray-500">Estágio 3 (Adulto)</span>
        </div>
        <div className="bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-yellow-300 mb-2">CÃOMÉDIA</span>
          <span className="text-sm text-gray-400 mb-2">Comum - Animal</span>
          <span className="text-xs text-gray-500">Estágio 3 (Adulto)</span>
        </div>
        {/* Adicione mais cards conforme o progresso do usuário */}
      </div>
    </div>
  );
}

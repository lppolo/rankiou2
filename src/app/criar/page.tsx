export default function CriarPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">Criar Enquete</h1>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex items-center gap-2 bg-gray-900 p-3 rounded border border-gray-700"><input id="scope-mundo" name="scope" type="radio" /> <span>Mundo</span></label>
            <label className="flex items-center gap-2 bg-gray-900 p-3 rounded border border-gray-700"><input id="scope-local" name="scope" type="radio" /> <span>Local</span></label>
            <label className="flex items-center gap-2 bg-gray-900 p-3 rounded border border-gray-700"><input id="scope-role" name="scope" type="radio" /> <span>Rolê</span></label>
          </div>
          <input id="title" name="title" className="w-full bg-gray-900 text-white px-3 py-2 rounded border border-gray-700" placeholder="Título da enquete" />
          <div className="space-y-2">
            <input id="opt1" name="opt1" className="w-full bg-gray-900 text-white px-3 py-2 rounded border border-gray-700" placeholder="Opção 1" />
            <input id="opt2" name="opt2" className="w-full bg-gray-900 text-white px-3 py-2 rounded border border-gray-700" placeholder="Opção 2" />
            <input id="opt3" name="opt3" className="w-full bg-gray-900 text-white px-3 py-2 rounded border border-gray-700" placeholder="Opção 3 (opcional)" />
            <input id="opt4" name="opt4" className="w-full bg-gray-900 text-white px-3 py-2 rounded border border-gray-700" placeholder="Opção 4 (opcional)" />
          </div>
          <label className="flex items-center gap-2"><input id="open" name="open" type="checkbox" /> Permitir que usuários adicionem opções</label>
          <button className="px-6 py-2 bg-yellow-400 text-black rounded font-bold">Enviar (5 pontos)</button>
        </form>
      </div>
    </div>
  );
}

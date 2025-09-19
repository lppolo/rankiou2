"use client";
import { FormEvent, useState } from "react";
import { addPoll, spendPoints, getPoints, incrementCreateMission } from "../../lib/game";
import { useRouter } from "next/navigation";

export default function CriarPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (loading) return;
    const fd = new FormData(e.currentTarget);
  const scope = (fd.get("scope") as string) || "";
    const title = (fd.get("title") as string || "").trim();
    const categoria = "Outras";
    const open = fd.get("open") ? true : false;
    const options = ["opt1","opt2","opt3","opt4"].map(k=> (fd.get(k) as string || "").trim()).filter(Boolean);
    if (!scope) return setError("Selecione o escopo (Mundo, Local ou Rolê)");
    if (title.length < 6) return setError("Título muito curto (mínimo 6 caracteres)");
  if (!open && options.length < 2) return setError("Adicione pelo menos 2 opções para enquete fixa");
  // Regras de cidade para LOCAL
  const city = (localStorage.getItem('rankiou_city') || '').trim();
  if (scope === 'local' && !city) return setError("Defina sua cidade no Perfil para criar enquetes locais.");
    if (getPoints() < 5) return setError("Pontos insuficientes (5 pontos necessários)");
    setLoading(true);
    try{
      const poll = {
        id: Date.now(),
        titulo: title,
        opcoes: options,
        votos: options.map(()=>0),
        categoria,
        modo: scope.toLowerCase(),
        cidade: city || null,
        aberta: open,
        criadaEm: new Date().toISOString(),
      };
      spendPoints(5);
      addPoll(poll);
      incrementCreateMission();
      router.push("/acompanhar");
    }catch(err:any){
      setError("Falha ao criar. Tente novamente.");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">Criar Enquete</h1>
        {error && <div className="mb-4 p-3 rounded bg-red-900/50 border border-red-700 text-red-200">{error}</div>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex items-center gap-2 bg-gray-900 p-3 rounded border border-gray-700"><input id="scope-mundo" name="scope" type="radio" value="mundo" /> <span>Mundo</span></label>
            <label className="flex items-center gap-2 bg-gray-900 p-3 rounded border border-gray-700"><input id="scope-local" name="scope" type="radio" value="local" /> <span>Local</span></label>
            <label className="flex items-center gap-2 bg-gray-900 p-3 rounded border border-gray-700"><input id="scope-role" name="scope" type="radio" value="role" /> <span>Rolê</span></label>
          </div>
          <input id="title" name="title" className="w-full bg-gray-900 text-white px-3 py-2 rounded border border-gray-700" placeholder="Título da enquete" />
          <div className="space-y-2">
            <input id="opt1" name="opt1" className="w-full bg-gray-900 text-white px-3 py-2 rounded border border-gray-700" placeholder="Opção 1" />
            <input id="opt2" name="opt2" className="w-full bg-gray-900 text-white px-3 py-2 rounded border border-gray-700" placeholder="Opção 2" />
            <input id="opt3" name="opt3" className="w-full bg-gray-900 text-white px-3 py-2 rounded border border-gray-700" placeholder="Opção 3 (opcional)" />
            <input id="opt4" name="opt4" className="w-full bg-gray-900 text-white px-3 py-2 rounded border border-gray-700" placeholder="Opção 4 (opcional)" />
          </div>
          <label className="flex items-center gap-2"><input id="open" name="open" type="checkbox" /> Permitir que usuários adicionem opções</label>
          <button disabled={loading} className="px-6 py-2 bg-yellow-400 text-black rounded font-bold disabled:opacity-60">{loading? 'Enviando...' : 'Enviar (5 pontos)'}</button>
        </form>
      </div>
    </div>
  );
}

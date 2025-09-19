"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function FilterBar() {
  const router = useRouter();
  const params = useSearchParams();

  const setParam = (key: string, value: string) => {
    const q = new URLSearchParams(params?.toString());
    if (value) q.set(key, value); else q.delete(key);
    router.push(`/?${q.toString()}`);
  };

  const modo = params?.get("modo") || "mundo";
  const ordenar = params?.get("ordenar") || "recentes";
  const categoria = params?.get("categoria") || "todas";
  const q = params?.get("q") || "";

  return (
    <div className="w-full bg-gray-800 flex flex-wrap gap-2 md:gap-6 items-center px-4 py-2 sticky top-0 z-10 border-b border-gray-700">
      <button onClick={() => setParam("modo","mundo")} className={`px-3 py-1 rounded font-bold ${modo==="mundo"?"bg-blue-600 text-white":"bg-gray-700 text-gray-200"}`}>🌍 Mundo</button>
      <button onClick={() => setParam("modo","local")} className={`px-3 py-1 rounded font-bold ${modo==="local"?"bg-green-600 text-white":"bg-gray-700 text-gray-200"}`}>🏙️ Local</button>
      <button onClick={() => setParam("modo","role")} className={`px-3 py-1 rounded font-bold ${modo==="role"?"bg-pink-600 text-white":"bg-gray-700 text-gray-200"}`}>🎉 Rolê</button>
      <select value={ordenar} onChange={(e)=>setParam("ordenar", e.target.value)} className="bg-gray-900 text-white px-2 py-1 rounded border border-gray-700">
        <option value="recentes">Mais Recentes</option>
        <option value="votadas">Mais Votadas</option>
      </select>
      <select value={categoria} onChange={(e)=>setParam("categoria", e.target.value)} className="bg-gray-900 text-white px-2 py-1 rounded border border-gray-700">
        <option value="todas">Todas Categorias</option>
        <option value="Esportes">Esportes</option>
        <option value="Filmes & Séries">Filmes & Séries</option>
        <option value="Comida">Comida</option>
        <option value="Eventos">Eventos</option>
      </select>
      <input id="global-search" name="search" type="text" placeholder="Buscar..." defaultValue={q}
        onKeyDown={(e)=>{ if(e.key==='Enter'){ setParam('q',(e.target as HTMLInputElement).value); } }}
        className="bg-gray-900 text-white px-2 py-1 rounded border border-gray-700 w-40" />
    </div>
  );
}

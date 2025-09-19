"use client";
import { useState } from "react";

const raridades = [
  { tipo: "Comum", cor: "bg-gray-400", chance: 50 },
  { tipo: "Raro", cor: "bg-blue-400", chance: 30 },
  { tipo: "Épico", cor: "bg-purple-400", chance: 15 },
  { tipo: "Lendário", cor: "bg-yellow-400", chance: 5 },
];

function sortearRaridade() {
  const rand = Math.random() * 100;
  let acumulado = 0;
  for (const r of raridades) {
    acumulado += r.chance;
    if (rand < acumulado) return r.tipo;
  }
  return "Comum";
}

export default function RankardsPage() {
  const [ovo, setOvo] = useState<string | null>(null);
  const [showRoleta, setShowRoleta] = useState(false);

  const handleGerarOvo = () => {
    setShowRoleta(true);
    setTimeout(() => {
      setOvo(sortearRaridade());
      setShowRoleta(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-sans">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Rankards</h1>
      <div className="bg-gray-900 rounded-lg p-8 shadow w-full max-w-md flex flex-col gap-6 items-center">
        <p className="text-lg text-center mb-4">Gere seu ovo e comece sua coleção!</p>
        {!ovo && (
          <button onClick={handleGerarOvo} className="px-8 py-3 bg-yellow-400 rounded-lg text-black font-bold text-lg shadow hover:bg-yellow-300 transition">Gerar Ovo</button>
        )}
        {showRoleta && (
          <div className="w-full flex flex-col items-center gap-2 animate-pulse">
            <div className="text-xl font-bold mb-2">Girando roleta...</div>
            <div className="flex gap-2">
              {raridades.map(r => (
                <div key={r.tipo} className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-black ${r.cor}`}>{r.tipo}</div>
              ))}
            </div>
          </div>
        )}
        {ovo && !showRoleta && (
          <div className="flex flex-col items-center gap-4 mt-4">
            <div className="w-24 h-24 rounded-full bg-yellow-400 flex items-center justify-center text-2xl font-extrabold text-black border-4 border-yellow-400">🥚</div>
            <div className="text-lg font-bold">Ovo {ovo}</div>
            <button className="mt-4 px-6 py-2 bg-cyan-400 rounded text-black font-bold">Ver Missões</button>
          </div>
        )}
      </div>
      {/* Cards de Rankards desbloqueados */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
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

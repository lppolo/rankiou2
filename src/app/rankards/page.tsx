"use client";
import { useEffect, useState } from "react";
import { addRankard, evolveRankard, getPoints, getRankards, spendPoints, canEvolveRankard } from "../../lib/game";

type Rarity = "Comum" | "Raro" | "Épico" | "Lendário";

export default function RankardsPage() {
  const [latest, setLatest] = useState<Rarity | null>(null);
  const [list, setList] = useState<any[]>([]);
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    try {
      setList(getRankards());
      setPoints(getPoints());
    } catch {}
  }, []);

  const roll = () => {
    try {
      const currentRankards = getRankards();
      
      // O primeiro é grátis, os outros custam 100
      if (currentRankards.length > 0) {
        if (!spendPoints(100)) {
          alert("Pontos insuficientes (100 necessários para um novo ovo).");
          return;
        }
      }

      const r = Math.random();
      let rarity: Rarity = "Comum";
      if (r > 0.95) rarity = "Lendário"; // 5%
      else if (r > 0.8) rarity = "Épico";   // 15%
      else if (r > 0.5) rarity = "Raro";     // 30%
      
      setLatest(rarity);
      addRankard({ rarity, stage: 0 });
      
      setList(getRankards());
      setPoints(getPoints());

    } catch (e) {
      console.error(e);
    }
  };

  const evolve = (id: string) => {
    try {
      const ok = evolveRankard(id);
      
      if (!ok) { 
        alert("Missões pendentes ou já está no estágio máximo!"); 
        return; 
      }

      setList(getRankards());
      setPoints(getPoints());
    } catch (e) {
      console.error(e)
    }
  };

  // Atualiza os pontos na tela periodicamente
  useEffect(() => {
    const i = setInterval(() => {
      try {
        setPoints(getPoints());
      } catch {}
    }, 1500);
    return () => clearInterval(i);
  }, []);

  const stageName = (stage: number) => ["Ovo", "Bebê", "Jovem", "Adulto"][stage] || "?";
  const stageEmoji = (stage: number) => ['🥚', '🐣', '🐥', '🦅'][stage] || '❓';

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-extrabold text-yellow-300">Rankards</h1>
        <div className="text-sm text-gray-300">Pontos: <span className="font-bold text-yellow-300">{points}</span></div>
      </div>

      <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-yellow-200 mb-2">Gerar Ovo</h2>
        <p className="text-gray-300 mb-3">Gire a roleta e ganhe um ovo. O primeiro é grátis, os próximos custam 100 pontos.</p>
        <button onClick={roll} className="px-4 py-2 bg-cyan-400 text-black font-bold rounded hover:bg-cyan-300 transition">Girar Roleta</button>
        {latest && (
          <div className="mt-4">
            <div className="text-gray-200">Você ganhou um ovo: <span className="font-bold text-yellow-300">{latest}</span></div>
            <div className="mt-2 w-40 h-40 bg-gradient-to-b from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-5xl">🥚</div>
          </div>
        )}
      </div>

      <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-yellow-200 mb-3">Minha Coleção</h2>
        {list.length === 0 ? (
          <p className="text-gray-400">Nenhum Rankard ainda. Gire a roleta para conseguir seu primeiro ovo grátis!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {list.map((rk: any) => (
              <div key={rk.id} className="bg-gray-900/60 border border-gray-700 rounded-lg p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-yellow-300 font-semibold">{rk.rarity}</div>
                    <div className="text-xs text-gray-400">{stageName(rk.stage)}</div>
                  </div>
                  <div className="w-full h-28 rounded-md bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center text-5xl">{stageEmoji(rk.stage)}</div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-xs text-gray-400">ID: {rk.id.slice(-6)}</div>
                  {rk.stage < 3 && (
                    <button onClick={() => evolve(rk.id)} disabled={!canEvolveRankard(rk)} className="px-3 py-1 rounded text-sm font-bold ${canEvolveRankard(rk)?'bg-purple-400 text-black hover:bg-purple-300':'bg-gray-700 text-gray-400'}">Evoluir</button>
                  )}
                </div>
                {rk.progress && (
                  <div className="mt-2 text-xs text-gray-300 space-y-1">
                    <div>Votos: {rk.progress.votes}/{rk.progress.votesRequired}
                      <div className="w-full bg-gray-700 h-1 rounded mt-1"><div className="bg-cyan-400 h-1 rounded" style={{width: `${Math.min(100, (rk.progress.votes/rk.progress.votesRequired)*100)}%`}}></div></div>
                    </div>
                    <div>Criações: {rk.progress.creates}/{rk.progress.createsRequired}
                      <div className="w-full bg-gray-700 h-1 rounded mt-1"><div className="bg-yellow-400 h-1 rounded" style={{width: `${Math.min(100, (rk.progress.creates/rk.progress.createsRequired)*100)}%`}}></div></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

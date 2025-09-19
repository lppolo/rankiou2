"use client";
import { addPoints, incrementVoteMission, getFavorites, toggleFavorite, addReport } from "../lib/game";
import { useEffect, useState } from "react";

export type Option = { id: string; text: string; votes?: number };
export type Enquete = {
  id?: string;
  title: string;
  scope?: 'MUNDO' | 'LOCAL' | 'ROLE';
  category?: string;
  options: Option[];
  votedOptionId?: string;
  onVote?: (optionId: string) => void;
  pollId?: string;
};

export default function CardEnquete({ id, title, options, scope, category, onVote, votedOptionId, pollId }: Enquete) {
  const pid = String(pollId || id || title);
  const storageKey = `voted_${pid}`;
  const [selected, setSelected] = useState<string | null>(null);
  const [voted, setVoted] = useState<boolean>(false);
  const [opts, setOpts] = useState<Option[]>(options);
  const [isFav, setIsFav] = useState<boolean>(false);

  useEffect(()=>{
    try{
      const already = localStorage.getItem(storageKey);
      if (already) {
        setVoted(true);
        setSelected(already);
      } else if (votedOptionId) {
        setSelected(votedOptionId);
        setVoted(true);
      }
      const favs = getFavorites();
      setIsFav(favs.includes(pid));
    }catch{}
  },[storageKey, votedOptionId]);

  const castVote = () => {
    if (!selected || voted) return;
    // Atualiza votos locais
    setOpts(prev => prev.map(o=> o.id===selected ? { ...o, votes: (o.votes||0)+1 } : o));
    setVoted(true);
    try{
      localStorage.setItem(storageKey, selected);
      addPoints(1);
      incrementVoteMission();
    }catch{}
    if (onVote) onVote(selected);
  };

  const changeVote = () => {
    if (!voted || !selected) return;
    // Reverte o voto da opção selecionada e permite votar de novo
    setOpts(prev => prev.map(o=> o.id===selected ? { ...o, votes: Math.max(0,(o.votes||0)-1) } : o));
    setVoted(false);
    try{ localStorage.removeItem(storageKey); }catch{}
  };

  const addOption = () => {
    const text = prompt("Adicionar opção:")?.trim();
    if (!text) return;
    const id = `${Date.now()}`;
    setOpts(prev=> [...prev, { id, text, votes: 0 }]);
    // Ganha 1 ponto se ainda não ganhou nessa enquete
    try{
      if (!localStorage.getItem(storageKey)){
        localStorage.setItem(storageKey, `added:${id}`);
        addPoints(1);
        incrementVoteMission();
      }
    }catch{}
  };

  const toggleFav = () => {
    const now = toggleFavorite(pid);
    setIsFav(now);
  };

  const reportPoll = () => {
    if (confirm("Tem certeza que deseja denunciar esta enquete por conteúdo impróprio?")) {
      addReport(pid);
      alert("Enquete denunciada. Nossa equipe de moderação irá analisar.");
    }
  };

  return (
    <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-4 flex flex-col h-full">
      {category && <div className="text-xs text-gray-400 mb-1 uppercase tracking-widest">{category}</div>}
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-lg font-bold text-yellow-300 mb-2">{title}</h2>
        <div className="flex items-center gap-2">
          <button onClick={reportPoll} title="Denunciar" className="text-gray-400 hover:text-red-400">🏳️</button>
          <button onClick={toggleFav} title="Favoritar" className={isFav? 'text-yellow-300' : 'text-gray-400 hover:text-yellow-300'}>⭐</button>
        </div>
      </div>
  <div className="text-xs font-semibold text-cyan-400 bg-cyan-900/50 inline-block px-2 py-0.5 rounded-full mb-3">{scope || 'MUNDO'}</div>
      <div className="space-y-2 flex-grow">
        {opts.map(option => {
          const totalVotes = opts.reduce((acc, o) => acc + (o.votes || 0), 0) || 1;
          const percentage = voted ? ((option.votes || 0) / totalVotes) * 100 : 0;
          return (
            <div key={option.id} onClick={() => !voted && setSelected(option.id)} className={`p-2 rounded-md cursor-pointer transition-all duration-300 ${selected === option.id ? 'bg-cyan-600/50 ring-2 ring-cyan-400' : 'bg-gray-700/50 hover:bg-gray-600/50'}`}>
              <div className="flex justify-between items-center text-sm">
                <span>{option.text}</span>
                {voted && <span className="font-bold">{Math.round(percentage)}% ({option.votes || 0})</span>}
              </div>
              {voted && (
                <div className="w-full bg-gray-600 rounded-full h-1.5 mt-1">
                  <div className="bg-cyan-400 h-1.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-end items-center mt-4 gap-2">
        <button onClick={castVote} disabled={!selected || voted} className="px-4 py-1 bg-cyan-400 disabled:bg-gray-700 disabled:text-gray-400 text-black rounded font-bold text-sm shadow hover:bg-cyan-300 transition">{voted? 'VOTADO' : 'VOTAR'}</button>
        {voted ? (
          <button onClick={changeVote} className="px-4 py-1 bg-gray-700 text-white rounded font-bold text-sm shadow hover:bg-gray-600 transition">TROCAR VOTO</button>
        ) : (
          <button onClick={addOption} className="px-4 py-1 bg-yellow-400 text-black rounded font-bold text-sm shadow hover:bg-yellow-300 transition">RESPONDER</button>
        )}
      </div>
    </div>
  );
}

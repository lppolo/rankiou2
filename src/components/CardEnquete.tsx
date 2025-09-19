"use client";
import { useEffect, useMemo, useState } from "react";

interface Option {
  id: string;
  text: string;
  votes: number;
}

interface CardEnqueteProps {
  pollId?: string;
  title: string;
  category: string;
  options: Option[];
  votedOptionId?: string;
  onVote?: (optionId: string) => void;
}

export default function CardEnquete({ pollId, title, category, options, votedOptionId, onVote }: CardEnqueteProps) {
  const storageKey = useMemo(()=> pollId ? `rankiou_voted_${pollId}` : `rankiou_voted_${title}`,[pollId, title]);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [voted, setVoted] = useState<boolean>(false);
  const [opts, setOpts] = useState<Option[]>(options);

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
    }catch{}
  },[storageKey, votedOptionId]);

  const castVote = () => {
    if (!selected || voted) return;
    // Atualiza votos locais
    setOpts(prev => prev.map(o=> o.id===selected ? { ...o, votes: (o.votes||0)+1 } : o));
    setVoted(true);
    try{
      localStorage.setItem(storageKey, selected);
      // Ganha +1 ponto por enquete (somente uma vez)
      const current = parseInt(localStorage.getItem('rankiou_points')||'0');
      localStorage.setItem('rankiou_points', String(Math.max(0, current) + 1));
    }catch{}
    if (onVote) onVote(selected);
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-lg p-6 w-full max-w-sm flex flex-col gap-4 border-2 border-gray-800">
      <div className="text-xs text-gray-400 mb-1 uppercase tracking-widest">{category}</div>
      <h2 className="text-lg font-bold text-yellow-300 mb-2">{title}</h2>
      <div className="flex flex-col gap-2">
        {opts.map(option => (
          <button
            key={option.id}
            className={`w-full px-4 py-2 rounded-lg text-left font-semibold transition border-2 border-gray-700 bg-gray-800 text-white hover:bg-yellow-400 hover:text-black ${selected === option.id ? 'border-yellow-400' : ''} ${voted && selected===option.id ? 'bg-yellow-400 text-black' : ''}`}
            onClick={() => setSelected(option.id)}
            disabled={voted}
          >
            {option.text}
            <span className="float-right text-xs font-bold">{option.votes} votos</span>
          </button>
        ))}
      </div>
      <div className="flex justify-between items-center mt-2">
        <button onClick={castVote} disabled={!selected || voted} className="px-4 py-1 bg-cyan-400 disabled:bg-gray-700 disabled:text-gray-400 text-black rounded font-bold text-sm shadow hover:bg-cyan-300 transition">{voted? 'VOTADO' : 'VOTAR'}</button>
        <button className="px-4 py-1 bg-yellow-400 text-black rounded font-bold text-sm shadow hover:bg-yellow-300 transition">RESPONDER</button>
      </div>
      <div className="text-xs text-gray-500 mt-2 flex justify-between">
        <span>10/09/2025 16:29</span>
        <span>@lpc</span>
      </div>
    </div>
  );
}

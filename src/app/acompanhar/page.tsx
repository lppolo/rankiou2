"use client";
import { useEffect, useState } from "react";
import CardEnquete, { Enquete } from "../../components/CardEnquete";
import { getFavorites, getPolls } from "../../lib/game";
import { enquetes as mockEnquetes } from '../../data/enquetes';

export default function AcompanharPage() {
  const [tab, setTab] = useState<'criadas' | 'favoritos'>('criadas');
  const [criadas, setCriadas] = useState<Enquete[]>([]);
  const [favoritos, setFavoritos] = useState<Enquete[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setLoading(true);
      // Carrega enquetes criadas pelo usuário
      const userPolls = getPolls();
      setCriadas(userPolls);

      // Carrega enquetes favoritadas
      // Combina enquetes mockadas com as criadas pelo usuário para encontrar os favoritos
      const allPolls = [...mockEnquetes, ...userPolls];
      const favIds = new Set(getFavorites());
      const favPolls = allPolls.filter(p => favIds.has(p.id));
      setFavoritos(favPolls);
    } catch (e) {
      console.error("Erro ao carregar dados:", e);
    } finally {
      setLoading(false);
    }
  }, [tab]); // Recarrega quando a aba muda para garantir dados atualizados

  const renderList = (list: Enquete[], emptyMessage: string) => {
    if (loading) {
      return <p className="text-gray-400 mt-4">Carregando...</p>;
    }
    if (list.length === 0) {
      return <p className="text-gray-400 mt-4">{emptyMessage}</p>;
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {list.map(enquete => (
          <CardEnquete key={enquete.id} {...enquete} pollId={enquete.id} />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-extrabold text-yellow-300 mb-4">Acompanhar</h1>

      <div className="flex border-b border-gray-700">
        <button
          onClick={() => setTab('criadas')}
          className={`px-4 py-2 font-semibold transition-colors ${tab === 'criadas' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400 hover:text-white'}`}
        >
          Criadas
        </button>
        <button
          onClick={() => setTab('favoritos')}
          className={`px-4 py-2 font-semibold transition-colors ${tab === 'favoritos' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400 hover:text-white'}`}
        >
          Favoritos
        </button>
      </div>

      <div className="mt-6">
        {tab === 'criadas' && renderList(criadas, "Você ainda não criou nenhuma enquete. Clique em 'CRIAR' para começar!")}
        {tab === 'favoritos' && renderList(favoritos, "Você ainda não favoritou nenhuma enquete. Clique na estrela (⭐) em uma enquete para adicioná-la aqui.")}
      </div>
    </div>
  );
}

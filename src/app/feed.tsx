import CardEnquete from '../components/CardEnquete';

const mockEnquetes = [
  {
    title: 'EM CABO VERDE-MG, QUAL O MELHOR PESQUEIRO?',
    category: 'ESPORTES',
    options: [
      { id: '1', text: 'WALTINHO', votes: 2 },
    ],
  },
  {
    title: 'EM CABO VERDE-MG, QUAL A MELHOR PIZZA?',
    category: 'OUTRAS',
    options: [
      { id: '1', text: 'ANTÔNIO NILSON', votes: 1 },
      { id: '2', text: 'ARENA', votes: 0 },
      { id: '3', text: 'CHAPA QUENTE', votes: 0 },
      { id: '4', text: 'MUNDO DA PIZZA', votes: 1 },
    ],
  },
  {
    title: 'EM CABO VERDE-MG, QUAL O MELHOR RESTAURANTE DO BAIRRO CHAPADÃO DOSE?',
    category: 'COMIDA & BEBIDA',
    options: [
      { id: '1', text: 'ZEZIN', votes: 1 },
      { id: '2', text: 'ZEZINHO', votes: 1 },
    ],
  },
];

export default function Feed() {
  return (
    <div className="min-h-screen bg-black text-white py-8 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-yellow-400 mb-8">Feed de Enquetes</h1>
      <div className="flex gap-4 mb-8">
        <button className="px-4 py-2 rounded bg-cyan-400 text-black font-bold shadow hover:bg-cyan-300">ROLÊ</button>
        <button className="px-4 py-2 rounded bg-yellow-400 text-black font-bold shadow hover:bg-yellow-300">MUNDO</button>
        <button className="px-4 py-2 rounded bg-gray-700 text-white font-bold shadow hover:bg-gray-600">LOCAL</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {mockEnquetes.map((enquete, idx) => (
          <CardEnquete key={idx} {...enquete} />
        ))}
      </div>
    </div>
  );
}

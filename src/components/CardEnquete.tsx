interface Option {
  id: string;
  text: string;
  votes: number;
}

interface CardEnqueteProps {
  title: string;
  category: string;
  options: Option[];
  votedOptionId?: string;
  onVote?: (optionId: string) => void;
}

export default function CardEnquete({ title, category, options, votedOptionId, onVote }: CardEnqueteProps) {
  return (
    <div className="bg-gray-900 rounded-xl shadow-lg p-6 w-full max-w-sm flex flex-col gap-4 border-2 border-gray-800">
      <div className="text-xs text-gray-400 mb-1 uppercase tracking-widest">{category}</div>
      <h2 className="text-lg font-bold text-yellow-300 mb-2">{title}</h2>
      <div className="flex flex-col gap-2">
        {options.map(option => (
          <button
            key={option.id}
            className={`w-full px-4 py-2 rounded-lg text-left font-semibold transition border-2 border-gray-700 bg-gray-800 text-white hover:bg-yellow-400 hover:text-black ${votedOptionId === option.id ? 'bg-yellow-400 text-black border-yellow-400' : ''}`}
            onClick={() => onVote && onVote(option.id)}
            disabled={!!votedOptionId}
          >
            {option.text}
            <span className="float-right text-xs font-bold">{option.votes} votos</span>
          </button>
        ))}
      </div>
      <div className="flex justify-between items-center mt-2">
        <button className="px-4 py-1 bg-cyan-400 text-black rounded font-bold text-sm shadow hover:bg-cyan-300 transition">VOTAR</button>
        <button className="px-4 py-1 bg-yellow-400 text-black rounded font-bold text-sm shadow hover:bg-yellow-300 transition">RESPONDER</button>
      </div>
      <div className="text-xs text-gray-500 mt-2 flex justify-between">
        <span>10/09/2025 16:29</span>
        <span>@lpc</span>
      </div>
    </div>
  );
}

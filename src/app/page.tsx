import FeedGrid from "../components/FeedGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-yellow-400 mb-6">RANKIOU</h1>
        <p className="text-lg text-gray-300 mb-8">Descubra, vote e crie enquetes sobre tudo.</p>
        <FeedGrid />
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">FAQ</h1>
        <div className="space-y-4">
          <div>
            <h2 className="font-bold text-yellow-300">Como ganho pontos?</h2>
            <p className="text-gray-300">Votando em enquetes (+1 ponto por enquete).</p>
          </div>
          <div>
            <h2 className="font-bold text-yellow-300">Quanto custa criar uma enquete?</h2>
            <p className="text-gray-300">5 pontos.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

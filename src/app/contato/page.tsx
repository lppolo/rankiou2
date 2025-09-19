export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">Contato</h1>
        <form className="space-y-4">
          <input id="contact-name" name="name" className="w-full bg-gray-900 text-white px-3 py-2 rounded border border-gray-700" placeholder="Seu nome" />
          <input id="contact-email" name="email" type="email" className="w-full bg-gray-900 text-white px-3 py-2 rounded border border-gray-700" placeholder="Seu e-mail" />
          <textarea id="contact-message" name="message" className="w-full bg-gray-900 text-white px-3 py-2 rounded border border-gray-700" rows={5} placeholder="Sua mensagem" />
          <button className="px-6 py-2 bg-yellow-400 text-black rounded font-bold">Enviar</button>
        </form>
      </div>
    </div>
  );
}

import CardEnquete from "../../components/CardEnquete";

// Mock de enquetes para o feed
const enquetes = [
  {
    id: 1,
    titulo: "Qual o melhor filme de herói?",
    opcoes: ["Batman", "Homem-Aranha", "Superman", "Mulher-Maravilha"],
    votos: [12, 8, 5, 3],
    categoria: "Filmes & Séries",
    modo: "Mundo",
    imagem: "/images/filme.jpg",
    favorita: false,
    votada: false,
    aberta: false,
  },
  {
    id: 2,
    titulo: "Qual a melhor pizzaria de São Paulo?",
    opcoes: ["Bráz", "1900", "Pizza Hut", "Dominos"],
    votos: [22, 15, 7, 2],
    categoria: "Comida",
    modo: "Local",
    imagem: "/images/pizza.jpg",
    favorita: true,
    votada: true,
    aberta: false,
  },
  {
    id: 3,
    titulo: "Qual o rolê deste sábado em Salvador?",
    opcoes: ["Show no Pelourinho", "Barzinho no Rio Vermelho", "Festa na Praia do Porto"],
    votos: [10, 14, 6],
    categoria: "Eventos",
    modo: "Rolê",
    imagem: "/images/role.jpg",
    favorita: false,
    votada: false,
    aberta: true,
  },
];

export default function FeedPage() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {enquetes.map((enquete) => (
        <CardEnquete
          key={enquete.id}
          title={enquete.titulo}
          category={enquete.categoria}
          options={enquete.opcoes.map((text, idx) => ({
            id: `${enquete.id}-${idx}`,
            text,
            votes: enquete.votos[idx] || 0,
          }))}
          votedOptionId={enquete.votada ? `${enquete.id}-0` : undefined}
        />
      ))}
    </section>
  );
}

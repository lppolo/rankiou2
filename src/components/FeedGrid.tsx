"use client";
import { useSearchParams } from "next/navigation";
import CardEnquete from "./CardEnquete";

const enquetes = [
  { id: 1, titulo: "Qual o melhor filme de herói?", opcoes: ["Batman","Homem-Aranha","Superman","Mulher-Maravilha"], votos:[12,8,5,3], categoria:"Filmes & Séries", modo:"mundo" },
  { id: 2, titulo: "Qual a melhor pizzaria de São Paulo?", opcoes: ["Bráz","1900","Pizza Hut","Dominos"], votos:[22,15,7,2], categoria:"Comida", modo:"local" },
  { id: 3, titulo: "Qual o rolê deste sábado em Salvador?", opcoes: ["Show no Pelourinho","Barzinho no Rio Vermelho","Festa na Praia do Porto"], votos:[10,14,6], categoria:"Eventos", modo:"role" },
];

export default function FeedGrid(){
  const params = useSearchParams();
  const modo = params?.get("modo") || "mundo";
  const categoria = params?.get("categoria") || "todas";
  const q = (params?.get("q") || "").toLowerCase();

  const filtered = enquetes.filter(e=>
    (modo? e.modo===modo : true) &&
    (categoria!=="todas"? e.categoria===categoria : true) &&
    (q? (e.titulo.toLowerCase().includes(q) || e.opcoes.some(o=>o.toLowerCase().includes(q))) : true)
  );

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filtered.map(enquete=> (
        <CardEnquete
          key={enquete.id}
          pollId={`${enquete.id}`}
          title={enquete.titulo}
          category={enquete.categoria}
          options={enquete.opcoes.map((text, idx)=>({ id:`${enquete.id}-${idx}`, text, votes: enquete.votos[idx]||0 }))}
        />
      ))}
    </section>
  );
}

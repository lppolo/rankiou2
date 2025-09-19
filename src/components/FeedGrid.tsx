"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import CardEnquete from "./CardEnquete";
import { getPolls } from "../lib/game";

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

  const [userPolls, setUserPolls] = useState<any[]>([]);
  const [city, setCity] = useState<string>('');
  useEffect(()=>{ 
    setUserPolls(getPolls());
    try{ setCity(localStorage.getItem('rankiou_city') || ''); }catch{}
  },[]);

  const list: any[] = useMemo(()=> {
    const mappedUser = userPolls.map(p=> ({ id:p.id, titulo:p.titulo, opcoes:p.opcoes, votos:p.votos, categoria:p.categoria||'Outras', modo:p.modo||'mundo', cidade: p.cidade }));
    return [...mappedUser, ...enquetes];
  },[userPolls]);

  const filtered = list.filter(e=>
    (modo? e.modo===modo : true) &&
    (modo==='local' ? (!!city && (e.cidade ? e.cidade===city : true)) : true) &&
    (categoria!=="todas"? e.categoria===categoria : true) &&
    (q? (e.titulo.toLowerCase().includes(q) || e.opcoes.some((o:string)=>o.toLowerCase().includes(q))) : true)
  );

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {modo==='local' && !city && (
        <div className="md:col-span-2 lg:col-span-3 p-3 rounded bg-yellow-900/30 border border-yellow-700 text-yellow-200">
          Defina sua cidade no Perfil para ver enquetes locais.
        </div>
      )}
      {filtered.map((enquete: any)=> (
        <CardEnquete
          key={enquete.id}
          pollId={`${enquete.id}`}
          title={enquete.titulo}
          category={enquete.categoria}
          scope={(enquete.modo||'mundo').toUpperCase()}
          options={(enquete.opcoes as string[]).map((text: string, idx: number)=>({ id:`${enquete.id}-${idx}`, text, votes: (enquete.votos as number[])[idx]||0 }))}
        />
      ))}
    </section>
  );
}

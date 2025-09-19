"use client";
import { useEffect, useState } from "react";
import { getReports } from "../../lib/game";

const tabs = ["Dashboard","Denúncias","Enquetes","Anúncios","Usuários","Notificações","Mensagens","Cards","Categorias"] as const;
type Tab = typeof tabs[number];

export default function AdminPage(){
  const [tab, setTab] = useState<Tab>("Dashboard");
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">Painel de Admin</h1>
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(t=> (
            <button key={t} onClick={()=>setTab(t)} className={`px-3 py-1 rounded border ${tab===t? 'bg-yellow-400 text-black border-yellow-400':'bg-gray-900 text-gray-200 border-gray-700'}`}>{t}</button>
          ))}
        </div>
        {tab==="Dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[{k:"Usuários",v:123},{k:"Enquetes",v:456},{k:"Denúncias",v:getReports().length}].map(c=>(
              <div key={c.k} className="bg-gray-900 p-6 rounded border border-gray-800">
                <div className="text-3xl font-extrabold text-yellow-300">{c.v}</div>
                <div className="text-gray-400">{c.k}</div>
              </div>
            ))}
          </div>
        )}
        {tab==="Denúncias" && <DenunciasTable />}
        {tab==="Enquetes" && <AdminTable title="Enquetes" />}
        {tab==="Anúncios" && <AdminTable title="Anúncios" />}
        {tab==="Usuários" && <AdminTable title="Usuários" />}
        {tab==="Notificações" && <AdminTable title="Notificações" />}
        {tab==="Mensagens" && <AdminTable title="Mensagens" />}
        {tab==="Cards" && <AdminTable title="Criação de Cards" />}
        {tab==="Categorias" && <AdminTable title="Categorias" />}
      </div>
    </div>
  );
}

function DenunciasTable(){
  const [reports, setReports] = useState<string[]>([]);
  useEffect(()=>{ setReports(getReports()); },[]);
  return (
    <div className="bg-gray-900 rounded border border-gray-800">
      <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
        <h2 className="text-lg font-bold text-yellow-300">Denúncias</h2>
      </div>
      {reports.length===0 ? (
        <div className="p-6 text-gray-400">Sem denúncias por enquanto.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="text-gray-400">
              <tr>
                <th className="px-4 py-2">Poll ID</th>
                <th className="px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(id=> (
                <tr key={id} className="border-t border-gray-800">
                  <td className="px-4 py-2">{id}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button className="px-2 py-1 bg-cyan-400 text-black rounded">Revisar</button>
                    <button className="px-2 py-1 bg-red-500 text-white rounded">Remover</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function AdminTable({ title }: { title: string }){
  return (
    <div className="bg-gray-900 rounded border border-gray-800">
      <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
        <h2 className="text-lg font-bold text-yellow-300">{title}</h2>
        <button className="px-3 py-1 bg-yellow-400 text-black rounded font-bold">Novo</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="text-gray-400">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Título</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {[1,2,3].map(i=> (
              <tr key={i} className="border-t border-gray-800">
                <td className="px-4 py-2">{i}</td>
                <td className="px-4 py-2">Item {i}</td>
                <td className="px-4 py-2">Pendente</td>
                <td className="px-4 py-2 space-x-2">
                  <button className="px-2 py-1 bg-cyan-400 text-black rounded">Editar</button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded">Apagar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

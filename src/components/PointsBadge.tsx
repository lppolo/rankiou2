"use client";
import { useEffect, useState } from "react";

export default function PointsBadge(){
  const [points, setPoints] = useState<number>(0);

  useEffect(()=>{
    const read = () => setPoints(parseInt(localStorage.getItem('rankiou_points')||'0'));
    read();
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'rankiou_points') read();
    };
    window.addEventListener('storage', onStorage);
    const id = setInterval(read, 1000);
    return () => { window.removeEventListener('storage', onStorage); clearInterval(id); };
  },[]);

  return (
    <span className="flex items-center gap-1 bg-gray-800 px-2 py-1 rounded text-yellow-300 font-bold"><span>💰</span> <span>{points}</span></span>
  );
}

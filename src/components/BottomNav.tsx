"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav(){
  const path = usePathname();
  const is = (p:string)=> path===p;
  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-gray-900 border-t border-gray-800 z-30">
      <div className="grid grid-cols-5 items-center text-center">
        <Link href="/" className={`py-3 ${is('/')?'text-yellow-300':'text-gray-300'}`}>Início</Link>
        <Link href="/rankards" className={`py-3 ${is('/rankards')?'text-yellow-300':'text-gray-300'}`}>Rankards</Link>
        <Link href="/criar" className="py-3 text-black">
          <span className="inline-flex w-12 h-12 -mt-6 items-center justify-center rounded-full bg-yellow-400 text-3xl font-extrabold">+</span>
        </Link>
        <Link href="/acompanhar" className={`py-3 ${is('/acompanhar')?'text-yellow-300':'text-gray-300'}`}>Acompanhar</Link>
        <Link href="/profile" className={`py-3 ${is('/profile')?'text-yellow-300':'text-gray-300'}`}>Perfil</Link>
      </div>
    </nav>
  );
}

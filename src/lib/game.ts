"use client";

export type Rankard = {
  id: string;
  rarity: "Comum" | "Raro" | "Épico" | "Lendário";
  category?: "ANIMAL" | "HUMANO"; // Tornando opcional
  stage: 0 | 1 | 2 | 3; // Adicionando 0 para Ovo
  progress?: { votes: number; votesRequired: number; creates: number; createsRequired: number };
};

const PKEY = 'rankiou_points';
const RKEY = 'rankiou_rankards';
const FKEY = 'rankiou_favorites';
const POLLS_KEY = 'rankiou_polls';
const REPORTS_KEY = 'rankiou_reports';

export function getPoints(){
  try { return parseInt(localStorage.getItem(PKEY)||'0'); } catch { return 0; }
}
export function setPoints(v:number){
  try { localStorage.setItem(PKEY, String(Math.max(0, v))); } catch {}
}
export function addPoints(v:number){ setPoints(getPoints()+v); }
export function spendPoints(v:number): boolean { 
  const current = getPoints();
  if (current < v) return false;
  setPoints(current - v);
  return true;
}

export function getFavorites(): string[]{
  try{ return JSON.parse(localStorage.getItem(FKEY)||'[]'); }catch{ return []; }
}
export function setFavorites(list: string[]){ try { localStorage.setItem(FKEY, JSON.stringify(list)); } catch {} }
export function toggleFavorite(id: string){
  const fav = new Set(getFavorites());
  let isFavNow = false;
  if (fav.has(id)) {
    fav.delete(id);
  } else {
    fav.add(id);
    isFavNow = true;
  }
  setFavorites(Array.from(fav));
  return isFavNow;
}

export function getRankards(): Rankard[]{
  try{ return JSON.parse(localStorage.getItem(RKEY)||'[]'); }catch{ return []; }
}
export function setRankards(list: Rankard[]){ try { localStorage.setItem(RKEY, JSON.stringify(list)); } catch {} }
export function addRankard(r: Omit<Rankard, 'id'>): Rankard {
  const newRankard = { ...r, id: Date.now().toString(36) + Math.random().toString(36).substring(2) };
  setRankards([...getRankards(), newRankard]);
  return newRankard;
}

export function incrementVoteMission(){
  try {
    const list = getRankards();
    for (const r of list){
      if (r.stage > 0 && r.stage<3 && r.progress){
        if (r.progress.votes < r.progress.votesRequired){ r.progress.votes++; break; }
      }
    }
    setRankards(list);
  } catch {}
}
export function incrementCreateMission(){
  try {
    const list = getRankards();
    for (const r of list){
      if (r.stage > 0 && r.stage<3 && r.progress){
        if (r.progress.creates < r.progress.createsRequired){ r.progress.creates++; break; }
      }
    }
    setRankards(list);
  } catch {}
}

export function canEvolveRankard(r: Rankard): boolean {
  if (r.stage === 0) return true; // Ovo evolui livre para Bebê
  if (!r.progress) return false;
  return r.progress.votes >= r.progress.votesRequired && r.progress.creates >= r.progress.createsRequired;
}

export function evolveRankard(id: string): boolean {
  try {
    const list = getRankards();
    const idx = list.findIndex(r=>r.id===id);
    if (idx>=0){
      const r = list[idx];
      if (r.stage === 0) {
        r.stage=1; 
        r.progress = { votes:0, votesRequired:5, creates:0, createsRequired:1 }; 
      } else if (r.stage===1){ 
        if (!canEvolveRankard(r)) return false;
        r.stage=2; 
        r.progress = { votes:0, votesRequired:15, creates:0, createsRequired:3 }; 
      } else if (r.stage===2){ 
        if (!canEvolveRankard(r)) return false;
        r.stage=3; 
        delete r.progress; 
      } else {
        return false; // Já está no estágio máximo
      }
      list[idx]=r;
      setRankards(list);
      return true;
    }
    return false;
  } catch { return false; }
}

export function getPolls(){
  try{ return JSON.parse(localStorage.getItem(POLLS_KEY)||'[]'); }catch{ return []; }
}
export function addPoll(poll:any){ 
  try { localStorage.setItem(POLLS_KEY, JSON.stringify([poll, ...getPolls()])); } catch {}
}

export function getReports(): string[] {
  try { return JSON.parse(localStorage.getItem(REPORTS_KEY) || '[]'); } catch { return []; }
}

export function addReport(pollId: string) {
  try {
    const reports = new Set(getReports());
    reports.add(pollId);
    localStorage.setItem(REPORTS_KEY, JSON.stringify(Array.from(reports)));
  } catch {}
}

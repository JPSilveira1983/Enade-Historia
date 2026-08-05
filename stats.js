const KEYS={sessions:'enade.sessions.v2',favorites:'enade.favorites.v2',review:'enade.review.v2'};
const read=(key,fallback=[])=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
const write=(key,value)=>localStorage.setItem(key,JSON.stringify(value));
export const getSessions=()=>read(KEYS.sessions);
export const getSet=kind=>new Set(read(KEYS[kind]));
export function toggleSet(kind,id){const set=getSet(kind);set.has(id)?set.delete(id):set.add(id);write(KEYS[kind],[...set]);return set;}
export function saveSession(session){const sessions=getSessions();sessions.unshift(session);write(KEYS.sessions,sessions.slice(0,50));}
export function clearStats(){localStorage.removeItem(KEYS.sessions);}
export function summary(sessions=getSessions()){
  const answered=sessions.reduce((n,s)=>n+s.respondidas,0), correct=sessions.reduce((n,s)=>n+s.acertos,0);
  const byCategory={}; sessions.forEach(s=>Object.entries(s.porCategoria||s.porTema||{}).forEach(([k,v])=>{byCategory[k]??={acertos:0,total:0};byCategory[k].acertos+=v.acertos;byCategory[k].total+=v.total;}));
  return {sessions:sessions.length,answered,correct,rate:answered?Math.round(correct/answered*100):0,byCategory};
}

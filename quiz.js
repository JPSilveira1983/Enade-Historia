export function normalizeDatabase(payload) {
  const list = Array.isArray(payload) ? payload : payload?.questoes;
  if (!Array.isArray(list)) throw new Error('O JSON precisa conter uma lista em “questoes”.');
  return list.filter(q => q && q.id != null && q.enunciado && Array.isArray(q.alternativas)).map(q => ({
    ...q,
    id:String(q.id),
    categoria:q.categoria || q.tema || q.area || 'Geral',
    correta:q.correta == null ? null : Number(q.correta),
    anulada:Boolean(q.anulada || q.correta == null)
  }));
}
export function filterQuestions(list, filters) {
  const term = filters.busca.trim().toLocaleLowerCase('pt-BR');
  return list.filter(q =>
    !q.anulada &&
    (!filters.ano || String(q.year) === filters.ano) &&
    (!filters.categoria || q.categoria === filters.categoria) &&
    (!filters.favoritos || filters.favoritos.has(q.id)) &&
    (!filters.revisao || filters.revisao.has(q.id)) &&
    (!term || `${q.enunciado} ${q.area} ${q.origem || ''}`.toLocaleLowerCase('pt-BR').includes(term))
  );
}
export function shuffled(list) {
  const copy=[...list]; for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];} return copy;
}
export function unique(list,key){ return [...new Set(list.map(x=>x[key]).filter(Boolean))].sort((a,b)=>String(a).localeCompare(String(b),'pt-BR',{numeric:true})); }

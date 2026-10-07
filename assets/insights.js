(() => {
'use strict';
const $ = id => document.getElementById(id);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const num = n => Number(n).toLocaleString('pt-BR');
const pct = (n, digits=1) => Number(n).toLocaleString('pt-BR',{minimumFractionDigits:digits,maximumFractionDigits:digits});
const date = d => new Date(d+'T12:00:00Z').toLocaleDateString('pt-BR',{timeZone:'UTC'});
const short = d => date(d).slice(0,5);
const link = (url,label) => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`;
let study, polls, context, scenario;
const colors = ['#013f88','#7fc341','#e4142c','#dfe5ed'];
function overview(){
 const t=study.totais.governador;
 $('overview-results').innerHTML=[...t.candidatos].sort((a,b)=>b.votos-a.votos).map(c=>`<div class="result-row" data-candidate="${c.chave}"><div class="result-label"><span>${esc(c.nome)}</span><strong>${pct(c.votos/t.base_percentual*100,2)}<small>%</small></strong></div><div class="result-bar"><span style="width:${c.votos/t.base_percentual*100}%"></span></div><p class="result-votes">${num(c.votos)} votos</p></div>`).join('');
 $('overview-base').textContent=`Base divulgada: ${num(t.base_percentual)} votos nominais, incluindo ${num(t.subjudice)} sub judice.`;
 $('state-metrics').innerHTML=[['Eleitorado apto',num(t.eleitorado),'Governo · primeiro turno'],['Comparecimento',pct(t.comparecimento/t.eleitorado*100)+'%',num(t.comparecimento)+' eleitores'],['Abstenção',pct(t.abstencoes/t.eleitorado*100)+'%',num(t.abstencoes)+' eleitores'],['Brancos e nulos',pct((t.brancos+t.nulos)/t.comparecimento*100)+'%',num(t.brancos+t.nulos)+' votos · base: comparecimento']].map(([label,value,note])=>`<article class="metric-card"><span>${label}</span><strong>${value}</strong><p>${note}</p></article>`).join('');
}
function renderPolls(){
 const basis=$('poll-basis').value, a=basis==='segundo'?'segundo_paes':'paes_'+basis,b=basis==='segundo'?'segundo_ruas':'ruas_'+basis;
 const rows=polls.filter(p=>Number.isFinite(p[a])&&Number.isFinite(p[b]));
 $('poll-chart-title').textContent=basis==='segundo'?'Intenção de voto · cenário de segundo turno':`Primeiro turno · ${basis==='total'?'total de entrevistados':'votos válidos'}`;
 $('poll-legend').innerHTML='<span><i></i>Eduardo Paes</span><span><i class="candidate-b"></i>Douglas Ruas</span>';
 const w=720,h=310,left=44,right=48,top=27,bottom=57;
 const first=new Date(rows[0].campo_fim).getTime(),last=new Date(rows.at(-1).campo_fim).getTime();
 const x=p=>left+(new Date(p.campo_fim).getTime()-first)/(last-first||1)*(w-left-right), y=v=>h-bottom-v/70*(h-top-bottom);
 let svg=`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc($('poll-chart-title').textContent)}. ${rows.length} rodadas anteriores ao primeiro turno.">`;
 for(let v=0;v<=70;v+=10) svg+=`<path d="M${left} ${y(v)}H${w-right}" stroke="#e5ebf2" stroke-width="1"/><text x="${left-8}" y="${y(v)+4}" text-anchor="end" fill="#66778d" stroke="none" font-size="10">${v}%</text>`;
 rows.forEach(p=>svg+=`<text x="${x(p)}" y="${h-bottom+22}" text-anchor="middle" fill="#66778d" stroke="none" font-size="10">${short(p.campo_fim)}</text>`);
 [[a,'#013f88','Eduardo Paes'],[b,'#e4142c','Douglas Ruas']].forEach(([key,color,name])=>{
  svg+=`<polyline points="${rows.map(p=>x(p)+','+y(p[key])).join(' ')}" fill="none" stroke="${color}" stroke-width="3"/>`;
  rows.forEach(p=>svg+=`<g><circle cx="${x(p)}" cy="${y(p[key])}" r="5" fill="${color}" stroke="white" stroke-width="2"><title>${name}, campo ${date(p.campo_inicio)} a ${date(p.campo_fim)}: ${p[key]}%</title></circle><text x="${x(p)}" y="${y(p[key])-12}" text-anchor="middle" fill="${color}" stroke="none" font-size="12" font-weight="700">${p[key]}%</text></g>`);
 });
 $('poll-chart').innerHTML=svg+'</svg>';
 $('poll-chart-note').textContent=`${rows.length} rodadas · eixo horizontal: fim da coleta. Campo de ${date(rows[0].campo_inicio)} a ${date(rows.at(-1).campo_fim)}. Todas anteriores à votação de 04/10. ${basis==='segundo'?'A rodada de agosto não divulgou esse confronto nesta base.':'Cenário com Garotinho.'}`;
 $('poll-reading-title').textContent=`${rows.length} fotografias anteriores à votação.`;
 $('poll-reading').textContent=`Na série selecionada, Paes passou de ${rows[0][a]}% para ${rows.at(-1)[a]}%; Ruas, de ${rows[0][b]}% para ${rows.at(-1)[b]}%. São variações descritivas entre amostras distintas. Não demonstram transferência individual de votos nem medem preferências depois do primeiro turno.`;
 $('poll-table').innerHTML=rows.map(p=>`<tr><td>${short(p.campo_inicio)}–${date(p.campo_fim)}<small style="display:block">Publicação: ${date(p.publicacao)}</small></td><td>${esc(p.instituto)}<small style="display:block">${esc(p.registro)}</small></td><td><strong>${p[a]}%</strong></td><td><strong>${p[b]}%</strong></td><td>${num(p.amostra)} entrevistas<br>±${p.margem_erro_pp} p.p. · ${p.confianca_pct}% de confiança<br>${p.municipios_amostrados} municípios · presencial</td><td>${link(p.fonte,'Publicação')}</td></tr>`).join('');
 const latest=polls.at(-1),r=[...polls].reverse().find(p=>p.rejeicao_paes!==null&&p.rejeicao_ruas!==null);
 $('poll-extra').innerHTML=`<article class="mini-card"><span class="eyebrow">REJEIÇÃO · CAMPO ATÉ ${short(r.campo_fim)}</span><h3>Pergunta com múltiplas respostas</h3><div class="mini-values"><strong>${r.rejeicao_paes}%<small>Eduardo Paes</small></strong><strong>${r.rejeicao_ruas}%<small>Douglas Ruas</small></strong></div><p>${esc(r.base_rejeicao)} ${link(r.fonte,'Fonte')}</p></article><article class="mini-card"><span class="eyebrow">FIRMEZA · CAMPO ATÉ ${short(latest.campo_fim)}</span><h3>Decisão declarada</h3><div class="mini-values"><strong>${latest.decididos}%<small>Decididos</small></strong><strong>${latest.podem_mudar}%<small>Podem mudar</small></strong></div><p>${esc(latest.base_firmeza)} O restante inclui não resposta/arredondamento. ${link(latest.fonte,'Fonte')}</p></article><article class="mini-card"><span class="eyebrow">INDECISÃO · CAMPO ATÉ ${short(latest.campo_fim)}</span><h3>Duas perguntas, duas medidas</h3><div class="mini-values"><strong>${latest.indecisos_espontanea}%<small>Espontânea</small></strong><strong>${latest.indecisos_estimulada}%<small>Estimulada</small></strong></div><p>Primeiro turno. A espontânea não apresenta os nomes; a estimulada apresenta. Percentuais não devem ser somados. ${link(latest.fonte,'Fonte')}</p></article>`;
}
function opinion(){
 const p=context.prioridades,k=context.conhecimento;
 $('priority-bars').innerHTML=p.valores.map(v=>`<div class="horizontal-bar"><span>${esc(v.tema)}</span><div class="bar-track"><span style="width:${v.pct}%"></span></div><strong>${v.pct}%</strong></div>`).join('');
 $('priority-source').innerHTML=`${esc(p.instituto)} · campo ${date(p.campo_inicio)}–${date(p.campo_fim)} · ${num(p.amostra)} entrevistas · ±${p.margem_erro_pp} p.p. · ${esc(p.registro)}. ${link(p.fonte+'#page='+p.pagina,'Pergunta e resultados, p. '+p.pagina)}.`;
 $('knowledge-chart').innerHTML=[['paes','Eduardo Paes'],['ruas','Douglas Ruas']].map(([key,name])=>`<div class="knowledge-row"><h4>${name}</h4><div style="display:flex;height:30px;border-radius:5px;overflow:hidden" role="img" aria-label="${esc(name+': '+k.categorias.map((c,i)=>c+' '+k[key][i]+'%').join(', '))}">${k[key].map((v,i)=>`<span style="width:${v}%;background:${colors[i]};color:${i===3?'#182d49':'white'};text-align:center;font-size:10px;line-height:30px" title="${esc(k.categorias[i])}: ${v}%">${v}%</span>`).join('')}</div></div>`).join('')+`<div class="knowledge-legend">${k.categorias.map(c=>`<span><i></i>${esc(c)}</span>`).join('')}</div>`;
 $('knowledge-source').innerHTML=`Campo ${date(k.campo_inicio)}–${date(k.campo_fim)} · ${num(k.amostra)} entrevistas · ±${k.margem_erro_pp} p.p. · ${esc(k.registro)}. ${esc(k.nota)} ${link(k.fonte+'#page=32','Documento, pp. 32–33')}.`;
}
function defaults(){
 const t=study.totais.governador;
 $('sim-turnout').value=(100*t.comparecimento/t.eleitorado).toFixed(1);
 $('sim-invalid').value=(100*(t.brancos+t.nulos)/t.comparecimento).toFixed(1);
 const a=t.candidatos.find(c=>c.chave==='paes').votos,b=t.candidatos.find(c=>c.chave==='douglas').votos;
 $('sim-share').value=(100*a/(a+b)).toFixed(1);
 $('sim-baseline-note').textContent='Referências iniciais: eleitorado e participação do primeiro turno, arredondados a uma casa decimal. A divisão inicial normaliza apenas os votos de Paes e Ruas no primeiro turno. Não atribui preferências futuras a outros eleitores nem usa a pesquisa como previsão.';
 simulate();
}
function simulate(){
 const e=study.totais.governador.eleitorado,t=Number($('sim-turnout').value),i=Number($('sim-invalid').value),s=Number($('sim-share').value);
 const cast=Math.round(e*t/100),invalid=Math.round(cast*i/100),valid=cast-invalid,paes=Math.round(valid*s/100),ruas=valid-paes;
 scenario={eleitorado:e,comparecimento_pct:t,brancos_nulos_pct:i,paes_pct:s,comparecimento:cast,brancos_nulos:invalid,nominais:valid,paes,ruas,abstencoes:e-cast};
 $('turnout-output').textContent=pct(t)+'%';$('invalid-output').textContent=pct(i)+'%';$('share-output').textContent=pct(s)+'%';
 $('sim-result').innerHTML=[['Eduardo Paes',s,paes,'#fff'],['Douglas Ruas',100-s,ruas,'#fb8290']].map(([name,share,votes,color])=>`<div class="sim-result-row"><div><span>${name}</span><strong>${pct(share)}<small>%</small></strong></div><div class="sim-bar"><span style="display:block;height:100%;width:${share}%;background:${color}"></span></div><p>${num(votes)} votos hipotéticos</p></div>`).join('')+`<div class="sim-total-grid">${[['Comparecimento',cast],['Votos nominais',valid],['Brancos e nulos',invalid],['Abstenções',e-cast]].map(([label,value])=>`<div><span>${label}</span><strong>${num(value)}</strong></div>`).join('')}</div><p class="sim-margin">Diferença hipotética: ${num(Math.abs(paes-ruas))} votos. ${paes===ruas?'Distribuição igual.':'Maior total: '+(paes>ruas?'Eduardo Paes':'Douglas Ruas')+'.'}</p>`;
}
function downloadScenario(){
 const csv='\ufeffindicador;valor\r\nconsulta_base;2026-10-07\r\ntipo;Hipótese estadual de segundo turno — não é previsão\r\n'+Object.entries(scenario).map(([k,v])=>k+';'+String(v).replace('.',',')).join('\r\n');
 const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='viravoto-cenario-estadual.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function history(){
 const label=r=>`${r.ano} · ${r.cargo==='governador'?'Governo':'Presidente'} · ${r.turno}º turno`;
 $('turnout-history').innerHTML=study.historico.map(r=>`<div class="history-bar ${r.ano===2026?'current':''}"><div class="history-bar-label"><span>${label(r)}</span><strong>${pct(r.abstencao_pct,2)}%</strong></div><div class="history-track"><span style="width:${r.abstencao_pct/30*100}%"></span></div></div>`).join('');
 $('invalid-history').innerHTML=study.historico.map(r=>`<div class="history-bar"><div class="history-bar-label"><span>${label(r)}</span><strong>B ${pct(r.brancos_pct,2)}% · N ${pct(r.nulos_pct,2)}%</strong></div><div class="history-track invalid"><span style="width:${r.brancos_pct/20*100}%"></span><span style="width:${r.nulos_pct/20*100}%"></span></div></div>`).join('');
 $('history-table').innerHTML=study.historico.map(r=>`<tr><td>${label(r)}</td>${['eleitorado','comparecimento','abstencoes','brancos','nulos'].map(k=>`<td>${num(r[k])}</td>`).join('')}<td>${link(r.fonte,'TSE')}</td></tr>`).join('');
 const before=study.historico.find(r=>r.ano===2022&&r.cargo==='governador'),now=study.historico.find(r=>r.ano===2026&&r.cargo==='governador');
 $('history-reading').textContent=`Na eleição de governador, comparando primeiros turnos, a abstenção variou +${pct(now.abstencao_pct-before.abstencao_pct,2)} p.p. e brancos+nulos variaram ${pct(now.brancos_pct+now.nulos_pct-before.brancos_pct-before.nulos_pct,2)} p.p. Essas diferenças não identificam motivos nem preferência eleitoral. Escalas dos gráficos: 0–30% na abstenção; 0–20% em brancos e nulos.`;
}
function proposals(index=0){
 const p=context.propostas[index];
 $('proposal-tabs').innerHTML=context.propostas.map((r,i)=>`<button type="button" data-theme="${i}" aria-pressed="${index===i}">${esc(r.tema)}</button>`).join('');
 $('proposal-content').innerHTML=['paes','ruas'].map(k=>`<article class="proposal-card"><span class="eyebrow">${esc(p.tema)}</span><h3>${esc(context.programas[k].nome)}</h3><p class="proposal-text">${esc(p[k])}</p><p><strong>Prazo no trecho</strong><br>${esc(p[k+'_prazo'])}</p><p class="panel-note">Custo e viabilidade não avaliados neste comparativo.</p>${link(p[k+'_documento']+'#page='+p[k+'_paginas'].split(/[,–]/)[0],'Conferir páginas '+p[k+'_paginas'])}</article>`).join('');
}
function sources(){
 $('program-links').innerHTML=Object.values(context.programas).map(p=>`<div><strong>${esc(p.nome)}</strong> · ${esc(p.titulo)} · ${p.paginas} páginas<br>${link(p.oficial,'Referência TSE')} · ${link(p.espelho,'Cópia consultada')}</div>`).join('');
 $('data-status-grid').innerHTML=context.lacunas.map(l=>`<article class="status-card"><span class="badge badge-amber">${esc(l.estado)}</span><h3>${esc(l.titulo)}</h3><p>${esc(l.descricao)}</p></article>`).join('');
}
async function init(){
 try {
  [study,polls,context]=await Promise.all(['estudo','pesquisas','contexto'].map(async file=>{const r=await fetch('assets/'+file+'.json');if(!r.ok)throw new Error('Falha nos dados');return r.json();}));
  overview();renderPolls();opinion();defaults();history();proposals();sources();$('insights-error').hidden=true;
 }catch(error){$('insights-error').hidden=false;console.error('Vira Voto: módulos indisponíveis',error);}
}
$('poll-basis').addEventListener('change',()=>polls&&renderPolls());
['sim-turnout','sim-invalid','sim-share'].forEach(id=>$(id).addEventListener('input',()=>study&&simulate()));
$('reset-simulation').addEventListener('click',()=>study&&defaults());
$('download-scenario').addEventListener('click',()=>scenario&&downloadScenario());
$('proposal-tabs').addEventListener('click',e=>{const button=e.target.closest('[data-theme]');if(button&&context)proposals(Number(button.dataset.theme));});
$('retry-insights').addEventListener('click',init);
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)document.querySelectorAll('.sidebar nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+entry.target.id));}),{rootMargin:'-15% 0px -65% 0px'});document.querySelectorAll('main section[id]').forEach(section=>observer.observe(section));}
init();
})();

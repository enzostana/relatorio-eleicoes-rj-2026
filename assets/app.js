'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const nf = new Intl.NumberFormat('pt-BR');
  const dec = new Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  const n = v => nf.format(v);
  const pct = v => `${dec.format(v)}%`;
  const pp = v => `${dec.format(v)} p.p.`;
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const group = d => `${d.lider_governador === 'DOUGLAS RUAS' ? 'ruas' : 'paes'}-${d.lider_presidente === 'LULA' ? 'lula' : 'flavio'}`;
  const labels = {'ruas-flavio':'Ruas + Flávio','paes-lula':'Paes + Lula','paes-flavio':'Paes + Flávio','ruas-lula':'Ruas + Lula'};
  const colors = {'ruas-flavio':'#71849d','paes-lula':'#013f88','paes-flavio':'#7fc341','ruas-lula':'#e4142c'};
  const races = {governador:{leader:'Douglas Ruas',second:'Eduardo Paes',a:'douglas',b:'paes',title:'governador'},presidente:{leader:'Flávio Bolsonaro',second:'Lula',a:'flavio',b:'lula',title:'presidente'}};
  const state = {data:[],race:'governador',rankingSort:'relative',page:1,quick:'all',selected:'3303955',mapGroup:'',zoom:1};
  const gap = (d,r) => d[`${races[r].a}_votos`] - d[`${races[r].b}_votos`];
  const margin = (d,r) => d[`${races[r].a}_pct`] - d[`${races[r].b}_pct`];
  const badge = d => `<span class="group-badge"><i class="dot ${group(d)}"></i>${labels[group(d)]}</span>`;
  const detailButton = d => `<button type="button" class="detail-button" data-detail="${d.codigo_ibge}" aria-label="Ver detalhes de ${esc(d.municipio)}">↗</button>`;
  function argument(d,r) {
    const info=races[r],g=gap(d,r),leader=g>0?info.leader:info.second,second=g>0?info.second:info.leader;
    return `<strong>${esc(leader)}</strong> ficou à frente de ${esc(second)} por <strong>${n(Math.abs(g))} votos (${pp(Math.abs(margin(d,r)))})</strong> no primeiro turno. A diferença descreve o resultado municipal. Os totais não identificam escolhas individuais nem a disposição das pessoas para mudar de preferência.`;
  }
  function voteRow(d,key,label) {
    return `<div class="vote-row"><span>${label}</span><strong>${pct(d[`${key}_pct`])}</strong></div><div class="vote-bar ${key}"><span style="width:${Math.min(100,Math.max(0,d[`${key}_pct`]))}%"></span></div>`;
  }
  function selectCity(id) {
    const d=state.data.find(x=>x.codigo_ibge===id);if(!d)return;state.selected=id;
    document.querySelectorAll('.municipality,.scatter-point').forEach(el=>el.classList.toggle('selected',el.dataset.id===id));
    $('map-inspector').innerHTML=`<span class="eyebrow">MUNICÍPIO EM FOCO</span><h3>${esc(d.municipio)}</h3><p class="region-label">${esc(d.regiao_intermediaria)} · Região IBGE</p>${badge(d)}<div class="inspector-race"><h4>GOVERNADOR</h4>${voteRow(d,'douglas','Douglas Ruas')}${voteRow(d,'paes','Eduardo Paes')}<p class="inspector-margin">Diferença: ${n(Math.abs(gap(d,'governador')))} votos · ${pp(Math.abs(margin(d,'governador')))}</p></div><div class="inspector-race"><h4>PRESIDENTE</h4>${voteRow(d,'lula','Lula')}${voteRow(d,'flavio','Flávio Bolsonaro')}<p class="inspector-margin">Diferença: ${n(Math.abs(gap(d,'presidente')))} votos · ${pp(Math.abs(margin(d,'presidente')))}</p></div><p class="inspector-footer">${n(d.governador_eleitorado)} eleitores aptos<br>Abstenção para governador: ${pct(d.governador_abstencao_pct)}</p><button type="button" class="button button-outline" data-detail="${d.codigo_ibge}">Abrir resultados ↗</button>`;
  }
  function renderScatter() {
    const w=850,h=420,p={l:63,r:30,t:35,b:55},xmin=-60,xmax=30,ymin=-30,ymax=60,x=v=>p.l+(v-xmin)/(xmax-xmin)*(w-p.l-p.r),y=v=>h-p.b-(v-ymin)/(ymax-ymin)*(h-p.t-p.b);
    let grid='';for(let v=-60;v<=20;v+=20){grid+=`<line x1="${x(v)}" x2="${x(v)}" y1="${p.t}" y2="${h-p.b}" stroke="#e7ebe4"/><text x="${x(v)}" y="${h-p.b+20}" text-anchor="middle" fill="#63716d" font-size="10">${v}</text>`;}for(let v=-20;v<=60;v+=20){grid+=`<line x1="${p.l}" x2="${w-p.r}" y1="${y(v)}" y2="${y(v)}" stroke="#e7ebe4"/><text x="${p.l-12}" y="${y(v)+4}" text-anchor="end" fill="#63716d" font-size="10">${v}</text>`;}
    const points=[...state.data].sort((a,b)=>Number(a.douglas_lula)-Number(b.douglas_lula)).map(d=>`<circle class="scatter-point" data-id="${d.codigo_ibge}" data-group="${group(d)}" cx="${x(d.lula_pct-d.flavio_pct)}" cy="${y(d.douglas_pct-d.paes_pct)}" r="${d.douglas_lula?6:4}" fill="${colors[group(d)]}" tabindex="0" role="button" aria-label="${esc(d.municipio)}"><title>${esc(d.municipio)}: Lula − Flávio ${pp(d.lula_pct-d.flavio_pct)}; Ruas − Paes ${pp(d.douglas_pct-d.paes_pct)}</title></circle>`).join('');
    $('scatter-host').innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="group" aria-label="Margens de governador e presidente nos 92 municípios">${grid}<line x1="${x(0)}" x2="${x(0)}" y1="${p.t}" y2="${h-p.b}" stroke="#89968d" stroke-dasharray="4 4"/><line x1="${p.l}" x2="${w-p.r}" y1="${y(0)}" y2="${y(0)}" stroke="#89968d" stroke-dasharray="4 4"/><text x="${p.l}" y="19" font-size="10" fill="#63716d">RUAS − PAES (p.p.)</text><text x="${w-p.r}" y="${h-10}" font-size="10" fill="#63716d" text-anchor="end">LULA − FLÁVIO (p.p.)</text>${points}<text x="${x(0.997611353)+11}" y="${y(8.072167354)-10}" fill="#956720" font-size="11" font-weight="bold">Pinheiral</text></svg>`;
  }
  function applyMapFilter() {
    document.querySelectorAll('.municipality,.scatter-point').forEach(el=>el.classList.toggle('dimmed',!!state.mapGroup&&el.dataset.group!==state.mapGroup));
    document.querySelectorAll('[data-map-group]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.mapGroup===state.mapGroup)));
  }
  function zoomMap(amount) {
    state.zoom=Math.max(1,Math.min(3,state.zoom+amount));const svg=$('municipal-map');if(!svg)return;
    const w=900/state.zoom,h=520/state.zoom;svg.setAttribute('viewBox',`${(900-w)/2} ${(520-h)/2} ${w} ${h}`);
    $('map-zoom-out').disabled=state.zoom===1;$('map-zoom-in').disabled=state.zoom===3;
  }
  function renderMunicipalities() {
    const query=normalize($('municipio-search').value.trim()),g=$('municipio-group').value,region=$('municipio-region').value,sort=$('municipio-sort').value;
    let list=state.data.filter(d=>(!query||normalize(d.municipio).includes(query))&&(!g||group(d)===g)&&(!region||d.regiao_intermediaria===region)&&(state.quick!=='lula'||d.lider_presidente==='LULA'));
    const key={ruas:'douglas_pct',paes:'paes_pct',lula:'lula_pct',flavio:'flavio_pct',electorate:'governador_eleitorado'}[sort];list.sort((a,b)=>(key?b[key]-a[key]:0)||a.municipio.localeCompare(b.municipio,'pt-BR'));
    const pages=Math.max(1,Math.ceil(list.length/12));state.page=Math.min(state.page,pages);
    $('municipio-count').textContent=`${list.length} ${list.length===1?'município encontrado':'municípios encontrados'} de 92`;
    $('municipio-body').innerHTML=list.slice((state.page-1)*12,state.page*12).map(d=>`<tr class="${d.douglas_lula?'is-pinheiral':''}"><td><button type="button" class="city-button" data-detail="${d.codigo_ibge}">${esc(d.municipio)}<small>${esc(d.regiao_intermediaria)}</small></button></td><td>${badge(d)}</td>${['douglas','paes','lula','flavio'].map(key=>`<td class="${((key==='douglas'&&d.lider_governador==='DOUGLAS RUAS')||(key==='paes'&&d.lider_governador==='EDUARDO PAES')||(key==='lula'&&d.lider_presidente==='LULA')||(key==='flavio'&&d.lider_presidente==='FLAVIO BOLSONARO'))?'winner-cell':''}">${pct(d[`${key}_pct`])}</td>`).join('')}<td>${pct(d.governador_abstencao_pct)}</td><td>${detailButton(d)}</td></tr>`).join('')||'<tr><td colspan="8">Nenhum município encontrado. Ajuste a busca ou limpe os filtros.</td></tr>';
    $('page-label').textContent=`${state.page} / ${pages}`;$('previous-page').disabled=state.page<=1;$('next-page').disabled=state.page>=pages;
    document.querySelectorAll('[data-quick]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.quick===state.quick)));
  }
  function showDetails(id) {
    const d=state.data.find(x=>x.codigo_ibge===id);if(!d)return;
    $('dialog-content').innerHTML=`<span class="eyebrow">RESULTADOS MUNICIPAIS · 1º TURNO</span><h2 id="dialog-title">${esc(d.municipio)}</h2><p class="region-label">${esc(d.regiao_imediata)} · Região imediata IBGE</p>${badge(d)}<div class="dialog-races"><div><h3>Governador</h3>${voteRow(d,'douglas','Douglas Ruas')}<p class="dialog-votes">${n(d.douglas_votos)} votos</p>${voteRow(d,'paes','Eduardo Paes')}<p class="dialog-votes">${n(d.paes_votos)} votos</p></div><div><h3>Presidente</h3>${voteRow(d,'lula','Lula')}<p class="dialog-votes">${n(d.lula_votos)} votos</p>${voteRow(d,'flavio','Flávio Bolsonaro')}<p class="dialog-votes">${n(d.flavio_votos)} votos</p></div></div><div class="dialog-argument"><h3>Resultado para ${races[state.race].title}</h3><p>${argument(d,state.race)}</p></div><div class="dialog-meta"><span>Eleitorado (governo): <strong>${n(d.governador_eleitorado)}</strong></span><span>Comparecimento: <strong>${n(d.governador_comparecimento)}</strong></span><span>Abstenção: <strong>${pct(d.governador_abstencao_pct)}</strong></span><span>Brancos / nulos: <strong>${n(d.governador_brancos)} / ${n(d.governador_nulos)}</strong></span><span>Base de governador: <strong>${n(d.governador_base_percentual)}</strong></span><span>Base de presidente: <strong>${n(d.presidente_base_percentual)}</strong></span></div><p class="dialog-note">Percentuais de cada cargo têm denominadores próprios; a base de governador inclui ${n(d.governador_subjudice)} votos sub judice.</p><p class="dialog-sources">Fontes oficiais do TSE: <a href="${esc(d.governador_url)}" target="_blank" rel="noopener">governador ↗</a> · <a href="${esc(d.presidente_url)}" target="_blank" rel="noopener">presidente ↗</a><br>Fotografia consultada em 07/10/2026. Registros de totalização: governo ${esc(d.governador_data)} ${esc(d.governador_hora)}; presidência ${esc(d.presidente_data)} ${esc(d.presidente_hora)}.</p>`;
    $('municipality-dialog').showModal();
  }
  function tooltip(el,event) {
    const d=state.data.find(x=>x.codigo_ibge===el.dataset.id);if(!d)return;const tip=$('map-tooltip'),stage=$('map-stage').getBoundingClientRect();
    tip.innerHTML=`<strong>${esc(d.municipio)}</strong><br>${labels[group(d)]}`;tip.hidden=false;
    const rect=el.getBoundingClientRect(),px=event?.clientX??rect.x+rect.width/2,py=event?.clientY??rect.y;
    tip.style.left=`${Math.max(8,Math.min(stage.width-205,px-stage.left+12))}px`;tip.style.top=`${Math.max(8,Math.min(stage.height-65,py-stage.top-60))}px`;
  }
  document.addEventListener('click',event=>{
    const detail=event.target.closest('[data-detail]');if(detail){showDetails(detail.dataset.detail);return;}
    const city=event.target.closest('.municipality,.scatter-point');if(city){selectCity(city.dataset.id);$('map-tooltip').hidden=true;return;}
    const viz=event.target.closest('[data-viz]');if(viz){document.querySelectorAll('[data-viz]').forEach(el=>el.setAttribute('aria-pressed',String(el===viz)));$('map-view').hidden=viz.dataset.viz!=='map';$('scatter-view').hidden=viz.dataset.viz!=='scatter';$('map-tooltip').hidden=true;return;}
    const filter=event.target.closest('[data-map-group]');if(filter){state.mapGroup=filter.dataset.mapGroup;applyMapFilter();return;}
    const quick=event.target.closest('[data-quick]');if(quick){state.quick=quick.dataset.quick;state.page=1;$('municipio-search').value='';$('municipio-region').value='';$('municipio-group').value=state.quick==='joint'?'ruas-lula':'';renderMunicipalities();}
  });
  $('map-stage').addEventListener('keydown',event=>{const city=event.target.closest('.municipality,.scatter-point');if(city&&(event.key==='Enter'||event.key===' ')){event.preventDefault();selectCity(city.dataset.id);}});
  $('map-stage').addEventListener('pointermove',event=>{const city=event.target.closest('.municipality,.scatter-point');if(city)tooltip(city,event);else $('map-tooltip').hidden=true;});
  $('map-stage').addEventListener('pointerleave',()=>{$('map-tooltip').hidden=true;});
  $('map-stage').addEventListener('focusin',event=>{const city=event.target.closest('.municipality,.scatter-point');if(city)tooltip(city);});
  $('map-stage').addEventListener('focusout',()=>{$('map-tooltip').hidden=true;});
  ['municipio-search','municipio-group','municipio-region','municipio-sort'].forEach(id=>$(id).addEventListener(id==='municipio-search'?'input':'change',()=>{state.page=1;if(id==='municipio-group')state.quick='all';renderMunicipalities();}));
  $('clear-filters').addEventListener('click',()=>{state.quick='all';state.page=1;['municipio-search','municipio-group','municipio-region'].forEach(id=>$(id).value='');$('municipio-sort').value='name';renderMunicipalities();});
  $('previous-page').addEventListener('click',()=>{state.page--;renderMunicipalities();});$('next-page').addEventListener('click',()=>{state.page++;renderMunicipalities();});
  $('map-zoom-in').addEventListener('click',()=>zoomMap(.5));$('map-zoom-out').addEventListener('click',()=>zoomMap(-.5));$('map-reset').addEventListener('click',()=>{state.zoom=1;zoomMap(0);});
  $('dialog-close').addEventListener('click',()=>$('municipality-dialog').close());
  $('municipality-dialog').addEventListener('click',event=>{if(event.target===$('municipality-dialog')){const r=event.target.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)event.target.close();}});
  $('print-report').addEventListener('click',()=>window.print());
  async function load() {
    $('load-error').hidden=true;
    try {
      const [dataResponse,mapResponse]=await Promise.all([fetch('assets/data.json'),fetch('assets/map.svg')]);
      if(!dataResponse.ok||!mapResponse.ok)throw new Error('Arquivos indisponíveis');
      const [data,map]=await Promise.all([dataResponse.json(),mapResponse.text()]);
      if(!Array.isArray(data)||data.length!==92)throw new Error('Base incompleta');
      state.data=data;const regions=[...new Set(data.map(d=>d.regiao_intermediaria))].sort((a,b)=>a.localeCompare(b,'pt-BR'));
      $('municipio-region').innerHTML='<option value="">Todas as regiões</option>'+regions.map(r=>`<option value="${esc(r)}">${esc(r)}</option>`).join('');
      $('map-host').innerHTML=map;$('map-host').setAttribute('aria-busy','false');renderScatter();renderMunicipalities();selectCity(state.selected);applyMapFilter();zoomMap(0);
    } catch(error) {console.error('Não foi possível carregar o painel:',error);$('load-error').hidden=false;}
  }
  $('retry-load').addEventListener('click',load);load();
})();

# RJ 2026: municípios em que Douglas Ruas e Lula lideraram

Análise do primeiro turno de 04/10/2026. Consulta aos arquivos oficiais em 07/10/2026. Cobertura: 92 municípios, 184 arquivos municipais, 100% das seções totalizadas.

**Pinheiral é o único município do Rio de Janeiro em que Douglas Ruas foi o mais votado para governador e Lula foi o mais votado para presidente.** O resultado foi calculado a partir dos arquivos oficiais municipais do TSE, cruzados pelo código do município. “Venceu no município” significa liderança local; os cargos são decididos pelo total estadual ou nacional.

## 1. Como a análise foi feita

1. Consultei a configuração oficial do TSE para obter os códigos das eleições de 2026, o primeiro turno e os cargos corretos. Usei o ambiente oficial.
2. Obtive a lista oficial de municípios do RJ e seus códigos TSE/IBGE. São 92 municípios.
3. Baixei dois arquivos por município: governador e presidente, totalizando 184. Preservei as respostas originais, URLs e hashes SHA-256.
4. Verifiquei o ambiente, o turno, a totalização final e 100% das seções em cada arquivo.
5. Ordenei todos os candidatos de cada cargo pelo número de votos. Registrei líder, segundo colocado, margem em votos e margem em pontos percentuais. Não houve empate para a liderança.
6. Cruzei as duas listas pelo código municipal e apliquei o filtro conjunto: Douglas Ruas em primeiro para governador e Lula em primeiro para presidente.
7. Somei os 92 municípios para cada candidato e confrontei com o arquivo estadual do mesmo cargo. Os 21 totais de candidatos coincidem exatamente.
8. Calculei participação, votos em branco, nulos e sub judice, preservando os denominadores de cada cargo.
9. Acrescentei as regiões imediatas/intermediárias e a malha municipal do IBGE. As médias regionais são ponderadas pelos votos.
10. Contextualizei o resultado com uma pesquisa estadual do Datafolha e com os outros municípios em que Lula liderou. Essa pesquisa não mede Pinheiral individualmente.

## 2. O cruzamento dos 92 municípios

| Líder para governador | Líder para presidente | Municípios | Parcela dos 92 |
| --- | --- | --- | --- |
| Douglas Ruas | Flávio Bolsonaro | 78 | 84,78% |
| Eduardo Paes | Lula | 8 | 8,70% |
| Eduardo Paes | Flávio Bolsonaro | 5 | 5,43% |
| Douglas Ruas | Lula | 1 | 1,09% |

Ruas liderou em 79 municípios; Paes, em 13. Lula liderou em nove; Flávio, em 83. Entre as nove cidades em que Lula ficou em primeiro, oito também colocaram Paes em primeiro para governador e uma colocou Ruas. A combinação Ruas–Lula aparece em 11,11% das cidades lideradas por Lula e em 1,27% das lideradas por Ruas.

![Mapa dos líderes municipais](mapa_municipios.png)

O número de municípios não representa o peso eleitoral: cada cidade conta uma vez nessa tabela, embora seus eleitorados tenham tamanhos diferentes. Pinheiral forneceu 0,15% dos votos estaduais de Ruas e 0,18% dos votos estaduais de Lula. Portanto, a coincidência identificada é um caso local de pequeno peso na soma estadual.

## 3. Pinheiral: os resultados completos

Pinheiral tem código TSE 58246 e código IBGE 3303955. Pertence à região geográfica imediata e intermediária de Volta Redonda – Barra Mansa, segundo a API do IBGE. A configuração municipal do TSE lista a zona eleitoral 0030. O recorte calculado aqui é municipal.

| Cargo | Candidato | Votos | Percentual divulgado | Vantagem sobre o segundo |
| --- | --- | --- | --- | --- |
| Governador | Douglas Ruas | 6.458 | 50,22% | 1.038 votos / 8,07 p.p. |
| Governador | Eduardo Paes | 5.420 | 42,15% | — |
| Presidente | Lula | 6.639 | 46,64% | 142 votos / 1,00 p.p. |
| Presidente | Flávio Bolsonaro | 6.497 | 45,64% | — |

Fontes diretas: [TSE: governador em Pinheiral](https://resultados.tse.jus.br/oficial/ele2026/6259/dados/rj/rj58246-c0003-e006259-u.json); [TSE: presidente em Pinheiral](https://resultados.tse.jus.br/oficial/ele2026/6257/dados/rj/rj58246-c0001-e006257-u.json).

![Votação em Pinheiral](pinheiral_votacao.png)

**As duas lideranças têm intensidades diferentes.** Lula ficou em primeiro por menos de um ponto percentual antes do arredondamento: 0,9976 p.p. Ruas teve uma vantagem de 8,0722 p.p. Lula teve a maior votação presidencial, com menos de 50% da base do cargo; Ruas ultrapassou 50% da base divulgada para governador no município.

Os demais candidatos a governador receberam: William Siri, 400 votos (3,11%); Garotinho, 296 (2,30%, anulado sub judice); Coronel Busnello, 167 (1,30%); Juliete, 62 (0,48%); André Marinho, 42 (0,33%); Luan Monteiro, 8 (0,06%); Cyro Garcia, 6 (0,05%).

Para presidente, os demais receberam: Augusto Cury, 429 (3,01%); Renan Santos, 330 (2,32%); Ronaldo Caiado, 277 (1,95%); Zema, 26 (0,18%); Samara, 15 (0,11%); Clariana Barão, 10 (0,07%); Hertz Dias, 3 (0,02%); Edmilson Costa, 3 (0,02%); Veterinário Wilson Grassi, 3 (0,02%); Rui Costa Pimenta, 2 (0,01%).

## 4. Participação e os denominadores dos percentuais

| Indicador | Governador | Presidente |
| --- | --- | --- |
| Eleitorado apto | 18.820 | 18.820 |
| Comparecimento | 14.774 (78,50%) | 14.774 (78,50%) |
| Abstenções | 4.046 (21,50%) | 4.046 (21,50%) |
| Votos em branco | 929 (6,29% do comparecimento) | 251 (1,70% do comparecimento) |
| Votos nulos | 986 (6,67% do comparecimento) | 289 (1,96% do comparecimento) |
| Base do percentual divulgado | 12.859 | 14.234 |
| Votos com destinação válida (vv) | 12.563 | 14.234 |
| Anulado sub judice | 296 | 0 |

Brancos e nulos somaram 1.915 votos para governador (12,96% do comparecimento) e 540 para presidente (3,66%). A diferença é de 1.375 votos, ou 9,31 pontos percentuais sobre o mesmo comparecimento. Isso explica por que a base dos candidatos a governador é menor que a dos presidenciáveis, sem identificar as escolhas das pessoas que deixaram de dar voto nominal válido em um dos cargos.

A abstenção de Pinheiral, 21,50%, ficou abaixo dos 23,33% registrados no arquivo estadual de governador: diferença aproximada de 1,84 p.p., calculada antes do arredondamento. Ausências, brancos e nulos não têm preferência partidária identificável nesses dados.

O percentual de Ruas na divulgação é `6.458 / 12.859 × 100 = 50,22%`. O de Lula é `6.639 / 14.234 × 100 = 46,64%`. Se a base fosse todo o comparecimento, seriam 43,71% para Ruas e 44,94% para Lula. Sobre o eleitorado apto, seriam 34,31% e 35,28%, respectivamente.

**Nota sobre sub judice:** o arquivo de governador possui 296 votos de Garotinho com destinação “Anulado sub judice”. O TSE os preserva na base concorrente de divulgação, de 12.859, enquanto o campo `vv` registra 12.563 votos com destinação válida. Este relatório reproduz os percentuais oficiais consultados. Dividir apenas por `vv` daria 51,40% para Ruas, mas seria uma base diferente da divulgação. Esse cálculo alternativo não constitui decisão sobre o resultado estadual nem antecipa efeitos judiciais.

## 5. O que a coincidência territorial permite concluir

Pinheiral apresentou lideranças de partidos diferentes entre os dois cargos. Isso é evidência de um resultado municipal dividido. A apuração pública oferece os totais de cada candidatura; não oferece uma tabela que ligue o voto de presidente ao voto de governador de uma mesma pessoa.

Lula recebeu 1.219 votos a mais que Paes. Essa diferença não identifica 1.219 votos de Lula para Ruas: esses eleitores podem ter escolhido outros candidatos, branco ou nulo, e Paes também pode ter recebido votos de eleitores de outros presidenciáveis.

Ruas recebeu 39 votos a menos que Flávio, embora seu percentual divulgado seja 4,58 p.p. maior. A diferença entre os divisores dos cargos produz esse contraste. Comparar percentuais isoladamente pode sugerir uma expansão individual de apoio que os votos nominais não demonstram.

Os totais também não obrigam a existência de votos individuais Ruas–Lula. Considerando as duas escolhas no universo comum de 14.774 comparecentes informado para Pinheiral, o limite matemático mínimo de interseção é `máximo(0; 6.458 + 6.639 − 14.774) = 0`. O limite máximo é 6.458. Esse intervalo representa compatibilidade aritmética; não é uma estimativa de quantas pessoas votaram na combinação.

![Margens nos 92 municípios](cruzamento_margens.png)

## 6. Todas as cidades em que Lula liderou

| Município | Lula | Flávio | Ruas | Paes | Líder governador |
| --- | --- | --- | --- | --- | --- |
| Comendador Levy Gasparian | 50,30% | 41,49% | 37,63% | 56,94% | Paes |
| Conceição de Macabu | 46,74% | 46,32% | 45,16% | 46,71% | Paes |
| Laje do Muriaé | 53,10% | 41,28% | 40,03% | 51,98% | Paes |
| Miracema | 48,60% | 45,35% | 43,90% | 49,51% | Paes |
| Niterói | 48,35% | 43,71% | 42,72% | 49,72% | Paes |
| Pinheiral | 46,64% | 45,64% | 50,22% | 42,15% | Ruas |
| Porciúncula | 47,99% | 45,42% | 41,77% | 45,31% | Paes |
| Rio das Flores | 57,10% | 37,39% | 39,52% | 52,54% | Paes |
| Valença | 51,31% | 40,64% | 38,27% | 54,35% | Paes |

Pinheiral é a única linha dessa tabela que atende ao filtro conjunto. Conceição de Macabu teve lideranças especialmente apertadas: Lula por 54 votos e Paes por 178 votos. A liderança de Paes ali impede sua inclusão no grupo Ruas–Lula.

O apoio institucional a um candidato não substitui a apuração. Por exemplo, Maricá não atende ao filtro: Ruas teve 49,69% e Paes 41,06%; Flávio teve 49,82% e Lula 43,18%. A inclusão se baseia no primeiro colocado dos dois cargos.

## 7. Pinheiral no contexto regional

| Município da região imediata | Ruas | Paes | Lula | Flávio |
| --- | --- | --- | --- | --- |
| Barra Mansa | 55,40% | 37,05% | 39,82% | 52,38% |
| Barra do Piraí | 48,54% | 44,06% | 43,56% | 48,63% |
| Engenheiro Paulo de Frontin | 50,44% | 38,75% | 41,44% | 51,08% |
| Mendes | 48,73% | 44,18% | 43,90% | 48,87% |
| Pinheiral | 50,22% | 42,15% | 46,64% | 45,64% |
| Piraí | 49,06% | 42,76% | 43,00% | 49,57% |
| Rio Claro | 44,86% | 49,35% | 45,59% | 46,97% |
| Volta Redonda | 50,67% | 40,03% | 42,06% | 50,06% |

Na região imediata de Volta Redonda – Barra Mansa, Ruas liderou em sete das oito cidades; Paes liderou em Rio Claro. Lula liderou apenas em Pinheiral. Portanto, a liderança estadual de Ruas no município acompanha a predominância regional, enquanto a liderança presidencial de Lula distingue Pinheiral de seus pares nessa região.

Para ampliar o contexto, estas são as cinco regiões geográficas intermediárias do IBGE. Elas não correspondem às regiões administrativas do governo estadual. Os percentuais abaixo usam os votos somados de cada região.

| Região intermediária IBGE | Cidades | Ruas lidera | Paes lidera | Lula lidera | Ruas + Lula | Ruas % | Paes % | Lula % |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Campos dos Goytacazes | 18 | 14 | 4 | 3 | 0 | 52,61 | 31,80 | 33,84 |
| Macaé - Rio das Ostras - Cabo Frio | 12 | 11 | 1 | 1 | 0 | 60,10 | 32,09 | 32,70 |
| Petrópolis | 19 | 16 | 3 | 1 | 0 | 55,10 | 37,55 | 35,00 |
| Rio de Janeiro | 26 | 24 | 2 | 1 | 0 | 47,30 | 45,25 | 40,74 |
| Volta Redonda - Barra Mansa | 17 | 14 | 3 | 3 | 1 | 52,49 | 39,69 | 40,62 |

## 8. Contexto das pesquisas anteriores à votação

Usei como referência documental o Datafolha publicado em 02/10/2026, com campo de 29/09 a 01/10, 1.204 entrevistas presenciais em 35 municípios, margem de três pontos e confiança de 95%; registro RJ-02070/2026. No cenário com Garotinho, os votos válidos indicavam Paes com 47% e Ruas com 35%.

| Candidato | Datafolha: cenário com Garotinho | TSE estadual: divulgação consultada | Diferença resultado − pesquisa |
| --- | --- | --- | --- |
| Eduardo Paes | 47,00% | 42,76% | −4,24 p.p. |
| Douglas Ruas | 35,00% | 49,27% | +14,27 p.p. |

A liderança prevista nessa rodada se inverteu no resultado estadual. A comparação é descritiva: uma pesquisa estima intenção em uma data, enquanto a apuração contabiliza escolhas efetivas. Essa rodada não fornece uma estimativa representativa de Pinheiral e não explica, sozinha, as motivações locais. Não foi calculada uma média de institutos nem uma probabilidade de vitória futura.

Fonte: [relatório e metodologia do Datafolha](https://datafolha.folha.uol.com.br/eleicoes/2026/10/eduardo-paes-psd-mantem-a-lideranca-com-47-dos-votos-validos-douglas-ruas-pl-cresce-e-alcanca-35.shtml).

## 9. Precisão, cobertura e limites

A conclusão territorial se sustenta em todos os 92 municípios, e não em uma seleção de cidades. A soma municipal foi conferida para os 12 presidenciáveis e nove candidatos a governador: diferença zero em relação aos totais da UF. Os arquivos indicam totalização final e 100% das seções.

Não há margem de erro amostral na contagem apurada: a margem municipal é a diferença observada entre votos. Eventuais retotalizações podem alterar números ou bases; a fotografia preservada é a consulta de 07/10/2026. O estudo não estabelece causas, não infere intenção individual e não calcula resultados do segundo turno a partir do primeiro.

Este recorte usa o primeiro turno de 2026 para ambos os cargos. Comparar Ruas em 2026 com Lula no segundo turno de 2022 seria outro cruzamento, com outra lista de municípios.

## 10. Fontes, arquivos e reprodução

- [Configuração das eleições — TSE](https://resultados.tse.jus.br/oficial/comum/config/ele-c.json).
- [Municípios e códigos — TSE](https://resultados.tse.jus.br/oficial/ele2026/6257/config/mun-e006257-cm.json).
- [Governador: total estadual — TSE](https://resultados.tse.jus.br/oficial/ele2026/6259/dados/rj/rj-c0003-e006259-u.json).
- [Presidente: total no RJ — TSE](https://resultados.tse.jus.br/oficial/ele2026/6257/dados/rj/rj-c0001-e006257-u.json).
- [TSE: governador em Pinheiral](https://resultados.tse.jus.br/oficial/ele2026/6259/dados/rj/rj58246-c0003-e006259-u.json).
- [TSE: presidente em Pinheiral](https://resultados.tse.jus.br/oficial/ele2026/6257/dados/rj/rj58246-c0001-e006257-u.json).
- [Documentação dos resultados unificados — TSE](https://www.tse.jus.br/eleicoes/eleicoes-2026-content/arquivos/divulgacao-de-resultados/tse-ea20-arquivo-de-resultado-unificado).
- [Dados abertos 2026 — TSE](https://dadosabertos.tse.jus.br/dataset/resultados-2026). O catálogo consultado disponibilizava relatórios de totalização; a coleta municipal utilizou os JSONs oficiais de divulgação.
- [Localidades e regiões — IBGE](https://servicodados.ibge.gov.br/api/v1/localidades/estados/33/municipios).
- [Malha municipal simplificada — IBGE](https://servicodados.ibge.gov.br/api/v3/malhas/estados/33?formato=application/vnd.geo+json&qualidade=minima&intrarregiao=municipio).

A planilha `analise_rj_2026.xlsx` inclui 92 municípios, o filtro Ruas–Lula, as nove cidades de Lula, regiões, todos os candidatos, auditoria e método/glossário. Os CSVs usam ponto e vírgula e UTF-8 com BOM; percentuais são números de 0 a 100. A pasta `fontes` preserva os dados consultados e as URLs por município. Os gráficos também estão em SVG, PNG e PDF.

# RJ 2026 — O mapa do voto

Dashboard público: https://enzostana.github.io/relatorio-eleicoes-rj-2026/

Análise dos 92 municípios no primeiro turno, com foco na coincidência de lideranças Douglas Ruas + Lula em Pinheiral e nas margens mais próximas.

Dados oficiais do TSE consultados em 7 de outubro de 2026. A fotografia é preservada, com fontes municipais, metodologia, auditoria e downloads.

## Frontend

Site estático em HTML, CSS e JavaScript, publicado pelo GitHub Pages na raiz da branch `main`. Para visualizar localmente, execute `python3 -m http.server 8765` e abra `http://localhost:8765`.

- `assets/data.json`: resultados e fontes dos 92 municípios.
- `assets/map.svg`: limites municipais do IBGE com os códigos de junção.
- `assets/app.js`: filtros, mapa, gráfico de margens e cálculos de proximidade.
- `proximidade_virada.csv`: 162 registros de proximidade, com fontes.
- `analise-proximidade.md`: argumentos, fórmulas e interpretação dos destaques.
- `analise_rj_2026.xlsx`: base completa e aba de proximidade.
- `analise_rj_2026.zip`: relatório, dados brutos, scripts originais e complemento.
- `relatorio-completo.html`: versão original integral para leitura.

## Limites

A proximidade é aritmética, mantendo a base congelada. Não foi estimada probabilidade de virada. O ranking padrão mede margem percentual; a alternativa mede o mínimo de trocas diretas. A coincidência de líderes no município não identifica escolhas conjuntas de um mesmo eleitor.

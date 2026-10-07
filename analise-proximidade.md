# Proximidade de inversão de liderança — RJ 2026

Complemento ao relatório municipal. Base do primeiro turno de 04/10/2026, consultada em 07/10/2026.

## Critérios e interpretação

O recorte de governo inclui os 79 municípios em que Douglas Ruas ficou à frente de Eduardo Paes. O recorte presidencial inclui os 83 em que Flávio Bolsonaro ficou à frente de Lula. A posição usa a diferença entre os percentuais oficiais dos dois candidatos em cada cargo, do menor para o maior.

Uma troca direta do líder para o segundo reduz a diferença em dois votos. Para superar, e não apenas empatar, o mínimo é **piso(diferença de votos / 2) + 1**. Se apenas o segundo receber novos votos, com o total do líder fixo, o mínimo é **diferença + 1**.

Esses cenários mantêm os demais votos congelados. Não foi estimada uma probabilidade de virada. O destino dos votos em outros candidatos, brancos, nulos e abstenções permanece desconhecido. Pesquisas locais recentes, comparecimento futuro e mudanças de preferência seriam necessários para modelar chances.

## Leitura dos destaques

- **Santa Maria Madalena:** menor diferença de governo, 44 votos e 0,72 ponto percentual. São necessárias 23 trocas diretas ou 45 votos novos exclusivamente para Paes.
- **Duas Barras:** segunda menor diferença percentual de governo, 222 votos e 3,20 pontos. O cenário mínimo exige 112 trocas diretas ou 223 votos novos exclusivamente para Paes.
- **Barra do Piraí:** terceira menor diferença percentual, 4,48 pontos, mas 2.025 votos. Exige 1.013 trocas diretas. Uma margem proporcional pequena não implica uma quantidade absoluta pequena de mudanças.
- **Macuco:** ao ordenar governo pelo número de trocas, ocupa a terceira posição, com 192; pelo percentual, a oitava. Os critérios respondem a comparações diferentes.
- **Pinheiral:** única coincidência de lideranças Ruas + Lula. No governo, fica em nono lugar por margem relativa: 8,07 pontos e 1.038 votos, equivalentes a 520 trocas diretas. Na presidência, Lula já lidera por 142 votos; por isso, Pinheiral fica fora do ranking Lula sobre Flávio. As escolhas conjuntas dos indivíduos não são identificáveis pelos totais.
- **Três Rios e Rio Claro:** menores diferenças percentuais presidenciais, 0,84 e 1,37 ponto. Três Rios tem diferença de 388 votos, exigindo 195 trocas; Rio Claro tem 157 votos, exigindo 79. Rio Claro fica em primeiro no critério absoluto.
- **Rio de Janeiro:** terceira menor margem percentual presidencial, 3,97 pontos. O porte da cidade transforma essa diferença em 137.837 votos e 68.919 trocas diretas. Proximidade relativa e esforço aritmético absoluto devem ser lidos juntos.

## Governo: Paes sobre Ruas

| Posição | Município | Margem (p.p.) | Diferença em votos | Trocas diretas mínimas | Votos novos mínimos |
| --- | --- | --- | --- | --- | --- |
| 1 | Santa Maria Madalena | 0,72 | 44 | 23 | 45 |
| 2 | Duas Barras | 3,20 | 222 | 112 | 223 |
| 3 | Barra do Piraí | 4,48 | 2025 | 1013 | 2026 |
| 4 | Mendes | 4,55 | 471 | 236 | 472 |
| 5 | Quissamã | 5,05 | 664 | 333 | 665 |
| 6 | Piraí | 6,29 | 1000 | 501 | 1001 |
| 7 | Duque de Caxias | 6,81 | 30129 | 15065 | 30130 |
| 8 | Macuco | 7,10 | 382 | 192 | 383 |
| 9 | Pinheiral | 8,07 | 1038 | 520 | 1039 |
| 10 | Maricá | 8,63 | 11081 | 5541 | 11082 |

## Presidência: Lula sobre Flávio

| Posição | Município | Margem (p.p.) | Diferença em votos | Trocas diretas mínimas | Votos novos mínimos |
| --- | --- | --- | --- | --- | --- |
| 1 | Três Rios | 0,84 | 388 | 195 | 389 |
| 2 | Rio Claro | 1,37 | 157 | 79 | 158 |
| 3 | Rio de Janeiro | 3,97 | 137837 | 68919 | 137838 |
| 4 | Carmo | 4,87 | 548 | 275 | 549 |
| 5 | Mendes | 4,98 | 563 | 282 | 564 |
| 6 | Barra do Piraí | 5,07 | 2559 | 1280 | 2560 |
| 7 | Trajano de Moraes | 6,17 | 439 | 220 | 440 |
| 8 | Santa Maria Madalena | 6,49 | 430 | 216 | 431 |
| 9 | Piraí | 6,57 | 1151 | 576 | 1152 |
| 10 | Maricá | 6,64 | 9221 | 4611 | 9222 |

## Fontes e reprodução

O arquivo `proximidade_virada.csv` contém todos os 162 registros e a URL oficial do TSE de cada município/cargo. O dashboard deriva as margens diretamente de `assets/data.json`, preservando os percentuais oficiais e as bases próprias de cada cargo. A planilha contém a aba “Proximidade de inversão”. Os arquivos brutos e scripts da análise original estão no ZIP.

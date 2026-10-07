# Vira Voto — dados e método

Consulta: 07/10/2026. Foco: confronto estadual de segundo turno.

O painel é um observatório descritivo. Não identifica grupos para persuasão ou estima transferência de voto. A votação oficial disponível nesta fotografia é a do primeiro turno de 04/10. Todas as pesquisas disponíveis foram colhidas antes dessa votação; quatro testaram hipoteticamente o segundo turno. Não são medições posteriores ao primeiro turno.

## Conteúdo

92 municípios; 184 arquivos oficiais de resultados; auditoria de 21 candidatos; cinco pesquisas estaduais de governo; uma pesquisa presidencial no RJ; cinco registros de participação em 2022/2026; prioridades e conhecimento medidos em março; sínteses documentais de seis temas de programas; roteiro neutro para nova pesquisa.

## Bases e limitações

Candidatos usam a base divulgada pelo TSE para cada cargo; em governador ela inclui votos anulados sub judice. Abstenção usa eleitorado; brancos e nulos usam comparecimento. Válidos das pesquisas excluem branco, nulo e indeciso. Dados de firmeza têm a base indicada em cada rodada; rejeição permite respostas múltiplas. Percentuais arredondados podem não somar 100%.

Prioridades e conhecimento são de março, não atuais. A redação das perguntas de conhecimento e rejeição é diferente. Os programas foram lidos em cópias públicas, com origem e SHA-256 no manifesto; os links diretos do TSE recusaram acesso. A comparação não avalia viabilidade, custo ou execução. As sínteses não substituem os documentos.

## Cenário estadual

Eleitorado fixo do primeiro turno. Comparecimento = arredondar(eleitorado × hipótese de comparecimento). Brancos e nulos = arredondar(comparecimento × hipótese de branco/nulo). Nominais = comparecimento − brancos e nulos. Paes = arredondar(nominais × hipótese de participação de Paes). Ruas = nominais − Paes. Abstenção = eleitorado − comparecimento. O modelo supõe apenas dois candidatos e preserva a soma das contagens. Não é pesquisa, previsão, probabilidade ou transferência de votos.

## Reprodução

O pacote conserva scripts e arquivos eleitorais originais. As novas tabelas documentam cada campo, data e URL. Execute `python empacotar_viravoto.py` com Python e openpyxl a partir do diretório que contém `assets/` para reconstruir a planilha. Fontes eleitorais ficam em `fontes/`; os PDFs e artigos dos institutos são consultados nos links do manifesto. Leia `roteiro-pesquisa.md` para o protocolo de coleta ainda não executado.

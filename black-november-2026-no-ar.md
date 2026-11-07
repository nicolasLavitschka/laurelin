# Black November / Black Friday 2026: no ar, anúncios e verba (06/11/2026)

Aprovado pelo Nícolas em 06/11 (menos o Mercado Livre, que fica para depois). Substitui as datas e preços de `black-friday-2026-campanha.md`.

## A oferta (já ligada no site e no banco)
| Fase | Período | Preços | Frete grátis* |
|---|---|---|---|
| Black November (D2C) | 13 a 23/11 | 2 por R$ 150 (R$ 75 cada) · 3 ou mais a R$ 72 cada (10%) | a partir de 4 garrafas |
| Black Friday (D2C) | 24 a 30/11 | 2 por R$ 150 · 3 por R$ 216 · 4 ou mais a R$ 68 cada (15%) | a partir de 4 garrafas |
| Black November B2B | 17/11 a 05/12 | 6 a R$ 65 cada · 12 a R$ 60 cada | a partir de 12 garrafas |
| Primeira compra B2B | sempre | caixa de 6: a 7ª garrafa é de degustação (manual, pelo WhatsApp) | |

*Frete grátis só por transportadora e só para CEPs que começam com 01 a 09 (Grande SP). Retirada e Uber do mesmo dia não entram (o desconto de até R$ 30 no Uber continua manual, ao liberar o pré-pedido).

## O que foi feito no site (06/11)
- Supabase: `loja_006_black_november.sql` rodado. O preço e o frete grátis são calculados no banco quando o pedido é criado. Na venda do sistema, o "motivo do desconto" recebe o nome da fase (o R$ 68 fica abaixo do mínimo de R$ 70).
- Conferido no banco: 1 garrafa sem desconto; 2 = R$ 75; 5 na Black November = R$ 72; 4 na Black Friday = R$ 68; B2B 12 = R$ 60; frete grátis em CEP 06010 sim, Campinas não; dia 01/12 sem promoção.
- Site: novo `assets/js/promo.js` (v=d3130f2c) nas 24 páginas, `compra.js` atualizado (v=9c076d1d) com a linha de desconto no carrinho e no resumo, "Grátis (promoção)" na entrega e a dica "Leve mais 1 e pague R$ 72 cada".
- Faixa do topo: hoje já mostra "Black November começa dia 13/11"; de 13/11 em diante mostra a oferta da fase.
- Página inicial: bloco "Tem um estabelecimento?" (primeira compra com a 7ª garrafa + preços B2B quando a fase B2B estiver ativa). Página Para estabelecimentos: bloco "Primeira compra do seu estabelecimento" no topo.
- Backups em `/home2/hg35b206/backup-etiqueta-2026-10-30/bn__*`.
- Comandos úteis no Supabase:
  - Desligar tudo na hora: `UPDATE loja.config SET valor = '0' WHERE chave = 'promo_ativa';`
  - Mudar fases ou preços: editar o JSON em `loja.config` chave `promo_fases`.

## Artes novas (Drive: Imagens\Black Friday 2026\v2-progressiva)
13 peças, todas com a advertência:
- Black November: `bn-feed-01-vem-ai`, `bn-feed-02-oferta`, `bn-story-oferta`, `bn-google-1200x1200`, `bn-google-1200x628`.
- Black Friday: `bf-feed-01-oferta`, `bf-feed-02-hoje`, `bf-feed-03-ultimo-dia`, `bf-story-oferta`, `bf-story-termina-hoje`, `bf-google-1200x1200`, `bf-google-1200x628`.
- B2B: `b2b-feed-primeira-compra`.

As artes antigas (Kit 2 R$ 150 / Kit 3 R$ 225 com frete SP) não valem mais.

## Atualização 06/11 (tarde): em produção
- **Estoque:** ~100 garrafas na contagem dos sócios; o sistema só tem 15 lançadas (Casa Jhow). Lançar o restante na contagem de 14 a 15/11. Até lá o site vende no máximo 15.
- **Meta, campanha "Laurelin | B2B Estabelecimentos | WhatsApp | Nov26" (no ar, em análise da Meta):**
  - conjunto "Grande SP | 25+ | Donos de estabelecimento | Direct": R$ 10/dia, de 06/11 a 30/11 23h59, segunda a sábado das 8h às 21h;
  - público: São Paulo + 40 km, 25+, sem idade desconhecida; sugestões de proprietários de pequenas empresas, cargo Proprietário e setor Gastronomia e restaurantes;
  - destino: Messenger e Direct do Instagram. O WhatsApp exige conta WhatsApp Business no número (decisão dos sócios). Ao migrar o número, dá para trocar o destino;
  - anúncio "B2B | Hidromel na sua carta | 7a garrafa": peças b2b-anuncio-feed e b2b-anuncio-story, aprimoramentos de IA desligados, respostas automáticas para condições, degustação e pedido mínimo;
  - o nome da campanha ainda diz "WhatsApp" (só o nome).
- **Conversões:**
  - novo "Contato WhatsApp (site)" no Google Ads (AW-18547560061/XSYMCKvahLMdEP2clYxF, R$ 20, uma por clique) disparado em todo clique em link wa.me do site;
  - também manda generate_lead ao GA4, Contact à Meta e etapa "whatsapp" ao funil sem cookies (medicao.js v=18f546d0, funil.php);
  - a "Compra aprovada (site)" continua como está: aparece "Inativo" até a primeira compra aprovada;
  - um teste do contato foi disparado em 06/11 (pode aparecer 1 conversão de teste).
- **B2B automático (loja_007_b2b_auto.sql, no banco desde 06/11):**
  - ao enviar o cadastro em Minha conta › Estabelecimento, o banco confere os dígitos do CNPJ e consulta a Receita (BrasilAPI);
  - aprova na hora se estiver ATIVO e com CNAE de bar, restaurante, lanchonete, empório/adega, tabacaria, mercado, hotel ou eventos (lista em loja.config b2b_cnaes);
  - senão fica pendente com o motivo em "observação" para os sócios decidirem no /admin;
  - mesmo CNPJ já aprovado em outra conta também fica pendente;
  - desligar: `UPDATE loja.config SET valor='0' WHERE chave='b2b_auto';`.
- **7ª garrafa automática:**
  - no primeiro pedido B2B do CNPJ pelo site com 6+ garrafas, o pedido ganha o brinde (coluna brinde e aviso "BRINDE: mandar 1 garrafa a mais" na anotação interna do /admin);
  - quando a venda é lançada, sai 1 garrafa como "Amostra / Lead" com o nome do estabelecimento;
  - o checkout mostra "+ 1 garrafa de degustação (1ª compra) Grátis";
  - limite: clientes B2B antigos que compravam pelo WhatsApp também ganham se for o primeiro pedido pelo site;
  - desligar: `UPDATE loja.config SET valor='0' WHERE chave='b2b_brinde';`.
- **Site:** blocos B2B com botão "Cadastrar meu CNPJ" (/conta/#estabelecimento); promo.js v=63ba852d, compra.js v=04a1a641.

### Verba com 100 garrafas (aprovada 06/11)
| Período | Meta | Google | Total |
|---|---|---|---|
| 07 a 12/11 | R$ 0 (orgânico "vem aí") | Smart R$ 10/dia | R$ 60 |
| 13 a 23/11 Black November | R$ 15/dia | Smart R$ 10/dia | R$ 275 |
| 24 a 30/11 Black Friday | R$ 25/dia | Pesquisa R$ 15/dia | R$ 280 |
| B2B (06 a 30/11) | R$ 10/dia (no ar) | Pesquisa B2B R$ 5/dia (opcional, não criada) | R$ 250 a 370 |
| **Total** | | | **≈ R$ 865 a 985** |

- Subir até 50% na Black Friday se o custo por pedido ficar até R$ 30 até 20/11.
- Pausar a campanha que gastar R$ 60 sem venda. No B2B, pausar com menos de 2 conversas a cada R$ 50.
- **Saldo Meta:** é pré-pago (Pix). Com o B2B (R$ 10) e o site (R$ 7) rodando, o saldo de ~R$ 70 acaba em uns 4 dias. Os sócios precisam colocar crédito.

## Verba recomendada (versão de 06/11 manhã, com 16 garrafas)
Base: lucro antes do anúncio de ~R$ 80 (pedido de 2 garrafas) a ~R$ 110 (pedido de 4 com frete grátis). Dá para pagar até R$ 40 de anúncio por pedido e ainda sobrar bem. Até agora: Meta R$ 42 sem venda no site; Google R$ 52 com 1 venda (WhatsApp).

| Período | Meta (Instagram/Facebook) | Google | Total |
|---|---|---|---|
| 07 a 12/11 (aquecimento) | R$ 0 (só posts orgânicos "vem aí") | Smart R$ 10/dia | R$ 60 |
| 13 a 23/11 Black November | R$ 12/dia | Smart R$ 10/dia | R$ 242 |
| 24 a 30/11 Black Friday | R$ 20/dia | Pesquisa R$ 15/dia (Smart pausada) | R$ 245 |
| **Novembro** | **R$ 272** | **R$ 275** | **≈ R$ 550** |

- **Estoque manda:** em 06/11 eram 16 garrafas. Com isso o teto é ~R$ 300: na Black November fica só o Google, e a Meta entra só na Black Friday a R$ 15/dia. R$ 550 só se houver 40 ou mais garrafas.
- **Regra de corte:**
  - Se uma campanha gastar R$ 60 sem nenhuma venda, ela pausa.
  - Se não houver nenhuma venda pelo site até 26/11, a Meta para.
  - Se cada pedido estiver custando até R$ 30 de anúncio e houver estoque, dá para subir 30%.
- **B2B sem anúncio pago:** WhatsApp, visita e post orgânico. Um bar de 12 garrafas vale mais que 5 pedidos D2C.

## Anúncios (rascunhos para aprovação; nada foi publicado nem gasto)
**Meta: campanha "Black November Laurelin"**
- Objetivo: vendas, otimizando para compra no site; se faltar volume, tráfego para a página de destino.
- Público:
  - 25 a 55 anos (nada abaixo de 25, regra da marca);
  - Grande SP + raio de 80 km; interesses vinho, cerveja artesanal, gastronomia, presentes.
- Destino: laurelinhidromel.com.br/loja/hidromel-suave-750ml/.
- Peças: bn-feed-02-oferta + bn-story-oferta.
- Texto principal: "Black November Laurelin: quanto mais garrafas, menor o preço. 2 por R$ 150 e 3 ou mais a R$ 72 cada, de 13 a 23/11. Hidromel artesanal não filtrado, feito com mel em Salesópolis. O desconto entra sozinho no carrinho. Venda proibida para menores de 18 anos. Beba com moderação."
- Título: "Até 10% OFF levando mais". Descrição: "Hidromel artesanal 750 ml".
- 24/11: trocar as peças para bf-feed-01-oferta + bf-story-oferta.
  - Texto: "Black Friday Laurelin, 24 a 30/11: 4 ou mais garrafas a R$ 68 cada (15% OFF) e frete grátis na Grande SP. 2 por R$ 150, 3 por R$ 216. Presente diferente para o fim de ano. Venda proibida para menores de 18 anos. Beba com moderação."
  - Título: "Até 15% OFF + frete grátis".
- 27/11 e 30/11: bf-feed-02-hoje e bf-feed-03-ultimo-dia como peças extras.

**Google: Smart (13 a 23/11)**
- Trocar os títulos para "Black November Laurelin", "Até 10% OFF levando mais" e "Hidromel artesanal de SP".
- Destino: a página do produto.

**Google: Pesquisa "Black Friday Hidromel" (24 a 30/11, R$ 15/dia)**
- Palavras de correspondência de frase: "hidromel", "comprar hidromel", "hidromel artesanal", "hidromel são paulo", "hidromel black friday", "presente hidromel", "hidromel laurelin".
- Negativas: receita, como fazer, kit fermentação, vaga, emprego.
- Títulos (até 30 caracteres):
  - Hidromel Laurelin 750 ml
  - Black Friday: até 15% OFF
  - 4 garrafas por R$ 68 cada
  - Frete grátis na Grande SP
  - Hidromel artesanal de SP
  - Não filtrado, feito com mel
  - Presente diferente p/ Natal
  - Compre no site oficial
  - 2 garrafas por R$ 150
  - De Salesópolis, SP
  - Entrega em todo o Brasil
  - Peça pelo site ou WhatsApp
  - Hidromel suave 14%
- Descrições (até 90 caracteres):
  - "Hidromel artesanal não filtrado. Quanto mais garrafas, menor o preço por garrafa."
  - "Black Friday 24 a 30/11: 4+ garrafas a R$ 68 cada e frete grátis na Grande SP."
  - "Água, mel e levedura. Feito em Salesópolis. Venda proibida para menores de 18 anos."
- Imagens: bf-google-1200x628 e bf-google-1200x1200.
- Conversão: a "Compra aprovada" que já está ligada.

## Anúncio só para estabelecimentos (rascunho, 06/11)
Peças: `b2b-anuncio-feed-1080x1350` e `b2b-anuncio-story-1080x1920`.

**Meta: campanha "Laurelin para estabelecimentos" (17/11 a 30/11, R$ 10/dia ≈ R$ 140)**
- Objetivo: Engajamento › mensagens no WhatsApp (conversa direta, melhor que mandar para o site).
- Público:
  - Grande SP, 25 a 60 anos;
  - comportamento "Proprietários de pequenas empresas" e "Administradores de páginas de negócios";
  - interesses bar, restaurante, gastronomia, bartender, sommelier.
- Texto: "Tem um bar, restaurante, empório ou tabacaria? Coloque na carta um hidromel artesanal, não filtrado, feito em Salesópolis (SP). Na primeira compra, a caixa com 6 vem com a 7ª garrafa para a sua equipe provar. De 17/11 a 05/12: R$ 65 a garrafa na caixa de 6 e R$ 60 levando 12, com entrega grátis na Grande SP. Para CNPJ, pagamento por Pix. Venda proibida para menores de 18 anos."
- Título: "Hidromel na carta do seu bar".
- Regra de corte: menos de 2 conversas de estabelecimento a cada R$ 50 gastos, pausa.

**Google Pesquisa B2B (opcional, R$ 5/dia, 17/11 a 05/12)**
- Palavras: "fornecedor de hidromel", "hidromel atacado", "hidromel para bar", "distribuidor de hidromel", "hidromel para revenda".
- Títulos:
  - Hidromel para o seu bar
  - Fornecedor de hidromel em SP
  - Hidromel artesanal p/ revenda
  - R$ 60 a garrafa levando 12
  - 7ª garrafa na 1ª compra
  - Entrega grátis na Grande SP
  - Preço especial para CNPJ
  - Fale no WhatsApp
  - Não filtrado, 750 ml, 14%
  - Feito em Salesópolis, SP
- Descrições:
  - "Hidromel artesanal não filtrado para bares, restaurantes, empórios e tabacarias de SP."
  - "Caixa com 6 a R$ 65 cada e 12 a R$ 60 cada até 05/12. Na 1ª compra, a 7ª é degustação."
  - "Ficha de harmonização para o cardápio. Pagamento por Pix. Venda só para maiores de 18."
- Destino: /para-estabelecimentos/.

## Como o site libera o B2B
1. O cliente cria a conta e, em Minha conta › Estabelecimento, manda o cadastro: razão social, CNPJ, responsável, WhatsApp, tipo, volume e cidade.
2. O cadastro fica como "pendente" e a equipe recebe e-mail.
3. O site só confere se o CNPJ tem 14 dígitos. A checagem de verdade é manual: um sócio consulta o CNPJ e o tipo de negócio e aprova ou recusa em /admin › Estabelecimentos. Nessa tela dá para marcar "Faturado (prazo)".
4. Aprovado, o cliente vê os preços B2B. No checkout, marca "Comprar como estabelecimento".
5. O banco recusa um pedido B2B de cliente não aprovado ou com menos de 6 garrafas. A promoção B2B (R$ 65/R$ 60) entra sozinha nesse pedido.
6. A 7ª garrafa da primeira compra é manual: vai na entrega, uma vez por CNPJ.
7. Quem não é aprovado continua vendo e pagando o preço D2C com a Black November e a Black Friday.

## Mensagem B2B (rascunho para WhatsApp e e-mail; enviar só depois de aprovar)
> Olá, [nome]! Aqui é o Nícolas, da Laurelin Hidromel, de Salesópolis. Estamos abrindo espaço em bares e restaurantes para o fim de ano e queria te oferecer duas coisas:
> 1) Na primeira compra, a caixa de 6 garrafas vem com uma 7ª para a sua equipe provar e servir de degustação.
> 2) De 17/11 a 05/12, a garrafa sai a R$ 65 na caixa de 6 e a R$ 60 levando 12 (com entrega grátis na Grande SP).
> É um hidromel suave, não filtrado, que harmoniza com queijos, carnes e sobremesas. Posso levar uma amostra ou te mandar a ficha de harmonização para o cardápio?
> Pagamento à vista (Pix). Venda proibida para menores de 18 anos.

## Pendências para os sócios
- Garrafas suficientes antes de 13/11. A verba depende disso.
- Black November começa 13/11:
  - publicar o post "vem aí" entre 08 e 10/11;
  - aprovar e publicar os anúncios no Gerenciador da Meta e no Google Ads (os cliques de aceitar termos e publicar são dos sócios).
- 7ª garrafa da primeira compra B2B: dar no momento da entrega, uma vez por CNPJ.
- Mercado Livre: correções adiadas (ver black-friday-2026-v2.md).
- Ainda abertos: as possíveis vendas duplicadas 55/56 e a movimentação de estoque sem local.

## Atualização 07/11: campanhas no ar
- **Google, "Laurelin | B2B Estabelecimentos | Pesquisa | Nov26" (publicada 07/11):** R$ 5/dia, Maximizar cliques com teto de CPC R$ 2,50, só rede de pesquisa, estado de SP, 10 palavras de frase, 1 anúncio (11 títulos, 4 descrições) para /para-estabelecimentos/, IA Max desligada, término 05/12. Aparece "limitada pela política" (bebida alcoólica): normal, não aparece para menores.
- **Meta, "Laurelin | Black November | Site | 13-23/11" (programada):** conjunto "Grande SP | 25+ | Black November | Site", R$ 15/dia, de 13/11 00h00 a 23/11 23h59, estado de SP, 25+ e sem idade desconhecida. Anúncio "BN | 2 por R$ 150 | imagem | Site" com bn-feed-02-oferta + bn-story-oferta, texto e título do plano, para a página do produto. Mídia relacionada, imagens de IA e aprimoramentos desligados.
- **Meta, conjunto "SP | 18+ | Instagram | Site" (R$ 7/dia):** término colocado em 12/11 23h59 para não somar com a Black November.
- **B2B Meta:** 2 conversas até 06/11 (R$ 4,97 cada).
- **Saldo Meta em 07/11: R$ 56,57.** A R$ 17/dia (B2B + site) acaba por volta de 10/11. De 13 a 23/11 o gasto é R$ 25/dia (BN + B2B): precisa de ~R$ 300 até 23/11.
- **Google:** pede verificação do anunciante até 07/12 (Adm. › Política › Conta). Sem ela, a conta é pausada. Os sócios fazem (dados da empresa).
- Falta para a Black Friday (24/11): campanha Meta R$ 25/dia com as peças bf e Pesquisa Google R$ 15/dia.

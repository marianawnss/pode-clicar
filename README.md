# Pode Clicar?

> **Pense antes de clicar. Sua segurança começa com uma escolha.**

Jogo educativo de simulação de situações digitais, feito com HTML, CSS e JavaScript puro. Ele ensina, de forma interativa e acessível, a reconhecer golpes, notícias falsas e pedidos suspeitos no dia a dia.

Projeto de extensão universitária do curso de **Ciências da Computação**.

> **Aviso importante.** Este projeto tem finalidade **educativa**. A pontuação e os níveis servem para incentivar o aprendizado e **não certificam** que alguém esteja imune a golpes. Todas as situações, nomes, empresas, números e endereços são **fictícios**.

---

## Sumário

1. [Problema social abordado](#problema-social-abordado)
2. [Objetivos](#objetivos)
3. [Público-alvo](#público-alvo)
4. [Justificativa](#justificativa)
5. [Tecnologias utilizadas](#tecnologias-utilizadas)
6. [Funcionalidades](#funcionalidades)
7. [Estrutura de arquivos](#estrutura-de-arquivos)
8. [Como executar](#como-executar)
9. [Como publicar no GitHub Pages](#como-publicar-no-github-pages)
10. [Como funciona por dentro (arquitetura)](#como-funciona-por-dentro-arquitetura)
11. [Como adicionar ou editar desafios](#como-adicionar-ou-editar-desafios)
12. [Como testar a aplicação](#como-testar-a-aplicação)
13. [Cuidados de acessibilidade](#cuidados-de-acessibilidade)
14. [Privacidade e segurança](#privacidade-e-segurança)
15. [Limitações conhecidas](#limitações-conhecidas)
16. [Possibilidades de evolução](#possibilidades-de-evolução)
17. [Aplicação com a comunidade (a preencher)](#aplicação-com-a-comunidade-a-preencher)
18. [Créditos e licenças](#créditos-e-licenças)

---

## Problema social abordado

Golpes digitais (falsos prêmios, falsos contatos de banco, pedidos de dinheiro em nome de familiares, notícias falsas e links maliciosos) atingem pessoas de todas as idades. Adultos e idosos que usam o celular para conversar com a família, participar de grupos de mensagens, acompanhar celebrações religiosas, receber notícias e compartilhar conteúdos podem ficar especialmente expostos, em parte por terem tido menos oportunidades de aprender a identificar esses riscos de forma acessível e sem constrangimento.

## Objetivos

**Objetivo geral**

Desenvolver e disponibilizar uma ferramenta educativa, interativa e acessível que ajude adultos e idosos de uma comunidade a reconhecer sinais de golpes digitais e de desinformação, e a tomar decisões mais seguras na internet.

**Objetivos específicos**

- Apresentar situações do cotidiano em formato de simulação, sem riscos reais.
- Explicar, a cada escolha, os sinais de alerta, o risco envolvido e a atitude mais segura.
- Estimular o raciocínio crítico, e não a memorização de respostas.
- Oferecer uma biblioteca de consulta permanente com orientações em linguagem simples.
- Respeitar a autonomia dos participantes, sem linguagem infantilizada e sem julgamentos.
- Aplicar conceitos de desenvolvimento web, segurança da informação, interação humano-computador e acessibilidade.

## Público-alvo

Adultos e idosos de uma comunidade religiosa que usam o celular no dia a dia. O jogo também serve para qualquer pessoa que queira aprender a se proteger melhor na internet.

## Justificativa

Ensinar segurança digital apenas com palestras ou listas de regras costuma ter efeito limitado. Uma simulação permite **experimentar a decisão** em um ambiente seguro, receber um retorno imediato e entender o "porquê". Usar tecnologia simples (um site que roda no navegador do celular, sem instalar nada e sem cadastro) reduz barreiras de acesso, e o conteúdo é escrito a partir de situações com as quais os participantes se identificam.

## Tecnologias utilizadas

| Tecnologia | Uso |
|---|---|
| **HTML5** | Estrutura semântica das telas |
| **CSS3** | Identidade visual, responsividade, animações discretas e acessibilidade |
| **JavaScript puro** | Lógica do jogo: navegação, pontuação, feedback, resultado, revisão |

Não há frameworks, bibliotecas, banco de dados, servidor, login, APIs ou rastreadores. Fontes, ícones e imagens são **locais** (fontes do próprio sistema, ícones em SVG embutidos no código e logotipo em SVG). O jogo não faz nenhuma requisição à internet.

## Funcionalidades

- **Página inicial** com nome, slogan, logotipo, explicação e botões principais.
- **Como funciona**: linguagem simples e avisos de que nada ali tem consequência real.
- **5 categorias** de desafios e a opção de **desafio completo** (14 situações):
  1. Mensagens e links suspeitos
  2. Ligações e pedidos de informações
  3. Notícias falsas e desinformação
  4. Senhas e privacidade
  5. Golpes envolvendo familiares e dinheiro
- **Simulações visuais**: conversa de mensagens, ligação recebida, publicação em rede social, áudio encaminhado e tela de aplicativo, todas marcadas como "Simulação educativa".
- **Feedback educativo individual por alternativa**, com sinais de alerta, atitude mais segura, dica prática e explicação técnica.
- **Pontuação justa**: resposta segura vale 100% dos pontos, parcial vale 50%, arriscada vale 0. Errar não "pune": o objetivo é aprender.
- **Resultado final** com pontos, acertos, respostas parciais e incorretas, percentual, desempenho por tema, conhecimentos demonstrados, assuntos que merecem atenção e recomendações personalizadas.
- **Níveis educativos**: Aprendiz Digital, Detetive de Golpes e Guardião da Segurança Digital.
- **Revisão das respostas** e botão **Jogar novamente**.
- **Biblioteca de segurança digital** com 13 assuntos, incluindo uma explicação sobre o cadeado/HTTPS.
- **Ajustes de leitura**: tamanho da letra (4 níveis), reduzir animações e alto contraste.

## Estrutura de arquivos

```
pode-clicar/
├── index.html        # Estrutura das telas
├── style.css         # Identidade visual, responsividade e acessibilidade
├── data.js           # Conteúdo: categorias, desafios, níveis e dicas
├── script.js         # Lógica do jogo
├── README.md         # Este arquivo
└── assets/
    ├── logo.svg      # Logotipo original (escudo com cursor)
    └── favicon.svg   # Ícone da aba do navegador
```

## Como executar

**Opção 1: abrir direto no navegador (mais simples)**

1. Baixe ou copie a pasta `pode-clicar` com todos os arquivos.
2. Dê dois cliques em `index.html`.

**Opção 2: servidor local (opcional)**

Se você tem o Python instalado, dentro da pasta `pode-clicar`:

```bash
python -m http.server 8000
```

Depois abra `http://localhost:8000` no navegador.

**No celular**: publique no GitHub Pages (abaixo) e abra o endereço no navegador do celular. Não precisa instalar nada.

## Como publicar no GitHub Pages

1. Crie uma conta em [github.com](https://github.com), se ainda não tiver.
2. Clique em **New repository** (novo repositório). Nome sugerido: `pode-clicar`. Deixe como **Public**.
3. Na página do repositório, clique em **uploading an existing file** e envie **todos os arquivos e a pasta `assets`** (mantenha `index.html` na raiz, e não dentro de outra pasta). Clique em **Commit changes**.
4. Vá em **Settings → Pages**.
5. Em **Build and deployment → Source**, escolha **Deploy from a branch**.
6. Em **Branch**, selecione `main` e a pasta `/ (root)`. Clique em **Save**.
7. Aguarde de 1 a 3 minutos. O endereço aparecerá no topo da página de Pages, no formato:
   `https://SEU-USUARIO.github.io/pode-clicar/`
8. Abra o endereço no computador e no celular para conferir. Se aparecer erro 404, aguarde um pouco e atualize.

Com Git no terminal (alternativa):

```bash
cd pode-clicar
git init
git add .
git commit -m "Primeira versão do Pode Clicar?"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/pode-clicar.git
git push -u origin main
```

Depois siga os passos 4 a 8.

## Como funciona por dentro (arquitetura)

A aplicação é uma **página única** (*single page*): o `index.html` contém todas as telas como `<section>`, e apenas uma fica visível por vez. Não há servidor nem banco de dados.

**Separação de responsabilidades**

| Arquivo | Papel |
|---|---|
| `data.js` | Guarda **só dados**: categorias, desafios, níveis e dicas. Para mudar o conteúdo, só este arquivo é editado. |
| `script.js` | **Lógica**: lê os dados, monta as telas, controla estado, pontuação e navegação. |
| `style.css` | **Aparência**: cores, tipografia, layout, acessibilidade. |
| `index.html` | **Estrutura** das telas e dos botões. |

**Estado do jogo** (objeto `state` em `script.js`)

- `queue`: a lista de desafios da partida atual (com as alternativas embaralhadas).
- `index`: em qual desafio o jogador está.
- `answers`: um objeto `{ idDoDesafio: { optionId, status, points } }` com as respostas já confirmadas.
- `selected`: a alternativa marcada, mas ainda não confirmada.
- `finished`: se a partida terminou.

**Fluxo de uma situação**

1. `renderPlay()` desenha o cenário, a pergunta e as alternativas.
2. O jogador marca uma alternativa (`selectOption`), que ainda **não** conta nada.
3. Ao confirmar (`confirmChoice`), o código primeiro verifica se aquele desafio já foi respondido. Se sim, ignora. Isso **impede pontuação duplicada** mesmo com cliques repetidos.
4. A resposta é gravada em `answers`, e `showFeedback()` exibe a explicação específica daquela alternativa.
5. `nextStep()` avança ou, na última situação, vai para o resultado.

**Cálculo do resultado**

`computeResults()` **recalcula tudo a partir de `answers`** (soma de pontos, contagem por status, percentual e desempenho por categoria). Nada é "inventado" ou somado antes da hora, e como o cálculo parte sempre das respostas reais, não há como a pontuação ficar fora de sincronia.

**Reinício**: `resetGame()` zera `queue`, `index`, `answers`, `selected` e `finished`. `startGame()` sempre chama `resetGame()` antes de montar uma nova partida.

**Navegação**: a função `go('nome-da-tela')` esconde todas as telas, mostra a escolhida, prepara seu conteúdo, atualiza o título da página, move o foco para o título (importante para leitores de tela) e registra o passo no histórico do navegador, para que o botão "voltar" do celular funcione.

**Segurança no código**: textos são inseridos com `textContent` (nunca `innerHTML` com conteúdo de dados). O único `innerHTML` é usado para desenhar os ícones SVG, cujo conteúdo é fixo e escrito no próprio `script.js`.

## Como adicionar ou editar desafios

Abra `data.js` e copie um objeto da lista `CHALLENGES`. Os campos são:

| Campo | Significado |
|---|---|
| `id` | Identificador único (ex.: `'P'`) |
| `category` | Um id de `CATEGORIES` (`mensagens`, `ligacoes`, `noticias`, `senhas`, `familiares`) |
| `title`, `context` | Título e descrição da situação |
| `difficulty` | `1` (Fácil, 10 pts), `2` (Médio, 15 pts) ou `3` (Desafiador, 20 pts) |
| `skill` | Frase curta usada no resultado ("O que você demonstrou" / "Merece atenção") |
| `libTopic` | Id de um assunto da biblioteca (`TIPS`) para o botão "Ler mais nas dicas" |
| `scene` | O cenário visual: `chat`, `call`, `post` ou `app` (veja os exemplos no arquivo) |
| `options` | 3 a 4 alternativas: `{ id, status, text, feedback }`. `status` é `'safe'`, `'partial'` ou `'risky'` |
| `signs`, `technical`, `tip` | Sinais de alerta, justificativa técnica e dica prática |

Regras: cada desafio precisa ter **pelo menos uma alternativa `safe`**. Desafios incompletos são ignorados automaticamente (com um aviso no console do navegador). Use endereços com final `.invalid` (domínio que nunca existe) e coloque `[[assim]]` o trecho que deve parecer um link.

## Como testar a aplicação

### Verificações realizadas durante o desenvolvimento

Foram executados testes automatizados em um navegador Chromium sem interface (modo *headless*), simulando um celular de 390 px de largura, e também telas de 320 px, 360 px e 1280 px. Foram conferidos:

- Abertura da página sem erros no console.
- Dados: 14 desafios, 5 categorias, cada desafio com 3 ou 4 alternativas, ao menos uma segura, sinais, dica, justificativa e assunto da biblioteca existente.
- Partida completa de 14 situações com respostas variadas (segura, parcial, arriscada): pontos, acertos, parciais, incorretas e percentual batem com o cálculo esperado.
- Cliques repetidos no botão de confirmar não duplicam pontos.
- Feedback exibido corresponde à alternativa escolhida.
- Revisão lista todas as respostas; botão voltar do navegador preserva o progresso; reinício zera tudo.
- Navegação por teclado (Tab, setas, Espaço, Enter) e foco visível.
- Ajustes: tamanho da letra, animações, contraste e persistência apenas das preferências.
- Ausência de rolagem horizontal em todas as telas, com 320 px de largura e letra no tamanho máximo.
- Cálculo das razões de contraste das combinações de cores principais (todas acima de 6,5:1 para texto).

### O que **não** foi testado (precisa ser feito por você)

- Aparelhos Android e iPhone reais e diferentes navegadores (Chrome, Firefox, Safari, Samsung Internet).
- Leitores de tela reais (TalkBack no Android, VoiceOver no iPhone, NVDA no Windows).
- Uso por pessoas da comunidade-alvo.

### Roteiro de testes manuais

**Abertura e navegação**
- [ ] Abrir `index.html` (ou o endereço do GitHub Pages) sem erros.
- [ ] Na tela inicial, os três botões funcionam: "Começar o desafio", "Como funciona" e "Dicas de segurança".
- [ ] Em "Como funciona", os botões "Voltar", "Começar o desafio" e "Escolher um tema" funcionam.
- [ ] A tela de temas mostra 5 cartões com a quantidade de desafios (3, 3, 3, 2 e 3).

**Jogo**
- [ ] Tocar em "Confirmar escolha" sem marcar nada mostra um aviso, sem avançar.
- [ ] Marcar uma alternativa, depois outra: apenas uma fica marcada.
- [ ] Confirmar: aparece o feedback com indicador (ícone + texto), sua escolha, explicação, sinais de alerta, dica e "Entender melhor".
- [ ] Se a escolha não foi segura, aparece "A atitude mais segura".
- [ ] Clicar várias vezes e rápido em "Confirmar escolha": o progresso só sobe 1.
- [ ] A barra de progresso e o texto "X de 14 respondidas" acompanham.
- [ ] Responder as 14 situações leva ao resultado.
- [ ] Jogar um tema isolado (ex.: "Ligações") tem só as situações daquele tema.
- [ ] "Sair do jogo" pede confirmação e volta para os temas.

**Resultado**
- [ ] Conferir à mão: some os pontos das suas respostas e compare com o total mostrado.
- [ ] Percentual = acertos ÷ total de situações.
- [ ] Responder tudo de forma segura leva a "Guardião da Segurança Digital" (80% ou mais); entre 50% e 79%, "Detetive de Golpes"; abaixo de 50%, "Aprendiz Digital".
- [ ] "Revisar minhas respostas" mostra todas as respostas, com as não seguras já abertas.
- [ ] "Ver dicas de segurança" e "Ler: ..." abrem a biblioteca, e o botão voltar retorna ao resultado.
- [ ] "Jogar novamente" zera pontos e progresso.

**Biblioteca**
- [ ] Todos os 13 assuntos abrem e fecham.
- [ ] O assunto "O cadeado do navegador (HTTPS)" explica que o cadeado não garante que o site seja legítimo.

**Acessibilidade e celular**
- [ ] Em "Ajustes", aumentar e diminuir a letra funciona, e o texto continua sem cortar.
- [ ] "Reduzir animações" para as animações; "Alto contraste" muda as cores.
- [ ] Recarregar a página mantém só essas preferências; "Voltar ao padrão" apaga.
- [ ] Jogar uma partida só com o teclado: Tab, setas (para trocar alternativa), Espaço e Enter.
- [ ] Em um celular, o botão "voltar" do aparelho volta à tela anterior sem sair do jogo.
- [ ] Ligar um leitor de tela e conferir se a situação, as alternativas e o feedback são lidos de forma compreensível.
- [ ] Desligar a internet depois de carregar a página e jogar: tudo continua funcionando.

## Cuidados de acessibilidade

- Fonte do sistema, tamanho base de 18 px, com **4 níveis de ampliação** (até 140%).
- Botões grandes (altura mínima de cerca de 3,6 rem nos principais) e bom espaçamento entre alternativas.
- **Não depende só de cores**: acertos, respostas parciais e arriscadas têm ícones e textos diferentes ("Boa escolha!", "Quase lá", "Atenção").
- Contraste alto entre texto e fundo, e modo de **alto contraste** opcional.
- **Reduzir animações**, que também respeita a configuração do aparelho (`prefers-reduced-motion`).
- Navegação completa por teclado, **indicador de foco visível** e link "Pular para o conteúdo".
- Estrutura semântica: títulos hierárquicos, `fieldset`/`legend` e botões de opção nativos nas alternativas, `progressbar` com valor, avisos com `role="alert"`.
- Ao mudar de tela ou mostrar o feedback, o **foco é movido** para o título, para que leitores de tela anunciem o novo conteúdo.
- Linguagem simples, direta e sem infantilizar.

## Privacidade e segurança

- Não há cadastro, login, formulários nem pedido de nome, telefone, CPF, endereço, senha ou dado bancário.
- Nenhuma resposta é enviada para servidor ou guardada. Ao fechar a página, elas somem.
- Não há rastreadores, anúncios nem ferramentas de análise de terceiros.
- Único dado guardado no aparelho (`localStorage`): suas **preferências de leitura** (tamanho da letra, animações, contraste), na chave `podeclicar:preferencias`. Podem ser apagadas em "Ajustes → Voltar ao padrão".
- Os "links" das simulações são fictícios, usam o final `.invalid` e **não são clicáveis**. Nenhuma ligação ou mensagem real é feita. Nomes e marcas são inventados.

## Limitações conhecidas

- Os alertas de confirmação ("Sair do desafio?") usam a janela padrão do navegador, cuja aparência varia entre aparelhos.
- O jogo não instala como aplicativo e não tem *service worker*: depois que a página carrega ele funciona sem internet, mas, se a página for fechada e reaberta sem internet, o navegador pode não encontrá-la.
- A ordem das alternativas é embaralhada a cada partida. Isso é intencional (evita decorar posições), mas pode ser desligado em `script.js` (`SHUFFLE_OPTIONS = false`).
- O conteúdo reflete práticas gerais de segurança e golpes comuns no Brasil, e golpes mudam com o tempo. O texto deve ser revisado periodicamente.
- Há poucos desafios por tema (2 a 3). Veja as possibilidades de evolução.
- Não foram feitos testes com leitores de tela reais nem com usuários.

## Possibilidades de evolução

- Mais desafios por tema e variações de cenários.
- Modo "mediador": um(a) extensionista conduz o jogo em grupo, projetando no telão.
- Versão para impressão (cartilha em PDF) a partir da biblioteca.
- Instalação como aplicativo (PWA) com funcionamento 100% offline.
- Leitura em voz alta das situações (com a API de síntese de voz do navegador).
- Fonte maior para as alternativas como opção separada.
- Questionário opcional e anônimo, **fora do jogo**, para avaliar o aprendizado da atividade extensionista (antes e depois), aplicado em papel ou formulário próprio, com consentimento.
- Tradução e adaptação para outras comunidades.

## Aplicação com a comunidade (a preencher)

> Esta seção será preenchida **somente depois** da aplicação real da atividade.

- Data e local da aplicação: _a preencher_
- Número de participantes: _a preencher_
- Observações da equipe: _a preencher_
- Resultados e aprendizados: _a preencher_

Nenhum resultado de uso por pessoas reais foi realizado ou registrado neste repositório até o momento.

## Créditos e licenças

- Código, textos, logotipo e estilos: desenvolvidos para este projeto de extensão. *(Defina aqui o nome da autora, da instituição e a licença que desejar, por exemplo MIT ou Creative Commons.)*
- Ícones: desenhos simples em SVG de traço, embutidos em `script.js`. Vários seguem o estilo do conjunto [Feather Icons](https://feathericons.com) (licença MIT).
- Fontes: não há arquivos de fonte. O jogo usa as fontes do próprio aparelho (Atkinson Hyperlegible, se instalada; senão Segoe UI, Roboto, Helvetica Neue ou Arial).
- Nenhuma marca real é reproduzida. Todos os nomes de empresas, bancos, pessoas e redes sociais nas simulações são fictícios.

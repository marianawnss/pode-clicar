/* =========================================================
   Pode Clicar? — Dados do jogo
   Tudo o que é conteúdo (desafios, dicas, níveis) fica aqui.
   Para adicionar um desafio novo, copie um objeto de CHALLENGES,
   mude o id e preencha os campos. Nenhuma outra parte do código
   precisa ser alterada.
   Todas as situações são FICTÍCIAS. Os endereços usam ".invalid",
   um domínio reservado que nunca existe na internet.
   ========================================================= */
(function () {
  'use strict';

  /* Dificuldade → rótulo e pontos de uma resposta totalmente segura.
     Resposta parcial vale metade dos pontos (arredondado). Resposta arriscada vale 0. */
  var DIFFICULTY = {
    1: { label: 'Fácil', points: 10 },
    2: { label: 'Médio', points: 15 },
    3: { label: 'Desafiador', points: 20 }
  };

  var CATEGORIES = [
    {
      id: 'mensagens',
      title: 'Mensagens e links suspeitos',
      icon: 'message',
      description: 'Prêmios, encomendas e promoções que chegam por mensagem ou rede social.'
    },
    {
      id: 'ligacoes',
      title: 'Ligações e pedidos de informações',
      icon: 'phone',
      description: 'Quando alguém liga ou escreve pedindo códigos, dados ou acesso ao seu celular.'
    },
    {
      id: 'noticias',
      title: 'Notícias falsas e desinformação',
      icon: 'news',
      description: 'Como conferir notícias, áudios e vídeos antes de repassar.'
    },
    {
      id: 'senhas',
      title: 'Senhas e privacidade',
      icon: 'key',
      description: 'Senhas fortes e cuidados com redes de internet e dados pessoais.'
    },
    {
      id: 'familiares',
      title: 'Golpes envolvendo familiares e dinheiro',
      icon: 'users',
      description: 'Pedidos de Pix, perfis falsos e campanhas de arrecadação.'
    }
  ];

  /* status de cada alternativa: 'safe' (segura), 'partial' (parcial), 'risky' (arriscada) */
  var CHALLENGES = [
    /* ---------- A — Prêmio inesperado ---------- */
    {
      id: 'A',
      category: 'mensagens',
      title: 'Prêmio inesperado',
      difficulty: 1,
      skill: 'Desconfiar de prêmios que você não esperava',
      libTopic: 'links',
      context: 'Você está em casa e recebe esta mensagem de um número que não está na sua agenda.',
      scene: {
        type: 'chat',
        appName: 'Mensageiro Exemplo',
        contact: 'Número desconhecido',
        contactSub: '(00) 90000-0000 — não está nos seus contatos',
        messages: [
          { from: 'them', time: '09:41', text: 'PARABÉNS! Você foi sorteado(a) e ganhou um celular novo! Resgate agora, só hoje: [[premio-exemplo.invalid/resgatar]]' },
          { from: 'them', time: '09:41', text: 'Preencha seus dados e pague só a taxa de envio. Corra, restam poucos prêmios!' }
        ]
      },
      question: 'O que você faria nesta situação?',
      options: [
        {
          id: 'a', status: 'risky',
          text: 'Clicar no link só para ver se o prêmio é de verdade.',
          feedback: 'Só abrir o link já é arriscado. A página pode ser falsa, pedir seus dados ou tentar instalar algo no aparelho. Golpistas contam justamente com a curiosidade.'
        },
        {
          id: 'b', status: 'risky',
          text: 'Preencher os dados e pagar a taxa: é um valor pequeno.',
          feedback: 'Aqui o prejuízo é duplo: você entrega seus dados e ainda paga uma "taxa". O prêmio não existe, e os dados do cartão podem ser usados em compras que você não fez.'
        },
        {
          id: 'c', status: 'safe',
          text: 'Não clicar e não responder. Apagar a mensagem e bloquear o número.',
          feedback: 'Muito bem! Você não participou de nenhum sorteio, então não há prêmio para resgatar. Apagar, bloquear e denunciar o número impede novas tentativas e protege outras pessoas.'
        },
        {
          id: 'd', status: 'partial',
          text: 'Encaminhar a mensagem para o grupo da família, perguntando se alguém também ganhou.',
          feedback: 'A intenção de avisar é boa, mas ao encaminhar o link você pode levar outra pessoa a clicar. Se quiser a opinião de alguém, mostre a tela do seu celular sem reenviar o link, ou apenas descreva o que recebeu.'
        }
      ],
      signs: [
        'Você não participou de nenhum sorteio.',
        'Pressa: "só hoje" e "restam poucos prêmios".',
        'Pedido de pagamento para liberar um prêmio.',
        'Remetente desconhecido e link estranho.'
      ],
      technical: 'Esse golpe é chamado de phishing: mensagens enviadas em massa para muitas pessoas ao mesmo tempo, com uma isca (prêmio) e uma ação (clicar, informar dados, pagar). O objetivo é roubar dados ou dinheiro. Quanto maior a vantagem prometida e menor o esforço pedido, maior a chance de golpe.',
      tip: 'Se você não participou de um sorteio, você não ganhou nada. Para conferir uma promoção, digite você mesmo o endereço oficial da empresa ou abra o aplicativo oficial dela.'
    },

    /* ---------- B — Suposto contato bancário ---------- */
    {
      id: 'B',
      category: 'ligacoes',
      title: 'Ligação do "banco"',
      difficulty: 2,
      skill: 'Nunca passar códigos para quem liga',
      libTopic: 'bancos',
      context: 'Seu telefone toca. Na tela aparece o nome de um banco, e a pessoa fala com muita segurança.',
      scene: {
        type: 'call',
        callerName: 'Atendimento Banco Exemplo',
        callerNumber: '(00) 4000-0000',
        lines: [
          'Bom dia! Aqui é do setor de segurança do Banco Exemplo. Detectamos uma compra suspeita no seu cartão.',
          'Para cancelar agora, vou enviar um código por mensagem. Preciso que o senhor(a) me diga o código.',
          'É urgente: se não confirmarmos em poucos minutos, a sua conta será bloqueada.'
        ]
      },
      question: 'O que você faria nesta situação?',
      options: [
        {
          id: 'a', status: 'risky',
          text: 'Falar o código para cancelar logo a compra.',
          feedback: 'O código autoriza uma operação em seu nome. Ao falar o código, você entrega ao golpista a "chave" para fazer transferências ou acessar sua conta. Banco de verdade não pede esse código por telefone.'
        },
        {
          id: 'b', status: 'risky',
          text: 'Pedir o nome completo do atendente e, se parecer confiável, falar o código.',
          feedback: 'Perguntar o nome é um bom instinto, mas não protege: qualquer pessoa pode inventar um nome. E o identificador de chamadas também pode ser falsificado. O código nunca deve ser dito a quem ligou.'
        },
        {
          id: 'c', status: 'safe',
          text: 'Desligar e ligar para o número oficial do banco (no verso do cartão ou no aplicativo oficial).',
          feedback: 'Ótima decisão! Ao ligar você mesmo para o número oficial, tem certeza de com quem está falando. Se houver mesmo um problema, o banco poderá resolver por esse canal seguro.'
        },
        {
          id: 'd', status: 'partial',
          text: 'Desligar e não fazer mais nada, para evitar problemas.',
          feedback: 'Desligar já protege você, e isso é o mais importante. Só vale um passo extra: olhar o aplicativo oficial do banco, ou ligar para o número do cartão, para confirmar que está tudo certo com sua conta.'
        }
      ],
      signs: [
        'Ligação que você não esperava.',
        'Urgência e ameaça de bloqueio.',
        'Pedido de um código que chegou para você.',
        'O nome na tela do telefone não prova nada: ele pode ser falsificado.'
      ],
      technical: 'Códigos de verificação (SMS, aplicativo ou token) servem para provar que é você quem está fazendo uma operação. Quem pede esse código por telefone quer, na verdade, autorizar algo no seu nome. O identificador de chamadas pode ser forjado (técnica chamada spoofing), por isso o contato deve ser sempre refeito por um canal oficial que você mesmo escolher.',
      tip: 'Bancos não pedem senha, códigos ou dados do cartão por telefone, mensagem ou e-mail. Na dúvida, desligue e ligue você mesmo para o número oficial.'
    },

    /* ---------- D — Notícia alarmante ---------- */
    {
      id: 'D',
      category: 'noticias',
      title: 'Notícia alarmante',
      difficulty: 2,
      skill: 'Conferir data e fonte antes de compartilhar',
      libTopic: 'noticias',
      context: 'Você vê esta publicação em uma rede social e fica preocupado(a) com o que ela diz.',
      scene: {
        type: 'post',
        network: 'Rede Vizinhança (fictícia)',
        author: 'Notícias Urgentes 24h',
        handle: '@noticias24h-exemplo',
        time: 'Publicado em 12/03/2019',
        text: 'URGENTE!!! Governo vai BLOQUEAR todas as contas de aposentados na próxima segunda! COMPARTILHE com todos os seus contatos antes que apaguem esta mensagem!!!',
        image: { caption: 'URGENTE', icon: 'alert' },
        stats: ['12 mil compartilhamentos', '3 mil comentários']
      },
      question: 'O que você faria nesta situação?',
      options: [
        {
          id: 'a', status: 'risky',
          text: 'Compartilhar com todos os contatos agora, para proteger as pessoas.',
          feedback: 'A vontade de proteger os outros é bonita, mas, se a notícia for falsa, você ajuda a espalhar medo e confusão. Esse tipo de publicação pede pressa de propósito, para que ninguém confira.'
        },
        {
          id: 'b', status: 'risky',
          text: 'Compartilhar só no grupo da família, para ninguém dizer que eu não avisei.',
          feedback: 'Mesmo num grupo pequeno, uma notícia falsa se espalha: cada pessoa repassa para outras. Primeiro confirme; depois, se for verdadeira, avise com calma.'
        },
        {
          id: 'c', status: 'safe',
          text: 'Conferir a data, quem publicou e se a notícia aparece em veículos de imprensa confiáveis ou em sites de checagem. Só então decidir.',
          feedback: 'Excelente! Repare que a publicação é de 2019: notícias antigas voltam a circular como se fossem novas. Conferir data, autor e outras fontes é o caminho mais seguro.'
        },
        {
          id: 'd', status: 'partial',
          text: 'Não compartilhar, mas também não conferir. Seguir em frente.',
          feedback: 'Não repassar já é uma ótima atitude! Se quiser ir além, vale conferir: assim você pode tranquilizar quem já compartilhou e ajudar a interromper a corrente.'
        }
      ],
      signs: [
        'Muitas letras maiúsculas e pontos de exclamação.',
        'Pede para compartilhar "antes que apaguem".',
        'Não cita nenhuma fonte oficial.',
        'A data é antiga (2019), mas a notícia fala em "próxima segunda".'
      ],
      technical: 'A desinformação se espalha porque mexe com emoções, como medo e urgência. Uma notícia verdadeira costuma aparecer em mais de um veículo conhecido e traz informações verificáveis (quem, quando, onde). Conteúdos antigos recirculando como se fossem recentes são muito comuns.',
      tip: 'Antes de compartilhar, faça três perguntas: Quem publicou? Quando foi publicado? Outras fontes confiáveis confirmam? Se não tiver certeza, não compartilhe.'
    },

    /* ---------- G — Senha fraca ---------- */
    {
      id: 'G',
      category: 'senhas',
      title: 'Criando uma senha',
      difficulty: 1,
      skill: 'Criar senhas fortes e diferentes para cada serviço',
      libTopic: 'senhas',
      context: 'Você vai se cadastrar em uma loja online e o aplicativo pede que você crie uma senha.',
      scene: {
        type: 'app',
        appName: 'Loja Exemplo — criar conta',
        heading: 'Crie sua senha',
        rows: [
          { label: 'Senha', value: '••••••••', icon: 'lock' },
          { label: 'Dica do aplicativo', value: 'Quanto mais longa, mais segura', icon: 'info' }
        ],
        note: 'Esta é uma tela de simulação. Você não precisa digitar nada.'
      },
      question: 'Qual estratégia você escolheria?',
      options: [
        {
          id: 'a', status: 'risky',
          text: 'Usar a data de nascimento ou o nome de um familiar, que é fácil de lembrar.',
          feedback: 'Datas e nomes são as primeiras coisas que um golpista tenta, e muitas vezes elas aparecem em redes sociais. Evite informações pessoais em senhas.'
        },
        {
          id: 'b', status: 'risky',
          text: 'Usar a mesma senha que já uso em outros sites, para não esquecer.',
          feedback: 'Se um site vazar a sua senha, golpistas testam essa mesma senha em e-mail, bancos e redes sociais. Reaproveitar senha coloca todas as suas contas em risco ao mesmo tempo.'
        },
        {
          id: 'c', status: 'safe',
          text: 'Criar uma senha longa e só para esta loja (por exemplo, uma frase com várias palavras sem ligação entre si), guardá-la em local seguro e ativar a confirmação em duas etapas, se existir.',
          feedback: 'Perfeito! O tamanho importa mais que símbolos complicados. Uma senha longa, exclusiva e com confirmação em duas etapas dá muito mais trabalho para quem tenta invadir sua conta.'
        },
        {
          id: 'd', status: 'partial',
          text: 'Criar uma senha comprida e forte, mas usar a mesma em todos os sites.',
          feedback: 'Senha longa é um ótimo começo! O ponto fraco é repetir: se um único site vazar a senha, todas as outras contas ficam expostas. O ideal é uma senha diferente para cada serviço.'
        }
      ],
      signs: [
        'Datas e nomes são fáceis de adivinhar.',
        'A mesma senha em vários sites multiplica o risco.',
        'Senhas curtas são descobertas rapidamente por programas.'
      ],
      technical: 'Ataques automatizados testam milhões de combinações por segundo, começando por senhas comuns e dados pessoais. O tamanho da senha aumenta muito o número de combinações. Além disso, senhas vazadas em um site são testadas em outros (técnica chamada credential stuffing). A confirmação em duas etapas adiciona uma segunda barreira, mesmo que a senha seja descoberta.',
      tip: 'Uma senha para cada serviço, longa e sem dados pessoais. Para as contas mais importantes (e-mail, banco, mensagens), ative a confirmação em duas etapas. Se tiver dificuldade de lembrar, use um gerenciador de senhas ou um caderno guardado em local seguro em casa.'
    },

    /* ---------- C — Familiar pedindo dinheiro ---------- */
    {
      id: 'C',
      category: 'familiares',
      title: '"Troquei de número"',
      difficulty: 2,
      skill: 'Confirmar a identidade de um familiar por outro canal',
      libTopic: 'dinheiro',
      context: 'Chega uma mensagem de um número novo. A foto de perfil é a de um neto, mas você não reconhece o número.',
      scene: {
        type: 'chat',
        appName: 'Mensageiro Exemplo',
        contact: 'Lucas (número novo)',
        contactSub: '(00) 91111-1111 — não está nos seus contatos',
        messages: [
          { from: 'them', time: '14:02', text: 'Oi, vó! Sou eu, o Lucas. Troquei de número, o celular antigo quebrou.' },
          { from: 'them', time: '14:03', text: 'Preciso de um favor urgente. Tenho uma conta pra pagar hoje e meu banco não está liberando. Pode fazer um Pix de R$ 1.800 pra mim? Pago amanhã.' },
          { from: 'them', time: '14:03', text: 'Não conta pra mamãe por enquanto, ela vai ficar preocupada.' }
        ]
      },
      question: 'O que você faria nesta situação?',
      options: [
        {
          id: 'a', status: 'risky',
          text: 'Fazer o Pix, afinal é o meu neto precisando de ajuda.',
          feedback: 'É natural querer ajudar quem amamos, e os golpistas sabem disso. Uma transferência por Pix é muito difícil de desfazer. Sem confirmar a identidade, o dinheiro pode ir direto para um estranho.'
        },
        {
          id: 'b', status: 'risky',
          text: 'Fazer uma pergunta pessoal e, se a pessoa acertar a resposta, fazer o Pix.',
          feedback: 'Boa ideia desconfiar, mas perguntas pessoais não bastam: muita informação de família aparece em redes sociais, e o golpista pode ter conversado antes com outros parentes. Confirme por outro canal.'
        },
        {
          id: 'c', status: 'safe',
          text: 'Ligar para o número antigo do Lucas, ou para os pais dele, para confirmar antes de qualquer pagamento.',
          feedback: 'Muito bem! Confirmar por um canal que você já conhece é a forma mais segura. Se o Lucas estiver bem, ele vai entender. Se for golpe, você acaba de evitar o prejuízo.'
        },
        {
          id: 'd', status: 'partial',
          text: 'Pedir uma ligação ou chamada de vídeo no número novo.',
          feedback: 'Pedir para falar com a pessoa é uma boa ideia! Mas o golpista pode inventar desculpas (microfone quebrado, sem internet) ou usar voz e imagem artificiais. O ideal é ligar para um número que você já tinha ou para outro familiar.'
        }
      ],
      signs: [
        'Número novo, justificativa pronta ("o celular quebrou").',
        'Pedido de dinheiro com urgência.',
        'Pedido de segredo: "não conta pra mamãe".',
        'O golpista usa foto e nome de uma pessoa real da família.'
      ],
      technical: 'Nesse golpe, o criminoso usa a foto e o nome de um parente (muitas vezes tirados de redes sociais) para criar um contato falso. A pressão emocional e o pedido de sigilo servem para impedir que você confirme com outras pessoas. O Pix é instantâneo, por isso o tempo para checar é antes de pagar, não depois.',
      tip: 'Antes de qualquer pagamento pedido por mensagem, ligue para a pessoa em um número que você já conhece ou fale com outro familiar. Combinar uma "palavra secreta" da família também ajuda.'
    },

    /* ---------- E — Link de entrega ---------- */
    {
      id: 'E',
      category: 'mensagens',
      title: 'Taxa de uma encomenda',
      difficulty: 1,
      skill: 'Conferir encomendas pelo canal oficial',
      libTopic: 'links',
      context: 'Você fez uma compra pela internet há alguns dias e recebe esta mensagem de texto.',
      scene: {
        type: 'chat',
        appName: 'Mensagens de texto (SMS)',
        contact: 'Entrega Exemplo',
        contactSub: 'Remetente não verificado',
        messages: [
          { from: 'them', time: '16:20', text: 'Entrega Exemplo: sua encomenda não pôde ser entregue por falta de pagamento de taxa de R$ 7,90. Regularize em 24h ou ela será devolvida: [[entrega-exemplo-taxa.invalid]]' }
        ]
      },
      question: 'O que você faria nesta situação?',
      options: [
        {
          id: 'a', status: 'risky',
          text: 'Clicar e pagar logo, para não perder a encomenda.',
          feedback: 'O valor é baixo de propósito: parece pouco e faz a pessoa agir sem pensar. Ao pagar, você entrega os dados do cartão ou do Pix a um golpista, que pode fazer outras cobranças depois.'
        },
        {
          id: 'b', status: 'risky',
          text: 'Clicar só para ver o valor, sem pagar.',
          feedback: 'Abrir o link já é um risco: a página pode imitar uma transportadora para pegar seus dados ou tentar instalar algo. Se não tem certeza, é melhor nem abrir.'
        },
        {
          id: 'c', status: 'safe',
          text: 'Não clicar. Conferir a encomenda no aplicativo ou site oficial da loja, digitando o endereço, ou com o código de rastreio da compra.',
          feedback: 'Excelente! Se existir mesmo uma taxa pendente, ela aparecerá no canal oficial. Você nunca precisa depender de um link recebido para saber da sua compra.'
        },
        {
          id: 'd', status: 'partial',
          text: 'Apagar a mensagem sem verificar se há alguma encomenda.',
          feedback: 'Apagar protege você do golpe. Só vale lembrar: se estiver realmente esperando uma encomenda, confira pelo aplicativo ou site oficial da loja para saber se há alguma pendência.'
        }
      ],
      signs: [
        'Remetente genérico e não verificado.',
        'Cobrança de taxa pequena com prazo curto.',
        'Link com endereço estranho, que não é o da loja.',
        'Você nem sabe de qual compra se trata.'
      ],
      technical: 'Golpes de "taxa de entrega" copiam o estilo de lojas e transportadoras e usam valores baixos para parecer inofensivos. A página falsa coleta dados do cartão, CPF e senhas. Lojas e transportadoras de verdade informam pendências nos próprios aplicativos, sites e na área "Meus pedidos".',
      tip: 'Para acompanhar uma encomenda, abra o aplicativo ou o site oficial da loja digitando você mesmo o endereço, ou use o código de rastreio que veio na compra.'
    },

    /* ---------- F — Falso suporte técnico ---------- */
    {
      id: 'F',
      category: 'ligacoes',
      title: 'Suporte técnico inesperado',
      difficulty: 3,
      skill: 'Nunca dar acesso remoto ao celular',
      libTopic: 'acesso',
      context: 'Alguém liga dizendo que descobriu um problema no seu celular e quer "ajudar".',
      scene: {
        type: 'call',
        callerName: 'Suporte Celular Seguro',
        callerNumber: 'Número não identificado',
        lines: [
          'Olá! Falo do suporte de segurança do seu celular. Identificamos um vírus que está roubando suas fotos e suas contas.',
          'Para resolver, o senhor(a) precisa baixar um aplicativo de acesso remoto e me dizer o código que aparecer na tela.',
          'Assim eu limpo o aparelho sem o senhor(a) precisar fazer nada. Mas precisa ser agora!'
        ]
      },
      question: 'O que você faria nesta situação?',
      options: [
        {
          id: 'a', status: 'risky',
          text: 'Baixar o aplicativo e dizer o código, para resolver logo o problema.',
          feedback: 'Com esse aplicativo, a pessoa passa a ver e controlar a tela do seu celular: mensagens, códigos, aplicativos do banco e fotos. Nenhum suporte legítimo liga sem ser chamado para pedir isso.'
        },
        {
          id: 'b', status: 'risky',
          text: 'Instalar o aplicativo, mas ficar olhando a tela e não dizer nenhuma senha.',
          feedback: 'Mesmo observando, o acesso remoto permite ver notificações, ler códigos que chegam e até abrir aplicativos. O golpista pode agir enquanto você estiver distraído. O seguro é nem instalar.'
        },
        {
          id: 'c', status: 'safe',
          text: 'Desligar. Se estiver preocupado(a), levar o celular a uma assistência de confiança ou pedir ajuda a um familiar.',
          feedback: 'Muito bem! Ninguém precisa de acesso ao seu celular a distância para "limpar um vírus" que apareceu por telefone. Procurar ajuda presencial de confiança é o caminho mais seguro.'
        },
        {
          id: 'd', status: 'partial',
          text: 'Dizer que vai pensar e retornar a ligação mais tarde, no número que a pessoa passou.',
          feedback: 'Não conceder o acesso foi o mais importante! Mas ligar de volta para um número fornecido por quem telefonou leva você de novo ao golpista. Procure ajuda por um canal que você mesmo escolher.'
        }
      ],
      signs: [
        'Ligação inesperada falando de "vírus".',
        'Pedido para instalar aplicativo de acesso remoto.',
        'Pedido do código que aparece na tela.',
        'Urgência: "precisa ser agora".'
      ],
      technical: 'Aplicativos de acesso remoto são legítimos quando você mesmo pede ajuda a alguém que conhece. Nas mãos de um golpista, permitem ler notificações (inclusive códigos de verificação), abrir aplicativos bancários e fazer transferências. A mensagem de "vírus" é só um pretexto para ganhar a sua confiança.',
      tip: 'Não instale aplicativos a pedido de quem ligou. Se já concedeu o acesso: desligue a internet do celular, desinstale o aplicativo, avise o banco por um canal oficial e troque suas senhas de outro aparelho.'
    },

    /* ---------- K — Vídeo ou áudio suspeito ---------- */
    {
      id: 'K',
      category: 'noticias',
      title: 'Áudio que "todo mundo precisa ouvir"',
      difficulty: 3,
      skill: 'Desconfiar de áudios e vídeos que podem ser falsos',
      libTopic: 'origem',
      context: 'Um grupo de amigos encaminha um áudio. A voz parece a de um médico muito conhecido da TV.',
      scene: {
        type: 'chat',
        appName: 'Mensageiro Exemplo',
        contact: 'Grupo Amigos da Comunidade',
        contactSub: '23 participantes',
        messages: [
          { from: 'them', time: '19:05', text: 'Encaminhada muitas vezes. Ouçam e repassem para todos antes que tirem do ar!' },
          { from: 'them', time: '19:05', audio: { duration: '0:47', caption: 'Voz parecida com a do "Dr. Roberto Exemplo", médico de TV (personagem fictício), dizendo que um produto cura várias doenças e que os médicos escondem isso.' } }
        ]
      },
      question: 'O que você faria nesta situação?',
      options: [
        {
          id: 'a', status: 'risky',
          text: 'Repassar para os contatos, porque a voz parece mesmo a dele.',
          feedback: 'Hoje é possível imitar a voz de qualquer pessoa com programas de inteligência artificial. "Parece a voz dele" não é prova. Repassar pode levar outras pessoas a decisões erradas sobre a saúde.'
        },
        {
          id: 'b', status: 'risky',
          text: 'Repassar avisando: "não sei se é verdade, mas vale a pena ouvir".',
          feedback: 'O aviso não evita o problema: muita gente ouve, não lê a ressalva e repassa sem o aviso. Se tiver dúvida, o melhor é conferir antes de repassar.'
        },
        {
          id: 'c', status: 'safe',
          text: 'Não repassar. Procurar se o próprio médico ou veículos confiáveis confirmam essa declaração.',
          feedback: 'Excelente! Se uma pessoa conhecida disse algo importante, haverá registro em canais oficiais dela ou na imprensa. Se não houver, é sinal de alerta.'
        },
        {
          id: 'd', status: 'safe',
          text: 'Conversar com meu médico ou farmacêutico antes de qualquer mudança em tratamento ou produto.',
          feedback: 'Ótima atitude! Em assuntos de saúde, a orientação de um profissional que conhece seu caso vale muito mais do que qualquer áudio recebido. Nunca mude um tratamento por causa de mensagem.'
        }
      ],
      signs: [
        'Mensagem "encaminhada muitas vezes".',
        'Pede para repassar antes que "tirem do ar".',
        'Afirma que "os médicos escondem" algo.',
        'Não informa onde nem quando a pessoa disse isso.'
      ],
      technical: 'Áudios, imagens e vídeos podem ser editados ou gerados por inteligência artificial (os chamados deepfakes), com resultados cada vez mais convincentes. Por isso, parecer verdadeiro não é suficiente: é preciso verificar a origem, quando e onde foi dito, e se fontes confiáveis confirmam.',
      tip: 'Áudio ou vídeo que mexe com emoções e pede repasse imediato merece pausa. Procure a fonte original e, sobre saúde, converse sempre com um profissional.'
    },

    /* ---------- L — Wi-Fi público ---------- */
    {
      id: 'L',
      category: 'senhas',
      title: 'Wi-Fi aberto no shopping',
      difficulty: 2,
      skill: 'Ter cuidado com redes Wi-Fi desconhecidas',
      libTopic: 'wifi',
      context: 'Você está no shopping, esperando uma consulta, e precisa pagar hoje uma conta pelo aplicativo do banco. O seu plano de dados móveis está funcionando.',
      scene: {
        type: 'app',
        appName: 'Configurações de Wi-Fi (simulação)',
        heading: 'Redes disponíveis',
        rows: [
          { label: 'Shopping_Livre', value: 'Aberta, sem senha', icon: 'wifi' },
          { label: 'Shopping_Livre_2', value: 'Aberta, sem senha', icon: 'wifi' },
          { label: 'Dados móveis do seu plano', value: 'Disponível', icon: 'phone' }
        ],
        note: 'Esta é uma tela de simulação.'
      },
      question: 'O que você faria nesta situação?',
      options: [
        {
          id: 'a', status: 'risky',
          text: 'Conectar em uma das redes abertas e pagar a conta: é rápido.',
          feedback: 'Nem toda rede pública é perigosa, mas em redes abertas você não sabe quem as administra nem quem mais está conectado. Para operações financeiras, o ideal é uma conexão em que você confie.'
        },
        {
          id: 'b', status: 'partial',
          text: 'Perguntar no balcão qual é o nome oficial da rede do shopping, conectar nela e pagar.',
          feedback: 'Confirmar o nome oficial é uma boa prática, pois redes falsas com nomes parecidos existem. Mesmo assim, é uma rede compartilhada por muita gente. Para pagamentos, os dados móveis do seu plano são mais confiáveis.'
        },
        {
          id: 'c', status: 'safe',
          text: 'Usar os dados móveis do meu plano, ou deixar o pagamento para uma rede de confiança, como a de casa. Usar o Wi-Fi do shopping apenas para navegação comum.',
          feedback: 'Muito bem! Para pagamentos e senhas, uma conexão que você controla (como o seu plano de dados ou a internet de casa) reduz bastante o risco. A rede pública pode servir para o que não é sensível.'
        },
        {
          id: 'd', status: 'risky',
          text: 'Conectar na rede aberta e pagar, desde que o site tenha um cadeado.',
          feedback: 'O cadeado indica que a conexão com o site é criptografada, mas sozinho não garante que o site seja legítimo nem que a rede seja confiável. Para operações financeiras, prefira outra conexão.'
        }
      ],
      signs: [
        'Rede aberta, sem senha e sem dono conhecido.',
        'Mais de uma rede com nome parecido.',
        'Operação sensível (pagamento) feita em conexão compartilhada.'
      ],
      technical: 'Em redes abertas, redes falsas com nomes parecidos podem ser criadas para tentar interceptar ou direcionar o tráfego. Aplicativos e sites usam criptografia, o que protege bastante, mas o risco aumenta com páginas falsas, avisos ignorados e dispositivos desatualizados. Dados móveis ou uma rede protegida e conhecida são escolhas mais seguras para operações financeiras.',
      tip: 'Em redes públicas, evite banco, compras e entrar em contas importantes. Se precisar, use o plano de dados do celular.'
    },

    /* ---------- I — Perfil falso ---------- */
    {
      id: 'I',
      category: 'familiares',
      title: 'Perfil falso de uma amiga',
      difficulty: 2,
      skill: 'Verificar a identidade por um canal independente',
      libTopic: 'dinheiro',
      context: 'Uma pessoa com o nome e a foto de uma amiga da comunidade pede ajuda, mas o número é desconhecido para você.',
      scene: {
        type: 'chat',
        appName: 'Mensageiro Exemplo',
        contact: 'Helena (novo perfil)',
        contactSub: '(00) 92222-2222 — número que você não conhece',
        messages: [
          { from: 'them', time: '10:15', text: 'Oi, querida! Tudo bem? Estou com problema no meu cartão e preciso pagar uma conta hoje.' },
          { from: 'them', time: '10:16', text: 'Você poderia pagar este boleto pra mim? Devolvo amanhã, depois da missa. Mando o comprovante assim que eu conseguir.' }
        ]
      },
      question: 'O que você faria nesta situação?',
      options: [
        {
          id: 'a', status: 'risky',
          text: 'Pagar o boleto para ajudar a amiga.',
          feedback: 'Sem confirmar quem está do outro lado, o dinheiro pode ir parar na conta de um golpista. Perfis falsos usam a foto e o nome de pessoas reais para ganhar sua confiança.'
        },
        {
          id: 'b', status: 'partial',
          text: 'Responder perguntando o que aconteceu, para entender melhor a situação.',
          feedback: 'Perguntar não causa prejuízo imediato, mas continuar a conversa com um perfil falso dá chance de o golpista insistir e pressionar. O melhor é confirmar com a Helena por outro canal antes de responder.'
        },
        {
          id: 'c', status: 'safe',
          text: 'Ligar para o número que eu já conheço da Helena, ou procurá-la pessoalmente. Se for golpe, bloquear e denunciar o perfil.',
          feedback: 'Muito bem! Confirmar por um canal independente resolve a dúvida. Se for golpe, bloquear e denunciar o perfil ajuda a proteger outras pessoas da comunidade.'
        }
      ],
      signs: [
        'Número novo com nome e foto de alguém que você conhece.',
        'Pedido de pagamento urgente, com promessa de devolver.',
        'Conversa só por mensagem, sem querer falar por voz.'
      ],
      technical: 'Golpistas copiam fotos e nomes de perfis públicos e criam contas falsas. Depois enviam o mesmo pedido a vários contatos da vítima. A confirmação por um canal independente (ligação para o número antigo ou conversa pessoal) é eficaz porque o golpista não controla esse canal.',
      tip: 'Número novo pedindo dinheiro: confirme por voz, em um número que você já tinha. Avise a pessoa real de que alguém está usando o nome dela.'
    },

    /* ---------- J — Promoção nas redes sociais ---------- */
    {
      id: 'J',
      category: 'mensagens',
      title: 'Sorteio na rede social',
      difficulty: 2,
      skill: 'Desconfiar de promoções que pedem dados pessoais',
      libTopic: 'mensagens',
      context: 'Você encontra esta publicação enquanto navega pela rede social.',
      scene: {
        type: 'post',
        network: 'Rede Vizinhança (fictícia)',
        author: 'Casa Bela Promoções',
        handle: '@casabela-promo-exemplo',
        time: 'Publicado hoje',
        text: 'SORTEIO DE ANIVERSÁRIO! Ganhe um kit de panelas e 90% de desconto em tudo! Curta, compartilhe e preencha seus dados (CPF, e-mail e telefone) em [[casabela-exemplo.invalid/sorteio]]. Só hoje!',
        image: { caption: 'Kit de panelas grátis', icon: 'gift' },
        stats: ['8 mil curtidas', '1,2 mil comentários: "ganhei!"']
      },
      question: 'O que você faria nesta situação?',
      options: [
        {
          id: 'a', status: 'risky',
          text: 'Preencher os dados para concorrer ao kit de panelas.',
          feedback: 'CPF, e-mail e telefone reunidos servem para abrir contas em seu nome, enviar novos golpes e se passar por você. Não entregue dados em promoções que você não confirmou.'
        },
        {
          id: 'b', status: 'partial',
          text: 'Só curtir e compartilhar a publicação, sem preencher dados.',
          feedback: 'Você evitou entregar seus dados, o que é ótimo. Mas ao compartilhar, ajuda a espalhar a mesma isca para amigos e familiares. Compartilhe somente promoções que você confirmou.'
        },
        {
          id: 'c', status: 'safe',
          text: 'Procurar o site, o aplicativo ou a loja oficial da empresa para ver se a promoção existe. Se não existir, denunciar a publicação.',
          feedback: 'Perfeito! Empresas de verdade divulgam promoções nos canais oficiais. Se a oferta não aparece lá, é forte indício de golpe. Denunciar ajuda a derrubar o perfil falso.'
        },
        {
          id: 'd', status: 'partial',
          text: 'Ler os comentários para ver se outras pessoas ganharam.',
          feedback: 'Olhar os comentários pode parecer uma prova, mas perfis falsos e robôs escrevem "ganhei!" para convencer. Não é uma fonte segura. Confirme nos canais oficiais da empresa.'
        }
      ],
      signs: [
        '90% de desconto em tudo: bom demais para ser verdade.',
        'Pede CPF, e-mail e telefone juntos.',
        'Comentários iguais e animados demais ("ganhei!").',
        'Urgência: "só hoje".'
      ],
      technical: 'Promoções falsas são usadas para coletar dados (que serão vendidos ou usados em outros golpes) e para fazer a publicação se espalhar por meio de curtidas e compartilhamentos. Comentários elogiosos podem ser escritos por contas falsas ou por programas automáticos.',
      tip: 'Desconfie de vantagens exageradas. Procure a oferta pelo site ou aplicativo oficial da empresa. E se ela pedir mais dados do que o necessário, não forneça.'
    },

    /* ---------- H — Código de verificação ---------- */
    {
      id: 'H',
      category: 'ligacoes',
      title: '"Me passa o código?"',
      difficulty: 2,
      skill: 'Códigos de verificação são só seus',
      libTopic: 'senhas',
      context: 'Um contato conhecido escreve para você logo depois que chega uma mensagem de código no seu celular.',
      scene: {
        type: 'chat',
        appName: 'Mensageiro Exemplo',
        contact: 'Marcos (vizinho)',
        contactSub: 'Está na sua agenda',
        messages: [
          { from: 'system', time: '11:30', text: 'Seu código do Mensageiro Exemplo é 482 913. Não compartilhe este código com ninguém.' },
          { from: 'them', time: '11:31', text: 'Oi! Digitei seu número errado ao cadastrar um anúncio e o código chegou aí no seu celular.' },
          { from: 'them', time: '11:31', text: 'Pode me passar? Preciso urgente, estou perdendo a vaga!' }
        ]
      },
      question: 'O que você faria nesta situação?',
      options: [
        {
          id: 'a', status: 'risky',
          text: 'Passar o código, afinal é o Marcos e ele está precisando.',
          feedback: 'Esse código serve para ativar a SUA conta em outro aparelho. Se você passar, o golpista toma conta da sua conta de mensagens e pode pedir dinheiro aos seus contatos. Nesse golpe, é comum que o "Marcos" seja a conta de um amigo que já foi invadida.'
        },
        {
          id: 'b', status: 'risky',
          text: 'Ligar para o Marcos para confirmar e, se for ele mesmo, passar o código.',
          feedback: 'Confirmar com o Marcos é uma excelente ideia! Mas, mesmo que seja ele, o código não pode ser repassado: ele é só seu e nunca é necessário para a pessoa que "errou o número". Não repasse.'
        },
        {
          id: 'c', status: 'safe',
          text: 'Não passar o código. Avisar o Marcos por ligação de que a conta dele pode ter sido invadida.',
          feedback: 'Excelente! Você protegeu a sua conta e ainda ajudou um amigo. Ligar para ele confirma se a conta foi invadida, e ele pode agir rápido para recuperá-la.'
        },
        {
          id: 'd', status: 'partial',
          text: 'Ignorar a mensagem e apagá-la.',
          feedback: 'Ignorar protege a sua conta, e isso é o mais importante. Se puder, avise o Marcos por ligação: se a conta dele foi invadida, ele precisa saber para recuperá-la e proteger outras pessoas.'
        }
      ],
      signs: [
        'Pedem um código que chegou para você.',
        'Pressa e uma história pronta ("digitei errado").',
        'A mensagem do aplicativo diz claramente: "Não compartilhe".'
      ],
      technical: 'Quando você instala ou ativa uma conta de mensagens em um aparelho novo, o serviço envia um código ao número para provar que a conta é sua. Quem tem esse código consegue ativar a conta em outro aparelho. Por isso, ele é a "chave" da conta. A proteção extra é a confirmação em duas etapas do aplicativo, que pede um PIN além do código.',
      tip: 'Nenhum serviço legítimo pede o código que chegou para você. Ative a confirmação em duas etapas do seu aplicativo de mensagens e mantenha um PIN que só você saiba.'
    },

    /* ---------- N — Corrente de saúde ---------- */
    {
      id: 'N',
      category: 'noticias',
      title: 'Corrente de saúde no grupo da família',
      difficulty: 1,
      skill: 'Não confiar em "curas milagrosas" recebidas por mensagem',
      libTopic: 'noticias',
      context: 'Um parente querido manda esta mensagem no grupo da família.',
      scene: {
        type: 'chat',
        appName: 'Mensageiro Exemplo',
        contact: 'Grupo Família Unida',
        contactSub: '14 participantes',
        messages: [
          { from: 'them', time: '07:50', text: 'ATENÇÃO!!! Um chá caseiro cura diabetes e pressão alta em 7 dias. Os médicos não querem que você saiba! Pare de tomar seus remédios e passe adiante para salvar vidas!' }
        ]
      },
      question: 'O que você faria nesta situação?',
      options: [
        {
          id: 'a', status: 'risky',
          text: 'Parar de tomar os remédios e seguir a receita do chá.',
          feedback: 'Interromper um tratamento por conta própria pode ser muito perigoso: a pressão e o açúcar no sangue podem subir sem sinais claros. Nunca mude remédios sem orientação médica.'
        },
        {
          id: 'b', status: 'risky',
          text: 'Repassar para amigos, porque pode ajudar alguém.',
          feedback: 'Repassar sem conferir pode levar outra pessoa a abandonar o tratamento. A intenção é boa, mas o efeito pode ser perigoso. Primeiro confira com um profissional de saúde.'
        },
        {
          id: 'c', status: 'safe',
          text: 'Não mudar nada nos remédios. Conversar com meu médico ou farmacêutico e conferir em um site oficial de saúde.',
          feedback: 'Muito bem! Profissionais de saúde e órgãos oficiais são a fonte certa para esse tipo de informação. Uma "cura" simples e rápida para doenças crônicas é sempre sinal de alerta.'
        },
        {
          id: 'd', status: 'partial',
          text: 'Responder com carinho ao parente, dizendo que isso precisa ser confirmado com um médico.',
          feedback: 'Corrigir com carinho é uma ótima atitude e ajuda o grupo todo! Para ficar completo, confirme antes com uma fonte confiável e, de preferência, indique onde encontrar a informação correta.'
        }
      ],
      signs: [
        'Promete cura rápida e fácil para doenças sérias.',
        'Diz que "os médicos escondem".',
        'Manda parar de tomar remédios.',
        'Pede para passar adiante "para salvar vidas".'
      ],
      technical: 'Mensagens de saúde sem fonte aproveitam o desejo de cura e a confiança em quem nos manda. Doenças como diabetes e hipertensão exigem acompanhamento contínuo. Produtos caseiros podem ter efeitos reais, mas não substituem tratamento e podem interagir com medicamentos.',
      tip: 'Nunca interrompa um tratamento por causa de uma mensagem. Se tiver dúvida sobre uma informação de saúde, converse com seu médico ou farmacêutico.'
    },

    /* ---------- M — Doação falsa ---------- */
    {
      id: 'M',
      category: 'familiares',
      title: 'Campanha de arrecadação',
      difficulty: 2,
      skill: 'Confirmar campanhas e pedidos de doação antes de pagar',
      libTopic: 'dinheiro',
      context: 'Você recebe uma mensagem de um número desconhecido pedindo ajuda para uma causa que parece boa.',
      scene: {
        type: 'chat',
        appName: 'Mensageiro Exemplo',
        contact: 'Campanha Solidária',
        contactSub: '(00) 93333-3333 — número desconhecido',
        messages: [
          { from: 'them', time: '08:12', text: 'Olá, irmão(ã)! Estamos arrecadando para reformar o telhado da capela e ajudar famílias atingidas pela chuva.' },
          { from: 'them', time: '08:12', text: 'Faça um Pix de qualquer valor ainda hoje para a chave: 000.000.000-00 (chave fictícia), em nome de "Associação Esperança Exemplo". Compartilhe com seus contatos!' }
        ]
      },
      question: 'O que você faria nesta situação?',
      options: [
        {
          id: 'a', status: 'risky',
          text: 'Fazer o Pix agora, pois é uma causa boa.',
          feedback: 'Golpistas se aproveitam da generosidade das pessoas. Sem confirmar que a campanha é real e que a chave Pix pertence à entidade, o dinheiro pode ir para um golpista.'
        },
        {
          id: 'b', status: 'risky',
          text: 'Compartilhar a mensagem com os contatos para ajudar a divulgar.',
          feedback: 'Divulgar sem confirmar pode levar outras pessoas a perder dinheiro, e ainda faz seu nome parecer garantia de que a campanha é verdadeira. Confirme antes de divulgar.'
        },
        {
          id: 'c', status: 'safe',
          text: 'Falar com a coordenação ou secretaria da comunidade pessoalmente, ou por um telefone que eu já conheço, para saber se a campanha existe e qual é a conta oficial.',
          feedback: 'Excelente! Quem coordena a comunidade pode confirmar se a campanha existe e indicar os meios oficiais de doação. Assim você ajuda com segurança.'
        },
        {
          id: 'd', status: 'partial',
          text: 'Ignorar a mensagem e não doar, por segurança.',
          feedback: 'Não pagar protege você. Mas, se avisar a coordenação da comunidade sobre a mensagem, você ajuda outras pessoas a não caírem, e a coordenação pode informar como doar de forma segura.'
        }
      ],
      signs: [
        'Número desconhecido pedindo dinheiro.',
        'Pix urgente, "ainda hoje".',
        'Nenhum contato oficial para confirmar a campanha.',
        'Pede que você compartilhe com seus contatos.'
      ],
      technical: 'Golpes de falsa arrecadação usam causas emocionais (reformas, saúde, desastres) para pedir transferências. Em doações legítimas, existe uma entidade identificável, o nome do favorecido que aparece no Pix coincide com o dela e há como confirmar por canais conhecidos.',
      tip: 'Antes de doar, confirme a campanha com a organização por um canal que você já conhece. Antes de confirmar o Pix, confira se o nome que aparece é mesmo o da entidade.'
    }
  ];

  /* Níveis educativos, por percentual de acertos totalmente seguros.
     Os textos evitam dar a entender que alguém está "100% protegido". */
  var LEVELS = [
    {
      id: 'aprendiz',
      name: 'Aprendiz Digital',
      min: 0,
      icon: 'book',
      text: 'Você deu um passo importante: observar essas situações com atenção. Errar faz parte do aprendizado, e as dicas abaixo podem ajudar muito nas próximas vezes.'
    },
    {
      id: 'detetive',
      name: 'Detetive de Golpes',
      min: 50,
      icon: 'eye',
      text: 'Você já identifica vários sinais de alerta. Continue treinando o olhar e revise os assuntos que merecem mais atenção.'
    },
    {
      id: 'guardiao',
      name: 'Guardião da Segurança Digital',
      min: 80,
      icon: 'shield',
      text: 'Você mostrou ótimo raciocínio para reconhecer riscos. Lembre-se: golpes mudam o tempo todo, então continue atento(a) e compartilhe o que aprendeu com quem você ama.'
    }
  ];

  /* Biblioteca de segurança digital. Cada item vira um bloco que abre e fecha. */
  var TIPS = [
    {
      id: 'links',
      icon: 'link',
      title: 'Como desconfiar de links suspeitos',
      intro: 'Um link recebido por mensagem, e-mail ou rede social pode levar a uma página falsa. Na dúvida, não toque.',
      items: [
        'Pare antes de tocar. Se você não esperava aquela mensagem, desconfie.',
        'Olhe o endereço com atenção: letras trocadas, nomes estranhos ou endereços muito longos são sinais de alerta.',
        'Para entrar no banco, em uma loja ou em um órgão público, não use links recebidos. Digite o endereço que você conhece ou abra o aplicativo oficial.',
        'Em muitos aplicativos, ao manter o dedo sobre o link, é possível ver o endereço completo antes de abrir.',
        'Instale aplicativos somente pelas lojas oficiais do seu celular. Nunca instale arquivos enviados por mensagem.',
        'Se você clicou sem querer: não digite nenhum dado, feche a página e, se tiver dúvida, peça ajuda a alguém de confiança.'
      ]
    },
    {
      id: 'https',
      icon: 'lock',
      title: 'O cadeado do navegador (HTTPS)',
      intro: 'O cadeado ao lado do endereço indica que a conexão entre você e o site é criptografada, ou seja, os dados viajam protegidos.',
      items: [
        'O cadeado (HTTPS) NÃO garante, sozinho, que o site seja legítimo. Páginas falsas também podem ter cadeado.',
        'Confira o endereço completo, não apenas o cadeado.',
        'Acesse sites oficiais digitando o endereço que você já conhece ou usando aplicativos oficiais, em vez de confiar cegamente em links recebidos.',
        'Se o navegador mostrar um aviso de segurança em tela cheia, não continue.'
      ]
    },
    {
      id: 'mensagens',
      icon: 'message',
      title: 'Como reconhecer mensagens fraudulentas',
      intro: 'Golpes mudam de história, mas quase sempre têm os mesmos sinais.',
      items: [
        'Urgência ou ameaça: "só hoje", "sua conta será bloqueada".',
        'Promessa boa demais: prêmios, descontos enormes, dinheiro fácil.',
        'Pedido de dados, senhas, códigos ou dinheiro.',
        'Remetente desconhecido, número novo ou nome que não combina com o endereço.',
        'Pedido de segredo: "não conte para ninguém".',
        'Erros de escrita, textos estranhos ou muito apelativos.',
        'Lembre da regra: Pare, pense e confirme por outro canal.'
      ]
    },
    {
      id: 'origem',
      icon: 'eye',
      title: 'Como verificar a origem de uma informação',
      intro: 'Antes de acreditar, descubra de onde a informação veio.',
      items: [
        'Quem publicou? Existe um autor, uma instituição ou veículo identificável?',
        'Quando foi publicado? Conteúdos antigos voltam a circular como se fossem novos.',
        'Outras fontes confiáveis confirmam? Procure em mais de um lugar.',
        'Existe a fonte original (documento, comunicado oficial, entrevista completa)?',
        'Imagens podem ser buscadas por "pesquisa reversa" para ver se já foram usadas em outros contextos.',
        'Áudios, vídeos e imagens podem ser editados ou gerados por inteligência artificial (deepfakes). Parecer real não é prova de que é real.'
      ]
    },
    {
      id: 'noticias',
      icon: 'news',
      title: 'Como conferir notícias antes de compartilhar',
      intro: 'Compartilhar é um ato de responsabilidade: você empresta a sua credibilidade à mensagem.',
      items: [
        'Leia além do título. Muitas vezes o texto diz algo diferente.',
        'Desconfie de textos que pedem para compartilhar com urgência ou "antes que apaguem".',
        'Procure o assunto em veículos de imprensa conhecidos e em agências de checagem de fatos.',
        'Sobre saúde, converse sempre com um profissional. Nunca interrompa um tratamento por causa de uma mensagem.',
        'Se você não tem certeza, não compartilhe.',
        'Se compartilhou algo falso sem querer, avise as pessoas. Isso é uma atitude responsável, não motivo de vergonha.'
      ]
    },
    {
      id: 'senhas',
      icon: 'key',
      title: 'Como proteger senhas e códigos de verificação',
      intro: 'Senhas e códigos são as chaves das suas contas.',
      items: [
        'Prefira senhas longas, como frases com várias palavras sem ligação entre si.',
        'Use uma senha diferente para cada serviço, principalmente para e-mail, banco e mensagens.',
        'Evite datas de nascimento, nomes de familiares, placas e sequências como 123456.',
        'Ative a confirmação em duas etapas nos serviços importantes.',
        'Códigos que chegam por SMS ou aplicativo são pessoais: nunca os passe a ninguém, mesmo que a pessoa diga ser do banco, da loja ou um conhecido.',
        'Se precisar anotar senhas, guarde o caderno em local seguro em casa ou use um gerenciador de senhas.',
        'Se suspeitar que uma senha vazou, troque-a imediatamente.'
      ]
    },
    {
      id: 'bancos',
      icon: 'shield',
      title: 'Como reconhecer tentativas de se passar por bancos ou familiares',
      intro: 'Golpistas imitam quem você conhece ou em quem confia.',
      items: [
        'Bancos não pedem senhas, códigos ou dados do cartão por telefone, mensagem ou e-mail.',
        'O nome que aparece na tela da chamada pode ser falsificado. Se tiver dúvida, desligue e ligue para o número oficial (no verso do cartão ou no aplicativo).',
        'Nenhum banco envia um funcionário à sua casa para buscar cartão, senha ou dinheiro.',
        'Mensagem de "número novo" de um familiar pedindo dinheiro: confirme por ligação para o número antigo ou fale com outra pessoa da família.',
        'Foto e nome de perfil não provam quem está falando.',
        'Combine uma palavra secreta com a família para situações de emergência.'
      ]
    },
    {
      id: 'dinheiro',
      icon: 'users',
      title: 'Como confirmar pedidos urgentes de dinheiro',
      intro: 'Antes de pagar, a regra é: confirme primeiro, pague depois.',
      items: [
        'Ligue para a pessoa em um número que você já conhece, ou fale com outro familiar.',
        'Desconfie quando pedem sigilo ou muita pressa.',
        'Perguntas pessoais ajudam pouco: golpistas podem ter informações de redes sociais.',
        'Antes de confirmar um Pix, confira o nome do favorecido que o aplicativo mostra. Ele precisa ser quem você espera.',
        'Para doações, confirme a campanha com a organização por um canal que você já conhece.',
        'Um minuto para confirmar não custa nada. Pagar sem confirmar pode custar muito.'
      ]
    },
    {
      id: 'fraude',
      icon: 'alert',
      title: 'Como agir diante de uma possível fraude',
      intro: 'Se aconteceu, não se culpe. Golpistas enganam pessoas de todas as idades. O mais importante é agir rápido e com calma.',
      items: [
        'Pare de conversar com o golpista e não envie mais nada.',
        'Fale com o seu banco o quanto antes, pelo telefone oficial ou aplicativo, para relatar o caso e pedir o bloqueio de cartão ou conta. Em casos de Pix, informe o ocorrido para que a instituição analise a possibilidade de devolução.',
        'Troque as senhas das contas afetadas, preferencialmente usando outro aparelho.',
        'Se invadiram sua conta de mensagens, avise seus contatos por ligação e recupere a conta pelo aplicativo.',
        'Guarde provas: capturas de tela, comprovantes e números envolvidos.',
        'Registre um boletim de ocorrência na delegacia ou, se disponível, na delegacia virtual do seu estado.',
        'Conte para alguém de confiança. Falar sobre o assunto ajuda você e protege outras pessoas.'
      ]
    },
    {
      id: 'dados',
      icon: 'user',
      title: 'Como proteger dados pessoais',
      intro: 'Quanto menos dados você entrega, menos pode ser usado contra você.',
      items: [
        'Informe só o necessário. Desconfie de cadastros que pedem mais do que precisam.',
        'Não publique fotos de documentos, cartões, passagens ou boletos nas redes sociais.',
        'Revise as configurações de privacidade das redes sociais.',
        'Use bloqueio de tela no celular e mantenha o sistema e os aplicativos atualizados.',
        'Cuidado com quizzes e "testes" que pedem muitos dados pessoais.',
        'A LGPD (Lei Geral de Proteção de Dados) garante direitos sobre os seus dados. Você pode perguntar às empresas como eles são usados.'
      ]
    },
    {
      id: 'acesso',
      icon: 'smartphone',
      title: 'Acesso remoto: por que não conceder a desconhecidos',
      intro: 'Aplicativos de acesso remoto permitem que outra pessoa veja e controle seu celular a distância.',
      items: [
        'Suporte legítimo não liga sem ser chamado para pedir que você instale um aplicativo.',
        'Com acesso remoto, é possível ler notificações, códigos de verificação e abrir aplicativos bancários.',
        'Não instale aplicativos a pedido de quem ligou, mesmo que a pessoa diga ser do banco ou da operadora.',
        'Se já concedeu acesso: desligue a internet do aparelho, desinstale o aplicativo, avise o banco por um canal oficial e troque as senhas de outro aparelho.'
      ]
    },
    {
      id: 'wifi',
      icon: 'wifi',
      title: 'Wi-Fi público: cuidados importantes',
      intro: 'Nem toda rede pública é perigosa. Mas você não sabe quem a administra nem quem mais está conectado.',
      items: [
        'Evite operações financeiras e acesso a contas importantes em redes que você não conhece bem.',
        'Se possível, use os dados móveis do seu plano para pagamentos e senhas.',
        'Redes falsas com nomes parecidos existem: confirme o nome oficial da rede com o local.',
        'Desative a conexão automática a redes abertas.',
        'Mantenha o celular atualizado e não ignore avisos de segurança do navegador.'
      ]
    },
    {
      id: 'responsavel',
      icon: 'heart',
      title: 'Como utilizar a internet com responsabilidade',
      intro: 'A internet é um espaço de convivência. Nossos hábitos afetam outras pessoas.',
      items: [
        'Pense antes de compartilhar: isso é verdadeiro? Pode ferir alguém?',
        'Não compartilhe fotos de outras pessoas sem permissão, especialmente de crianças.',
        'Evite repassar correntes e boatos, mesmo que venham de pessoas queridas.',
        'Ajude, com paciência, quem tem dificuldade de usar o celular.',
        'Se alguém caiu em um golpe, acolha sem julgar e ajude a tomar as providências.',
        'Denuncie, nas plataformas, perfis e publicações fraudulentas.'
      ]
    }
  ];

  window.PC_DATA = {
    DIFFICULTY: DIFFICULTY,
    CATEGORIES: CATEGORIES,
    CHALLENGES: CHALLENGES,
    LEVELS: LEVELS,
    TIPS: TIPS
  };
})();

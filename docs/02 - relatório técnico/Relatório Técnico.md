# Informações do Projeto
`TÍTULO DO PROJETO`  

**PC Match**

`CURSO` 

**Análise e Desenvolvimento de Sistemas & Sistemas de Informação**

## Participantes

Os membros do grupo são:

- Abner Augusto Monteiro
- Andry Marques Pereira da Silveira
- Isaac Souza Fernandes
- João Paulo Oliveira Serra
- Luiz Fernando Versiani de Melo Penna
- Samuel Andrade Neto

# Estrutura do Documento

- [Informações do Projeto](#informações-do-projeto)
  - [Participantes](#participantes)
- [Estrutura do Documento](#estrutura-do-documento)
- [Introdução](#introdução)
  - [Problema](#problema)
  - [Objetivos](#objetivos)
  - [Justificativa](#justificativa)
  - [Público-Alvo](#público-alvo)
- [Especificações do Projeto](#especificações-do-projeto)
  - [Personas e Mapas de Empatia](#personas-e-mapas-de-empatia)
  - [Histórias de Usuários](#histórias-de-usuários)
  - [Requisitos](#requisitos)
    - [Requisitos Funcionais](#requisitos-funcionais)
    - [Requisitos não Funcionais](#requisitos-não-funcionais)
  - [Restrições](#restrições)
- [Projeto de Interface](#projeto-de-interface)
  - [User Flow](#user-flow)
  - [Wireframes](#wireframes)
- [Metodologia](#metodologia)
  - [Divisão de Papéis](#divisão-de-papéis)
  - [Ferramentas](#ferramentas)
  - [Controle de Versão](#controle-de-versão)
<!-- - [**############## SPRINT 1 ACABA AQUI #############**](#-sprint-1-acaba-aqui-)
- [Projeto da Solução](#projeto-da-solução)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Arquitetura da solução](#arquitetura-da-solução)
- [Avaliação da Aplicação](#avaliação-da-aplicação)
  - [Plano de Testes](#plano-de-testes)
  - [Ferramentas de Testes (Opcional)](#ferramentas-de-testes-opcional)
  - [Registros de Testes](#registros-de-testes)
- [Referências](#referências)
-->

# Introdução

No mundo contemporâneo, com os avanços e popularização de novas tecnologias cada vez mais modernas, a crescente acessibilidade de aquisição de computadores de uso pessoal, chamados _desktop_, possibilitou o uso dessas máquinas em espaços cada vez mais diversificados, abrangendo situações no âmbito profissional e pessoal.

Com isso em mente, o projeto PC Match tem como objetivo solucionar os problemas comuns às pessoas que desejam adquirir um novo computador de uso pessoal, como a falta de informação de utilidade das peças e compatibilidade, por exemplo. Esses problemas se intensificam especialmente quando o _hardware_, ou parte física do computador, deve atender um uso direcionado, como é o caso do público _gamer_, que precisam de peças com qualificações específicas para atender os níveis de processamento e renderização que uma aplicação tão complexa como um jogo exige para entregar a experiência para o usuário de maneira apropriada e sem preocupações.

Através de uma plataforma que explica e disponibiliza a opção de montar uma máquina e testar a compatibilidade de diferentes componentes, permitindo que o usuário saiba quais são as peças compatíveis com a sua necessidade específica.

## Problema

Conforme exposto, o problema que o projeto visa resolver é a dificuldade que as pessoas encontram quando precisam montar uma máquina pessoal para jogos ou aplicações que exigem um direcionamento específico de hardware, como a falta de informação sobre o papel a se desempenhar por cada parte do micro, a qualidade de desempenho e a compatibilidade com cada componente do microcomputador.

## Objetivos

O projeto tem como objetivo geral a criação de uma plataforma de compatibilidade de componentes, de uso dinâmico e facilitador, que permita o usuário a elaborar uma máquina completamente personalizada que atenda às suas necessidades como jogador.

## Justificativa

......  COLOQUE AQUI O SEU TEXTO ......

> Descreva a importância ou a motivação para trabalhar com esta aplicação
> que você escolheu. Indique as razões pelas quais você escolheu seus
> objetivos específicos ou as razões para aprofundar em certos aspectos
> do software.
> 
> O grupo de trabalho pode fazer uso de questionários, entrevistas e
> dados estatísticos, que podem ser apresentados, com o objetivo de
> esclarecer detalhes do problema que será abordado pelo grupo.
>
> **Links Úteis**:
> - [Como montar a justificativa](https://guiadamonografia.com.br/como-montar-justificativa-do-tcc/)

## Público-Alvo

......  COLOQUE AQUI O SEU TEXTO ......

> Descreva quem serão as pessoas que usarão a sua aplicação indicando os
> diferentes perfis. O objetivo aqui não é definir quem serão os
> clientes ou quais serão os papéis dos usuários na aplicação. A ideia
> é, dentro do possível, conhecer um pouco mais sobre o perfil dos
> usuários: conhecimentos prévios, relação com a tecnologia, relações
> hierárquicas, etc.
>
> Adicione informações sobre o público-alvo por meio de uma descrição
> textual, ou diagramas de personas, mapa de stakeholders, ou como o
> grupo achar mais conveniente.
> 
> **Links Úteis**:
> - [Público-alvo: o que é, tipos, como definir seu público e exemplos](https://klickpages.com.br/blog/publico-alvo-o-que-e/)
> - [Qual a diferença entre público-alvo e persona?](https://rockcontent.com/blog/diferenca-publico-alvo-e-persona/)
 
# Especificações do Projeto

A partir da entrevista pessoal dos usuários, composta por seis blocos de perguntas direcionadas ao tema, os membros deste projeto consolidaram a definição do problema principal. Além disso, por meio da comparação e observação baseada nas respostas dos usuários, surgiram curiosidades e pontos interessantes a serem tratados neste trabalho. Para atingir tais objetivos foi utilizado personas e histórias de usuários como ferramentas para entender as necessidades, motivações, comportamentos e objetivos dos usuários finais. 

## Personas e Mapas de Empatia

Personas

As personas levantadas durante o processo de entendimento do problema são apresentadas nas figuras que se seguem.
 
<div align="center">
<img src="./images/Laís Alves.jpg" alt="Persona1">
</div>

Laís Alves:
Idade 17 anos;
Ocupação: estudante. Terminando o 3° Ano do Ensino Médio.
Estado Civil: solteira.
Aplicativos usados: TikTok, Youtube, Instagram, Tinder, Spotify e X (Twitter).
Motivações: socialização, entretenimento, curiosidades e amizades.
Frustrações: preços altos, travamentos, falta de conhecimento e insegurança.
Hobbies: assistir TikTok, Tinder, se maquiar e correr na rua.


<div align="center">
<img src="./images/Fernando Souza.jpg" alt="Persona2">
</div>

Fernando Souza:
Idade 27 anos;
Ocupação: CMO (Chief Marketing Officer);
Estado Civil: solteiro.
Aplicativos usados: TikTok, Youtube, Instagram, Hotmart, Facebook Ads, Google Ads, WhatsApp, Steam, Epic Games e Netflix.
Motivações: sucesso financeiro, desenvolvimento pessoal e namoro.
Frustrações: pressão do trabalho, adaptações forçadas, constantes e rápidas.
Hobbies: assistir Netflix, sair com a namorada e jogar video game.


<div align="center">
<img src="./images/Miguel Santos.jpg" alt="Persona3">
</div>

Miguel Santos:
Idade 18 anos;
Ocupação: Estudante. Iniciando a Faculdade;
Estado Civil: Solteiro;
Aplicativos usados: Youtube, Instagram, WhatsApp, Spotify e Twitch.
Motivações: novas tecnologias, amizades e privacidade.
Frustrações: falta de conhecimento, incertezas sobre o futuro, não ter uma renda mensal, sem autonomia.
Hobbies: tocar teclado, assistir séries, fazer musculação e jogar com os amigos.

<div align="center">
<img src="./images/Jorge de Almeida.jpg" alt="Persona4">
</div>

Jorge de Almeida:
Idade 35 anos;
Ocupação: Professor de Física;
Estado Civil: Casado;
Aplicativos usados: Youtube, Instagram, WhatsApp, Spotify e PlayStation Plus.
Motivações: felicidade dos filhos, estabilidade financeira e esposa.
Frustrações: Preocupação com a saúde física.
Hobbies: jogar video game, escutar música clássica e caminhar com a família.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Laís Alves          | Montar um computador               | Para acessar as redes sociais, ver vídeos e principalmente jogar com as amigas |
|Fernando Souza      | Comprar um computador pronto       | Necessidade para o trabalho e relaxar jogando nas horas vagas |
|Miguel Santos       | Entender o funcionamento das peças de um computador para poder montar o seu focado em jogos | Realizar as tarefas da faculdade, curtir alguns jogos com os amigos, acompanhar lives e vídeos. |
|Jorge  de Almeida   | Gostaria de um aplicativo que ensinasse sobre as melhores peças de computador para jogar. | Presentear os filhos que gostam de jogar com um computador gamer |
|Jorge de Almeida    | Adquirir um computador seja capaz de lidar com os jogos mais recentes e exigentes, e que dure por muitos anos | Para experimentar jogos com experiência imersiva, onde possa escapar da rotina diária. |

Um pouco sobre Laís Alves

Laís é uma jovem extrovertida e socialmente ativa, que gosta de se conectar com amigos e compartilhar experiências online. Ela é uma usuária ávida do aplicativo TikTok, onde passa uma quantidade significativa de tempo assistindo a vídeos engraçados, tutoriais de beleza e danças virais. Laís também está interessada em moda, maquiagem e cultura pop, e segue influenciadores e criadores de conteúdo que compartilham seu estilo de vida. Dentre os vídeos que visualizou, alguns são gameplays, cujo youtubers famosos se divertem, o que fez se interessar pelo mundo dos jogos.

Surgiu daí o seu interesse pelos videogames, um tipo de entretenimento que pode servir como uma forma de escapismo, permitindo que Laís se desconecte das pressões e preocupações do dia-a-dia. Os jogos oferecem um ambiente virtual onde ela pode relaxar, se divertir e se envolver em atividades desafiadoras e gratificantes com os amigos. 
Como estudante do último ano do Ensino Médio, Laís enfrenta pressão acadêmica.
Ela também lida com a pressão social de seus colegas e a expectativa de alcançar sucesso acadêmico, ao mesmo tempo em que mantém uma presença ativa nas redes sociais. Deseja comprar um computador mas não sabe nem por onde começar. 

Um pouco sobre Fernando Souza

Fernando tem 27 anos de idade e está a 9 anos no mercado do marketing digital. É apaixonado por tecnologia, e está sempre buscando maneiras de inovar e se destacar no campo.
Ele é um líder motivador e visionário, que inspira sua equipe a alcançar resultados excepcionais por meio de criatividade, colaboração e estratégia.
Fernando é ávido por conhecimento e está constantemente se atualizando sobre as últimas tendências e melhores práticas em marketing digital.
Além disso, Fernando pode enfrentar pressões e expectativas elevadas da alta administração para produzir resultados tangíveis e demonstrar o ROI (retorno sobre o investimento) das iniciativas de marketing digital da empresa.
Ele valoriza o suporte e a colaboração de colegas e líderes da indústria, bem como o acesso a redes profissionais e eventos de networking onde possa compartilhar conhecimentos, trocar ideias e aprender com os outros.
Seu dia a dia é focado no trabalho, por isso não dispensa um bom computador. Em seus finais de semana busca relaxar, por isso pretende adquirir um computador para jogar, mas não tem tempo nem deseja entender como montar um.

Um pouco sobre Miguel Santos

Miguel é um jovem entusiasta de tecnologia e jogos, que adora passar tempo com seus amigos jogando videogames online.
Ele é curioso e gosta de aprender sobre computadores e hardware, e está animado para montar seu próprio computador para jogos.
Além dos jogos, Miguel também está interessado em música, filmes e esportes.
Miguel pode enfrentar o desafio de encontrar o equilíbrio certo entre suas obrigações acadêmicas e sua vida social, especialmente enquanto navega pela transição para a vida universitária.
Ele também pode ter preocupações sobre o custo e a complexidade de montar seu próprio computador, bem como garantir que ele faça as escolhas certas de hardware para atender às suas necessidades de jogo e orçamento.

Um pouco sobre Jorge de Almeida

Jorge é um professor apaixonado por física, que dedica grande parte de seu tempo ao ensino e à educação de seus alunos.
Nos momentos de lazer, Jorge gosta de relaxar jogando videogames. Ele é um entusiasta de longa data dos jogos e cresceu jogando clássicos dos anos 80 e 90.
Como pai de família, Jorge valoriza o tempo de qualidade com sua esposa e filhos, mas também aprecia os momentos de lazer para se divertir e recarregar as energias.
Ele procura jogos que ofereçam uma experiência imersiva e envolvente, onde possa escapar da rotina diária e se aventurar em mundos virtuais emocionantes.
Além disso, Jorge valoriza jogos que possam ser facilmente integrados à sua agenda ocupada, permitindo que ele jogue em sessões curtas durante seus momentos de folga.
Jorge precisa de orientação e recursos que o ajudem a escolher as peças certas para montar o computador de seus filhos, levando em consideração suas necessidades de jogo, idade e nível de habilidade.
Ele valoriza a qualidade e a durabilidade das peças, procurando garantir que o computador seja capaz de lidar com os jogos mais recentes e exigentes, e que dure por muitos anos.
Além disso, Jorge pode se beneficiar de recursos educacionais que o ajudem a ensinar seus filhos sobre tecnologia e hardware de computador, preparando-os para um futuro cada vez mais digital.

## Requisitos

Os requisitos e restrições são partes fundamentais para a elaboração do projeto, explicitando as ideias de modo claro e objetivo para a equipe, organizando a prioridade de cada requisito sendo elas alta, média e baixa. Os requisitos são divididos em duas partes, os funcionais e não funcionais, já as restrições é composta por ela mesma e são apenas as limitações que o projeto deve ter.

### Requisitos Funcionais

Requisitos que determinam as possíveis interação do usuário com o sistema, a tabela a seguir demonstra os requisitos do nosso projeto e o grau de prioridade para cada um.

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF.01| O site deve testar compatibilidade de peças de acordo com a escolha do usuário na montagem do pc. | ALTA | 
|RF.02| O site deve conter uma página home com direcionamento claro para o usuário de o que ele quer fazer. | ALTA |
|RF.03| O site deve conter 4 páginas principais sendo elas home, monte seu pc, setup recomendados e como montar um pc. | MÉDIA | 
|RF.04| O site deve oferecer alguns setups pré definidos para cada tipo de jogador. | MÉDIA |
|RF.05| O site deve fornecer uma página explicativa sobre cada componente do pc e de maneira didática explicando como montá-lo, incluindo vídeos para um melhor entendimento. | MÉDIA | 
|RF.06| O site deve conter média de preço de cada componente  | BAIXA |
|RF.07| O site deve mostrar informações técnicas de cada componente selecionado na área de montagem de pc. | BAIXA | 
|RF.08| O site deve permitir a comparação de componentes de mesma funcionalidade mas de marcas ou gerações diferentes. | BAIXA |
|RF.09| O site deve permitir o salvamento de pcs montados virtualmente no site por usuários. | BAIXA | 
|RF.10| O site deve ter um sistema de avaliação interna de diversos componentes. | BIAXA |


### Requisitos não Funcionais

Requisitos que determinam as especificações gerais do sistema, a tabela a seguir demonstra os requisitos não funcionais do nosso projeto e o grau de prioridade para cada um.

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RnF.01| O site deve ser publicado em um ambiente acessível publicamente na Internet (Repl.it, GitHub Pages, Heroku);  | ALTA | 
|RnF.02| O site deverá ser responsivo permitindo a visualização em qualquer plataforma de forma adequada. | ALTA | 
|RnF.03| O site deve ter coerência entre informações de componentes. | ALTA | 
|RnF.04| O site deve ser compatível com os principais navegadores do mercado (Google Chrome, Firefox, Microsoft Edge). | ALTA | 
|RnF.05| O site deve fornecer dados de preços compatíveis com os preços no atual mercado. | MÉDIA | 
|RnF.06| O site deve permitir o login de cada usuário (que quiser) tendo assim um salvamento de dados seguro. | ALTA | 
|RnF.07| O site deve ter uma estabilidade de conexão. | MÉDIA | 
|RnF.08| O site deve conter um somatório de média de preços do componentes de maneira compatível com o mercado. | MÉDIA | 


## Restrições

Restrições como o próprio nome diz marca a delimitação de campo do no projeto, deixando de maneira objetiva e clara as obrigações para o desenvolvimento, na tabela a seguir demonstra as restrições do nosso projeto.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|RE.01| O projeto deverá ser entregue no final do semestre, até a data de 30/06/2024. |
|RE.02| O aplicativo deve ser feito com o conhecimento básico da matéria de Desenvolvimento Interface WEB (DIW), podendo usar apenas WEB no Frontend.        |
|RE.03| Apenas os integrantes da equipe podem desenvolver o projeto, sendo assim não permitindo passar a ninguém além da equipe afazeres do projeto.       |


# Projeto de Interface

Na elaboração da interface do sistema, estamos priorizando elementos cruciais como acessibilidade, eficiência e facilidade na navegação entre páginas. Nosso objetivo é garantir uma experiência completa e intuitiva para os usuários.

Para alcançar esse objetivo, estamos desenvolvendo uma identidade visual simples e unificada que será aplicada em todas as páginas. Isso significa que os usuários irão encontrar uma interface eficiente e familiar em cada etapa de sua interação com o sistema.


## User Flow

O Fluxo do Usuário irá ser primariamente feito utilizando um cabeçalho presente em todas as páginas. Ele contém o link de acesso para todas as outras páginas da aplicação.

Cada página está devidamente detalhada no Figma, o qual pode ser acessado clicando [neste link (Link do Figma)](https://www.figma.com/file/Xql8McGAjdJcrYDj9NYZ1A/Compatibilidade-de-Pe%C3%A7as-para-PC---Wireframe?type=design&node-id=0%3A1&mode=design&t=l6GPea7nrdTdGoXU-1).

<div align="center">
  <img src="./images/User Flow.png" alt="User Flow">
</div>


> Fluxo de usuário (User Flow) é uma técnica que permite ao desenvolvedor
> mapear todo fluxo de telas do site ou app. Essa técnica funciona
> para alinhar os caminhos e as possíveis ações que o usuário pode
> fazer junto com os membros de sua equipe.


## Wireframes

......  INCLUA AQUI OS WIREFRAMES DAS TELAS DA APLICAÇÃO COM UM BREVE DESCRITIVO ......

> Wireframes são protótipos das telas da aplicação usados em design de interface para sugerir a
> estrutura de um site web e seu relacionamentos entre suas
> páginas. Um wireframe web é uma ilustração semelhante ao
> layout de elementos fundamentais na interface.
> 
> **Links Úteis**:
> - [Ferramentas de Wireframes](https://rockcontent.com/blog/wireframes/)
> - [Figma](https://www.figma.com/)
> - [Adobe XD](https://www.adobe.com/br/products/xd.html#scroll)
> - [MarvelApp](https://marvelapp.com/developers/documentation/tutorials/)
> 
> **Exemplo**:
> 
> ![Exemplo de Wireframe](images/wireframe-example.png)


# Metodologia

......  COLOQUE AQUI O SEU TEXTO ......

> Nesta parte do documento, você deve apresentar a metodologia 
> adotada pelo grupo, descrevendo o processo de trabalho baseado nas metodologias ágeis, 
> a divisão de papéis e tarefas, as ferramentas empregadas e como foi realizada a
> gestão de configuração do projeto via GitHub.
>
> Coloque detalhes sobre o processo de Design Thinking e a implementação do Framework Scrum seguido
> pelo grupo. O grupo poderá fazer uso de ferramentas on-line para acompanhar
> o andamento do projeto, a execução das tarefas e o status de desenvolvimento
> da solução.
> 
> **Links Úteis**:
> - [Tutorial Trello](https://trello.com/b/8AygzjUA/tutorial-trello)
> - [Gestão ágil de projetos com o Trello](https://www.youtube.com/watch?v=1o9BOMAKBRE)
> - [Gerência de projetos - Trello com Scrum](https://www.youtube.com/watch?v=DHLA8X_ujwo)
> - [Tutorial Slack](https://slack.com/intl/en-br/)

## Divisão de Papéis

......  COLOQUE AQUI O SEU TEXTO ......

> Apresente a divisão de papéis e tarefas entre os membros do grupo.
>
> **Links Úteis**:
> - [11 Passos Essenciais para Implantar Scrum no seu Projeto](https://mindmaster.com.br/scrum-11-passos/)
> - [Scrum em 9 minutos](https://www.youtube.com/watch?v=XfvQWnRgxG0)


## Ferramentas

......  COLOQUE AQUI O SEU TEXTO - SIGA O EXEMPLO DA TABELA ABAIXO  ......

| Ambiente  | Plataforma              |Link de Acesso |
|-----------|-------------------------|---------------|
|Processo de Design Thinkgin  | Miro |  https://miro.com/XXXXXXX | 
|Repositório de código | GitHub | https://github.com/XXXXXXX | 
|Hospedagem do site | Heroku |  https://XXXXXXX.herokuapp.com | 
|Protótipo Interativo | MavelApp ou Figma | https://figma.com/XXXXXXX | 

>
> Liste as ferramentas empregadas no desenvolvimento do
> projeto, justificando a escolha delas, sempre que possível.
> 
> As ferramentas empregadas no projeto são:
> 
> - Editor de código.
> - Ferramentas de comunicação
> - Ferramentas de diagramação
> - Plataforma de hospedagem
> 
> O editor de código foi escolhido porque ele possui uma integração com o
> sistema de versão. As ferramentas de comunicação utilizadas possuem
> integração semelhante e por isso foram selecionadas. Por fim, para criar
> diagramas utilizamos essa ferramenta por melhor captar as
> necessidades da nossa solução.
> 
> **Links Úteis - Hospedagem**:
> - [Getting Started with Heroku](https://devcenter.heroku.com/start)
> - [Crie seu Site com o HostGator](https://www.hostgator.com.br/como-publicar-seu-site)
> - [GoDady](https://br.godaddy.com/how-to)
> - [GitHub Pages](https://pages.github.com/)

## Controle de Versão

......  COLOQUE AQUI O SEU TEXTO ......

> Discuta como a configuração do projeto foi feita na ferramenta de
> versionamento escolhida. Exponha como a gerência de tags, merges,
> commits e branchs é realizada. Discuta como a gerência de issues foi
> realizada.
> A ferramenta de controle de versão adotada no projeto foi o
> [Git](https://git-scm.com/), sendo que o [Github](https://github.com)
> foi utilizado para hospedagem do repositório `upstream`.
> 
> O projeto segue a seguinte convenção para o nome de branchs:
> 
> - `master`: versão estável já testada do software
> - `unstable`: versão já testada do software, porém instável
> - `testing`: versão em testes do software
> - `dev`: versão de desenvolvimento do software
> 
> Quanto à gerência de issues, o projeto adota a seguinte convenção para
> etiquetas:
> 
> - `bugfix`: uma funcionalidade encontra-se com problemas
> - `enhancement`: uma funcionalidade precisa ser melhorada
> - `feature`: uma nova funcionalidade precisa ser introduzida
>
> **Links Úteis**:
> - [Tutorial GitHub](https://guides.github.com/activities/hello-world/)
> - [Git e Github](https://www.youtube.com/playlist?list=PLHz_AreHm4dm7ZULPAmadvNhH6vk9oNZA)
> - [5 Git Workflows & Branching Strategy to deliver better code](https://zepel.io/blog/5-git-workflows-to-improve-development/)
>
> **Exemplo - GitHub Feature Branch Workflow**:
>
> ![Exemplo de Wireframe](images/Github-Workflow.png)

# **############## SPRINT 1 ACABA AQUI #############**


# Projeto da Solução

......  COLOQUE AQUI O SEU TEXTO ......

## Tecnologias Utilizadas

......  COLOQUE AQUI O SEU TEXTO ......

> Descreva aqui qual(is) tecnologias você vai usar para resolver o seu
> problema, ou seja, implementar a sua solução. Liste todas as
> tecnologias envolvidas, linguagens a serem utilizadas, serviços web,
> frameworks, bibliotecas, IDEs de desenvolvimento, e ferramentas.
> Apresente também uma figura explicando como as tecnologias estão
> relacionadas ou como uma interação do usuário com o sistema vai ser
> conduzida, por onde ela passa até retornar uma resposta ao usuário.
> 
> Inclua os diagramas de User Flow, esboços criados pelo grupo
> (stoyboards), além dos protótipos de telas (wireframes). Descreva cada
> item textualmente comentando e complementando o que está apresentado
> nas imagens.

## Arquitetura da solução

......  COLOQUE AQUI O SEU TEXTO E O DIAGRAMA DE ARQUITETURA .......

> Inclua um diagrama da solução e descreva os módulos e as tecnologias
> que fazem parte da solução. Discorra sobre o diagrama.
> 
> **Exemplo do diagrama de Arquitetura**:
> 
> ![Exemplo de Arquitetura](images/arquitetura-exemplo.png)


# Avaliação da Aplicação

......  COLOQUE AQUI O SEU TEXTO ......

> Apresente os cenários de testes utilizados na realização dos testes da
> sua aplicação. Escolha cenários de testes que demonstrem os requisitos
> sendo satisfeitos.

## Plano de Testes

......  COLOQUE AQUI O SEU TEXTO ......

> Enumere quais cenários de testes foram selecionados para teste. Neste
> tópico o grupo deve detalhar quais funcionalidades avaliadas, o grupo
> de usuários que foi escolhido para participar do teste e as
> ferramentas utilizadas.
> 
> **Links Úteis**:
> - [IBM - Criação e Geração de Planos de Teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Práticas e Técnicas de Testes Ágeis](http://assiste.serpro.gov.br/serproagil/Apresenta/slides.pdf)
> -  [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)

## Ferramentas de Testes (Opcional)

......  COLOQUE AQUI O SEU TEXTO ......

> Comente sobre as ferramentas de testes utilizadas.
> 
> **Links Úteis**:
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)

## Registros de Testes

......  COLOQUE AQUI O SEU TEXTO ......

> Discorra sobre os resultados do teste. Ressaltando pontos fortes e
> fracos identificados na solução. Comente como o grupo pretende atacar
> esses pontos nas próximas iterações. Apresente as falhas detectadas e
> as melhorias geradas a partir dos resultados obtidos nos testes.


# Referências

Pontifícia Universidade Católica de Minas Gerais - Canvas disciplina TIAL -  Disponível em: https://pucminas.instructure.com/courses/188910. Acesso em: abril de 2024; 

Miro. Disponível em: https://miro.com/app/board/uXjVNjO3GYA=/. Acesso em: abril de 2024;

Trello. Disponível em: https://trello.com/c/gyPOBrZ9/1-especifica%C3%A7%C3%A3o-do-projeto. Acesso em: abril de 2024;

GitHub. Disponível em: https://github.com/. Acesso em: abril de 2024;

Figma. Disponível em: https://www.figma.com/file/Xql8McGAjdJcrYDj9NYZ1A/Compatibilidade-de-Pe%C3%A7as-para-PC---Wireframe?type=design&node-id=0-1&mode=design. Acesso em: abril de 2024.

> **Links Úteis**:
> - [Formato ABNT](https://www.normastecnicas.com/abnt/trabalhos-academicos/referencias/)
> - [Referências Bibliográficas da ABNT](https://comunidade.rockcontent.com/referencia-bibliografica-abnt/)
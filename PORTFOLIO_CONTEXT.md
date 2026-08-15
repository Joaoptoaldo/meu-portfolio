# Contexto e Regras de Negócio — Portfólio João Pedro

> **Documento de contexto obrigatório para agentes de IA que atuarem neste projeto.**
>
> Leia este arquivo antes de modificar, criar, excluir ou refatorar qualquer código.
> Este documento existe para reduzir alucinações, decisões arbitrárias e alterações fora do escopo.

---

## 1. Objetivo do projeto

Este projeto é o portfólio pessoal de **João Pedro Toaldo**, estudante de Sistemas de Informação e desenvolvedor.

O objetivo é apresentar, de forma profissional e visualmente diferenciada:

- quem é João Pedro;
- sua formação;
- suas habilidades técnicas;
- seus projetos;
- sua experiência;
- sua evolução como desenvolvedor;
- formas de contato e redes profissionais.

O portfólio deve funcionar como uma **experiência de navegação inspirada em uma IDE/editor de código**, mas continua sendo um portfólio profissional.

A interface deve usar a metáfora de um ambiente de desenvolvimento para organizar e apresentar o conteúdo.

### Regra principal

> A estética de IDE deve melhorar a apresentação do portfólio, e nunca prejudicar sua legibilidade, acessibilidade ou usabilidade.

---

# 2. Referência visual

A principal referência visual é o portfólio:

`https://www.rajsavaliya.com`

Também existe uma imagem de referência fornecida durante o planejamento do projeto, mostrando uma interface inspirada em VS Code.

As referências servem exclusivamente para estudar:

- composição visual;
- hierarquia;
- navegação;
- organização;
- experiência;
- metáfora de IDE;
- estrutura de Explorer;
- Tabs;
- Editor;
- Status Bar;
- tema dark.

## Não copiar

Não reproduzir literalmente:

- código-fonte;
- textos;
- biografia;
- projetos;
- identidade visual;
- identidade de marca;
- paleta específica;
- estrutura pixel-perfect;
- animações específicas;
- conteúdo;
- nomes específicos de arquivos;
- componentes proprietários;
- implementação interna.

A implementação deve ser própria.

---

# 3. Stack obrigatória

## Tecnologias

- React
- JavaScript
- Vite
- Tailwind CSS

## Não utilizar

- TypeScript
- Next.js
- Redux
- React Router, salvo necessidade futura explicitamente aprovada
- bibliotecas desnecessárias
- frameworks adicionais sem justificativa

A aplicação deve permanecer simples.

Caso uma dependência adicional seja realmente necessária:

1. explicar o motivo;
2. explicar a alternativa sem dependência;
3. aguardar aprovação antes de adicioná-la.

---

# 4. Idioma

O conteúdo do portfólio deve ser escrito em:

**Português do Brasil (pt-BR).**

Termos técnicos comuns do desenvolvimento podem permanecer em inglês quando fizer sentido.

Exemplos:

- React
- JavaScript
- Git
- GitHub
- main
- commit
- branch
- API
- Frontend
- Backend
- Database
- UTF-8

Não traduzir artificialmente termos técnicos consolidados.

---

# 5. Identidade visual

## Tema

O projeto deve utilizar um tema:

**Dark + Azul-elétrico**

### Diretrizes

- fundo predominantemente escuro;
- azul-elétrico como cor de destaque;
- contraste adequado;
- aparência profissional;
- visual minimalista;
- bordas discretas;
- sombras sutis;
- efeitos de hover controlados;
- transições rápidas;
- pouca utilização de glow;
- evitar excesso de glassmorphism;
- evitar aparência de site "neon".

A interface deve transmitir:

> "workspace pessoal de um desenvolvedor"

e não:

> "cópia visual do VS Code".

---

# 6. Conceito da interface

A aplicação deve ser organizada como um workspace de desenvolvimento.

A estrutura principal é:

```text
┌─────────────────────────────────────────────────────────────┐
│ Title Bar                                                   │
├──────┬──────────────────┬──────────────────────────────────┤
│      │                  │                                  │
│      │                  │                                  │
│      │     Explorer     │             Editor               │
│Activity│                  │                                  │
│  Bar │                  │                                  │
│      │                  │                                  │
│      │                  │                                  │
├──────┴──────────────────┴──────────────────────────────────┤
│ Status Bar                                                 │
└─────────────────────────────────────────────────────────────┘
```

## Componentes conceituais

### Title Bar

Representa a barra superior da aplicação.

Pode conter:

- identidade do portfólio;
- nome do workspace;
- elementos visuais decorativos;
- controles visuais quando necessários.

Não precisa reproduzir todos os menus reais de uma IDE.

### Activity Bar

Barra lateral extremamente à esquerda.

Pode conter:

- Explorer;
- navegação;
- atalhos;
- links externos;
- outras ações relevantes.

Não implementar funcionalidades falsas apenas para preencher espaço.

### Explorer

Representa a árvore de arquivos do portfólio.

Exemplo conceitual:

```text
EXPLORER

⌄ JOÃO PEDRO
  ├── sobre.jsx
  ├── habilidades.js
  ├── experiencia.js
  ├── formacao.js
  ├── projetos/
  │   ├── imobsystem.js
  │   ├── study-platform.js
  │   └── busca-ordenacao.java
  └── contato.js
```

A estrutura definitiva pode ser alterada conforme o conteúdo real.

### Tabs

Representam as seções abertas.

Exemplo:

```text
sobre.jsx | habilidades.js | projetos.js | contato.js
```

A aba ativa deve possuir destaque visual.

### Editor

É a área principal do portfólio.

O editor deve renderizar o conteúdo real das seções.

Não criar grandes blocos de código fictício apenas para parecer uma IDE.

### Status Bar

Área inferior com informações técnicas e/ou decorativas.

Exemplo:

```text
● João Pedro.dev   Git: main   React   JavaScript   UTF-8
```

As informações devem ser reais ou explicitamente decorativas.

Nunca inventar informações profissionais.

---

# 7. Conteúdo do portfólio

As principais seções previstas são:

1. Welcome / início
2. Sobre
3. Habilidades
4. Projetos
5. Experiência
6. Formação
7. Contato

A existência ou ausência de uma seção pode ser alterada posteriormente, mas não deve ser criada uma seção sem necessidade.

---

# 8. Dados pessoais e profissionais

## Informações conhecidas

Nome:

**João Pedro Toaldo**

Área:

**Desenvolvimento de Software**

Formação:

**Sistemas de Informação**

Instituição:

**Universidade Franciscana (UFN)**

O curso possui 8 semestres.

## Regra de segurança de conteúdo

Não inventar:

- empresas;
- cargos;
- salários;
- experiências;
- certificações;
- prêmios;
- clientes;
- depoimentos;
- métricas;
- números de usuários;
- resultados financeiros;
- projetos;
- tecnologias dominadas;
- links;
- e-mails;
- redes sociais.

Se uma informação não estiver disponível neste documento ou em dados fornecidos posteriormente pelo proprietário do projeto:

**usar placeholder ou solicitar a informação.**

---

# 9. Contatos

Durante a fase inicial do projeto, os contatos devem utilizar:

**placeholders claramente identificados.**

Não inventar:

- e-mail;
- telefone;
- GitHub;
- LinkedIn;
- outras redes.

Quando os dados reais forem fornecidos, substituir somente os placeholders correspondentes.

---

# 10. Tecnologias e habilidades

Tecnologias conhecidas/interessantes para representar no portfólio incluem:

## Linguagens

- JavaScript
- Java
- Python
- C#
- SQL
- C
- C++
- Rust

## Frontend

- React
- Tailwind CSS
- HTML
- CSS

## Backend

- Node.js
- Express
- Django
- ASP.NET Core
- APIs REST

## Banco de dados

- PostgreSQL
- MySQL
- MongoDB
- SQLite

## Ferramentas

- Git
- GitHub
- Docker
- Postman
- VS Code
- Vite

## Regra importante

Não apresentar todas as tecnologias automaticamente como "domínio".

Quando uma tecnologia estiver em aprendizado, isso deve ser tratado adequadamente.

Não usar frases como:

> "Especialista em X"

sem informação que sustente essa afirmação.

---

# 11. ## Projetos do Portfólio

Os projetos apresentados no portfólio NÃO devem ser classificados genericamente como
"projetos acadêmicos".

O portfólio deve considerar atualmente os seguintes projetos:

1. analytics-dashboard
   https://github.com/Joaoptoaldo/analytics-dashboard

2. ImobSystem
   https://github.com/Joaoptoaldo/ImobSystem

3. AcervoHub
   https://github.com/Joaoptoaldo/AcervoHub

4. somdiabetes
   https://github.com/Joaoptoaldo/somdiabetes

### Regra de autoria

Os projetos devem ser apresentados de acordo com o nível real de participação do
João Pedro.

Não assumir automaticamente que todo projeto é de autoria integral do usuário.

O projeto `somdiabetes` deve destacar explicitamente a participação efetiva do
João Pedro no desenvolvimento.

Para determinar tecnologias, funcionalidades, arquitetura, objetivo e demais
características dos projetos, consultar os respectivos repositórios oficiais
antes de escrever o conteúdo.

Não inventar:

- funcionalidades;
- tecnologias;
- métricas;
- responsabilidades;
- autoria;
- resultados;
- usuários;
- empresas;
- clientes;
- impacto.

Quando uma informação não puder ser comprovada pelo repositório ou pelos dados
fornecidos pelo usuário, não apresentá-la como fato.

Projetos próprios e projetos colaborativos devem ser visualmente diferenciados
quando essa distinção for relevante.

## Cada projeto pode conter

```javascript
{
  id,
  title,
  description,
  technologies,
  repository,
  demo,
  status
}
```

Os campos podem ser adaptados conforme necessidade.

## Regra

Não inventar:

- descrição de funcionalidades;
- métricas;
- número de usuários;
- deploy;
- tecnologias utilizadas;
- contribuição;
- status;
- resultados.

Se um dado estiver faltando, usar placeholder.

---

# 12. Arquitetura de dados

O conteúdo deve ser separado da apresentação sempre que possível.

Estrutura sugerida:

```text
src/
├── assets/
├── components/
│   ├── layout/
│   ├── editor/
│   ├── sections/
│   └── ui/
├── context/
├── data/
│   ├── profile.js
│   ├── sections.js
│   ├── projects.js
│   ├── skills.js
│   ├── experience.js
│   ├── education.js
│   └── contact.js
├── hooks/
├── App.jsx
├── main.jsx
└── index.css
```

A estrutura pode ser ajustada quando existir justificativa técnica.

Não criar pastas ou abstrações sem necessidade.

---

# 13. Separação de responsabilidades

## Componentes

Devem cuidar principalmente de:

- apresentação;
- interação;
- composição da interface.

## Arquivos de dados

Devem armazenar:

- textos;
- informações de perfil;
- projetos;
- habilidades;
- experiências;
- formação;
- contatos.

## Context

Pode controlar o estado global relacionado ao workspace, principalmente:

- arquivo ativo;
- seção ativa;
- abas abertas;
- estado do Explorer;
- comportamento relacionado à navegação.

Não utilizar Context para informações que não precisam ser globais.

---

# 14. Navegação

A navegação principal deve ocorrer pela metáfora de arquivos/seções.

Ao clicar em um item do Explorer:

1. selecionar a seção;
2. atualizar a aba ativa;
3. renderizar o conteúdo correspondente;
4. atualizar o estado visual do Explorer.

A navegação deve ser previsível.

Não criar comportamento oculto.

---

# 15. Abas

As abas devem:

- indicar o arquivo/seção atual;
- permitir selecionar uma aba;
- possuir estado visual ativo;
- permitir fechamento caso essa funcionalidade seja implementada;
- manter comportamento consistente com o Explorer.

Não criar um sistema complexo de gerenciamento de abas sem necessidade.

---

# 16. Responsividade

Responsividade é requisito obrigatório.

## Desktop

Utilizar o workspace completo:

```text
Activity Bar
+
Explorer
+
Editor
+
Status Bar
```

## Tablet

O Explorer pode ser recolhível.

O editor deve receber maior espaço.

## Mobile

Não simplesmente diminuir o desktop.

Transformar a experiência:

- Activity Bar → navegação compacta;
- Explorer → drawer/menu lateral;
- Tabs → scroll horizontal;
- Editor → ocupa a maior parte da tela;
- Status Bar → mostrar somente informações importantes;
- botões → áreas de toque adequadas.

Não permitir:

- overflow horizontal acidental;
- conteúdo cortado;
- textos ilegíveis;
- elementos impossíveis de tocar.

---

# 17. Acessibilidade

A aplicação deve considerar:

- HTML semântico;
- `button` para ações;
- `nav` para navegação;
- `main` para conteúdo;
- `header` e `footer` quando apropriado;
- `aria-label` em controles sem texto;
- `aria-selected` em abas;
- `aria-current` quando apropriado;
- `aria-expanded` em menus;
- navegação por teclado;
- foco visível;
- contraste adequado;
- suporte a `prefers-reduced-motion`.

Não utilizar apenas cor para comunicar estados.

---

# 18. Performance

Não realizar otimizações prematuras.

Primeiro garantir:

1. funcionamento;
2. arquitetura correta;
3. acessibilidade;
4. responsividade;
5. manutenção.

Depois otimizar quando houver necessidade real.

Evitar:

- bibliotecas pesadas sem necessidade;
- renders desnecessários;
- efeitos complexos;
- animações constantes;
- carregamento desnecessário de assets.

---

# 19. Animações

As animações devem ser:

- sutis;
- rápidas;
- funcionais;
- consistentes.

Exemplos aceitáveis:

- hover;
- mudança de aba;
- abertura do Explorer;
- entrada de conteúdo;
- transições de drawer.

Evitar:

- animações constantes;
- partículas;
- efeitos excessivos;
- texto piscando;
- elementos se movimentando sem motivo;
- grandes delays.

Sempre respeitar:

```css
prefers-reduced-motion
```

---

# 20. Tipografia

Utilizar uma fonte proporcional para conteúdo normal e uma fonte monoespaçada para elementos associados à linguagem de programação.

Exemplos de elementos monoespaçados:

- nomes de arquivos;
- extensões;
- snippets;
- status técnico;
- identificadores;
- caminhos.

Não transformar todo o conteúdo do portfólio em fonte monoespaçada.

---

# 21. Regra contra alucinação

Esta é uma regra crítica do projeto.

> **Se a informação não estiver disponível, não invente.**

Quando faltar informação:

```text
NÃO:
"João possui 3 anos de experiência profissional..."

SE NÃO HOUVER DADO.

SIM:
"Experiência profissional — conteúdo a definir"
```

Ou solicite a informação ao proprietário.

O agente não deve completar lacunas usando suposições.

---

# 22. Regra contra alterações arbitrárias

Antes de modificar algo que afete a arquitetura:

- verificar o código existente;
- entender o fluxo atual;
- preservar comportamento válido;
- modificar somente o necessário.

Não reescrever o projeto inteiro para implementar uma pequena funcionalidade.

Não substituir uma solução funcional por outra apenas por preferência pessoal.

Se houver uma melhoria arquitetural relevante:

1. explicar o problema;
2. apresentar a solução;
3. explicar impacto;
4. aguardar aprovação quando a alteração for estrutural.

---

# 23. Regra de implementação incremental

O projeto deve ser construído em etapas.

Ordem planejada:

1. configuração do projeto;
2. layout geral;
3. Activity Bar;
4. Explorer;
5. Title Bar;
6. Editor;
7. Tabs;
8. Status Bar;
9. Welcome;
10. Sobre;
11. Habilidades;
12. Projetos;
13. Experiência;
14. Formação;
15. Contato;
16. Responsividade;
17. Microinterações;
18. Acessibilidade;
19. Performance;
20. revisão final.

## Regra

Após cada etapa:

1. implementar somente o escopo da etapa;
2. executar o projeto;
3. verificar erros;
4. corrigir erros relacionados à etapa;
5. revisar responsividade;
6. explicar o que foi alterado;
7. aguardar aprovação antes de avançar.

Não implementar etapas futuras sem autorização.

---

# 24. Regra de revisão antes de editar

Antes de alterar qualquer arquivo:

1. ler o arquivo;
2. identificar dependências;
3. entender o comportamento atual;
4. verificar se existe componente reutilizável;
5. evitar duplicação;
6. alterar somente o necessário.

Nunca assumir que determinado arquivo possui uma implementação sem verificá-lo.

---

# 25. Regra de código

Priorizar:

- simplicidade;
- legibilidade;
- componentes pequenos;
- responsabilidades claras;
- nomes descritivos;
- JavaScript moderno;
- reutilização quando realmente necessária;
- baixo acoplamento;
- baixo nível de complexidade.

Evitar:

- overengineering;
- abstrações prematuras;
- funções gigantes;
- componentes gigantes;
- lógica complexa dentro do JSX;
- duplicação;
- comentários explicando código óbvio;
- hacks para contornar problemas arquiteturais.

---

# 26. Regra de Tailwind

Tailwind CSS deve ser utilizado como principal mecanismo de estilização.

Evitar criar CSS personalizado quando Tailwind resolver adequadamente.

CSS customizado é aceitável para:

- tokens globais;
- variáveis;
- scrollbar;
- efeitos que sejam difíceis de expressar com Tailwind;
- acessibilidade;
- comportamentos realmente específicos.

Não espalhar estilos globais desnecessariamente.

---

# 27. Ícones

Preferência inicial:

- SVG;
- componentes próprios;
- assets simples.

Não adicionar biblioteca de ícones apenas por conveniência.

Caso uma biblioteca de ícones seja considerada:

1. justificar;
2. avaliar impacto;
3. solicitar aprovação.

---

# 28. SEO e metadados

O projeto deve possuir pelo menos:

- título adequado;
- descrição adequada;
- favicon;
- metadados básicos;
- estrutura semântica.

Não inventar informações de SEO.

---

# 29. Conteúdo placeholder

Enquanto informações reais não forem fornecidas, utilizar placeholders explícitos.

Exemplos:

```text
[GitHub]
[LinkedIn]
[EMAIL]
[DESCRIÇÃO DO PROJETO]
```

Não utilizar dados fictícios que possam parecer reais.

---

# 30. Critérios de aceitação

Uma etapa somente deve ser considerada concluída quando:

- [ ] o projeto inicia corretamente;
- [ ] não existem erros de build;
- [ ] não existem erros relevantes no console;
- [ ] o comportamento esperado funciona;
- [ ] o layout permanece consistente;
- [ ] não existe overflow horizontal inesperado;
- [ ] desktop funciona;
- [ ] mobile funciona;
- [ ] elementos interativos possuem estados claros;
- [ ] acessibilidade básica foi considerada;
- [ ] não houve introdução de informação fictícia;
- [ ] nenhuma funcionalidade fora do escopo foi implementada.

---

# 31. Princípio geral do projeto

Todas as decisões devem seguir esta prioridade:

```text
1. Verdade dos dados
2. Usabilidade
3. Acessibilidade
4. Responsividade
5. Manutenibilidade
6. Clareza do conteúdo
7. Identidade visual
8. Efeitos e detalhes visuais
```

Se uma decisão visual entrar em conflito com usabilidade ou acessibilidade:

**priorizar usabilidade e acessibilidade.**

Se uma decisão visual exigir informação inventada:

**não implementar a informação.**

Se uma solução parecer tecnicamente sofisticada, mas aumentar desnecessariamente a complexidade:

**preferir a solução simples.**

---

# 32. Regra final para agentes de IA

Antes de implementar qualquer mudança, responda mentalmente:

1. Isso está dentro do objetivo deste projeto?
2. Tenho informação suficiente para implementar?
3. Estou inventando alguma informação?
4. Estou alterando algo fora do escopo?
5. Já existe um componente que resolve isso?
6. A solução funciona em mobile?
7. A solução é acessível?
8. Estou adicionando complexidade desnecessária?
9. Estou preservando a identidade visual definida?
10. Estou mantendo o projeto em React + JavaScript + Vite + Tailwind?

Se qualquer resposta indicar risco relevante:

**pare, explique o problema e solicite orientação.**

---

## Resumo

Este projeto é:

> **Um portfólio profissional pessoal de João Pedro Toaldo, construído com React + JavaScript + Vite + Tailwind CSS, apresentado como um workspace de desenvolvimento inspirado em uma IDE, com tema dark e accent azul-elétrico.**

A referência visual é apenas inspiração.

O conteúdo deve ser verdadeiro.

A implementação deve ser própria.

A arquitetura deve ser simples.

O desenvolvimento deve ser incremental.

**Não inventar informações. Não copiar a referência. Não fazer overengineering.**

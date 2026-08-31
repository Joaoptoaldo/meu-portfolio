# Portfólio Pessoal - João Pedro Toaldo

![React 19](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.2.0-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3.3-06B6D4?logo=tailwindcss&logoColor=white)
![Oxlint](https://img.shields.io/badge/Oxlint-1.75.0-000000)

> Portfólio web interativo desenvolvido com a identidade visual e comportamental inspirada em um ambiente de desenvolvimento integrado (IDE / VS Code).

---

## Visão Geral

Este é o meu portfólio pessoal, desenvolvido com uma interface inspirada em ambientes de desenvolvimento integrado (IDE), especialmente no Visual Studio Code.

A aplicação transforma a apresentação do meu perfil profissional em uma experiência de navegação semelhante a um ambiente de código, com árvore de arquivos, abas, busca, terminal integrado e navegação entre seções como apresentação, sobre, habilidades, projetos, experiência, formação e contato.

---

## Funcionalidades Implementadas

### Interface e Navegação estilo VS Code
- **Explorer de Arquivos Interativo**:
  - Árvore de diretórios retrátil e redimensionável horizontalmente via arrasto de mouse (*drag & drop*, entre 160px e 500px).
  - Exibe a pasta raiz `joao-pedro` com seções em formato de arquivos (`Welcome.jsx`, `Sobre.jsx`, `habilidades.json`, `experiencia.jsx`, `formacao.jsx`, `contato.jsx`) e a pasta `projetos/` contendo arquivos simulados para cada projeto (.ts, .py, .jsx, .js).
  - Menu de contexto (clique com botão direito em arquivos no Explorer) com opções reais para abrir ou fechar abas.
- **Gerenciamento de Abas e Split Editor**:
  - Abertura, fechamento e seleção de aba ativa.
  - Ordenação por arrasto de abas dentro do mesmo grupo.
  - Suporte a divisão de tela (Split Editor em até 3 grupos horizontais).
  - Menu de contexto nas abas para fechar, fechar outras, fechar à direita, fechar todas ou abrir em novo grupo (split).
- **Painel Inferior Redimensionável (Terminal / Output / Problems)**:
  - Painel inferior aberto por padrão, redimensionável verticalmente via arrasto de mouse (entre 80px e 600px).
  - **Terminal Interativo (Simulação de CLI)**: Interpretador de comandos em JavaScript que processa os comandos: `help`, `whoami`, `clear`/`cls`, `projects`, `skills`, `contact`, `about`, `education`, `open <arquivo>`, `theme <dark|light>`, `accent <cor>` e `exit`.
  - **Aba Output (Simulado)**: Exibe mensagens informativas e logs estáticos de ambiente da aplicação.
  - **Aba Problems (Simulado)**: Exibe status dos diagnósticos do sistema (0 erros / 0 avisos).
- **Ferramentas de Navegação Avançada (Modais Overlay)**:
  - **Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)**: Modal para acionar comandos rápidos (troca de temas, cores de destaque, abertura de modais e alteração de views).
  - **Quick Open (`Ctrl+P` / `Cmd+P`)**: Modal de busca rápida por aproximação (*fuzzy search*) para abrir arquivos do workspace.
  - **Go to Symbol (`Ctrl+Shift+O` / `Cmd+Shift+O`)**: Modal para navegação rápida entre símbolos e seletores do arquivo ativo.
  - **Search in File (`Ctrl+F`)**: Modal de busca textual filtrada dentro do arquivo atualmente aberto.
- **Busca Global (`Ctrl+Shift+F`)**: Painel na sidebar que permite pesquisar termos em todos os arquivos/seções do portfólio, com navegação direta para os resultados.
- **Source Control / Git (`ScmView`)**: Painel na sidebar que exibe a lista dos commits reais obtidos do histórico do repositório (`git log`), apresentando a mensagem, o hash curto, a data e o nome do branch atual. *(Nota: exibe o histórico real de commits, sem funcionalidades de staging, commit ou diff de código).*

### Personalização e Estado
- **Temas e Acento de Cor**: Suporte a 2 temas (`dark` por padrão e `light`) e 5 cores de destaque (*blue*, *purple*, *green*, *orange*, *pink*).
- **Persistência em localStorage**: Salva automaticamente o tema, a cor de destaque, a largura do Explorer, a altura e visibilidade do painel inferior, os grupos de abas abertas, a aba ativa e o histórico de navegação.

### Responsividade e Acessibilidade
- **Adaptabilidade Móvel**: Interface responsiva com suporte a menu drawer retrátil para navegação em telas pequenas.
- **Acessibilidade Teclado e ARIA**: Suporte a navegação por teclado (`Escape` para fechar modais, `Tab`/Setas) e atributos semânticos ARIA nos componentes da IDE.

---

## Stack Tecnológica

O projeto é desenvolvido com as seguintes tecnologias e versões exatas declaradas em `package.json`:

- **React**: `^19.2.8`
- **React DOM**: `^19.2.8`
- **Vite**: `^8.2.0` (Dev Server & Bundler)
- **Tailwind CSS**: `^4.3.3` (Estilização via `@tailwindcss/vite`)
- **Oxlint**: `^1.75.0` (Linter e análise estática de código)
- **Linguagem**: JavaScript (ESNext)

---

## Estrutura do Projeto

```text
meu-portfolio/
├── public/                # Favicon e ícones vetoriais estáticos (SVG)
├── src/
│   ├── assets/
│   │   └── icons/         # Ícones das linguagens e tecnologias (SVGs individuais)
│   ├── components/
│   │   ├── editor/        # Componentes do editor (TabBar, Breadcrumb, CommandPalette, QuickOpen, GoToSymbol, SearchInFile, Palette, Editor)
│   │   ├── layout/
│   │   │   ├── explorer/  # Subcomponentes do Explorer (ContextMenu, OpenEditors, ExplorerBody, MobileDrawer, TreeNode)
│   │   │   └── *.jsx      # Componentes de layout (TitleBar, ActivityBar, Explorer, Panel, Terminal, ScmView, SearchView, SettingsOverlay, StatusBar, Toasts, Workspace, HelpOverlay, MobileNav)
│   │   ├── sections/      # Renderizadores das seções (Welcome, About, Skills, Projects, Experience, Education, Contact)
│   │   └── ui/            # Componentes de interface base (FileIcon, TechIcon, Icon)
│   ├── context/           # Estado global do workspace (WorkspaceProvider, WorkspaceContext)
│   ├── data/              # Dados factuais do portfólio (projects.js, profile.js, skills.js, experience.js, education.js, contact.js, sections.js, commits.js, terminal.js, symbols.js, searchIndex.js, about.js, welcome.js, stackIcons.js, activity.js)
│   ├── hooks/             # Custom React Hooks (useWorkspace, useGlobalShortcuts, useClock, useMediaQuery, useResize)
│   ├── utils/             # Funções utilitárias (persist.js, fuzzy.js)
│   ├── App.jsx            # Componente raiz da aplicação
│   ├── main.jsx           # Ponto de entrada React
│   └── index.css          # Estilos globais e tokens Tailwind CSS v4
├── index.html             # HTML base da aplicação
├── package.json           # Dependências e scripts do projeto
└── README.md              # Documentação do projeto
```

---

## Como Executar

### Pré-requisitos

- **Node.js**: `v18.0.0` ou superior (recomendado `v20.x`)
- **npm**: `v9.0.0` ou superior

### Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/Joaoptoaldo/meu-portfolio.git
   cd meu-portfolio
   ```

2. **Instalar as dependências:**
   ```bash
   npm install
   ```

3. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse a aplicação no navegador em `http://localhost:5173`.

---

## Scripts Disponíveis

No `package.json`, estão configurados os seguintes scripts:

| Comando | Função |
| :--- | :--- |
| `npm run dev` | Inicia o servidor local de desenvolvimento com Hot Module Replacement (HMR) via Vite. |
| `npm run build` | Compila e otimiza a aplicação para produção na pasta `dist/`. |
| `npm run preview` | Executa um servidor local para visualizar a versão de produção gerada em `dist/`. |
| `npm run lint` | Executa o Oxlint para verificação estática de código e detecção de erros. |

---

## Decisões Técnicas

1. **Arquitetura Baseada em Dados (Single Source of Truth)**: O arquivo `src/data/projects.js` e demais arquivos em `src/data/` concentram todos os dados reais do desenvolvedor. A árvore do Explorer, os resultados de busca, os comandos do terminal e as abas são gerados dinamicamente a partir dessas estruturas.
2. **Manipulação Nativa de Redimensionamento**: Os painéis do Explorer e do Terminal utilizam escutadores globais de eventos do ponteiro (`mousemove`/`mouseup`), garantindo redimensionamento suave sem sobressaltos ou necessidade de bibliotecas externas de *resizable*.
3. **Desenvolvimento Nativo de Componentes de IDE**: Todos os recursos do editor (como menus de contexto, modais de busca, janelas flutuantes e abas com drag-and-drop) foram desenvolvidos nativamente com React e Tailwind CSS v4.

---

## Créditos e Referências

- **Identidade Visual**: Inspirada na interface do [Visual Studio Code](https://code.visualstudio.com/) desenvolvido pela Microsoft.


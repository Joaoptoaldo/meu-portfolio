/**
 * Modelo de dados Orientado a Objetos para Projetos.
 *
 * Ao adicionar um novo projeto, altere APENAS este arquivo.
 */

export class Project {
  /**
   * @param {Object} data
   * @param {string} data.id - Identificador único
   * @param {string} [data.file] - Nome de arquivo simulado no editor
   * @param {string} [data.icon] - Extensão/ícone visual do arquivo
   * @param {string} data.title - Nome do projeto
   * @param {string} data.tagline - Resumo/subtítulo
   * @param {string} data.description - Descrição detalhada
   * @param {Array<string>} [data.technologies=[]] - Lista de tecnologias
   * @param {string} data.repository - URL do repositório GitHub
   * @param {string} [data.demo] - URL da aplicação em produção (opcional)
   * @param {'sole'|'team'} [data.authorship='sole'] - Tipo de autoria ('sole' | 'team')
   * @param {string} [data.role] - Descrição da atuação (caso team)
   */
  constructor({
    id,
    file,
    icon,
    title,
    tagline,
    description,
    technologies = [],
    repository,
    demo,
    authorship = 'sole',
    role,
  }) {
    this.id = id
    this.file = file || `${id}.js`
    this.icon = icon || 'js'
    this.title = title
    this.tagline = tagline
    this.description = description
    this.technologies = technologies
    this.repository = repository
    this.demo = demo
    this.authorship = authorship
    this.role = role
  }

  get isTeam() {
    return this.authorship === 'team'
  }

  get authorshipLabel() {
    return this.isTeam ? 'Colaboração' : 'Autor'
  }

  /**
   * Retorna os dados em linhas pesquisáveis para a busca global.
   */
  toSearchableLines() {
    return [
      this.title,
      this.tagline,
      this.description,
      ...this.technologies,
      ...(this.role ? [this.role] : []),
    ]
  }
}

// Lista oficial de projetos convertida para instâncias da classe Project
export const projects = [
  {
    id: 'analytics-dashboard',
    file: 'analytics-dashboard.ts',
    icon: 'ts',
    title: 'Analytics Dashboard',
    tagline: 'Dashboard de análise de indicadores de vendas',
    description:
      'Aplicação full stack para análise e visualização de dados em tempo real, com métricas agregadas, filtros, listagem paginada de produtos, gráficos interativos e sincronização externa protegida por token.',
    technologies: [
      'Python',
      'FastAPI',
      'SQLAlchemy',
      'React 19',
      'Vite',
      'TypeScript',
      'PostgreSQL',
      'SQLite',
      'Docker',
    ],
    repository: 'https://github.com/Joaoptoaldo/analytics-dashboard',
    authorship: 'sole',
  },
  {
    id: 'imobsystem',
    file: 'imobsystem.py',
    icon: 'python',
    title: 'ImobSystem',
    tagline: 'Sistema web para gerenciamento de locação de imóveis',
    description:
      'Cadastro de clientes e imóveis, registro e encerramento de contratos de locação, relatórios com filtros (cliente, tipo de imóvel, período, status), autenticação e 11 testes automatizados.',
    technologies: [
      'Python 3.12',
      'Django 6.0',
      'SQLite',
      'PostgreSQL',
      'Bootstrap 5',
      'JavaScript',
      'Gunicorn',
      'WhiteNoise',
    ],
    repository: 'https://github.com/Joaoptoaldo/ImobSystem',
    authorship: 'sole',
  },
  {
    id: 'acervohub',
    file: 'acervohub.js',
    icon: 'js',
    title: 'AcervoHub',
    tagline: 'Plataforma full stack de gestão de acervo pessoal',
    description:
      'Cadastro, consulta, edição e remoção de livros, status de leitura (quero ler, lendo, lido), avaliações, favoritos e autenticação (bcrypt + JWT), com bibliotecas privadas por usuário.',
    technologies: [
      'React 19',
      'Material UI',
      'Node.js',
      'Express',
      'Mongoose',
      'MongoDB Atlas',
      'JWT',
    ],
    repository: 'https://github.com/Joaoptoaldo/AcervoHub',
    demo: 'https://acervo-hub.vercel.app',
    authorship: 'sole',
  },
  {
    id: 'somdiabetes',
    file: 'somdiabetes.js',
    icon: 'js',
    title: 'SomDiabetes',
    tagline: 'Sistema web de monitoramento de dados de pacientes com diabetes',
    description:
      'Projeto colaborativo (Trabalho Final de Robson Cezário) criado em parceria entre a UFN, o Laboratório de Práticas da Computação e a empresa ER Clinic, com Python/Django e algoritmos de mineração de dados.',
    technologies: ['Python', 'Django', 'JavaScript', 'HTML', 'CSS', 'Dockerfile'],
    repository: 'https://github.com/Joaoptoaldo/somdiabetes',
    authorship: 'team',
    role:
      'Participação em equipe (aluno — Sistemas de Informação) entre múltiplos colaboradores do projeto. Sem evidência de commits individuais no histórico público.',
  },
  {
    id: 'automacao-python',
    file: 'automacao-em-python.py',
    icon: 'python',
    title: 'Automação em Python',
    tagline: 'Scripts e exemplos práticos de automação',
    description:
      'Repositório de exemplos práticos de automação com Python: escritório (relatórios, e-mails, PDFs), web scraping e downloads, integração de APIs (bots, posts sociais), IA/ML (análise de sentimentos, imagens), monitoramento de sites com alertas e dashboards interativos, com código organizado e testes.',
    technologies: [
      'Python',
      'requests',
      'pandas',
      'openpyxl',
      'selenium',
      'beautifulsoup4',
      'streamlit',
      'pytest',
      'python-telegram-bot',
    ],
    repository: 'https://github.com/Joaoptoaldo/automacao-em-python',
    authorship: 'sole',
  },
  {
    id: 'calorie-tracker',
    file: 'calorie-tracker.ts',
    icon: 'ts',
    title: 'CalorieDiary',
    tagline: 'Workout & Calorie Tracker — projeto final do CS50x (Harvard)',
    description:
      'Aplicação full stack para rastrear o balanço calórico diário: registro de alimentos (calorias ingeridas) e treinos (calorias gastas), com dashboard do saldo líquido em tempo real, gráfico interativo, histórico com exclusão em tempo real (SPA) e autenticação com hash. Desenvolvido como projeto final do curso CS50 — Introduction to Computer Science (Harvard University).',
    technologies: [
      'React',
      'Vite',
      'TypeScript',
      'Tailwind CSS',
      'Recharts',
      'Python',
      'Flask',
      'Flask-SQLAlchemy',
      'SQLite',
      'PostgreSQL',
      'Docker',
    ],
    repository: 'https://github.com/Joaoptoaldo/calorie-tracker',
    authorship: 'sole',
  },
].map((p) => new Project(p))
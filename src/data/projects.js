/**
 * Projetos do portfólio — dados factuais obtidos dos repositórios oficiais
 * (GitHub API / README). Nada inventado.
 *
 * `authorship`: 'sole' (repo de João, única contribuição confirmada na API)
 *               ou 'team' (projeto colaborativo; participação sem autoria integral).
 * `role`: descrição factual da participação, quando diferente de autoria.
 */
export const projects = [
  {
    id: 'analytics-dashboard',
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
]
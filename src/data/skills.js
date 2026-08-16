/**
 * Habilidades por categoria, com nível de domínio em barras de progresso.
 *
 * Estrutura:
 *   - level   : 'use' (Utilizo) | 'learning' (Em aprendizado) | undefined
 *               (o badge "Aprofundando conhecimentos" só aparece na
 *               categoria isLearning, onde o badge fica oculto).
 *   - progress: 0–100, autoavaliação ANCorADA em evidência (projetos reais
 *               entregues, autonomia em bugs, capacidade de decisão/ensino).
 *               Rúbrica: ≈20 explorando · ≈45 usa com apoio · ≈65 autonomia
 *               · ≈85 domina trade-offs · ≈95 ensina/lidera.
 *
 * IMPORTANTE: os valores abaixo são SUGERIDOS a partir dos projetos reais do
 * portfólio e da rúbrica — ajuste segundo sua própria avaliação.
 */
export const skillCategories = [
  {
    id: 'learning',
    title: 'Aprofundando conhecimentos',
    isLearning: true,
    skills: [
      { name: '.NET', level: 'learning', progress: 25 },
      { name: 'C#', level: 'learning', progress: 30 },
      { name: 'ASP.NET Core', level: 'learning', progress: 15 },
    ],
  },
  {
    id: 'languages',
    title: 'Linguagens',
    skills: [
      { name: 'JavaScript', progress: 85 },
      { name: 'TypeScript', progress: 80 },
      { name: 'Python', progress: 80 },
      { name: 'Java', progress: 40 },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    skills: [
      { name: 'React', progress: 70 },
      { name: 'Tailwind CSS', progress: 75 },
      { name: 'HTML', progress: 90 },
      { name: 'CSS', progress: 80 },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    skills: [
      { name: 'Node.js', progress: 75 },
      { name: 'Express', progress: 70 },
      { name: 'FastAPI', progress: 60 },
      { name: 'Django', progress: 70 },
    ],
  },
  {
    id: 'database',
    title: 'Banco de Dados',
    skills: [
      { name: 'PostgreSQL', progress: 70 },
      { name: 'MySQL', progress: 45 },
      { name: 'MongoDB', progress: 75 },
      { name: 'SQLite', progress: 65 },
    ],
  },
  {
    id: 'tools',
    title: 'Ferramentas',
    skills: [
      { name: 'Git', progress: 75 },
      { name: 'GitHub', progress: 85 },
      { name: 'Docker', progress: 60 },
      { name: 'Postman', progress: 70 },
      { name: 'VS Code', progress: 85 },
      { name: 'Vite', progress: 60 },
      { name: 'Bootstrap', progress: 80 },
      { name: 'Figma', progress: 55 },
    ],
  },
]
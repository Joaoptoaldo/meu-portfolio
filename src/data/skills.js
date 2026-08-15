/**
 * Habilidades confirmadas no PORTFOLIO_CONTEXT.md (§10), por categoria.
 *
 * Estrutura de nível:
 *   'use'     -> "Utilizo"          (tecnologia que João usa em projetos)
 *   'learning'-> "Em aprendizado"   (tecnologia em estudo)
 *   null      -> nível a definir    (NÃO rotular até dado real)
 *
 * Regra: nada de "avançado"/"especialista" nem barras de progresso.
 */
export const skillCategories = [
  {
    id: 'languages',
    title: 'Linguagens',
    skills: [
      { name: 'JavaScript', level: null },
      { name: 'Java', level: null },
      { name: 'Python', level: null },
      { name: 'C#', level: null },
      { name: 'SQL', level: null },
      { name: 'C', level: null },
      { name: 'C++', level: null },
      { name: 'Rust', level: null },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    skills: [
      { name: 'React', level: null },
      { name: 'Tailwind CSS', level: null },
      { name: 'HTML', level: null },
      { name: 'CSS', level: null },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: null },
      { name: 'Express', level: null },
      { name: 'Django', level: null },
      { name: 'ASP.NET Core', level: null },
      { name: 'APIs REST', level: null },
    ],
  },
  {
    id: 'database',
    title: 'Banco de Dados',
    skills: [
      { name: 'PostgreSQL', level: null },
      { name: 'MySQL', level: null },
      { name: 'MongoDB', level: null },
      { name: 'SQLite', level: null },
    ],
  },
  {
    id: 'tools',
    title: 'Ferramentas',
    skills: [
      { name: 'Git', level: null },
      { name: 'GitHub', level: null },
      { name: 'Docker', level: null },
      { name: 'Postman', level: null },
      { name: 'VS Code', level: null },
      { name: 'Vite', level: null },
    ],
  },
]
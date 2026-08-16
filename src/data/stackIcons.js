/**
 * Registro de logos de tecnologias (stacks) usados no portfólio.
 *
 * Cada entrada mapeia o nome da tecnologia -> { file, css, skill }:
 *  - file : nome do SVG em src/assets/icons/ (fallback; fonte anterior)
 *  - css  : cor de destaque da marca (fallback/decorativo)
 *  - skill: nome do SVG em src/assets/icons/skill/ (skill-icons, MIT).
 *            O TechIcon prioriza a pasta skill quando o campo existe.
 */
export const stackIcons = {
  React: { file: 'react-logo', css: '#61dafb', skill: 'React' },
  'Tailwind CSS': { file: 'tailwindcss', css: '#06b6d4', skill: 'TailwindCSS' },
  HTML: { file: 'html5', css: '#e34f26', skill: 'HTML' },
  CSS: { file: 'css3', css: '#1572b6', skill: 'CSS' },
  JavaScript: { file: 'javascript', css: '#f7df1e', skill: 'JavaScript' },
  'Node.js': { file: 'nodejs', css: '#5fa04e', skill: 'NodeJS' },
  Express: { file: 'express', css: '#ffffff', skill: 'ExpressJS' },
  Django: { file: 'django', css: '#092e20', skill: 'Django' },
  '.NET': { file: 'csharp', css: '#512bd4', skill: 'DotNet' },
  'ASP.NET Core': { file: 'openjdk', css: '#512bd4', skill: 'DotNet' },
  'APIs REST': { file: 'postman', css: '#ff6c37' },
  Python: { file: 'python', css: '#3776ab', skill: 'Python' },
  Java: { file: 'java', css: '#ea2d2e', skill: 'Java' },
  'C#': { file: 'csharp', css: '#239120', skill: 'CS' },
  C: { file: 'csharp', css: '#00599c', skill: 'C' },
  'C++': { file: 'cpp', css: '#00599c', skill: 'CPP' },
  Rust: { file: 'rust', css: '#ffffff', skill: 'Rust' },
  SQL: { file: 'postgresql', css: '#4169e1', skill: 'SQLite' },
  PostgreSQL: { file: 'postgresql', css: '#4169e1', skill: 'PostgreSQL' },
  MySQL: { file: 'mysql', css: '#4479a1', skill: 'MySQL' },
  MongoDB: { file: 'mongodb', css: '#47a248', skill: 'MongoDB' },
  SQLite: { file: 'sqlite', css: '#044a64', skill: 'SQLite' },
  Git: { file: 'git', css: '#f05032', skill: 'Git' },
  GitHub: { file: 'github', css: '#ffffff', skill: 'GitHub' },
  Docker: { file: 'docker', css: '#2496ed', skill: 'Docker' },
  Vite: { file: 'vite', css: '#646cff', skill: 'Vite' },
  Postman: { file: 'postman', css: '#ff6c37', skill: 'Postman' },
  'VS Code': { file: 'react-logo', css: '#007acc', skill: 'VSCode' },
  'Material UI': { file: 'openjdk', css: '#1976d2' },
  Bootstrap: { file: 'openjdk', css: '#7952b3', skill: 'Bootstrap' },
  Figma: { file: 'figma', css: '#a259ff', skill: 'Figma' },
  FastAPI: { file: 'python', css: '#009688', skill: 'FastAPI' },
  SQLAlchemy: { file: 'python', css: '#d33682', skill: 'Prisma' },
  'MongoDB Atlas': { file: 'mongodb', css: '#47a248', skill: 'MongoDB' },
  'PostgreSQL/Neon': { file: 'postgresql', css: '#4169e1', skill: 'PostgreSQL' },
  TypeScript: { file: 'typescript', css: '#3178c6', skill: 'TypeScript' },
  Mongoose: { file: 'mongodb', css: '#880000' },
  'Dockerfile': { file: 'docker', css: '#2496ed' },
  // Tecnologias adicionadas com os novos projetos (fallback sensato).
  Flask: { file: 'python', css: '#000000', skill: 'Flask' },
  Selenium: { file: 'python', css: '#43b02a', skill: 'Selenium' },
  Pandas: { file: 'python', css: '#150458' },
  requests: { file: 'python', css: '#1f6feb' },
  openpyxl: { file: 'python', css: '#217346' },
  beautifulsoup4: { file: 'python', css: '#59666c' },
  streamlit: { file: 'python', css: '#ff4b4b' },
  pytest: { file: 'python', css: '#0a9edc' },
  'python-telegram-bot': { file: 'python', css: '#2AABEE' },
  Recharts: { file: 'openjdk', css: '#22b8cf' },
  'Flask-SQLAlchemy': { file: 'python', css: '#000000' },
}
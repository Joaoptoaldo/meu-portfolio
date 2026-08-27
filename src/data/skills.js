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
/**
 * Modelo de dados Orientado a Objetos para Habilidades (Skills).
 *
 * Ao adicionar uma nova habilidade, APENAS este arquivo é alterado.
 * Os componentes visuais, busca e ícones funcionam automaticamente por convenção.
 */

/**
 * Entidade que representa uma Habilidade individual.
 */
export class Skill {
  /**
   * @param {Object} data
   * @param {string} data.name - Nome da tecnologia (ex: 'React', 'Python')
   * @param {number} [data.progress=0] - Autoavaliação de 0 a 100
   * @param {'use'|'learning'} [data.level] - Nível visual ('use' | 'learning')
   * @param {string} [data.icon] - Nome do ícone SVG customizado se diferente do padrão (opcional)
   */
  constructor({ name, progress = 0, level, icon }) {
    this.name = name
    this.progress = Math.max(0, Math.min(100, Number(progress) || 0))
    this.level = level
    this.icon = icon
  }

  /**
   * Retorna a classificação da rúbrica baseada no progresso.
   */
  get rubricLabel() {
    if (this.progress >= 85) return 'avançado'
    if (this.progress >= 65) return 'autônomo'
    if (this.progress >= 45) return 'com apoio'
    return 'explorando'
  }
}

/**
 * Entidade que representa uma Categoria de Habilidades.
 */
export class SkillCategory {
  /**
   * @param {Object} data
   * @param {string} data.id - Identificador único (ex: 'frontend')
   * @param {string} data.title - Título exibido na interface
   * @param {boolean} [data.isLearning=false] - Se indica a categoria de aprendizado
   * @param {Array<Object|Skill>} [data.skills=[]] - Lista de habilidades
   */
  constructor({ id, title, isLearning = false, skills = [] }) {
    this.id = id
    this.title = title
    this.isLearning = isLearning
    this.skills = skills.map((s) => (s instanceof Skill ? s : new Skill(s)))
  }

  /**
   * Adiciona uma nova habilidade a esta categoria.
   * @param {Object|Skill} skillData
   * @returns {SkillCategory} Retorna a própria categoria (interface fluente)
   */
  addSkill(skillData) {
    const skill = skillData instanceof Skill ? skillData : new Skill(skillData)
    this.skills.push(skill)
    return this
  }
}

/**
 * Coleção principal de categorias de habilidades do portfólio.
 */
export const skillCategories = [
  new SkillCategory({
    id: 'learning',
    title: 'Aprofundando conhecimentos',
    isLearning: true,
    skills: [
      { name: '.NET', level: 'learning', progress: 25 },
      { name: 'C#', level: 'learning', progress: 30 },
      { name: 'ASP.NET Core', level: 'learning', progress: 15 },
    ],
  }),
  new SkillCategory({
    id: 'languages',
    title: 'Linguagens',
    skills: [
      { name: 'JavaScript', progress: 85 },
      { name: 'TypeScript', progress: 80 },
      { name: 'Python', progress: 80 },
      { name: 'Java', progress: 40 },
    ],
  }),
  new SkillCategory({
    id: 'frontend',
    title: 'Frontend',
    skills: [
      { name: 'React', progress: 70 },
      { name: 'Tailwind CSS', progress: 75 },
      { name: 'HTML', progress: 90 },
      { name: 'CSS', progress: 80 },
    ],
  }),
  new SkillCategory({
    id: 'backend',
    title: 'Backend',
    skills: [
      { name: 'Node.js', progress: 75 },
      { name: 'Express', progress: 70 },
      { name: 'FastAPI', progress: 60 },
      { name: 'Django', progress: 70 },
    ],
  }),
  new SkillCategory({
    id: 'database',
    title: 'Banco de Dados',
    skills: [
      { name: 'PostgreSQL', progress: 70 },
      { name: 'MySQL', progress: 45 },
      { name: 'MongoDB', progress: 75 },
      { name: 'SQLite', progress: 65 },
    ],
  }),
  new SkillCategory({
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
  }),
]
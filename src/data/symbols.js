/**
 * Perfis de símbolos (Outline / Go to Symbol) das seções.
 *
 * Cada seção expõe uma lista de "símbolos": cada um tem label, tipo
 * (função, variável, classe, etc.) e um seletor CSS que localiza o nó
 * na DOM da seção renderizada — usado pelo Outline para rolar até ele.
 *
 * Os seletores são mapeados por dados reais (projects, skillCategories…),
 * então acompanham automaticamente alterações de conteúdo.
 */
import { projects } from './projects'
import { skillCategories } from './skills'
import { experience } from './experience'

/**
 * Gera símbolos para projetos: um por card, âncora pelo título.
 * Os títulos são únicos e servem de seletor estável.
 */
function projectSymbols() {
  return projects.map((p) => ({
    id: `projeto-${p.id}`,
    label: p.title,
    type: 'class', // card de projeto
    selector: `[data-project="${p.id}"]`,
  }))
}

/**
 * Símbolos de Habilidades: um por categoria + um por skill.
 * Seletores usam índice para ser robusto a nomes com acentos/espaços.
 */
function skillsSymbols() {
  const symbols = []
  skillCategories.forEach((cat, i) => {
    symbols.push({
      id: `cat-${cat.id}`,
      label: cat.title,
      type: 'namespace', // categoria de skills
      selector: `#skills-section-${i}`,
    })
    cat.skills.forEach((skill, j) => {
      symbols.push({
        id: `skill-${cat.id}-${j}`,
        label: skill.name,
        type: 'variable',
        selector: `#skills-section-${i} [data-skill="${skill.name}"]`,
      })
    })
  })
  return symbols
}

/**
 * Símbolos de Experiência: um por item da linha do tempo.
 * Seletores por índice (estável).
 */
function experienceSymbols() {
  return experience.items.map((item, i) => ({
    id: `exp-${item.id}`,
    label: item.role,
    type: 'function',
    selector: `#experience-item-${i}`,
  }))
}

/**
 * Símbolos por seção. Retorna a lista de símbolos correspondente à
 * seção (fileId). O Outline usa esse registro.
 */
export function getSymbolsForSection(fileId) {
  switch (fileId) {
    case 'projetos':
      return projectSymbols()
    case 'habilidades':
      return skillsSymbols()
    case 'experiencia':
      return experienceSymbols()
    case 'welcome':
      return [
        { id: 'welcome-intro', label: 'Apresentação', type: 'function', selector: 'data-welcome-intro' },
      ]
    case 'sobre':
      return [
        { id: 'sobre-intro', label: 'Quem sou eu', type: 'function', selector: 'data-sobre-intro' },
        { id: 'sobre-destaque', label: 'Em destaque', type: 'function', selector: 'data-sobre-destaque' },
        { id: 'sobre-foco', label: 'No que estou focado', type: 'function', selector: 'data-sobre-foco' },
        { id: 'sobre-id', label: 'Identificação', type: 'function', selector: 'data-sobre-id' },
      ]
    case 'formacao':
      return [{ id: 'formacao-item', label: 'Sistemas de Informação', type: 'class', selector: 'data-formacao-item' }]
    case 'contato':
      return [{ id: 'contato-canais', label: 'Canais de contato', type: 'function', selector: 'data-contato-canais' }]
    default:
      return []
  }
}
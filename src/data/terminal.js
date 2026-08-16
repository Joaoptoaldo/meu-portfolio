// comandos disponiveis no terminal
import { skillCategories } from './skills'
import { projects } from './projects'
import { experience } from './experience'

export const TERMINAL_COMMANDS = [
  { name: 'help', description: 'mostra a lista de comandos' },
  { name: 'whoami', description: 'exibe quem você está conhecendo' },
  { name: 'profile', description: 'resumo de formação e perfil' },
  { name: 'skills', description: 'lista as tecnologias (por categoria)' },
  { name: 'projects', description: 'lista os projetos do portfólio' },
  { name: 'project <nome>', description: 'detalhes de um projeto (comando auxiliar, usa `projects` no site)' },
  { name: 'experience', description: 'linha do tempo de experiência' },
  { name: 'contact', description: 'canais de contato' },
  { name: 'open <arquivo>', description: 'abre o arquivo/seção no editor (Ex.: Sobre.jsx)' },
  { name: 'cls', description: 'limpa o terminal' },
  { name: 'exit', description: 'encerra esta sessão do terminal' },
]

/** Comandos que abrem seções do workspace (accionam via openFile). */
export const OPEN_MAP = {
  Welcome: 'welcome',
  'Sobre.jsx': 'sobre',
  'habilidades.json': 'habilidades',
  projetos: 'projetos',
  'experiencia.jsx': 'experiencia',
  'formacao.jsx': 'formacao',
  'contato.jsx': 'contato',
}

export function formatExperience() {
  const lines = []
  for (const item of experience.items) {
    lines.push(`${item.period}  •  ${item.role}`)
    lines.push(`           ${item.company}`)
  }
  return lines
}

export function formatProjects() {
  const lines = []
  for (const p of projects) {
    lines.push(`${p.title}`)
    lines.push(`  ${p.tagline}`)
    lines.push(`  Tech: ${p.technologies.join(', ')}`)
    lines.push(`  ${p.repository}`)
    lines.push('')
  }
  return lines
}

export function formatSkills() {
  const lines = []
  for (const cat of skillCategories) {
    lines.push(`[${cat.title}]`)
    for (const s of cat.skills) {
      const pct = Math.round(s.progress ?? 0)
      const level = s.level === 'learning' ? ' (estudando)' : ''
      lines.push(`  ${s.name}${level}  —  ${pct}%`)
    }
    lines.push('')
  }
  return lines
}
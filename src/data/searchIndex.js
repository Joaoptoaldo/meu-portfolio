/**
 * Índice de busca global (Search) — conteúdo real das seções indexado
 * para a view SEARCH da sidebar. Nada é inventado: deriva dos mesmos
 * arquivos de dados que alimentam o portfólio.
 *
 * Cada "match" aponta para a seção a abrir (via `section` + `id`) e traz
 * o trecho de contexto (linha) que será exibido como resultado.
 */
import { profile } from './profile'
import { about } from './about'
import { skillCategories } from './skills'
import { projects } from './projects'
import { experience } from './experience'
import { education } from './education'
import { contact } from './contact'

/** Conteúdo direto do Welcome (texto fixo + resumo do perfil). */
const welcomeText = [
  'Olá, eu sou',
  profile.firstName,
  profile.role,
  profile.formation,
  profile.summary,
]

/** Linhas de um bloco de experiência. */
function experienceLines(item) {
  return [item.period, item.role, item.company, item.description]
}

/**
 * Documentos indexados: cada entrada lista as linhas pesquisáveis e
 * aponta para a seção/arquivo que deve ser aberto no match.
 */
export const searchIndex = [
  {
    section: 'welcome',
    fileId: 'welcome',
    label: 'Welcome.jsx',
    lines: welcomeText.filter(Boolean),
  },
  {
    section: 'about',
    fileId: 'sobre',
    label: 'Sobre.jsx',
    lines: [about.intro, ...about.highlights, ...about.focus, profile.area],
  },
  {
    section: 'skills',
    fileId: 'habilidades',
    label: 'habilidades.json',
    lines: skillCategories.flatMap((cat) => [
      cat.title,
      ...cat.skills.map((s) => s.name),
    ]),
  },
  ...projects.map((p) => ({
    section: 'projects',
    fileId: 'projetos',
    label: `${p.title} — projetos/`,
    lines: typeof p.toSearchableLines === 'function'
      ? p.toSearchableLines()
      : [p.title, p.tagline, p.description, ...p.technologies],
  })),
  {
    section: 'experience',
    fileId: 'experiencia',
    label: 'experiencia.jsx',
    lines: experience.items.flatMap((item) =>
      typeof item.toSearchableLines === 'function'
        ? item.toSearchableLines()
        : experienceLines(item)
    ),
  },
  {
    section: 'education',
    fileId: 'formacao',
    label: 'formacao.jsx',
    lines: education.items.flatMap((e) =>
      typeof e.toSearchableLines === 'function'
        ? e.toSearchableLines()
        : [e.title, e.institution, e.duration]
    ),
  },
  {
    section: 'contact',
    fileId: 'contato',
    label: 'contato.jsx',
    lines: contact.channels.flatMap((c) =>
      typeof c.toSearchableLines === 'function'
        ? c.toSearchableLines()
        : [c.label, c.value, c.hint]
    ).filter(Boolean),
  },
]

/** Busca: retorna itens com o termo e a linha de contexto. */
export function searchContent(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const results = []
  for (const doc of searchIndex) {
    for (const line of doc.lines) {
      const idx = line.toLowerCase().indexOf(q)
      if (idx !== -1) {
        results.push({
          section: doc.section,
          fileId: doc.fileId,
          label: doc.label,
          snippet: line,
          start: idx,
        })
      }
    }
  }
  return results.slice(0, 50)
}
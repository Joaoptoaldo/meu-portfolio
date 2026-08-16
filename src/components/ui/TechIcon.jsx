/**
 * TechIcon — logo de uma tecnologia (stack).
 *
 * Prioriza os ícones do skill-icons (pasta `skill/`, MIT), que possuem
 * visual de badge/tile de tecnologia; quando não há equivalente, usa o
 * SVG de fallback de `src/assets/icons/`.
 *
 * Uso: <TechIcon name="React" className="h-4 w-4" />
 */
import { stackIcons } from '../../data/stackIcons'

// Ícones do skill-icons (pasta skill/) e fallback (raiz de assets).
const SKILL_LOGOS = import.meta.glob('../../assets/icons/skill/*.svg', {
  query: '?url',
  import: 'default',
  eager: true,
})

const LOGOS = import.meta.glob('../../assets/icons/skill*.svg', {
  query: '?url',
  import: 'default',
  eager: true,
})

export default function TechIcon({ name, className = 'h-4 w-4', title }) {
  const meta = stackIcons[name]
  if (!meta) return null

  // Prioridade 1: ícone do skill-icons; 2: asset de fallback.
  const skillUrl = meta.skill
    ? SKILL_LOGOS[`../../assets/icons/skill/${meta.skill}.svg`]
    : null
  const url = skillUrl ?? LOGOS[`../../assets/icons/skill/${meta.file}.svg`]
  if (!url) return null

  return (
    <span
      title={title ?? name}
      role="img"
      aria-label={name}
      className={`inline-flex shrink-0 items-center justify-center rounded ${className}`}
    >
      <img src={url} alt="" aria-hidden="true" className="h-full w-full" />
    </span>
  )
}
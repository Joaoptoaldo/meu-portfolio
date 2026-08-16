/**
 * Habilidades — tecnologias em categorias, com barra de progresso do nível.
 *
 * `progress` (0–100) vem dos dados e é uma autoavaliação com rúbrica visível:
 *   ≈20 explorando · ≈45 usa com apoio · ≈65 autonomia · ≈85 domina
 *   trade-offs · ≈95 ensina/lidera. Nenhum valor é inventado sem dados.
 */
import { skillCategories } from '../../data/skills'
import TechIcon from '../ui/TechIcon'

const LEVEL_UI = {
  use: {
    label: 'Utilizo',
    className: 'border-accent-border bg-bg-tag text-accent-bright',
  },
  learning: {
    label: 'Aprofundando conhecimentos',
    className: 'border-accent-border bg-bg-tag text-accent-bright',
  },
}

/** Rótulo padrão para valores fora da rúbrica. */
const LABEL_FALLBACK = 'Domínio'

/** Sigla curta correspondente à faixa da rúbrica. */
function levelLabel(progress) {
  if (progress >= 85) return 'avançado'
  if (progress >= 65) return 'autônomo'
  if (progress >= 45) return 'com apoio'
  return 'explorando'
}

function SkillBar({ progress }) {
  const pct = Math.max(0, Math.min(100, progress ?? 0))

  return (
    <div className="min-w-0">
      <div className="mb-1 flex items-center justify-between gap-2 text-[10px] leading-none">
        <span className="truncate text-text-muted">{LABEL_FALLBACK}: {pct}%</span>
        <span className="shrink-0 text-text-muted">{levelLabel(pct)}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-hover" role="presentation">
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            backgroundColor: 'var(--color-accent)',
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

function SkillTag({ name, level, progress, hideLevel }) {
  const levelUi = level && !hideLevel ? LEVEL_UI[level] : null

  return (
    <li className="rounded-md border border-border bg-bg-side/60 px-4 py-3.5 shadow-[0_0_0_1px_rgba(255,255,255,0.01)_inset]">
      <div className="flex items-start gap-3">
        <TechIcon name={name} className="mt-0.5 h-4 w-4 shrink-0" />
        <span className="min-w-0 flex-1 truncate font-mono text-sm font-medium text-text-primary">
          {name}
        </span>
        {levelUi && (
          <span
            className={`hidden shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium sm:inline ${levelUi.className}`}
          >
            {levelUi.label}
          </span>
        )}
      </div>

      <div className="mt-3 pl-7">
        <SkillBar progress={progress} />
      </div>
    </li>
  )
}

export default function Skills() {
  // Bloco "Aprofundando conhecimentos" (isLearning) aparece por último,
  // independente da ordem no arquivo de dados.
  const categories = [...skillCategories].sort((a, b) => {
    if (a.isLearning) return 1
    if (b.isLearning) return -1
    return 0
  })

  return (
    <div className="mx-auto min-w-0 w-full max-w-5xl px-6 pt-6 pb-12 md:px-8 md:pt-8 md:pb-16">
      <header className="mb-6">
        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-text-muted">
          // habilidades.json
        </p>
        <h1 className="text-2xl font-bold text-text-primary">Habilidades</h1>
      </header>

      <div className="space-y-6">
        {categories.map((category) => (
          <section
            key={category.id}
            className={category.isLearning ? 'rounded-md border border-border p-4 bg-bg-side/30' : ''}
          >
            <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-text-muted">
              {category.title}
            </h2>
            <ul className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {category.skills.map((skill) => (
                <SkillTag
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  progress={skill.progress}
                  hideLevel={category.isLearning}
                />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
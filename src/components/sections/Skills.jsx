/**
 * Habilidades — tecnologias em categorias, agrupadas por nível.
 *
 * Cada skill tem `level`:
 *   - 'use'     → badge "Utilizo"
 *   - 'learning'→ badge "Em aprendizado"
 *   - null      → chip discreto "nível a definir" (sem rotular domínio)
 *
 * Sem barras, porcentagens ou rótulos de "avançado/especialista".
 */
import { skillCategories } from '../../data/skills'

const LEVEL_UI = {
  use: {
    label: 'Utilizo',
    className: 'border-accent-border bg-bg-tag text-accent-bright',
  },
  learning: {
    label: 'Em aprendizado',
    className: 'border-border-strong bg-bg-hover text-text-secondary',
  },
}

function SkillTag({ name, level }) {
  const levelUi = level ? LEVEL_UI[level] : null

  return (
    <li className="flex items-center gap-2 rounded-md border border-border bg-bg-side/60 px-3 py-2">
      <span className="min-w-0 flex-1 truncate font-mono text-sm text-text-primary">
        {name}
      </span>
      {levelUi ? (
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${levelUi.className}`}
        >
          {levelUi.label}
        </span>
      ) : (
        <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-[10px] text-text-muted">
          nível a definir
        </span>
      )}
    </li>
  )
}

export default function Skills() {
  return (
    <div className="mx-auto min-w-0 w-full max-w-3xl px-6 py-10">
      <header className="mb-8">
        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-text-muted">
          // habilidades.json
        </p>
        <h1 className="text-2xl font-bold text-text-primary">Habilidades</h1>
      </header>

      <div className="space-y-8">
        {skillCategories.map((category) => (
          <section key={category.id}>
            <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-text-muted">
              {category.title}
            </h2>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {category.skills.map((skill) => (
                <SkillTag
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
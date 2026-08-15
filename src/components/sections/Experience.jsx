/**
 * Experiência — apresentação da trajetória em duas partes:
 *   profissionais (sem dado confirmado → mensagem explícita) e
 *   acadêmica/colaborativa (fatos comprovados, sem duplicar Projetos).
 */
import { experience } from '../../data/experience'
import { useWorkspace } from '../../hooks/useWorkspace'

export default function Experience() {
  const { openFile } = useWorkspace()

  return (
    <div className="mx-auto min-w-0 w-full max-w-3xl px-6 py-10">
      <header className="mb-8">
        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-text-muted">
          // experiencia.js
        </p>
        <h1 className="text-2xl font-bold text-text-primary">Experiência</h1>
      </header>

      <section>
        <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-text-muted">
          {experience.professional.heading}
        </h2>
        <p className="rounded-md border border-border bg-bg-side/60 px-4 py-3 text-sm italic text-text-muted">
          {experience.professional.empty}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-text-muted">
          {experience.academic.heading}
        </h2>
        <ol className="relative space-y-6 border-l border-border pl-6">
          {experience.academic.items.map((item) => (
            <li key={item.title} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-6 top-1.5 h-2 w-2 rounded-full border border-accent bg-bg-editor"
              />
              <h3 className="text-sm font-semibold text-text-primary">
                {item.title}
              </h3>
              <p className="mt-0.5 font-mono text-xs text-accent">{item.kind}</p>
              <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                {item.detail}
              </p>
            </li>
          ))}
        </ol>

        <button
          type="button"
          onClick={() => openFile('projetos')}
          className="mt-5 font-mono text-xs text-accent transition-colors hover:text-accent-bright hover:underline"
        >
          ver projetos ↗
        </button>
      </section>
    </div>
  )
}
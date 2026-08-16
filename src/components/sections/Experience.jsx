/**
 * Experiência — linha do tempo da trajetória profissional/acadêmica.
 * Cada item exibe o cargo, empresa/contexto, período, descrição e tecnologias.
 */
import { experience } from '../../data/experience'
import { useWorkspace } from '../../hooks/useWorkspace'

function TechTag({ name }) {
  return (
    <li className="rounded border border-border bg-bg-hover px-2 py-0.5 font-mono text-[11px] text-text-secondary">
      {name}
    </li>
  )
}

export default function Experience() {
  const { openFile } = useWorkspace()

  return (
    <div className="mx-auto min-w-0 w-full max-w-6xl px-6 pt-6 pb-12 md:px-8 md:pt-8 md:pb-16">
      <header className="mb-6">
        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-text-muted">
          // experiencia.jsx
        </p>
        <h1 className="text-2xl font-bold text-text-primary">Experiência</h1>
      </header>

      <ol className="relative space-y-6 border-l border-border pl-6">
        {experience.items.map((item) => (
          <li key={item.id} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[29px] top-3 h-2.5 w-2.5 rounded-full border border-accent bg-bg-editor"
            />
            <div className="rounded-md border border-border bg-bg-side/40 p-4.5 transition-colors hover:border-border-strong">
              <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                <h2 className="text-base font-semibold text-text-primary">
                  {item.role}
                </h2>
                {item.period && (
                  <span className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] text-text-muted">
                    {item.period}
                  </span>
                )}
              </div>
              <p className="mt-0.5 font-mono text-xs text-accent">
                {item.company}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {item.description}
              </p>
              {item.technologies?.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {item.technologies.map((tech) => (
                    <TechTag key={tech} name={tech} />
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>

      <button
        type="button"
        onClick={() => openFile('projetos')}
        className="mt-6 font-mono text-xs text-accent transition-colors hover:text-accent-bright hover:underline"
      >
        ver projetos ↗
      </button>
    </div>
  )
}
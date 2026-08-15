/**
 * Formação — apresenta o curso confirmado de forma direta.
 * Bloco de metadata com leve toque de editor, sem exagerar na metáfora.
 */
import { education } from '../../data/education'

export default function Education() {
  return (
    <div className="mx-auto min-w-0 w-full max-w-3xl px-6 py-10">
      <header className="mb-8">
        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-text-muted">
          // formacao.js
        </p>
        <h1 className="text-2xl font-bold text-text-primary">Formação</h1>
      </header>

      <div className="space-y-4">
        {education.items.map((item) => (
          <section
            key={item.title}
            className="rounded-md border border-border bg-bg-side/60 p-5"
          >
            {/* Fio de timeline discreto à esquerda */}
            <div className="mb-4 flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full border border-accent bg-bg-editor"
              />
              <span aria-hidden="true" className="h-px w-10 bg-border-strong" />
            </div>

            <h2 className="text-lg font-semibold text-text-primary">
              {item.title}
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              {item.institution}
            </p>

            <dl className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="rounded border border-border bg-bg-editor px-3 py-2">
                <dt className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
                  duração
                </dt>
                <dd className="font-mono text-sm text-accent-bright">
                  {item.duration}
                </dd>
              </div>
            </dl>
          </section>
        ))}
      </div>
    </div>
  )
}
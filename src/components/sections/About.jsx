/**
 * Sobre — apresentação pessoal/profissional.
 */
import { profile } from '../../data/profile'
import { about } from '../../data/about'

export default function About() {
  return (
    <div className="mx-auto min-w-0 w-full max-w-6xl px-6 pt-6 pb-12 md:px-8 md:pt-8 md:pb-16">
      <header className="mb-6">
        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-text-muted">
          // sobre.jsx
        </p>
        <h1 className="text-2xl font-bold text-text-primary">Sobre</h1>
      </header>

      <section className="mb-6">
        <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-text-muted">
          Quem sou eu
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-text-secondary">
          {about.intro}
        </p>
      </section>

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <section className="rounded-md border border-border bg-bg-side/40 p-4">
          <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-text-muted">
            Em destaque
          </h2>
          <ul className="space-y-1.5">
            {about.highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-text-secondary"
              >
                <span aria-hidden="true" className="mt-0.5 text-accent">
                  ›
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-md border border-border bg-bg-side/40 p-4">
          <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-text-muted">
            No que estou focado
          </h2>
          <ul className="space-y-1.5">
            {about.focus.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-text-secondary"
              >
                <span aria-hidden="true" className="mt-0.5 text-accent">
                  ›
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="rounded-md border border-border bg-bg-side/60 p-4">
        <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-text-muted">
          Identificação
        </h2>
        <dl className="grid grid-cols-1 gap-3 font-mono text-sm sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col gap-0.5 rounded border border-border bg-bg-editor p-2.5">
            <dt className="text-[10px] uppercase tracking-widest text-text-muted">nome</dt>
            <dd className="truncate text-text-primary">{profile.name}</dd>
          </div>
          <div className="flex flex-col gap-0.5 rounded border border-border bg-bg-editor p-2.5">
            <dt className="text-[10px] uppercase tracking-widest text-text-muted">área</dt>
            <dd className="truncate text-text-primary">{profile.area}</dd>
          </div>
          <div className="flex flex-col gap-0.5 rounded border border-border bg-bg-editor p-2.5">
            <dt className="text-[10px] uppercase tracking-widest text-text-muted">formação</dt>
            <dd className="truncate text-text-primary">{profile.formation}</dd>
          </div>
          <div className="flex flex-col gap-0.5 rounded border border-border bg-bg-editor p-2.5">
            <dt className="text-[10px] uppercase tracking-widest text-text-muted">instituição</dt>
            <dd className="truncate text-text-primary">{profile.institution}</dd>
          </div>
        </dl>
      </section>
    </div>
  )
}
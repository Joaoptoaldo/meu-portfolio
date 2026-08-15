/**
 * Sobre — apresentação pessoal/profissional.
 */
import { profile } from '../../data/profile'
import { about } from '../../data/about'

export default function About() {
  return (
    <div className="mx-auto min-w-0 w-full max-w-3xl px-6 py-10">
      <header className="mb-8">
        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-text-muted">
          // sobre.jsx
        </p>
        <h1 className="text-2xl font-bold text-text-primary">Sobre</h1>
      </header>

      <section>
        <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-text-muted">
          Quem sou eu
        </h2>
        <p className="text-sm leading-relaxed text-text-secondary">
          {about.intro}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-text-muted">
          Em destaque
        </h2>
        <ul className="space-y-1">
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

      <section className="mt-8">
        <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-text-muted">
          No que estou focado
        </h2>
        <ul className="space-y-1">
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

      <section className="mt-8 rounded-md border border-border bg-bg-side/60 p-4">
        <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-text-muted">
          Identificação
        </h2>
        <dl className="grid grid-cols-1 gap-1 font-mono text-sm sm:grid-cols-2">
          <div className="flex justify-between gap-2">
            <dt className="text-text-muted">nome</dt>
            <dd className="text-text-primary">{profile.name}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-text-muted">área</dt>
            <dd className="text-text-primary">{profile.area}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-text-muted">formação</dt>
            <dd className="text-text-primary">{profile.formation}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-text-muted">instituição</dt>
            <dd className="text-text-primary">{profile.institution}</dd>
          </div>
        </dl>
      </section>
    </div>
  )
}
/**
 * Projetos — cards dos projetos, com estética de editor.
 *
 * Cada card exibe: título, tagline, descrição factual, tecnologias
 * (chips), link(s) para o repositório e um selo de autoria:
 *   - "Autor"        -> repo de João (único contribuidor confirmado);
 *   - "Colaboração"  -> projeto em equipe (sem autoria integral).
 */
import { projects } from '../../data/projects'

function TechChip({ name }) {
  return (
    <li className="rounded border border-border bg-bg-hover px-2 py-0.5 font-mono text-[11px] text-text-secondary">
      {name}
    </li>
  )
}

function ProjectCard({ project }) {
  const isTeam = project.authorship === 'team'

  return (
    <article className="flex flex-col rounded-md border border-border bg-bg-side/60 p-4 transition-all duration-200 hover:border-border-strong active:scale-[0.99]">
      <header className="mb-2">
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="font-mono text-accent">
            {'</>'}
          </span>
          <h2 className="min-w-0 flex-1 truncate text-base font-semibold text-text-primary">
            {project.title}
          </h2>
          <span
            className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${
              isTeam
                ? 'border-accent-border bg-bg-tag text-accent-bright'
                : 'border-border-strong bg-bg-hover text-text-secondary'
            }`}
          >
            {isTeam ? 'Colaboração' : 'Autor'}
          </span>
        </span>
        <p className="mt-1 text-xs text-text-muted">{project.tagline}</p>
      </header>

      <p className="break-words text-sm leading-relaxed text-text-secondary">
        {project.description}
      </p>

      {isTeam && project.role && (
        <p className="mt-2 rounded border border-border bg-bg-hover px-2 py-1.5 font-mono text-[11px] leading-relaxed text-text-muted">
          {project.role}
        </p>
      )}

      <ul className="mt-3 flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <TechChip key={tech} name={tech} />
        ))}
      </ul>

      <footer className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-3 font-mono text-xs">
        <a
          href={project.repository}
          target="_blank"
          rel="noreferrer"
          className="text-accent transition-colors hover:text-accent-bright hover:underline"
        >
          github ↗
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="text-accent transition-colors hover:text-accent-bright hover:underline"
          >
            demo ↗
          </a>
        )}
      </footer>
    </article>
  )
}

export default function Projects() {
  return (
    <div className="mx-auto min-w-0 w-full max-w-4xl px-6 py-10">
      <header className="mb-8">
        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-text-muted">
          // projetos/
        </p>
        <h1 className="text-2xl font-bold text-text-primary">Projetos</h1>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
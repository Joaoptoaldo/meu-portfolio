/**
 * Projetos — cards dos projetos, com estética de editor.
 *
 * Cada card exibe: título, tagline, descrição factual, tecnologias
 * (chips), link(s) para o repositório e um selo de autoria:
 *   - "Autor"        -> repo de João (único contribuidor confirmado);
 *   - "Colaboração"  -> projeto em equipe (sem autoria integral).
 */
import { useEffect } from 'react'
import { projects } from '../../data/projects'
import { useWorkspace } from '../../hooks/useWorkspace'
import TechIcon from '../ui/TechIcon'

function TechChip({ name }) {
  return (
    <li className="flex items-center gap-1.5 rounded border border-border bg-bg-hover px-2 py-0.5 font-mono text-[11px] text-text-secondary">
      <TechIcon name={name} className="h-3 w-3" />
      {name}
    </li>
  )
}

function ProjectCard({ project }) {
  return (
    <article
      id={`project-${project.id}`}
      data-project={project.id}
      className="flex flex-col justify-between rounded-md border border-border bg-bg-side/60 p-5 transition-all duration-200 hover:border-border-strong active:scale-[0.99]"
    >
      <div>
        <header className="mb-2.5">
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="font-mono text-accent">
              {'</>'}
            </span>
            <h2 className="min-w-0 flex-1 truncate text-base font-semibold text-text-primary">
              {project.title}
            </h2>
            <span
              className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                project.isTeam
                  ? 'border-accent-border bg-bg-tag text-accent-bright'
                  : 'border-border-strong bg-bg-hover text-text-secondary'
              }`}
            >
              {project.authorshipLabel}
            </span>
          </span>
          <p className="mt-1 text-xs text-text-muted">{project.tagline}</p>
        </header>

        <p className="break-words text-sm leading-relaxed text-text-secondary">
          {project.description}
        </p>

        {project.isTeam && project.role && (
          <p className="mt-2.5 rounded border border-border bg-bg-hover px-2.5 py-1.5 font-mono text-[11px] leading-relaxed text-text-muted">
            {project.role}
          </p>
        )}

        <ul className="mt-3.5 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <TechChip key={tech} name={tech} />
          ))}
        </ul>
      </div>

      <footer className="mt-4.5 flex flex-wrap items-center gap-3 border-t border-border pt-3 font-mono text-xs">
        <a
          href={project.repository}
          target="_blank"
          rel="noreferrer"
          aria-label={`Ver repositório do projeto ${project.title} no GitHub (abre em nova aba)`}
          className="text-accent transition-colors hover:text-accent-bright hover:underline focus-visible:outline-2 focus-visible:outline-accent"
        >
          github ↗
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            aria-label={`Ver aplicação em produção do projeto ${project.title} (abre em nova aba)`}
            className="text-accent transition-colors hover:text-accent-bright hover:underline focus-visible:outline-2 focus-visible:outline-accent"
          >
            demo ↗
          </a>
        )}
      </footer>
    </article>
  )
}

export default function Projects() {
  const { activeId } = useWorkspace()

  useEffect(() => {
    if (!activeId) return
    const targetId = activeId.startsWith('projeto-')
      ? activeId.replace(/^projeto-/, '')
      : activeId
    if (targetId && targetId !== 'projetos') {
      const el = document.getElementById(`project-${targetId}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }
  }, [activeId])

  return (
    <div className="mx-auto min-w-0 w-full max-w-5xl px-6 pt-6 pb-12 md:px-8 md:pt-8 md:pb-16">
      <header className="mb-6">
        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-text-muted">
          // projetos/
        </p>
        <h1 className="text-2xl font-bold text-text-primary">Projetos</h1>
      </header>

      <div className="grid grid-cols-1 gap-4.5 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
/**
 * Breadcrumb — caminho do arquivo ativo (ex.: joao-pedro > Sobre.jsx).
 * Reforça a metáfora de navegação por arquivos.
 */
import { useWorkspace } from '../../hooks/useWorkspace'

export default function Breadcrumb() {
  const { activeFile, files } = useWorkspace()
  const isProject = files.some(
    (f) => f.id === activeFile?.id && f.section === 'projects',
  )

  return (
    <nav
      aria-label="Navegação estrutural"
      className="flex min-w-0 items-center gap-1 px-4 pt-3 text-xs"
    >
      <span className="shrink-0 text-text-muted">joao-pedro</span>
      <span aria-hidden="true" className="shrink-0 text-text-disabled">
        ›
      </span>
      {isProject && (
        <>
          <span className="shrink-0 text-text-muted">projetos</span>
          <span aria-hidden="true" className="shrink-0 text-text-disabled">
            ›
          </span>
        </>
      )}
      <span className="min-w-0 truncate text-text-primary">
        {activeFile?.file ?? '—'}
      </span>
    </nav>
  )
}

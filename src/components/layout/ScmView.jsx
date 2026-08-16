/**
 * ScmView — view "Source Control" da sidebar.
 *
 * Mostra os commits reais do repositório (src/data/commits.js, coletados
 * via `git log`), com mensagem, hash curto e data. Nenhum commit inventado.
 */
import { useWorkspace } from '../../hooks/useWorkspace'
import commits, { currentBranch } from '../../data/commits'
import Icon from '../ui/Icon'

/** Formata a data ISO como DD/MM/AAAA (pt-BR). */
function formatDate(iso) {
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export default function ScmView() {
  const { openFile } = useWorkspace()

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Cabeçalho */}
      <h2 className="shrink-0 px-4 pb-1 pt-3 font-mono text-[11px] uppercase tracking-widest text-text-muted">
        Source Control
      </h2>

      {/* Branch atual (dado real do repo) */}
      <div className="shrink-0 px-4 pb-2">
        <button
          type="button"
          onClick={() => openFile('welcome')}
          className="flex w-full items-center gap-2 rounded border border-border bg-bg-hover px-2 py-1.5 text-left font-mono text-xs text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary"
          title="Branch atual do repositório"
        >
          <Icon name="gitBranch" className="h-3.5 w-3.5 shrink-0 text-accent" />
          <span className="min-w-0 flex-1 truncate">{currentBranch}</span>
        </button>
      </div>

      {/* Lista de commits (mais recentes primeiro) */}
      <nav aria-label="Commits do repositório" className="min-h-0 flex-1 overflow-y-auto pb-4">
        <h3 className="px-4 py-1 font-mono text-[10px] uppercase tracking-widest text-text-muted">
          Commits ({commits.length})
        </h3>
        <ul className="m-0 list-none p-0">
          {commits.map((commit) => (
            <li
              key={commit.id}
              className="flex items-start gap-2 px-4 py-2 transition-colors hover:bg-bg-hover"
            >
              {/* Dot da timeline */}
              <span
                aria-hidden="true"
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full border border-accent bg-bg-editor"
              />
              <div className="min-w-0 flex-1">
                <p className="break-words text-xs leading-snug text-text-secondary">
                  {commit.message}
                </p>
                <p className="mt-0.5 font-mono text-[10px] text-text-muted">
                  {commit.id.slice(0, 7)}
                  <span aria-hidden="true" className="mx-1 text-text-disabled">·</span>
                  {formatDate(commit.date)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

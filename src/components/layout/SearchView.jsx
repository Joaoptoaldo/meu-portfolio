/**
 * SearchView — view "Busca" da sidebar (Ctrl+Shift+F).
 *
 * Usa o índice real de conteúdo (src/data/searchIndex.js), derivado dos
 * mesmos dados que alimentam o portfólio. Cada resultado abre a seção
 * correspondente no editor ao ser clicado.
 */
import { useMemo, useRef, useState } from 'react'
import { useWorkspace } from '../../hooks/useWorkspace'
import { searchContent } from '../../data/searchIndex'
import Icon from '../ui/Icon'

export default function SearchView() {
  const { openSearchResult } = useWorkspace()
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  const results = useMemo(
    () => (query.trim() ? searchContent(query) : []),
    [query],
  )

  // Agrupa por arquivo para a apresentação (sem recalcular a busca).
  const grouped = useMemo(() => {
    const map = new Map()
    for (const r of results) {
      if (!map.has(r.fileId)) map.set(r.fileId, { label: r.label, hits: [] })
      map.get(r.fileId).hits.push(r)
    }
    return [...map.entries()]
  }, [results])

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Cabeçalho */}
      <h2 className="shrink-0 px-4 pb-1 pt-3 font-mono text-[11px] uppercase tracking-widest text-text-muted">
        Busca
      </h2>

      {/* Input de busca */}
      <div className="shrink-0 px-4 pb-2">
        <div className="flex items-center gap-2 rounded border border-border bg-bg-hover px-2 focus-within:border-border-strong">
          <Icon name="search" className="h-3.5 w-3.5 shrink-0 text-text-muted" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar no portfólio…"
            aria-label="Buscar conteúdo do portfólio"
            className="min-w-0 flex-1 bg-transparent py-1.5 font-mono text-xs text-text-primary placeholder:text-text-muted focus:outline-none"
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>

      {/* Resultados (agrupados por arquivo) */}
      <nav
        aria-label="Resultados da busca"
        className="min-h-0 flex-1 overflow-y-auto pb-4"
      >
        {query.trim() && grouped.length === 0 && (
          <p className="px-4 py-3 font-mono text-xs text-text-muted">
            Nenhum resultado para “{query.trim()}”
          </p>
        )}
        {!query.trim() && (
          <p className="px-4 py-3 font-mono text-xs text-text-muted">
            Digite para buscar no conteúdo do portfólio.
          </p>
        )}
        {grouped.map(([fileId, group]) => (
          <div key={fileId} className="mb-3">
            <h3 className="flex items-center gap-1.5 px-4 py-1 font-mono text-[11px] text-text-secondary">
              <Icon name="files" className="h-3 w-3 text-text-muted" />
              <span className="min-w-0 flex-1 truncate">{group.label}</span>
              <span className="shrink-0 font-mono text-[10px] text-text-muted">
                {group.hits.length}
              </span>
            </h3>
            <ul className="m-0 list-none p-0">
              {group.hits.map((hit, i) => (
                <li key={`${fileId}-${i}`}>
                  <button
                    type="button"
                    onClick={() => openSearchResult(hit.fileId)}
                    className="w-full px-4 py-1.5 text-left transition-colors hover:bg-bg-hover"
                  >
                    <p className="truncate text-xs leading-snug text-text-secondary">
                      <span className="text-text-muted">{hit.snippet.slice(0, hit.start)}</span>
                      <mark className="rounded-[2px] bg-bg-tag px-0.5 text-accent-bright">
                        {hit.snippet.slice(hit.start, hit.start + query.trim().length)}
                      </mark>
                      <span className="text-text-muted">
                        {hit.snippet.slice(hit.start + query.trim().length)}
                      </span>
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] text-text-muted">
                      linha {i + 1}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  )
}

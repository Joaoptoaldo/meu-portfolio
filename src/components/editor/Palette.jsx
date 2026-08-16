/**
 * Palette — overlay estilo Quick Open / Command Palette do VS Code.
 *
 * - Input de busca + lista de resultados;
 * - busca fuzzy (subsequência com pontuação) via utils/fuzzy.js;
 * - navegação por setas ↑/↓, Enter seleciona, Esc fecha;
 * - foco no input ao abrir, placeholder e aria por acessibilidade.
 *
 * Uso: <Palette placeholder="..." items={[{key,label,detail},...]}
 *        onSelect={(item)=>...} onClose={()=>...} />
 */
import { useEffect, useMemo, useRef, useState } from 'react'
import { fuzzySearch } from '../../utils/fuzzy'

export default function Palette({ placeholder, items, onSelect, onClose }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  // Foco no input ao abrir.
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Busca fuzzy no label (e detail, para casar "hab json" → "habilidades.json").
  const filtered = useMemo(() => {
    if (!query.trim()) return items
    return fuzzySearch(items, query, (it) => `${it.label} ${it.detail ?? ''}`)
  }, [query, items])

  // Manter o índice ativo dentro dos limites ao filtrar.
  useEffect(() => {
    setActive(0)
    listRef.current?.querySelector('[data-palette-row]')?.focus()
  }, [filtered.length])

  function onKeyDown(e) {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, filtered.length - 1))
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      const item = filtered[active]
      if (item) onSelect(item)
    }
  }

  return (
    <div
      role="dialog"
      aria-label={placeholder}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-[12vh]"
      onKeyDown={onKeyDown}
    >
      <div className="mx-auto max-w-xl overflow-hidden rounded-md border border-border-strong bg-bg-title shadow-2xl">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="w-full border-b border-border bg-bg-title px-4 py-3 font-mono text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
        />
        <ul
          ref={listRef}
          role="listbox"
          aria-label={`Resultados de ${placeholder}`}
          className="max-h-72 overflow-y-auto py-1"
        >
          {filtered.map((item, i) => (
            <li key={item.key} role="option" aria-selected={i === active}>
              <button
                data-palette-row
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => onSelect(item)}
                className={`flex w-full items-center gap-2 px-4 py-2 text-left font-mono text-sm transition-colors ${
                  i === active
                    ? 'bg-bg-active text-text-primary'
                    : 'text-text-secondary hover:bg-bg-hover'
                }`}
              >
                <span className="shrink-0 text-text-muted" aria-hidden="true">
                  {item.icon ?? '›'}
                </span>
                <span className="min-w-0 flex-1 truncate">{item.label}</span>
                {item.detail && (
                  <span className="shrink-0 truncate text-[11px] text-text-muted">
                    {item.detail}
                  </span>
                )}
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-4 py-3 text-sm text-text-muted">
              Nenhum resultado encontrado
            </li>
          )}
        </ul>
      </div>
      {/* Backdrop para fechar clicando fora */}
      <button
        type="button"
        tabIndex={-1}
        aria-label="Fechar"
        onClick={onClose}
        className="fixed inset-0 -z-10 cursor-default bg-black/40"
      />
    </div>
  )
}
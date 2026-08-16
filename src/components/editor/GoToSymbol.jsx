/**
 * GoToSymbol (Ctrl/Cmd+Shift+O) — navega para um símbolo do arquivo ativo.
 * Os símbolos vêm de data/symbols.js (perfis reais por seção) e cada item
 * rola até o nó correspondente na DOM da seção renderizada.
 */
import { useEffect, useMemo, useRef, useState } from 'react'
import { useWorkspace } from '../../hooks/useWorkspace'
import { fuzzySearch } from '../../utils/fuzzy'

export default function GoToSymbol() {
  const { goToSymbol, toggleGoToSymbol, activeId, showOutline } = useWorkspace()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [items, setItems] = useState([])
  const inputRef = useRef(null)

  useEffect(() => {
    if (!goToSymbol || !activeId) return
    inputRef.current?.focus()
    showOutline(activeId).then((result) => setItems(result ?? []))
  }, [goToSymbol, activeId, showOutline])

  useEffect(() => {
    setQuery('')
    setActive(0)
  }, [activeId])

  const filtered = useMemo(
    () => (query.trim() ? fuzzySearch(items, query, (s) => s.label) : items),
    [items, query],
  )

  if (!goToSymbol) return null

  function select(item) {
    const el = document.querySelector(item.selector)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    toggleGoToSymbol()
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') {
      e.preventDefault()
      toggleGoToSymbol()
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
      if (item) select(item)
    }
  }

  const TYPE_ICON = {
    function: 'ƒ',
    variable: '•',
    class: '◇',
    namespace: '{}',
  }

  return (
    <div
      role="dialog"
      aria-label="Ir para o símbolo"
      className="fixed inset-x-0 top-0 z-50 px-4 pt-[12vh]"
      onKeyDown={onKeyDown}
    >
      <div className="mx-auto max-w-xl overflow-hidden rounded-md border border-border-strong bg-bg-title shadow-2xl">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ir para o símbolo…"
          aria-label="Buscar símbolo do arquivo"
          className="w-full border-b border-border bg-bg-title px-4 py-3 font-mono text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
        />
        <ul
          role="listbox"
          aria-label="Símbolos do arquivo ativo"
          className="max-h-72 overflow-y-auto py-1"
        >
          {filtered.map((item, i) => (
            <li key={item.id} role="option" aria-selected={i === active}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => select(item)}
                className={`flex w-full items-center gap-2 px-4 py-2 text-left font-mono text-sm transition-colors ${
                  i === active
                    ? 'bg-bg-active text-text-primary'
                    : 'text-text-secondary hover:bg-bg-hover'
                }`}
              >
                <span className="w-8 shrink-0 text-text-muted" aria-hidden="true">
                  {TYPE_ICON[item.type] ?? '›'}
                </span>
                <span className="min-w-0 flex-1 truncate">{item.label}</span>
                <span className="shrink-0 text-[11px] text-text-muted">{item.type}</span>
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-4 py-3 text-sm text-text-muted">
              Nenhum símbolo encontrado
            </li>
          )}
        </ul>
      </div>
      <button
        type="button"
        tabIndex={-1}
        aria-label="Fechar"
        onClick={toggleGoToSymbol}
        className="fixed inset-0 -z-10 cursor-default bg-black/40"
      />
    </div>
  )
}

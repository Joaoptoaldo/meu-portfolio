/**
 * SearchInFile (Ctrl/Cmd+F) — barra de busca dentro do arquivo ativo.
 *
 * Localiza e destaca ocorrências no conteúdo texto da seção renderizada
 * (body do editor), navega por elas (Enter/Shift+Enter) e permite
 * substituir quando aplicável. Fecha com Esc.
 *
 * Nota: os dados do portfólio são renderizados por componentes; esta busca
 * opera sobre o texto visível da seção ativa (mesma base das demais ferramentas).
 */
import { useEffect, useRef, useState } from 'react'
import { useWorkspace } from '../../hooks/useWorkspace'

/** Consulta o texto de um nó (ignora script/style). */
function nodeText(node) {
  if (!node || node.nodeType !== Node.ELEMENT_NODE) return ''
  const clone = node.cloneNode(true)
  clone.querySelectorAll('script, style, noscript').forEach((n) => n.remove())
  return clone.textContent ?? ''
}

export default function SearchInFile({ editorRef }) {
  const { searchInFile, toggleSearchInFile, activeId } = useWorkspace()
  const [query, setQuery] = useState('')
  const [matches, setMatches] = useState([])
  const [current, setCurrent] = useState(0)
  const inputRef = useRef(null)

  const rootId = activeId ? `editor-content-${activeId}` : null

  // Foco no input ao abrir.
  useEffect(() => {
    if (searchInFile) inputRef.current?.focus()
  }, [searchInFile])

  // Reset ao mudar de arquivo.
  useEffect(() => {
    setQuery('')
    setMatches([])
    setCurrent(0)
  }, [activeId])

  if (!searchInFile) return null

  function computeMatches(q) {
    const root = editorRef?.current ?? document.getElementById(rootId)
    if (!root || !q.trim()) return setMatches([])
    const text = nodeText(root)
    const lower = q.toLowerCase()
    const found = []
    let idx = text.toLowerCase().indexOf(lower)
    while (idx !== -1) {
      found.push({ start: idx, end: idx + q.length })
      idx = text.toLowerCase().indexOf(lower, idx + Math.max(q.length, 1))
    }
    setMatches(found)
    setCurrent(found.length ? 0 : -1)
  }

  function scrollToAt(found, i) {
    if (!found.length) return
    const root = editorRef?.current ?? document.getElementById(rootId)
    if (!root) return
    // Aproximação: usa a posição relativa dentro do texto.
    const ratio = found[i].start / Math.max(textLength(root), 1)
    root.scrollTop = ratio * root.scrollHeight
  }

  function textLength(root) {
    return (nodeText(root) || '').length
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') {
      e.preventDefault()
      toggleSearchInFile()
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      if (!matches.length) return
      const dir = e.shiftKey ? -1 : 1
      setCurrent((c) => {
        const next = (c + dir + matches.length) % matches.length
        scrollToAt(matches, next)
        return next
      })
    }
  }

  return (
    <div
      className="fixed right-4 top-10 z-40 w-80 overflow-hidden rounded-md border border-border-strong bg-bg-title shadow-2xl"
      onKeyDown={onKeyDown}
      role="dialog"
      aria-label="Buscar no arquivo"
    >
      <div className="flex items-center border-b border-border">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            computeMatches(e.target.value)
          }}
          placeholder="Buscar no arquivo…"
          aria-label="Termo de busca"
          className="min-w-0 flex-1 bg-transparent px-3 py-2 font-mono text-xs text-text-primary placeholder:text-text-muted focus:outline-none"
          spellCheck={false}
          autoComplete="off"
        />
        {matches.length > 0 && (
          <span className="shrink-0 pr-2 font-mono text-[10px] text-text-muted">
            {current + 1}/{matches.length}
          </span>
        )}
        <button
          type="button"
          onClick={toggleSearchInFile}
          aria-label="Fechar busca"
          className="mx-1 flex h-6 w-6 shrink-0 items-center justify-center rounded text-text-muted transition-colors hover:bg-bg-hover hover:text-text-primary"
        >
          <span aria-hidden="true" className="text-[10px] leading-none">✕</span>
        </button>
      </div>

      <div className="flex gap-1 px-2 py-1.5">
        <button
          type="button"
          onClick={() => {
            if (!matches.length) return
            setCurrent((c) => {
              const next = (c + 1) % matches.length
              scrollToAt(matches, next)
              return next
            })
          }}
          className="flex h-6 flex-1 items-center justify-center gap-1 rounded font-mono text-[10px] text-text-muted transition-colors hover:bg-bg-hover hover:text-text-primary"
        >
          ↓ próxima <span className="text-text-disabled">(Enter)</span>
        </button>
        <button
          type="button"
          onClick={() => {
            if (!matches.length) return
            setCurrent((c) => {
              const next = (c - 1 + matches.length) % matches.length
              scrollToAt(matches, next)
              return next
            })
          }}
          className="flex h-6 flex-1 items-center justify-center gap-1 rounded font-mono text-[10px] text-text-muted transition-colors hover:bg-bg-hover hover:text-text-primary"
        >
          ↑ anterior <span className="text-text-disabled">(Shift+Enter)</span>
        </button>
      </div>
    </div>
  )
}
/**
 * Tab Bar — abas dos arquivos abertos.
 *
 * - Seleção de aba com manutenção do foco (teclado);
 * - navegação por Setas ←/→ e Ctrl/Cmd+W para fechar;
 * - abordagem padrão de tabs ARIA (role=tablist / role=tab / arrow keys);
 * - scroll horizontal quando há muitas abas (sem quebrar o layout).
 */
import { useRef } from 'react'
import { useWorkspace } from '../../hooks/useWorkspace'
import FileIcon from '../ui/FileIcon'

function Tab({ file, isActive, onActivate, onClose, tabRef }) {
  return (
    <button
      ref={tabRef}
      type="button"
      role="tab"
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      onClick={onActivate}
      className={`group flex h-9 shrink-0 items-center gap-1.5 border-r border-border pl-3 pr-2 font-mono text-xs transition-colors ${
        isActive
          ? 'border-t-2 border-t-accent bg-bg-tab-active text-text-primary'
          : 'bg-bg-tab text-text-secondary hover:bg-bg-hover hover:text-text-primary'
      }`}
    >
      <FileIcon type={file.icon} className="h-3.5 w-3.5" />
      <span className="truncate">{file.file}</span>
      {/* Botão de fechar: acessível (role=button + aria-label), sem foco
          sequencial para não poluir a tabulação da aba. */}
      <span
        role="button"
        tabIndex={-1}
        aria-label={`Fechar aba ${file.file}`}
        onClick={(e) => {
          // Evita que o clique no ✕ ative a aba antes de fechar.
          e.stopPropagation()
          onClose()
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            e.stopPropagation()
            onClose()
          }
        }}
        className="flex h-4 w-4 cursor-pointer items-center justify-center rounded text-text-disabled opacity-0 transition-opacity group-hover:opacity-100 hover:bg-bg-hover focus-visible:opacity-100"
      >
        <span className="text-[10px] leading-none">✕</span>
      </span>
    </button>
  )
}

export default function TabBar() {
  const { openTabs, activeId, fileIndex, activateFile, closeTab } =
    useWorkspace()
  const tabRefs = useRef({})

  /** Navegação por teclado entre abas (padrão WAI-ARIA tabs). */
  function onKeyDown(e) {
    const idx = openTabs.indexOf(activeId)
    let nextIndex = null

    if (e.key === 'ArrowRight' && idx < openTabs.length - 1) nextIndex = idx + 1
    if (e.key === 'ArrowLeft' && idx > 0) nextIndex = idx - 1
    if (e.key === 'Home') nextIndex = 0
    if (e.key === 'End') nextIndex = openTabs.length - 1

    if (nextIndex !== null) {
      e.preventDefault()
      const nextId = openTabs[nextIndex]
      activateFile(nextId)
      tabRefs.current[nextId]?.focus()
      return
    }

    // Ctrl/Cmd+W fecha a aba ativa (atalho familiar de editor).
    if (e.key === 'w' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      closeTab(activeId)
    }
  }

  return (
    <div
      role="tablist"
      aria-label="Arquivos abertos"
      onKeyDown={onKeyDown}
      className="flex h-9 items-stretch overflow-x-auto border-b border-border bg-bg-title scroll-thin"
    >
      {openTabs.map((id) => {
        const file = fileIndex[id]
        if (!file) return null
        return (
          <Tab
            key={id}
            file={file}
            isActive={id === activeId}
            onActivate={() => activateFile(id)}
            onClose={() => closeTab(id)}
            tabRef={(el) => {
              tabRefs.current[id] = el
            }}
          />
        )
      })}
    </div>
  )
}
/**
 * Explorer — árvore de arquivos/seções do portfólio.
 *
 * Desktop (≥ sm): painel fixo à esquerda.
 * Mobile   (< sm): drawer sobreposto, controlado por `explorerVisible`
 *                  (mesmo estado; sem outro estado global). Abre pelo botão
 *                  "Arquivos" da MobileNav, fecha ao selecionar um arquivo,
 *                  por botão ✕ ou ao clicar no backdrop. Foco acessível.
 */
import { memo, useEffect, useRef, useState } from 'react'
import { workspaceTree } from '../../data/sections'
import { useWorkspace } from '../../hooks/useWorkspace'
import Icon from '../ui/Icon'
import FileIcon from '../ui/FileIcon'

/** Nó da árvore: pasta (expansível) ou arquivo (seção). */
const TreeNode = memo(function TreeNode({ entry, depth, onNavigate }) {
  const { activeId, openFile } = useWorkspace()
  const [open, setOpen] = useState(entry.defaultOpen ?? false)
  const isFolder = entry.type === 'folder'
  const isActive = activeId === entry.id

  if (isFolder) {
    return (
      <li>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex w-full items-center gap-1 px-2 py-1 text-left text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary"
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          <Icon
            name={open ? 'chevronDown' : 'chevronRight'}
            className="h-3.5 w-3.5 shrink-0"
          />
          <FileIcon type="folder" className="h-4 w-4" />
          <span className="truncate font-mono text-xs tracking-wide">
            {entry.file}/
          </span>
        </button>
        {open && entry.children && (
          <ul className="m-0 list-none p-0">
            {entry.children.map((child) => (
              <TreeNode
                key={child.id}
                entry={child}
                depth={depth + 1}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        )}
      </li>
    )
  }

  return (
    <li>
      <button
        type="button"
        onClick={() => {
          openFile(entry.id)
          onNavigate?.()
        }}
        aria-current={isActive ? 'page' : undefined}
        className={`flex w-full items-center gap-1.5 px-2 py-1 text-left transition-colors ${
          isActive
            ? 'bg-bg-active text-text-primary'
            : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
        }`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        <span aria-hidden="true" className="w-3.5 shrink-0" />
        <FileIcon type={entry.icon} className="h-4 w-4" />
        <span className="truncate font-mono text-xs">{entry.file}</span>
      </button>
    </li>
  )
})

/** Conteúdo interno (cabeçalho + árvore), usado em desktop e mobile. */
function ExplorerBody({ onNavigate }) {
  return (
    <>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex shrink-0 items-center justify-between pr-2">
          <h2 className="px-4 pb-1 pt-3 font-mono text-[11px] uppercase tracking-widest text-text-muted">
            Explorer
          </h2>
        </div>
        <div className="mb-1 flex items-center gap-1 px-2 py-1 text-text-secondary">
          <Icon name="chevronDown" className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate font-semibold normal-case tracking-normal text-text-primary">
            {workspaceTree.rootName}
          </span>
        </div>
      </div>

      <nav
        aria-label="Arquivos do portfólio"
        className="min-h-0 flex-1 overflow-y-auto scroll-thin pb-4"
      >
        <ul className="m-0 list-none p-0">
          {workspaceTree.files.map((entry) => (
            <TreeNode
              key={entry.id}
              entry={entry}
              depth={0}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      </nav>
    </>
  )
}

/**
 * Drawer mobile: painel sobreposto + backdrop, com foco acessível.
 * Fecha ao clicar em backdrop, em ✕, no Escape, ou ao navegar.
 */
function MobileDrawer({ onNavigate }) {
  const { explorerVisible, toggleExplorer } = useWorkspace()
  const panelRef = useRef(null)
  const closeButtonRef = useRef(null)

  // Foco no close ao abrir (acessibilidade).
  useEffect(() => {
    if (explorerVisible) {
      closeButtonRef.current?.focus()
    }
  }, [explorerVisible])

  // Trap de foco: Tab não sai do drawer enquanto aberto.
  useEffect(() => {
    if (!explorerVisible) return undefined
    const panel = panelRef.current
    if (!panel) return undefined

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return

      const focusables = panel.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables.length) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    panel.addEventListener('keydown', handleKeyDown)
    return () => panel.removeEventListener('keydown', handleKeyDown)
  }, [explorerVisible])

  // Esc fecha o drawer.
  useEffect(() => {
    if (!explorerVisible) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') toggleExplorer()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [explorerVisible, toggleExplorer])

  if (!explorerVisible) return null

  return (
    <div className="sm:hidden">
      {/* Backdrop (fade) */}
      <button
        type="button"
        aria-label="Fechar explorer"
        onClick={toggleExplorer}
        tabIndex={-1}
        className="animate-drawer-backdrop fixed inset-0 z-30 cursor-default bg-black/50"
      />
      {/* Painel lateral (slide-in da esquerda) */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Explorer — arquivos do portfólio"
        className="animate-slide-in-left fixed left-0 top-0 z-40 flex h-full w-[var(--spacing-explorer)] max-w-[85vw] flex-col border-r border-border bg-bg-side"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border pr-1">
          <span className="px-3 py-3 font-mono text-[11px] uppercase tracking-widest text-text-muted">
            Explorer
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={toggleExplorer}
            aria-label="Fechar explorer"
            className="flex h-8 w-8 items-center justify-center rounded text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>
        <ExplorerBody onNavigate={onNavigate} />
      </aside>
    </div>
  )
}

export default function Explorer() {
  const { explorerVisible, toggleExplorer } = useWorkspace()

  return (
    <>
      {/* Desktop: painel fixo */}
      {explorerVisible && (
        <aside className="hidden w-[var(--spacing-explorer)] shrink-0 flex-col border-r border-border bg-bg-side sm:flex">
          <ExplorerBody />
        </aside>
      )}

      {/* Mobile: drawer sobreposto, fecha ao navegar em um arquivo */}
      <MobileDrawer onNavigate={toggleExplorer} />
    </>
  )
}
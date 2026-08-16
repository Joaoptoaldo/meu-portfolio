/**
 * Explorer — sidebar de arquivos do portfólio.
 *
 * É uma "view" entre três (Explorer/Search/SCM), controlada por
 * `explorerView` no contexto. Cada view tem seu próprio conteúdo;
 * o Explorer (view) mantém a árvore + OPEN EDITORS.
 *
 * Desktop (≥ sm): painel fixo à esquerda.
 * Mobile   (< sm): drawer sobreposto, controlado por `explorerVisible`
 *                  (mesmo estado; sem outro estado global). Abre pelo botão
 *                  "Arquivos" da MobileNav, fecha ao selecionar um arquivo,
 *                  por botão ✕ ou ao clicar no backdrop. Foco acessível.
 *
 * Clique direito em um arquivo abre um context menu com ações reais:
 * Abrir, Abrir em nova aba e Fechar.
 */
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { workspaceTree } from '../../data/sections'
import { useWorkspace } from '../../hooks/useWorkspace'
import Icon from '../ui/Icon'
import FileIcon from '../ui/FileIcon'
import SearchView from './SearchView'
import ScmView from './ScmView'

/** Context menu reutilizável, sobreposto, fecha em Esc/clique fora. */
function ContextMenu({ x, y, items, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onDocClick)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onDocClick)
    }
  }, [onClose])

  return (
    <div
      ref={ref}
      role="menu"
      aria-label="Ações do arquivo"
      className="fixed z-50 min-w-[160px] overflow-hidden rounded-md border border-border-strong bg-bg-title py-1 shadow-2xl"
      style={{ left: Math.min(x, window.innerWidth - 180), top: y }}
    >
      {items.map((item, i) => (
        <button
          key={i}
          type="button"
          role="menuitem"
          onClick={item.onClick}
          className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary"
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

/** Nó da árvore: pasta (expansível) ou arquivo (seção). */
const TreeNode = memo(function TreeNode({ entry, depth, onNavigate }) {
  const { activeId, openFile, openFileNewTab, closeTab, openTabs } =
    useWorkspace()
  const [open, setOpen] = useState(entry.defaultOpen ?? false)
  const [menu, setMenu] = useState(null)
  const isFolder = entry.type === 'folder'
  const isActive = activeId === entry.id
  const isOpen = openTabs.includes(entry.id)

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
          <FileIcon
            type={open ? 'folder-open' : 'folder'}
            className="h-4 w-4"
          />
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
          setMenu(null)
        }}
        onContextMenu={(e) => {
          e.preventDefault()
          setMenu({ x: e.clientX, y: e.clientY })
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

      {menu && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          onClose={() => setMenu(null)}
          items={[
            {
              label: 'Abrir',
              onClick: () => {
                openFile(entry.id)
                onNavigate?.()
                setMenu(null)
              },
            },
            {
              label: 'Abrir em nova aba',
              onClick: () => {
                openFileNewTab(entry.id)
                setMenu(null)
              },
            },
            ...(isOpen
              ? [
                  {
                    label: 'Fechar',
                    onClick: () => {
                      closeTab(entry.id)
                      setMenu(null)
                    },
                  },
                ]
              : []),
          ]}
        />
      )}
    </li>
  )
})

/** Lista "OPEN EDITORS": abas abertas no grupo ativo (dado real do estado). */
function OpenEditors() {
  const { openTabs, activeId, fileIndex, activateFile, closeTab } = useWorkspace()

  if (!openTabs.length) return null

  return (
    <>
      <div className="mt-2 flex items-center gap-1.5 px-4 pb-1 pt-1 font-mono text-[10px] uppercase tracking-widest text-text-muted">
        <Icon name="chevronDown" className="h-3 w-3 shrink-0" />
        <span className="truncate">Open Editors</span>
      </div>
      <ul className="m-0 list-none p-0">
        {openTabs.map((id) => {
          const file = fileIndex[id]
          if (!file) return null
          return (
            <li key={id}>
              <div
                className={`group flex w-full items-center gap-1.5 px-2 py-1 text-left transition-colors ${
                  id === activeId
                    ? 'bg-bg-active text-text-primary'
                    : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
                }`}
                style={{ paddingLeft: '20px' }}
              >
                <button
                  type="button"
                  onClick={() => activateFile(id)}
                  aria-current={id === activeId ? 'page' : undefined}
                  className="flex min-w-0 flex-1 items-center gap-1.5 text-left"
                >
                  <FileIcon type={file.icon} className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate font-mono text-xs">{file.file}</span>
                </button>
                <span
                  role="button"
                  tabIndex={-1}
                  aria-label={`Fechar aba ${file.file}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    closeTab(id)
                  }}
                  className="flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded text-text-disabled opacity-0 transition-opacity hover:bg-bg-hover group-hover:opacity-100"
                >
                  <span className="text-[10px] leading-none">✕</span>
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}

/** Conteúdo interno (cabeçalho + árvore + OPEN EDITORS), usado em desktop e mobile. */
function ExplorerBody({ onNavigate }) {
  const [rootOpen, setRootOpen] = useState(workspaceTree.rootOpen ?? true)

  return (
    <>
      <div className="flex shrink-0 items-center justify-between pr-2">
        <h2 className="px-4 pb-1 pt-3 font-mono text-[11px] uppercase tracking-widest text-text-muted">
          Explorer
        </h2>
      </div>

      {/* Open Editors (abas abertas) */}
      <OpenEditors />

      {/* Pasta raiz recolhível */}
      <button
        type="button"
        onClick={() => setRootOpen((o) => !o)}
        aria-expanded={rootOpen}
        className="flex w-full items-center gap-1 px-2 py-1 text-left text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary"
      >
        <Icon
          name={rootOpen ? 'chevronDown' : 'chevronRight'}
          className="h-3.5 w-3.5 shrink-0"
        />
        <FileIcon
          type={rootOpen ? 'folder-open' : 'folder'}
          className="h-4 w-4"
        />
        <span className="truncate font-mono text-xs tracking-wide">
          {workspaceTree.rootName}
        </span>
      </button>

      {rootOpen && (
        <nav
          aria-label="Arquivos do portfólio"
          className="min-h-0 flex-1 overflow-y-auto pb-4"
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
      )}
    </>
  )
}

/** Drawer mobile: painel sobreposto + backdrop, com foco acessível. */
function MobileDrawer({ onNavigate }) {
  const { explorerVisible, toggleExplorer, explorerView } = useWorkspace()
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

  const viewLabel =
    explorerView === 'search'
      ? 'Busca'
      : explorerView === 'scm'
        ? 'Source Control'
        : 'Explorer'

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
        aria-label={`${viewLabel} — arquivos do portfólio`}
        className="animate-slide-in-left fixed left-0 top-0 z-40 flex h-full w-[var(--spacing-explorer)] max-w-[85vw] flex-col border-r border-border bg-bg-side"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border pr-1">
          <span className="px-3 py-3 font-mono text-[11px] uppercase tracking-widest text-text-muted">
            {viewLabel}
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
        {explorerView === 'search' ? (
          <SearchView />
        ) : explorerView === 'scm' ? (
          <ScmView />
        ) : (
          <ExplorerBody onNavigate={onNavigate} />
        )}
      </aside>
    </div>
  )
}

export default function Explorer() {
  const { explorerVisible, toggleExplorer, explorerView, explorerWidth, setExplorerWidth } = useWorkspace()

  const width = typeof explorerWidth === 'number' && !Number.isNaN(explorerWidth) ? explorerWidth : 264

  const startResizing = useCallback(
    (e) => {
      e.preventDefault()
      const startX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX
      if (typeof startX !== 'number' || Number.isNaN(startX)) return
      const startWidth = width

      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'

      const onMove = (moveEvent) => {
        const currentX = moveEvent.touches && moveEvent.touches.length > 0
          ? moveEvent.touches[0].clientX
          : moveEvent.clientX
        if (typeof currentX !== 'number' || Number.isNaN(currentX)) return
        const deltaX = currentX - startX
        setExplorerWidth(startWidth + deltaX)
      }

      const onEnd = () => {
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseup', onEnd)
        window.removeEventListener('touchmove', onMove)
        window.removeEventListener('touchend', onEnd)
      }

      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseup', onEnd)
      window.addEventListener('touchmove', onMove)
      window.addEventListener('touchend', onEnd)
    },
    [width, setExplorerWidth],
  )

  return (
    <>
      {/* Desktop: painel com largura arrastável por mouse */}
      {explorerVisible && (
        <aside
          style={{ width: `${width}px` }}
          className="relative hidden shrink-0 flex-col border-r border-border bg-bg-side sm:flex"
        >
          {explorerView === 'search' ? (
            <SearchView />
          ) : explorerView === 'scm' ? (
            <ScmView />
          ) : (
            <ExplorerBody />
          )}

          {/* Divisória / Handle de redimensionamento (cursor col-resize) */}
          <div
            role="separator"
            aria-orientation="vertical"
            aria-label="Redimensionar largura do Explorer"
            onMouseDown={startResizing}
            onTouchStart={startResizing}
            onDoubleClick={() => setExplorerWidth(264)}
            className="group absolute -right-1.5 top-0 bottom-0 z-20 w-3 cursor-col-resize select-none"
          >
            <div className="mx-auto h-full w-0.5 bg-transparent transition-colors group-hover:bg-accent group-active:bg-accent" />
          </div>
        </aside>
      )}

      {/* Mobile: drawer sobreposto, fecha ao navegar em um arquivo */}
      <MobileDrawer onNavigate={toggleExplorer} />
    </>
  )
}

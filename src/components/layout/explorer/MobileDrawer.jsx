import { useEffect, useRef } from 'react'
import { useWorkspace } from '../../../hooks/useWorkspace'
import Icon from '../../ui/Icon'
import SearchView from '../SearchView'
import ScmView from '../ScmView'
import ExplorerBody from './ExplorerBody'

/** Drawer mobile: painel sobreposto + backdrop, com foco acessível. */
export default function MobileDrawer({ onNavigate }) {
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
    <div className="md:hidden">
      {/* Backdrop (fade) */}
      <button
        type="button"
        aria-label="Fechar explorer"
        onClick={toggleExplorer}
        tabIndex={-1}
        className="animate-drawer-backdrop fixed inset-0 z-30 cursor-default bg-black/50"
      />
      {/* Painel lateral (slide-in da esquerda) - maior em tablet */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${viewLabel} — arquivos do portfólio`}
        className="animate-slide-in-left fixed left-0 top-0 z-40 flex h-full w-[80vw] sm:w-[var(--spacing-explorer)] max-w-[320px] flex-col border-r border-border bg-bg-side"
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
            className="flex h-10 w-10 sm:h-8 sm:w-8 items-center justify-center rounded text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary"
          >
            <Icon name="close" className="h-5 w-5 sm:h-4 sm:w-4" />
          </button>
        </div>
        {explorerView === 'search' ? (
          <SearchView />
        ) : explorerView === 'scm' ? (
          <ScmView />
        ) : (
          <ExplorerBody onNavigate={onNavigate} />
        )}
      </div>
    </div>
  )
}
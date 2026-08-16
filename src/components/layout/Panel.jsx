import { useCallback } from 'react'
import { useWorkspace } from '../../hooks/useWorkspace'
import Terminal from './Terminal'

const VIEWS = [
  { id: 'problems', label: 'PROBLEMS' },
  { id: 'output', label: 'OUTPUT' },
  { id: 'terminal', label: 'TERMINAL' },
]

const OUTPUT_LINES = [
  'Portfólio carregado com sucesso.',
  'Workspace pronto — explore os arquivos.',
]

function Problems() {
  return (
    <div className="px-4 py-3 font-mono text-xs text-text-muted">
      Nenhum problema detectado.
    </div>
  )
}

function Output() {
  return (
    <ul className="px-4 py-3 font-mono text-xs text-text-secondary">
      {OUTPUT_LINES.map((line, i) => (
        <li key={i} className="leading-6">
          <span className="mr-2 text-text-muted">[{i === 0 ? 'info' : 'ok'}]</span>
          {line}
        </li>
      ))}
    </ul>
  )
}

const CONTENT = {
  problems: Problems,
  output: Output,
  terminal: Terminal,
}

export default function Panel() {
  const {
    panelOpen,
    panelView,
    panelHeight,
    setPanelHeight,
    togglePanel,
    selectPanelView,
  } = useWorkspace()

  const height = typeof panelHeight === 'number' && !Number.isNaN(panelHeight) ? panelHeight : 160

  const startResizing = useCallback(
    (e) => {
      e.preventDefault()
      const startY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY
      if (typeof startY !== 'number' || Number.isNaN(startY)) return
      const startHeight = height

      document.body.style.cursor = 'row-resize'
      document.body.style.userSelect = 'none'

      const onMove = (moveEvent) => {
        const currentY = moveEvent.touches && moveEvent.touches.length > 0
          ? moveEvent.touches[0].clientY
          : moveEvent.clientY
        if (typeof currentY !== 'number' || Number.isNaN(currentY)) return
        const deltaY = startY - currentY
        setPanelHeight(startHeight + deltaY)
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
    [height, setPanelHeight],
  )

  if (!panelOpen) return null

  const View = CONTENT[panelView] ?? Output

  return (
    <section
      aria-label="Painel inferior"
      style={{ height: `${height}px` }}
      className="relative flex shrink-0 flex-col border-t border-border bg-bg-editor"
    >
      {/* Handle de redimensionamento da altura (cursor row-resize) */}
      <div
        role="separator"
        aria-orientation="horizontal"
        aria-label="Redimensionar altura do Terminal"
        onMouseDown={startResizing}
        onTouchStart={startResizing}
        onDoubleClick={() => setPanelHeight(160)}
        className="group absolute -top-1.5 left-0 right-0 z-20 flex h-3 cursor-row-resize select-none"
      >
        <div className="my-auto h-0.5 w-full bg-transparent transition-colors group-hover:bg-accent group-active:bg-accent" />
      </div>

      <div
        role="tablist"
        aria-label="Visões do painel"
        className="flex shrink-0 items-center gap-1 border-b border-border bg-bg-title px-2"
      >
        {VIEWS.map((view) => (
          <button
            key={view.id}
            type="button"
            role="tab"
            aria-selected={panelView === view.id}
            onClick={() => selectPanelView(view.id)}
            className={`h-8 px-3 font-mono text-[11px] transition-colors ${
              panelView === view.id
                ? 'border-b-2 border-b-accent text-text-primary'
                : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            {view.label}
          </button>
        ))}
        <button
          type="button"
          onClick={togglePanel}
          aria-label="Fechar painel"
          className="ml-auto h-8 w-8 text-text-muted transition-colors hover:bg-bg-hover hover:text-text-primary"
        >
          ✕
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <View />
      </div>
    </section>
  )
}
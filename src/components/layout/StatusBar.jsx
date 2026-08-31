/**
 * Status Bar — barra inferior do workspace.
 *
 * Divide as informações em dois grupos:
 *  - Esquerda: estado da "conexão", workspace e branch (Git: main).
 *  - Direita: stack real + codificação + relógio ao vivo.
 *
 * `Git: main` é decorativo da metáfora de IDE (o site real não é um repo
 * com branch "main" rastreada na UI), e assim está claramente separado dos
 * dados reais (stack utilizada). Nenhuma informação profissional inventada.
 */
import { profile } from '../../data/profile'
import { useClock } from '../../hooks/useClock'
import { useWorkspace } from '../../hooks/useWorkspace'

export default function StatusBar() {
  const time = useClock()
  const { panelOpen, panelView, togglePanel, selectPanelView } = useWorkspace()

  function handleTerminalClick() {
    if (!panelOpen) {
      selectPanelView('terminal')
    } else if (panelView === 'terminal') {
      togglePanel()
    } else {
      selectPanelView('terminal')
    }
  }

  const terminalActive = panelOpen && panelView === 'terminal'

  return (
    <footer className="flex h-6 shrink-0 items-center overflow-hidden border-t border-border bg-bg-title font-mono text-[11px] text-text-secondary">
      <div className="flex min-w-0 items-center gap-1 pl-0">
        {/* Indicador ativo: é a identidade principal também no mobile */}
        <span className="ml-1 flex h-6 shrink-0 items-center gap-1.5 pr-1 text-success sm:ml-0 sm:w-[var(--spacing-activitybar)] sm:justify-center sm:pr-0">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-success" />
          <span className="truncate sm:hidden">{profile.firstName}.dev</span>
        </span>

        <span className="hidden items-center gap-1 truncate px-2 text-success sm:flex">
          <span aria-hidden="true">⬢</span> {profile.firstName}.dev
        </span>
        <span
          aria-hidden="true"
          className="hidden shrink-0 px-2 text-text-disabled sm:block"
        >
          ⎇
        </span>
        <span className="hidden shrink-0 px-2 sm:block">Git: main</span>

        {/* Botão Terminal — estética VS Code (simplificado em mobile) */}
        <button
          type="button"
          id="statusbar-terminal-toggle"
          onClick={handleTerminalClick}
          aria-label={terminalActive ? 'Fechar terminal' : 'Abrir terminal'}
          aria-pressed={terminalActive}
          title={terminalActive ? 'Fechar terminal (Ctrl+J)' : 'Abrir terminal (Ctrl+J)'}
          className={`ml-2 flex h-6 items-center gap-1 px-1.5 sm:px-2 transition-colors hover:bg-bg-hover ${
            terminalActive
              ? 'text-accent'
              : 'text-text-muted hover:text-text-secondary'
          }`}
        >
          <span aria-hidden="true" className="text-[10px] leading-none">&gt;_</span>
          <span className="hidden sm:inline">TERMINAL</span>
        </button>
      </div>

      <div className="ml-auto flex shrink-0 items-center">
        {/* Informações de stack ocultas em mobile para economizar espaço */}
        <span className="hidden px-2 md:block" title="Tecnologias do projeto">
          React
        </span>
        <span aria-hidden="true" className="hidden px-1 text-text-disabled md:block">
          ·
        </span>
        <span className="hidden px-2 lg:block" title="Linguagem principal">
          JavaScript
        </span>
        <span className="hidden px-2 lg:block" title="Estilização">
          Tailwind
        </span>
        <span aria-hidden="true" className="hidden px-1 text-text-disabled lg:block">
          ·
        </span>
        <span className="hidden sm:inline px-2" title="Codificação">
          UTF-8
        </span>
        <span className="px-1.5 sm:px-2 text-text-muted" aria-hidden="true">
          {time}
        </span>
      </div>
    </footer>
  )
}
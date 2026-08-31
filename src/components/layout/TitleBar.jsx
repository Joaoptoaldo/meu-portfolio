/**
 * Title Bar — barra superior do workspace.
 *
 * - Identidade do workspace (nome + extensão/resumo);
 * - nome da seção ativa (desktop);
 * - botões de janela (minimizar/maximizar/fechar) como elemento
 *   puramente decorativo da metáfora de IDE — sem funcionalidade falsa
 *   (aria-hidden; não são botões clicáveis reais).
 *
 * O seletor de seções para mobile entra na Etapa 16 (Responsividade).
 */
import { useState } from 'react'
import { useWorkspace } from '../../hooks/useWorkspace'
import Icon from '../ui/Icon'
import HelpOverlay from './HelpOverlay'

export default function TitleBar() {
  const {
    activeFile,
    toggleExplorer,
    explorerVisible,
    restoreLayout,
    panelOpen,
    panelView,
    togglePanel,
    selectPanelView,
  } = useWorkspace()
  const [helpOpen, setHelpOpen] = useState(false)

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
    <header className="relative flex h-9 shrink-0 items-center border-b border-border bg-bg-title">
      {/* Ação real "Arquivos" no mobile (abre o drawer); decorativo no desktop */}
      <div className="flex w-[var(--spacing-activitybar)] shrink-0 items-center justify-center">
        <button
          type="button"
          onClick={toggleExplorer}
          aria-label="Explorer (arquivos do portfólio)"
          aria-expanded={explorerVisible}
          className="flex h-9 w-full items-center justify-center text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary sm:hidden"
        >
          <Icon name="files" className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={restoreLayout}
          aria-label="Restaurar layout e mostrar Explorer"
          className="hidden h-9 w-full items-center justify-center font-mono text-[11px] font-semibold text-accent transition-colors hover:bg-bg-hover sm:flex"
          title="Restaurar layout"
        >
          ◈
        </button>
      </div>

      {/* Botões de Ação na Header (Esquerda) */}
      <div className="flex items-center gap-1">
         {/* Botão Terminal */}
        <button
          type="button"
          onClick={handleTerminalClick}
          aria-label={terminalActive ? 'Fechar terminal' : 'Abrir terminal'}
          aria-pressed={terminalActive}
          title={terminalActive ? 'Fechar terminal (Ctrl+J)' : 'Abrir terminal (Ctrl+J)'}
          className={`flex h-6 items-center gap-1.5 px-1.5 font-mono text-xs font-medium transition-colors hover:bg-bg-hover ${
            terminalActive
              ? 'text-accent'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <span>Terminal</span>
        </button>

        {/* Botão Ajuda */}
        <button
          type="button"
          onClick={() => setHelpOpen(true)}
          aria-label="Ajuda — como navegar no portfólio"
          aria-expanded={helpOpen}
          title="Ajuda — como navegar"
          className="ml-1 flex h-6 items-center gap-1 px-1.5 font-mono text-xs font-medium text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary"
        >
          <span>Ajuda</span>
        </button>

        {/* Botão Download CV */}
        <button
          type="button"
          onClick={() => {
            const link = document.createElement('a')
            link.href = '/cv/Profile.pdf'
            link.download = 'JoaoPedro_Curriculo.pdf'
            link.click()
          }}
          aria-label="Baixar currículo em PDF"
          title="Baixar currículo (PDF)"
          className="ml-1 flex h-6 items-center gap-1 px-1.5 font-mono text-xs font-medium text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary"
        >
          <Icon name="download" className="h-3.5 w-3.5" />
          <span>CV</span>
        </button>
      </div>

      {/* Identidade do workspace */}
      <div className="flex min-w-0 flex-1 items-center justify-center gap-2 px-3">
        <span
          aria-hidden="true"
          className="font-mono text-[13px] font-semibold text-accent"
        >
          {'</>'}
        </span>
        <span className="truncate font-mono text-xs text-text-secondary">
          joao-pedro.jsx
        </span>
        <span aria-hidden="true" className="text-text-disabled">
          ·
        </span>
        <span className="hidden truncate text-xs text-text-muted md:inline">
          {activeFile?.description ?? ''}
        </span>
      </div>

      {/* Botões de janela (decorativos) */}
      <div className="flex h-full shrink-0 items-center" aria-hidden="true">
        <span className="flex h-full w-11 items-center justify-center text-[11px] leading-none text-text-secondary">
          —
        </span>
        <span className="flex h-full w-11 items-center justify-center text-[11px] leading-none text-text-secondary">
          □
        </span>
        <span className="flex h-full w-12 items-center justify-center text-[12px] leading-none text-text-secondary transition-colors hover:bg-error hover:text-white">
          ✕
        </span>
      </div>

      {/* Painel "Como navegar" */}
      <HelpOverlay open={helpOpen} onClose={() => setHelpOpen(false)} />
    </header>
  )
}

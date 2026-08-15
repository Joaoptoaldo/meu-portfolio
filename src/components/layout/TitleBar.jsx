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
import { useWorkspace } from '../../hooks/useWorkspace'
import Icon from '../ui/Icon'

export default function TitleBar() {
  const { activeFile, toggleExplorer, explorerVisible } = useWorkspace()

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
        <span
          aria-hidden="true"
          className="hidden font-mono text-[11px] font-semibold text-accent sm:block"
          title="Workspace"
        >
          ◈
        </span>
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
    </header>
  )
}

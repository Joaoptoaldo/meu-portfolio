/**
 * Explorer — sidebar de arquivos do portfólio.
 *
 * É uma "view" entre três (Explorer/Search/SCM), controlada por
 * `explorerView` no contexto. Cada view tem seu próprio conteúdo;
 * o Explorer (view) mantém a árvore + OPEN EDITORS.
 *
 * Desktop (≥ md): painel fixo à esquerda com largura normal.
 * Tablet  (sm-md): painel fixo à esquerda com largura compacta.
 * Mobile   (< sm): drawer sobreposto, controlado por `explorerVisible`
 *                  (mesmo estado; sem outro estado global). Abre pelo botão
 *                  "Arquivos" da MobileNav, fecha ao selecionar um arquivo,
 *                  por botão ✕ ou ao clicar no backdrop. Foco acessível.
 *
 * Clique direito em um arquivo abre um context menu com ações reais:
 * Abrir, Abrir em nova aba e Fechar.
 */
import { useWorkspace } from '../../hooks/useWorkspace'
import { useResize } from '../../hooks/useResize'
import SearchView from './SearchView'
import ScmView from './ScmView'
import ExplorerBody from './explorer/ExplorerBody'
import MobileDrawer from './explorer/MobileDrawer'

export default function Explorer() {
  const { explorerVisible, toggleExplorer, explorerView, explorerWidth, setExplorerWidth } = useWorkspace()

  const width = typeof explorerWidth === 'number' && !Number.isNaN(explorerWidth) ? explorerWidth : 264
  const startResizing = useResize('horizontal', width, setExplorerWidth)

  return (
    <>
      {/* Desktop/Tablet: painel com largura arrastável por mouse */}
      {explorerVisible && (
        <aside
          aria-label="Explorer"
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
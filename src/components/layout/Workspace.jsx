/**
 * Estrutura principal do "workspace" (grid de painéis da IDE).
 *
 * Desktop (≥ sm):  TitleBar / (Sidebar + EditorGroups) / Panel / StatusBar
 * Mobile   (< sm): TitleBar / (Editor) / MobileNav — sidebar vira drawer.
 *
 * Inclui os overlays (Quick Open, Command Palette, Go to Symbol, Search in
 * File, Settings), o painel inferior, os toasts e o Zen Mode.
 */
import { useWorkspace } from '../../hooks/useWorkspace'
import useGlobalShortcuts from '../../hooks/useGlobalShortcuts'
import TitleBar from './TitleBar'
import ActivityBar from './ActivityBar'
import Explorer from './Explorer'
import MobileNav from './MobileNav'
import Editor from '../editor/Editor'
import Panel from './Panel'
import Toasts from './Toasts'
import SettingsOverlay from './SettingsOverlay'
import QuickOpen from '../editor/QuickOpen'
import CommandPalette from '../editor/CommandPalette'
import GoToSymbol from '../editor/GoToSymbol'
import SearchInFile from '../editor/SearchInFile'
import StatusBar from './StatusBar'

function EditorGroups() {
  const { groups, setActiveGroup, closeGroup, zen } = useWorkspace()

  return (
    <main className="flex min-h-0 min-w-0 flex-1 bg-bg-editor">
      {groups.map((group, i) => (
        <section
          key={group.id}
          role="group"
          aria-label={`Grupo de edição ${i + 1}`}
          onMouseDown={() => setActiveGroup(group.id)}
          className={`relative flex min-h-0 min-w-0 flex-1 flex-col ${
            i > 0 ? 'border-l border-border' : ''
          }`}
        >
          {groups.length > 1 && !zen && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                closeGroup(group.id)
              }}
              aria-label={`Fechar grupo de edição ${i + 1}`}
              className="absolute right-1 top-10 z-10 flex h-6 w-6 items-center justify-center rounded text-text-muted transition-colors hover:bg-bg-hover hover:text-text-primary"
            >
              <span aria-hidden="true" className="text-[10px]">✕</span>
            </button>
          )}
          <Editor groupId={group.id} column={i} />
        </section>
      ))}
    </main>
  )
}

export default function Workspace() {
  useGlobalShortcuts()
  const { zen, restoreLayout } = useWorkspace()

  return (
    <div className="flex h-full flex-col bg-bg-base">
      {!zen && <TitleBar />}

      {/* Overlays estilo VS Code */}
      <QuickOpen />
      <CommandPalette />
      <GoToSymbol />
      <SearchInFile />
      <SettingsOverlay />
      <Toasts />

      {/* Corpo */}
      <div className={`flex min-h-0 flex-1 ${zen ? 'fixed inset-0 z-[90] bg-bg-editor' : ''}`}>
        {!zen && <ActivityBar />}
        {!zen && <Explorer />}
        {zen ? (
          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <div className="flex h-8 shrink-0 items-center justify-between border-b border-border bg-bg-title px-4">
              <span className="font-mono text-[11px] text-text-muted">Zen Mode</span>
              <button
                type="button"
                onClick={restoreLayout}
                className="rounded px-2 py-1 font-mono text-[11px] text-accent transition-colors hover:bg-bg-hover hover:text-accent-bright"
              >
                Sair do Zen Mode
              </button>
            </div>
            <EditorGroups />
          </div>
        ) : (
          <EditorGroups />
        )}
      </div>

      {!zen && <Panel />}
      {!zen && <MobileNav />}
      {!zen && <StatusBar />}
    </div>
  )
}

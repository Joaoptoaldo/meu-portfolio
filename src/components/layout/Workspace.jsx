/**
 * Estrutura principal do "workspace" (grid de painéis da IDE).
 *
 * Desktop (≥ sm):  TitleBar / (ActivityBar + Explorer + Editor) / StatusBar
 * Mobile   (< sm): TitleBar / (Editor) / MobileNav — Explorer vira drawer.
 */
import TitleBar from './TitleBar'
import ActivityBar from './ActivityBar'
import Explorer from './Explorer'
import MobileNav from './MobileNav'
import Editor from '../editor/Editor'
import StatusBar from './StatusBar'

export default function Workspace() {
  return (
    <div className="flex h-full flex-col bg-bg-base">
      <TitleBar />

      {/* Corpo */}
      <div className="flex min-h-0 flex-1">
        <ActivityBar />
        <Explorer />
        <Editor />
      </div>

      {/* Mobile: navegação inferior; desktop mantém StatusBar no rodapé */}
      <MobileNav />
      <StatusBar />
    </div>
  )
}
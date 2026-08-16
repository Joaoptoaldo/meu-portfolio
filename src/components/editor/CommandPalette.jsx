/**
 * Command Palette (Ctrl/Cmd+Shift+P) — comandos reais do workspace.
 * Cada comando executa navegação/ação existente no contexto global.
 */
import { useWorkspace } from '../../hooks/useWorkspace'
import Palette from './Palette'

export default function CommandPalette() {
  const ws = useWorkspace()
  const {
    files,
    commandPalette,
    openFile,
    closeAllTabs,
    selectPanelView,
    toggleCommandPalette,
    toggleExplorerView,
    toggleSettings,
    toggleZen,
    toggleGoToSymbol,
    toggleSearchInFile,
    activeId,
    splitOpen,
    notify,
    showOutline,
  } = ws

  if (!commandPalette) return null

  const navigationItems = files.map((file) => ({
    key: `open:${file.id}`,
    label: `${file.description}: abrir`,
    detail: file.file,
    icon: '⌘',
  }))

  const actionItems = [
    { key: 'view:explorer', label: 'Explorer: mostrar arquivos', detail: 'Ctrl+Shift+E', icon: '⌘' },
    { key: 'view:search', label: 'Search: busca global', detail: 'Ctrl+Shift+F', icon: '⌘' },
    { key: 'view:scm', label: 'Source Control: commits', detail: 'Ctrl+Shift+G', icon: '⌘' },
    { key: 'open-terminal', label: 'Terminal: abrir painel', detail: 'Ctrl+J', icon: '⌘' },
    { key: 'go-symbol', label: 'Ir para símbolo no arquivo', detail: 'Ctrl+Shift+O', icon: '⌘' },
    { key: 'search-file', label: 'Buscar dentro do arquivo', detail: 'Ctrl+F', icon: '⌘' },
    { key: 'split-editor', label: 'Abrir editor ao lado', detail: 'Ctrl+\\', icon: '⌘' },
    { key: 'toggle-zen', label: 'Alternar Zen Mode', detail: 'Ctrl+K Z', icon: '⌘' },
    { key: 'settings', label: 'Configurações: abrir', detail: 'Ctrl+,', icon: '⌘' },
    { key: 'close-all', label: 'Fechar todas as abas do grupo', detail: '', icon: '⌘' },
  ]

  const items = [...navigationItems, ...actionItems]

  function run(item) {
    if (item.key.startsWith('open:')) {
      openFile(item.key.replace('open:', ''))
    } else if (item.key === 'view:explorer') {
      toggleExplorerView('explorer')
    } else if (item.key === 'view:search') {
      toggleExplorerView('search')
    } else if (item.key === 'view:scm') {
      toggleExplorerView('scm')
    } else if (item.key === 'open-terminal') {
      selectPanelView('terminal')
    } else if (item.key === 'go-symbol') {
      if (activeId) showOutline(activeId).then(() => toggleGoToSymbol())
    } else if (item.key === 'search-file') {
      toggleSearchInFile()
    } else if (item.key === 'split-editor') {
      if (activeId) splitOpen(activeId)
    } else if (item.key === 'toggle-zen') {
      toggleZen()
      notify('Zen Mode ativado/desativado', 'success')
    } else if (item.key === 'settings') {
      toggleSettings()
    } else if (item.key === 'close-all') {
      closeAllTabs()
    }
    toggleCommandPalette()
  }

  return (
    <Palette
      placeholder="Digite um comando…"
      items={items}
      onSelect={run}
      onClose={toggleCommandPalette}
    />
  )
}

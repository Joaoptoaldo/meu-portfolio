/**
 * Ações de navegação global do workspace — compartilhadas entre a
 * ActivityBar (desktop, vertical) e a MobileNav (mobile, bottom nav).
 *
 * `active`: predica recebido o estado do workspace -> booleano.
 * `run`   : ação executada sobre o workspace.
 * `group` : 'main'  (views da sidebar) ou 'bottom' (utilitários).
 * `mobile`: se deve aparecer na navegação inferior (mobile).
 */
export const activityActions = [
  {
    id: 'explorer',
    icon: 'files',
    label: 'Explorer (arquivos do portfólio)',
    group: 'main',
    mobile: true,
    mobileLabel: 'Arquivos',
    active: (state) => state.explorerView === 'explorer' && state.explorerVisible,
    run: (ws) => ws.toggleExplorerView('explorer'),
  },
  {
    id: 'search',
    icon: 'search',
    label: 'Busca global (Ctrl+Shift+F)',
    group: 'main',
    mobile: true,
    mobileLabel: 'Busca',
    active: (state) => state.explorerView === 'search' && state.explorerVisible,
    run: (ws) => ws.toggleExplorerView('search'),
  },
  {
    id: 'scm',
    icon: 'gitBranch',
    label: 'Source Control (Ctrl+Shift+G)',
    group: 'main',
    mobile: false,
    active: (state) => state.explorerView === 'scm' && state.explorerVisible,
    run: (ws) => ws.toggleExplorerView('scm'),
  },
  {
    id: 'zen',
    icon: 'zen',
    label: 'Zen Mode (Ctrl+K Z)',
    group: 'bottom',
    mobile: false,
    active: (state) => state.zen,
    run: (ws) => {
      ws.toggleZen()
      ws.notify('Zen Mode ativado/desativado', 'success')
    },
  },
  {
    id: 'bell',
    icon: 'bell',
    label: 'Notificações',
    group: 'bottom',
    mobile: false,
    active: () => false,
    run: (ws) => ws.notify('Você não possui notificações no momento.', 'info'),
  },
  {
    id: 'settings',
    icon: 'gear',
    label: 'Configurações (Ctrl+,)',
    group: 'bottom',
    mobile: false,
    active: (state) => state.settingsOpen,
    run: (ws) => ws.toggleSettings(),
  },
  {
    id: 'profile',
    icon: 'account',
    label: 'Contato e perfil',
    group: 'bottom',
    mobile: true,
    mobileLabel: 'Perfil',
    active: () => false,
    run: (ws) => ws.openFile('contato'),
  },
]

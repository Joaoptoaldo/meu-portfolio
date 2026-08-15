/**
 * Ações de navegação global do workspace — compartilhadas entre a
 * ActivityBar (desktop, vertical) e a MobileNav (mobile, bottom nav).
 *
 * `active`: predica recebido o estado do workspace -> booleano.
 * `run`   : ação executada sobre o workspace.
 */
export const activityActions = [
  {
    id: 'explorer',
    icon: 'files',
    label: 'Explorer (arquivos do portfólio)',
    active: (state) => state.explorerVisible,
    run: (ws) => ws.toggleExplorer(),
  },
  {
    id: 'profile',
    icon: 'account',
    label: 'Contato e perfil',
    active: () => false,
    run: (ws) => ws.openFile('contato'),
  },
]
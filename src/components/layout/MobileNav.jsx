/**
 * MobileNav — navegação inferior compacta (mobile, < sm).
 * Compartilha as mesmas ações reais da ActivityBar (sem duplicação);
 * apenas ações marcadas com `mobile: true` aparecem aqui.
 * Única exceção: no mobile o botão "Arquivos" abre o drawer e então
 * o clique alterna (fecha) através do mesmo estado.
 */
import { useWorkspace } from '../../hooks/useWorkspace'
import { activityActions } from '../../data/activity'
import Icon from '../ui/Icon'

function BottomItem({ action }) {
  const ws = useWorkspace()
  const isActive = action.active(ws)

  return (
    <button
      type="button"
      onClick={() => action.run(ws)}
      aria-label={action.label}
      aria-pressed={isActive}
      className="flex h-14 flex-1 flex-col items-center justify-center gap-0.5 text-text-secondary transition-colors duration-150 hover:bg-bg-hover hover:text-text-primary active:bg-bg-active"
    >
      <span
        className={`transition-colors duration-150 ${isActive ? 'text-accent' : ''}`}
      >
        <Icon name={action.icon} className="h-5 w-5" />
      </span>
      <span
        className={`text-[10px] font-medium uppercase tracking-wider transition-colors duration-150 ${
          isActive ? 'text-accent' : ''
        }`}
      >
        {action.mobileLabel ?? action.id}
      </span>
    </button>
  )
}

export default function MobileNav() {
  const mobileActions = activityActions.filter((a) => a.mobile)

  return (
    <nav
      aria-label="Navegação principal do portfólio"
      className="flex shrink-0 border-t border-border bg-bg-side sm:hidden"
    >
      {mobileActions.map((action) => (
        <BottomItem key={action.id} action={action} />
      ))}
    </nav>
  )
}

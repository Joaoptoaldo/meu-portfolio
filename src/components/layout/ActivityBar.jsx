/**
 * Activity Bar — barra vertical na extrema esquerda (desktop).
 *
 * Dois grupos:
 *  - main   : views da sidebar (Explorer, Busca, Source Control);
 *  - bottom : utilitários (Zen Mode, Notificações, Configurações, Perfil).
 *
 * Cada ação é uma ação real definida em data/activity.js.
 * No mobile, a navegação inferior é responsabilidade da `MobileNav`.
 */
import { useWorkspace } from '../../hooks/useWorkspace'
import { activityActions } from '../../data/activity'
import Icon from '../ui/Icon'

function ActionButton({ action }) {
  const ws = useWorkspace()
  const isActive = action.active(ws)

  return (
    <button
      type="button"
      onClick={() => action.run(ws)}
      aria-label={action.label}
      title={action.label}
      aria-pressed={isActive}
      className="relative flex h-12 w-full items-center justify-center text-text-secondary transition-colors duration-150 hover:text-text-primary"
    >
      <span
        aria-hidden="true"
        className={`absolute left-0 top-0 h-full w-0.5 rounded-r bg-accent transition-opacity duration-150 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <span
        className={`transition-colors duration-150 ${isActive ? 'text-accent' : ''}`}
      >
        <Icon name={action.icon} className="h-5 w-5" />
      </span>
    </button>
  )
}

export default function ActivityBar() {
  const main = activityActions.filter((a) => a.group === 'main')
  const bottom = activityActions.filter((a) => a.group === 'bottom')

  return (
    <nav
      aria-label="Navegação principal"
      className="hidden w-[var(--spacing-activitybar)] shrink-0 flex-col items-center border-r border-border bg-bg-side sm:flex"
    >
      <div className="flex w-full flex-col items-center pt-2">
        {main.map((action) => (
          <ActionButton key={action.id} action={action} />
        ))}
      </div>

      <div className="mt-auto flex w-full flex-col items-center pb-2">
        {bottom.map((action) => (
          <ActionButton key={action.id} action={action} />
        ))}
      </div>
    </nav>
  )
}

/**
 * Toasts — notificações transitórias no canto inferior direito.
 * O estado vive no WorkspaceProvider (notify/dismissToast).
 * Papéis WAI-ARIA: status (info/success) e alert (warning/error).
 */
import { useWorkspace } from '../../hooks/useWorkspace'
import Icon from '../ui/Icon'

const TYPE_UI = {
  info: { icon: 'account', bar: 'bg-accent' },
  success: { icon: 'react', bar: 'bg-success' },
  warning: { icon: 'bell', bar: 'bg-warning' },
  error: { icon: 'close', bar: 'bg-error' },
}

export default function Toasts() {
  const { toasts, dismissToast } = useWorkspace()

  if (!toasts.length) return null

  return (
    <div
      aria-live="polite"
      className="fixed bottom-8 right-4 z-[60] flex w-72 flex-col gap-2"
    >
      {toasts.map((toast) => {
        const ui = TYPE_UI[toast.type] ?? TYPE_UI.info
        return (
          <div
            key={toast.id}
            role={toast.type === 'warning' || toast.type === 'error' ? 'alert' : 'status'}
            className="animate-slide-up flex items-start gap-2 overflow-hidden rounded-md border border-border-strong bg-bg-title shadow-2xl"
          >
            <span aria-hidden="true" className={`w-0.5 shrink-0 self-stretch ${ui.bar}`} />
            <span aria-hidden="true" className="mt-3 shrink-0 text-accent">
              <Icon name={ui.icon} className="h-4 w-4" />
            </span>
            <p className="min-w-0 flex-1 py-2.5 pr-1 text-xs leading-snug text-text-secondary">
              {toast.message}
            </p>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              aria-label="Fechar notificação"
              className="mr-1 mt-2 flex h-6 w-6 shrink-0 items-center justify-center rounded text-text-muted transition-colors hover:bg-bg-hover hover:text-text-primary"
            >
              <span aria-hidden="true" className="text-[10px] leading-none">✕</span>
            </button>
          </div>
        )
      })}
    </div>
  )
}

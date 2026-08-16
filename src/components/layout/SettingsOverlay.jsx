/**
 * SettingsOverlay — configurações do workspace (Ctrl+,).
 *
 * Controles reais:
 *  - Tema claro/escuro (aplica as variáveis CSS no :root);
 *  - Acento (azul-elétrico padrão + alternativas).
 *
 * Tudo é persistido no localStorage (via WorkspaceProvider).
 */
import { useEffect, useRef } from 'react'
import { useWorkspace } from '../../hooks/useWorkspace'
import Icon from '../ui/Icon'

function Row({ label, hint, children }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-sm text-text-primary">{label}</p>
        {hint && <p className="mt-0.5 text-xs text-text-muted">{hint}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

export default function SettingsOverlay() {
  const ws = useWorkspace()
  const { settingsOpen, theme, accent, setTheme, setAccent, toggleSettings, ACCENTS, ACCENT_COLORS } = ws
  const dialogRef = useRef(null)

  // Foco no primeiro controle ao abrir; Esc fecha.
  useEffect(() => {
    if (!settingsOpen) return undefined
    dialogRef.current?.querySelector('[data-first]')?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') toggleSettings()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [settingsOpen, toggleSettings])

  if (!settingsOpen) return null

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Configurações do workspace"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="Fechar configurações"
        onClick={toggleSettings}
        className="fixed inset-0 cursor-default bg-black/40"
      />
      <div className="relative flex max-h-[80vh] w-full max-w-lg flex-col overflow-hidden rounded-md border border-border-strong bg-bg-title shadow-2xl">
        {/* Cabeçalho */}
        <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <Icon name="gear" className="h-4 w-4 text-text-muted" />
            <h2 className="font-mono text-xs uppercase tracking-widest text-text-primary">
              Configurações
            </h2>
          </div>
          <button
            type="button"
            onClick={toggleSettings}
            aria-label="Fechar"
            className="flex h-7 w-7 items-center justify-center rounded text-text-muted transition-colors hover:bg-bg-hover hover:text-text-primary"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="min-h-0 flex-1 overflow-y-auto px-4">
          <Row label="Tema" hint="Aparência do workspace.">
            <div role="group" aria-label="Tema" className="flex gap-1">
              {['dark', 'light'].map((t) => (
                <button
                  key={t}
                  data-first={t === 'dark' ? true : undefined}
                  type="button"
                  onClick={() => setTheme(t)}
                  aria-pressed={theme === t}
                  className={`rounded border px-3 py-1.5 font-mono text-xs transition-colors ${
                    theme === t
                      ? 'border-accent-border bg-bg-tag text-accent-bright'
                      : 'border-border text-text-secondary hover:bg-bg-hover'
                  }`}
                >
                  {t === 'dark' ? 'Dark' : 'Light'}
                </button>
              ))}
            </div>
          </Row>

          <div className="h-px bg-border" />

          <Row label="Acento" hint="Cor de destaque da interface.">
            <div role="group" aria-label="Cor de destaque" className="flex gap-1.5">
              {ACCENTS.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAccent(a)}
                  aria-label={`Acento ${a}`}
                  aria-pressed={accent === a}
                  title={a}
                  className={`h-6 w-6 rounded-full transition-transform ${
                    accent === a ? 'scale-110 ring-2 ring-bg-title ring-offset-2 ring-offset-bg-title' : ''
                  }`}
                  style={{ backgroundColor: ACCENT_COLORS[a] }}
                />
              ))}
            </div>
          </Row>
        </div>

        <div className="shrink-0 border-t border-border px-4 py-2 font-mono text-[11px] text-text-muted">
          As preferências são salvas automaticamente.
        </div>
      </div>
    </div>
  )
}

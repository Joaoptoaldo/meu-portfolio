/**
 * Welcome — tela de boas-vindas (estilo "nova janela de editor").
 *
 * Estrutura: saudação + nome + papel; resumo; blocos "Iniciar",
 * "Conectar" (links/placeholders) e "Recentes" (abas já abertas).
 */
import { useWorkspace } from '../../hooks/useWorkspace'
import { profile } from '../../data/profile'
import { welcomeStarter, welcomeConnect } from '../../data/welcome'

function StarterCard({ children }) {
  return (
    <div className="flex flex-col rounded-md border border-border bg-bg-side/60 p-3 transition-colors duration-200 hover:border-border-strong">
      {children}
    </div>
  )
}

export default function Welcome() {
  const { openFile, openTabs, fileIndex } = useWorkspace()

  // "Recentes" = as últimas abas abertas (as primeiras são as iniciais).
  const recent = openTabs.slice(-4).reverse()

  return (
    <div className="mx-auto flex min-w-0 w-full max-w-3xl flex-col gap-8 px-6 py-10">
      <section>
        <p className="mb-2 font-mono text-sm text-text-muted">{'>'}</p>
        <h1 className="text-3xl font-bold leading-tight text-text-primary">
          Olá, eu sou <span className="text-accent-bright">{profile.firstName}</span>
        </h1>
        <p className="mt-1 font-mono text-sm text-text-secondary">
          {profile.role} — {profile.formation}
        </p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-secondary">
          {profile.summary}
        </p>
      </section>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StarterCard>
          <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-text-muted">
            Iniciar
          </h2>
          <ul className="space-y-1">
            {welcomeStarter.map((item) => (
              <li key={item.section}>
                <button
                  type="button"
                  onClick={() => openFile(item.section)}
                  className="group flex w-full items-center justify-between rounded px-2 py-1 text-left text-sm text-accent transition-colors hover:bg-bg-hover"
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="text-text-disabled transition-transform duration-150 group-hover:translate-x-0.5"
                  >
                    ›
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </StarterCard>

        <StarterCard>
          <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-text-muted">
            Conectar
          </h2>
          <ul className="space-y-1">
            {welcomeConnect.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${item.label} (${item.value})`}
                  className="flex w-full items-center justify-between rounded px-2 py-1 text-left text-sm text-accent transition-colors hover:bg-bg-hover"
                >
                  <span className="min-w-0 flex-1 truncate">
                    {item.label}{' '}
                    <span className="text-text-muted">— {item.value}</span>
                  </span>
                  <span aria-hidden="true" className="shrink-0 pl-1 text-text-disabled">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </StarterCard>
      </div>

      <StarterCard>
        <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-text-muted">
          Recentes
        </h2>
        <ul className="space-y-1">
          {recent.map((id) => {
            const file = fileIndex[id]
            if (!file) return null
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => openFile(id)}
                  className="flex w-full items-center gap-2 rounded px-2 py-1 text-left font-mono text-sm text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary"
                >
                  <span aria-hidden="true" className="text-text-muted">📄</span>
                  {file.file}
                </button>
              </li>
            )
          })}
        </ul>
      </StarterCard>
    </div>
  )
}
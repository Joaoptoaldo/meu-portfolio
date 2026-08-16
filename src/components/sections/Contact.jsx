/**
 * Contato — canais de comunicação.
 * Cada canal exibe o valor (ou placeholder explícito) e abre o link externo.
 */
import { contact } from '../../data/contact'

export default function Contact() {
  return (
    <div className="mx-auto min-w-0 w-full max-w-5xl px-6 pt-6 pb-12 md:px-8 md:pt-8 md:pb-16">
      <header className="mb-6">
        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-text-muted">
          // contato.jsx
        </p>
        <h1 className="text-2xl font-bold text-text-primary">Contato</h1>
      </header>

      <p className="mb-6 max-w-2xl text-sm leading-relaxed text-text-secondary">
        {contact.intro}
      </p>

      <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2">
        {contact.channels.map((channel) => (
          <a
            key={channel.label}
            href={channel.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${channel.label}: ${channel.value}`}
            className="group flex flex-col justify-between gap-2 rounded-md border border-border bg-bg-side/60 p-5 transition-all duration-200 hover:border-border-strong hover:bg-bg-hover active:scale-[0.99]"
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
                {channel.label}
              </span>
              <span className="mt-1 block truncate font-mono text-sm text-accent transition-colors group-hover:text-accent-bright">
                {channel.value}
              </span>
              {channel.hint && (
                <span className="mt-1 block text-xs text-text-muted">{channel.hint}</span>
              )}
            </div>
            <span
              aria-hidden="true"
              className="mt-3 block text-xs text-text-disabled transition-transform group-hover:translate-x-0.5"
            >
              abrir ↗
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
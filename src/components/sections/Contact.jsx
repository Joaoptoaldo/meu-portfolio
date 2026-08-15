/**
 * Contato — canais de comunicação.
 * Cada canal exibe o valor (ou placeholder explícito) e abre o link externo.
 */
import { contact } from '../../data/contact'

export default function Contact() {
  return (
    <div className="mx-auto min-w-0 w-full max-w-3xl px-6 py-10">
      <header className="mb-8">
        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-text-muted">
          // contato.jsx
        </p>
        <h1 className="text-2xl font-bold text-text-primary">Contato</h1>
      </header>

      <p className="mb-6 max-w-xl text-sm leading-relaxed text-text-secondary">
        {contact.intro}
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {contact.channels.map((channel) => (
          <a
            key={channel.label}
            href={channel.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${channel.label}: ${channel.value}`}
            className="group flex flex-col gap-1 rounded-md border border-border bg-bg-side/60 p-4 transition-all duration-200 hover:border-border-strong hover:bg-bg-hover active:scale-[0.99]"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
              {channel.label}
            </span>
            {/* Placeholder ou valor */}
            <span className="truncate font-mono text-sm text-accent transition-colors group-hover:text-accent-bright">
              {channel.value}
            </span>
            {channel.hint && (
              <span className="text-xs text-text-muted">{channel.hint}</span>
            )}
            <span
              aria-hidden="true"
              className="mt-1 text-xs text-text-disabled transition-transform group-hover:translate-x-0.5"
            >
              abrir ↗
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
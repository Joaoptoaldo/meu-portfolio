/**
 * HelpOverlay — "Como navegar" (botão ? do TitleBar).
 *
 * Painel/modal com instruções simples para quem não conhece VS Code:
 * como abrir arquivos, usar abas, navegar pelas seções, usar o terminal
 * e os principais atalhos. Fecha com ✕, Escape ou clique fora.
 *
 * Conteúdo factual sobre a própria interface — nada inventado.
 */
import { useEffect, useRef } from 'react'
import Icon from '../ui/Icon'

/** Bloco de instrução: título + lista de itens. */
function HelpSection({ title, items }) {
  return (
    <section>
      <h3 className="mb-2 font-mono text-[11px] uppercase tracking-widest text-text-muted">
        {title}
      </h3>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary">
            <span aria-hidden="true" className="mt-0.5 shrink-0 text-accent">›</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

const SECTIONS = [
  {
    title: 'Explorer e arquivos',
    items: [
      'Clique em "Arquivos" (ícone de pasta) para abrir o painel com as seções do portfólio.',
      'Clique em um arquivo para abrir a seção correspondente no conteúdo.',
    ],
  },
  {
    title: 'Abas',
    items: [
      'Cada seção aberta vira uma aba no topo do conteúdo.',
      'Clique em uma aba para alternar entre as seções abertas.',
      'Clique no ✕ de uma aba para fechá-la.',
    ],
  },
  {
    title: 'Navegar pelas seções',
    items: [
      'Tudo começa na tela inicial: use "Iniciar" para ir direto a uma seção.',
      'Explore na ordem: Sobre, Habilidades, Experiência, Projetos, Formação e Contato.',
      'No celular, a barra de baixo reúne Arquivos, Busca e Perfil.',
    ],
  },
  {
    title: 'Terminal',
    items: [
      'O terminal fica na parte de baixo da tela.',
      'Digite "help" e pressione Enter para ver os comandos disponíveis.',
    ],
  },
  {
    title: 'Atalhos principais',
    items: [
      'Ctrl+J — abrir/fechar o terminal.',
      'Ctrl+P — ir para um arquivo/seção.',
      'Ctrl+Shift+P — comandos do workspace.',
      'Ctrl+F — buscar dentro da seção atual.',
    ],
  },
]

export default function HelpOverlay({ open, onClose }) {
  const dialogRef = useRef(null)

  // Foco no modal quando abre (para Esc funcionar mesmo sem interação).
  useEffect(() => {
    if (!open) return undefined
    dialogRef.current?.focus()

    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Como navegar neste portfólio"
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        // Fecha ao clicar no backdrop (fora do painel).
        if (e.target === e.currentTarget) onClose()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose()
      }}
    >
      {/* Backdrop (fecha ao clicar fora) */}
      <button
        type="button"
        tabIndex={-1}
        aria-label="Fechar ajuda"
        onClick={onClose}
        className="fixed inset-0 -z-10 cursor-default bg-black/40 animate-drawer-backdrop"
      />

      <div className="relative flex max-h-[80vh] w-full max-w-lg flex-col overflow-hidden rounded-md border border-border-strong bg-bg-title shadow-2xl">
        {/* Cabeçalho */}
        <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="font-mono text-sm font-semibold text-accent">?</span>
            <h2 className="font-mono text-xs uppercase tracking-widest text-text-primary">
              Como navegar
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar ajuda"
            className="flex h-7 w-7 items-center justify-center rounded text-text-muted transition-colors hover:bg-bg-hover hover:text-text-primary"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-4">
          {SECTIONS.map((section) => (
            <HelpSection key={section.title} {...section} />
          ))}
        </div>

        <div className="shrink-0 border-t border-border px-4 py-2 font-mono text-[11px] text-text-muted">
          Dica: o ✕ do painel Explorar e a barra de baixo também ajudam a se guiar.
        </div>
      </div>
    </div>
  )
}
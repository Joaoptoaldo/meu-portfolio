/**
 * FileIcon — ícone de arquivo estilo editor.
 *
 */

const PUBLIC_ICONS = {
  react: '/react-icon.svg',
  jsx: '/react-icon.svg',
  tsx: '/react-icon.svg',
  js: '/js-icon.svg',
  javascript: '/js-icon.svg',
  ts: '/ts-icon.svg',
  typescript: '/ts-icon.svg',
  python: '/py-icon.svg',
  py: '/py-icon.svg',
}

const SKILL_LOGOS = import.meta.glob('../../assets/icons/skill/*.svg', {
  query: '?url',
  import: 'default',
  eager: true,
})

const FILE_TO_SKILL = {
  java: 'Java',
  css: 'CSS',
  html: 'HTML',
}

/** Símbolos próprios (SVG inline) para tipos sem arquivo/ícone. */
const INLINE = {
  /** Duas chaves `{ }` — ícone de arquivo JSON amarelo. */
  json: (
    <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden="true">
      <g
        fill="none"
        stroke="#f9a825"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 4c-2 0-2 2-2 3.5S6 11 4.5 11v2c1.5 0 2 1 2 2.5S7 20 9 20" />
        <path d="M15 4c2 0 2 2 2 3.5s.5 3.5 2.5 3.5v2c-2 0-2.5 1-2.5 2.5s.5 3.5-2 3.5" />
      </g>
    </svg>
  ),
  folder: (
    <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden="true">
      <path
        fill="#546e7a"
        d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2z"
      />
    </svg>
  ),
  'folder-open': (
    <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden="true">
      <path
        fill="#546e7a"
        d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4v-2H4V8h16v8h2a2 2 0 0 1-2 2h-5.6L12 20h6a2 2 0 0 0 2-2v-2h-8l-4-10zM10 4l-2 4h14l-2-4h-10z"
      />
    </svg>
  ),
}

export default function FileIcon({ type, className = 'h-4 w-4' }) {
  const render = (node) => (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      role="img"
      aria-label={type}
    >
      {node}
    </span>
  )

  // 1º: Ícones de stack da pasta public/ (react-icon.svg, js-icon.svg, ts-icon.svg, py-icon.svg).
  const publicIconPath = PUBLIC_ICONS[type]
  if (publicIconPath) {
    return render(
      <img src={publicIconPath} alt="" aria-hidden="true" className="h-full w-full object-contain" />
    )
  }

  // 2º: Símbolo inline (json, pastas).
  const inline = INLINE[type]
  if (inline) return render(inline)

  // 3º: ícone do skill-icons (quando houver).
  const skillName = FILE_TO_SKILL[type]
  if (skillName) {
    const url = SKILL_LOGOS[`../../assets/icons/skill/${skillName}.svg`]
    if (url) {
      return render(
        <img src={url} alt="" aria-hidden="true" className="h-full w-full object-contain" />
      )
    }
  }

  // Fallback: /js-icon.svg da pasta public/
  return render(
    <img src="/js-icon.svg" alt="" aria-hidden="true" className="h-full w-full object-contain" />
  )
}
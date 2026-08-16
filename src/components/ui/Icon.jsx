/**
 * Ícones SVG inline próprio (sem bibliotecas).
 * Cada ícone é definido por nome; o componente injeta fill/stroke atuais.
 *
 * Uso: <Icon name="files" className="h-4 w-4" />
 * Cores por CSS (fill/stroke corrente) para respeitar temas e hover.
 */

const PATHS = {
  files: (
    <>
      <path d="M10 2.5 14.5 7v10.5h-11A1.5 1.5 0 0 1 2 16V4a1.5 1.5 0 0 1 1.5-1.5H10Z" />
      <path d="M10 2.5V6a1 1 0 0 0 1 1h3.5" />
      <path d="M17.5 11.5H19A1.5 1.5 0 0 1 20.5 13v7A1.5 1.5 0 0 1 19 21.5h-9A1.5 1.5 0 0 1 8.5 20v-1" />
    </>
  ),
  account: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c.8-3.2 3.8-5 7.5-5s6.7 1.8 7.5 5" />
    </>
  ),
  chevronRight: <path d="m9 6 6 6-6 6" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  folder: (
    <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h4l2 2h9A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Z" />
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
  react: (
    <>
      <circle cx="12" cy="12" r="2" />
      <path d="M12 3.5c4 1.5 6.8 4.5 8.5 8.5-1.7 4-4.5 7-8.5 8.5-4-1.5-6.8-4.5-8.5-8.5C5.2 8 8 5 12 3.5Z" />
      <path d="M5.2 6.5c.5 4.2 2.6 8 6.8 11M18.8 6.5c-.5 4.2-2.6 8-6.8 11" />
    </>
  ),
  json: (
    <>
      <path d="M9 7v4l-2 1 2 1v4" />
      <path d="M15 7v4l2 1-2 1v4" />
      <path d="M12 7.5c.8 0 1.5.5 1.5 1V9c0 .6.4 1 1 1h.5M12 16.5c.8 0 1.5-.5 1.5-1V15c0-.6.4-1 1-1h.5" />
    </>
  ),
  js: (
    <path d="M4 4h16v16H4V4Zm6 13.5a2.2 2.2 0 0 0 2.2-1.4l-1.2-.7a1 1 0 0 1-2 .2v1.1c.3.4.6.7 1 .8Zm4-1.1c.7-1.7-1.4-2.6-2.4-3-.5-.2-.5-.7-.3-1a1 1 0 0 1 1.5-.6l.9-1.1a2.3 2.3 0 0 0-3.2.5c-.7 1.5 1.3 2.4 2.4 2.9.3.1.5.3.4.6-.2.6-.8 1-1.3.8l-1 .8c.9 1.1 2.6.7 3-2.9Z" />
  ),
  java: (
    <>
      <path d="M13.2 3C9.3 4.7 5.6 9.6 4.8 12.8c1.6-2 3.7-3.2 5.9-3.8 1.2-.3 2.6-.4 3.5-.4-1.4-.9-2.7-1.4-3.4-3.1l1.8-.7c.8.6 1.8 2.2 2.6 3.4.8-.1.8.5 3.1.41L18 8.9C16.3 5.4 15 3.6 13.2 3Z" />
      <path d="M9 15c.9-.5 2-1 3.2-1.2-.7-.6-1-1.3-1.3-2.1-.3.8-1 2-2.9 3.3Z" />
      <path d="M16.9 3.1c.6 2.3.6 4.6-.4 6.9-1.3 2.8-3.4 4.4-3.4 2.6 0-1.6 1.5-3 2.4-5-.9 1.3-3 3-3.7 3 1.2-2 3.9-4.6 3.9-6.2l1.2-1.3Z" />
    </>
  ),
  /* View: busca (Search) */
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.5-4.5" />
    </>
  ),
  /* View: Source Control (Git) */
  gitBranch: (
    <>
      <circle cx="7" cy="5" r="2.5" />
      <circle cx="7" cy="19" r="2.5" />
      <circle cx="17" cy="7" r="2.5" />
      <path d="M7 7.5v9" />
      <path d="M17 9.5a8 8 0 0 1-8 8" />
    </>
  ),
  /* Notificações */
  bell: (
    <>
      <path d="M6 17h12" />
      <path d="M7 17a5 5 0 0 1 10 0" />
      <path d="M12 4v1.5" />
      <path d="M12 3.2a1.5 1.5 0 0 1 1.5 1.5" />
      <circle cx="12" cy="19.5" r="0.5" />
    </>
  ),
  /* Configurações (engrenagem) */
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  /* Zen Mode */
  zen: (
    <>
      <path d="M4 4h5" />
      <path d="M15 4h5" />
      <path d="M4 20h5" />
      <path d="M15 20h5" />
      <path d="M4 12h2M18 12h2" />
    </>
  ),
  /* Split editor (abrir ao lado) */
  split: (
    <>
      <path d="M4 4h16v16H4z" />
      <path d="M12 4v16" />
    </>
  ),
  arrowLeft: <path d="M15 6l-6 6 6 6" />,
  arrowRight: <path d="M9 6l6 6-6 6" />,
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v2.2M12 19.3v2.2M19.5 12h-2.2M6.7 12H4.5M17.7 6.3l-1.6 1.6M7.9 16.1l-1.6 1.6M17.7 17.7l-1.6-1.6M7.9 7.9 6.3 6.3" />
    </>
  ),
  list: (
    <>
      <path d="M9 6h12" />
      <path d="M9 12h12" />
      <path d="M9 18h12" />
      <path d="M4 6h.01M4 12h.01M4 18h.01" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M3 9h18" />
      <path d="M9 9v11" />
    </>
  ),
}

function Icon({ name, className = 'h-4 w-4', strokeWidth = 1.5, ...rest }) {
  const paths = PATHS[name]
  if (!paths) return null

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {paths}
    </svg>
  )
}

export default Icon

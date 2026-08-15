/**
 * Ícone de arquivo com cor por tipo de linguagem/arquivo.
 * Exibe um `Icon` com cor definida via classe Tailwind.
 */
import Icon from './Icon'

const COLOR = {
  react: 'text-[#61dafb]',
  json: 'text-[#e8c86a]',
  js: 'text-[#e8d44d]',
  java: 'text-[#f37b6e]',
  folder: 'text-accent-dim',
}

export default function FileIcon({ type, className = 'h-4 w-4' }) {
  return (
    <span
      className={`inline-flex shrink-0 ${COLOR[type] ?? 'text-text-secondary'}`}
      aria-hidden="true"
    >
      <Icon name={type} className={className} />
    </span>
  )
}

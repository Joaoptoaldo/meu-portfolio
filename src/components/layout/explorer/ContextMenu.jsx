import { useEffect, useRef } from 'react'

/** Context menu reutilizável, sobreposto, fecha em Esc/clique fora. */
export default function ContextMenu({ x, y, items, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onDocClick)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onDocClick)
    }
  }, [onClose])

  return (
    <div
      ref={ref}
      role="menu"
      aria-label="Ações do arquivo"
      className="fixed z-50 min-w-[160px] overflow-hidden rounded-md border border-border-strong bg-bg-title py-1 shadow-2xl"
      style={{ left: Math.min(x, window.innerWidth - 180), top: y }}
    >
      {items.map((item, i) => (
        <button
          key={i}
          type="button"
          role="menuitem"
          onClick={item.onClick}
          className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary"
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
import { useCallback, useRef } from 'react'

/**
 * Hook de redimensionamento por arrasto (drag-to-resize).
 *
 * - 'horizontal': largura cresce para a direita (handle à direita do painel)
 * - 'vertical':   altura cresce para cima (handle no topo do painel)
 *
 * Uso:
 *   const startResizing = useResize('horizontal', width, setExplorerWidth)
 *   <div onMouseDown={startResizing} onTouchStart={startResizing} />
 *
 * O valor atual é lido via ref, então o callback é estável e não precisa
 * ser recriado a cada mudança de tamanho durante o arrasto.
 */
export function useResize(axis, size, setSize) {
  const sizeRef = useRef(size)
  sizeRef.current = size

  const horizontal = axis === 'horizontal'

  return useCallback(
    (e) => {
      e.preventDefault()
      const touch = e.touches && e.touches.length > 0 ? e.touches[0] : null
      const startPos = horizontal
        ? touch
          ? touch.clientX
          : e.clientX
        : touch
          ? touch.clientY
          : e.clientY
      if (typeof startPos !== 'number' || Number.isNaN(startPos)) return

      const startSize = sizeRef.current
      // horizontal cresce para a direita (+), vertical para cima (-)
      const dir = horizontal ? 1 : -1

      document.body.style.cursor = horizontal ? 'col-resize' : 'row-resize'
      document.body.style.userSelect = 'none'

      const onMove = (moveEvent) => {
        const t =
          moveEvent.touches && moveEvent.touches.length > 0
            ? moveEvent.touches[0]
            : null
        const current = horizontal
          ? t
            ? t.clientX
            : moveEvent.clientX
          : t
            ? t.clientY
            : moveEvent.clientY
        if (typeof current !== 'number' || Number.isNaN(current)) return
        setSize(startSize + (current - startPos) * dir)
      }

      const onEnd = () => {
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseup', onEnd)
        window.removeEventListener('touchmove', onMove)
        window.removeEventListener('touchend', onEnd)
      }

      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseup', onEnd)
      window.addEventListener('touchmove', onMove)
      window.addEventListener('touchend', onEnd)
    },
    [horizontal, setSize],
  )
}

export default useResize
import { useEffect, useState } from 'react'

/**
 * Retorna a hora atual atualizada a cada minuto (formato HH:MM).
 * Usado na Status Bar como relógio ao vivo.
 */
export function useClock() {
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 30_000)
    return () => clearInterval(timer)
  }, [])

  const hours = String(time.getHours()).padStart(2, '0')
  const minutes = String(time.getMinutes()).padStart(2, '0')

  return `${hours}:${minutes}`
}
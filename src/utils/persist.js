/**
 * Persistência do estado do workspace em localStorage.
 *
 * Guarda apenas preferências/estado não-derivável do código (tema, acento,
 * abas, painel, views, zen, reordenação de tabs). Valores inválidos/corrompidos
 * são descartados silenciosamente no parse.
 */

const KEY = 'joao-pedro.workspace'

/** Serializa e grava o estado. */
export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* quota/privacidade: ignora silenciosamente */
  }
}

/** Lê e desserializa o estado; retorna `null` se ausente ou inválido. */
export function loadState() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

/** Remove o estado salvo. */
export function clearState() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
}
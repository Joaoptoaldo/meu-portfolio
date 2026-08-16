/**
 * Salva e carrega as configurações do usuário no localStorage.
 */

const KEY = 'joao-pedro.workspace'

// salva o estado
export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* quota/privacidade: ignora silenciosamente */
  }
}

// le o estado salvo
export function loadState() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

// limpa o estado
export function clearState() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
}
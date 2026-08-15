import { useMemo, useState } from 'react'
import {
  workspaceTree,
  flattenFiles,
  initialOpened,
  initialActive,
} from '../data/sections'
import { WorkspaceContext } from './WorkspaceContext'

/**
 * Provedor do estado global do "workspace":
 *  - qual arquivo/seção está ativo;
 *  - quais abas estão abertas;
 *  - ações de navegação (abrir, fechar, ativar).
 *
 * Apenas navegação vive aqui — conteúdo fica em src/data.
 */
export function WorkspaceProvider({ children }) {
  const [openTabs, setOpenTabs] = useState(initialOpened)
  const [activeId, setActiveId] = useState(initialActive)
  const [explorerVisible, setExplorerVisible] = useState(true)

  /** Registro plano (id -> entrada) para resolução rápida. */
  const fileIndex = useMemo(() => {
    const index = {}
    for (const entry of flattenFiles(workspaceTree)) {
      index[entry.id] = entry
    }
    return index
  }, [])

  /** Lista de arquivos abertáveis (achatada). */
  const files = useMemo(() => flattenFiles(workspaceTree), [])

  /** Abre um arquivo: adiciona à lista de abas (se ainda não estiver) e ativa. */
  function openFile(id) {
    const entry = fileIndex[id]
    if (!entry) return

    setOpenTabs((tabs) => (tabs.includes(id) ? tabs : [...tabs, id]))
    setActiveId(id)
  }

  /** Ativa um arquivo já aberto sem adicionar nova aba. */
  function activateFile(id) {
    if (fileIndex[id] && openTabs.includes(id)) setActiveId(id)
  }

  /** Fecha uma aba e redefine a ativa quando necessário. */
  function closeTab(id) {
    const closedAt = openTabs.indexOf(id)
    const next = openTabs.filter((t) => t !== id)
    const wasActive = activeId === id

    setOpenTabs(next)

    // Se a aba fechada era a ativa, ativa a vizinha (preferindo à direita).
    if (wasActive) {
      const replacement = next[closedAt] ?? next[next.length - 1] ?? null
      setActiveId(replacement)
    }
  }

  /** Alterna a visibilidade do Explorer. */
  function toggleExplorer() {
    setExplorerVisible((v) => !v)
  }

  const value = {
    files,
    fileIndex,
    openTabs,
    activeId,
    activeFile: activeId ? fileIndex[activeId] : null,
    explorerVisible,
    toggleExplorer,
    openFile,
    activateFile,
    closeTab,
  }

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  )
}

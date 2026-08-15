import { createContext } from 'react'

/**
 * Contexto do workspace, mantido isolado de componente/hook para
 * preservar o fast-refresh (arquivo só exporta o context).
 * Provider e hook importam deste arquivo.
 */
export const WorkspaceContext = createContext(null)

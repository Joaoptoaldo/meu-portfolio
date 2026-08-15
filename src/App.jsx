import { WorkspaceProvider } from './context/WorkspaceProvider'
import Workspace from './components/layout/Workspace'

/**
 * Raiz do portfólio: provê o estado global do workspace
 * e monta a estrutura principal da interface (grid de painéis).
 */
export default function App() {
  return (
    <WorkspaceProvider>
      <Workspace />
    </WorkspaceProvider>
  )
}

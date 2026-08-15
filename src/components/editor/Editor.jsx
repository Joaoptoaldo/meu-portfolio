/**
 * Editor — área central do workspace.
 * Compõe: Tab Bar (topo) + Breadcrumb + conteúdo da seção ativa.
 *
 * O conteúdo é resolvido pelo registro `sections` a partir do id de seção
 * do arquivo ativo. A seção recebe o título via prop.
 */
import { useWorkspace } from '../../hooks/useWorkspace'
import sections from '../sections'
import TabBar from './TabBar'
import Breadcrumb from './Breadcrumb'

export default function Editor() {
  const { activeFile } = useWorkspace()

  const Section = activeFile?.section ? sections[activeFile.section] : null

  return (
    <main className="flex min-w-0 flex-1 flex-col bg-bg-editor">
      <TabBar />
      <Breadcrumb />

      {/* Conteúdo do editor — key no arquivo re-dispara a entrada suave */}
      <div key={activeFile?.id ?? 'none'} className="animate-slide-up min-h-0 flex-1 overflow-y-auto scroll-thin">
        {Section ? (
          <Section title={activeFile.description} />
        ) : (
          <div className="flex h-full items-center justify-center p-6">
            <p className="text-sm text-text-muted">
              Selecione um arquivo no Explorer para começar.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

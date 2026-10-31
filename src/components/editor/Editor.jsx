/**
 * Editor — área central do workspace.
 * Compõe: Tab Bar (topo) + Breadcrumb + conteúdo da seção ativa.
 *
 * Quando há split editor, cada instância recebe `groupId` e renderiza
 * o arquivo ativo daquele grupo. Sem `groupId`, usa o grupo ativo global.
 *
 * Lazy loading implementado com Suspense para melhorar performance.
 */
import { Suspense, useMemo } from 'react'
import { useWorkspace } from '../../hooks/useWorkspace'
import sections from '../sections'
import TabBar from './TabBar'
import Breadcrumb from './Breadcrumb'

/** Loading fallback para lazy loading das seções */
function SectionFallback() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="flex flex-col items-center gap-3">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        <p className="font-mono text-xs text-text-muted">Carregando...</p>
      </div>
    </div>
  )
}

export default function Editor({ groupId = null, column = 0 }) {
  const { activeFile, fileIndex, groups, activeGroupId, setActiveGroup } = useWorkspace()

  const group = useMemo(() => {
    if (!groupId) return groups.find((g) => g.id === activeGroupId) ?? null
    return groups.find((g) => g.id === groupId) ?? null
  }, [groupId, groups, activeGroupId])

  const file = group?.active ? fileIndex[group.active] : activeFile
  const Section = file?.section ? sections[file.section] : null
  const isActiveGroup = group?.id === activeGroupId

  return (
    <section
      className={`flex min-h-0 min-w-0 flex-1 flex-col bg-bg-editor ${
        isActiveGroup ? 'ring-1 ring-inset ring-border-active/40' : ''
      }`}
      onFocusCapture={() => group?.id && setActiveGroup(group.id)}
      onClick={() => group?.id && setActiveGroup(group.id)}
      aria-label={`Editor ${column + 1}`}
    >
      <TabBar groupId={group?.id ?? null} />
      <Breadcrumb file={file} />

      {/* Conteúdo do editor — key no arquivo re-dispara a entrada suave */}
      <div
        id={file?.id ? `editor-content-${file.id}` : undefined}
        key={`${group?.id ?? 'default'}-${file?.id ?? 'none'}`}
        className="animate-slide-up scrollbar-thin min-h-0 flex-1 overflow-y-auto overflow-x-hidden pb-12"
      >
        {Section ? (
          <Suspense fallback={<SectionFallback />}>
            <Section title={file.description} />
          </Suspense>
        ) : (
          <div className="flex h-full items-center justify-center p-6">
            <p className="text-sm text-text-muted">
              Selecione um arquivo no Explorer para começar.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

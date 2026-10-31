import { useWorkspace } from '../../../hooks/useWorkspace'
import Icon from '../../ui/Icon'
import FileIcon from '../../ui/FileIcon'

/** Lista "OPEN EDITORS": abas abertas no grupo ativo (dado real do estado). */
export default function OpenEditors() {
  const { openTabs, activeId, fileIndex, activateFile, closeTab } = useWorkspace()

  if (!openTabs.length) return null

  return (
    <>
      <div className="mt-2 flex items-center gap-1.5 px-4 pb-1 pt-1 font-mono text-[10px] uppercase tracking-widest text-text-muted">
        <Icon name="chevronDown" className="h-3 w-3 shrink-0" />
        <span className="truncate">Open Editors</span>
      </div>
      <ul className="m-0 list-none p-0">
        {openTabs.map((id) => {
          const file = fileIndex[id]
          if (!file) return null
          return (
            <li key={id}>
              <div
                className={`group flex w-full items-center gap-1.5 px-2 py-1 text-left transition-colors ${
                  id === activeId
                    ? 'bg-bg-active text-text-primary'
                    : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
                }`}
                style={{ paddingLeft: '20px' }}
              >
                <button
                  type="button"
                  onClick={() => activateFile(id)}
                  aria-current={id === activeId ? 'page' : undefined}
                  className="flex min-w-0 flex-1 items-center gap-1.5 text-left"
                >
                  <FileIcon type={file.icon} className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate font-mono text-xs">{file.file}</span>
                </button>
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={`Fechar aba ${file.file}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    closeTab(id)
                  }}
                  className="flex h-4 w-4 shrink-0 items-center justify-center rounded text-text-disabled opacity-0 transition-opacity hover:bg-bg-hover group-hover:opacity-100"
                >
                  <span className="text-[10px] leading-none">✕</span>
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}
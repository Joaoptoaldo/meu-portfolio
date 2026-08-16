import { useState } from 'react'
import { workspaceTree } from '../../../data/sections'
import Icon from '../../ui/Icon'
import FileIcon from '../../ui/FileIcon'
import OpenEditors from './OpenEditors'
import TreeNode from './TreeNode'

/** Conteúdo interno (cabeçalho + árvore + OPEN EDITORS), usado em desktop e mobile. */
export default function ExplorerBody({ onNavigate }) {
  const [rootOpen, setRootOpen] = useState(workspaceTree.rootOpen ?? true)

  return (
    <>
      <div className="flex shrink-0 items-center justify-between pr-2">
        <h2 className="px-4 pb-1 pt-3 font-mono text-[11px] uppercase tracking-widest text-text-muted">
          Explorer
        </h2>
      </div>

      {/* Open Editors (abas abertas) */}
      <OpenEditors />

      {/* Pasta raiz recolhível */}
      <button
        type="button"
        onClick={() => setRootOpen((o) => !o)}
        aria-expanded={rootOpen}
        className="flex w-full items-center gap-1 px-2 py-1 text-left text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary"
      >
        <Icon
          name={rootOpen ? 'chevronDown' : 'chevronRight'}
          className="h-3.5 w-3.5 shrink-0"
        />
        <FileIcon
          type={rootOpen ? 'folder-open' : 'folder'}
          className="h-4 w-4"
        />
        <span className="truncate font-mono text-xs tracking-wide">
          {workspaceTree.rootName}
        </span>
      </button>

      {rootOpen && (
        <nav
          aria-label="Arquivos do portfólio"
          className="min-h-0 flex-1 overflow-y-auto pb-4"
        >
          <ul className="m-0 list-none p-0">
            {workspaceTree.files.map((entry) => (
              <TreeNode
                key={entry.id}
                entry={entry}
                depth={0}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        </nav>
      )}
    </>
  )
}
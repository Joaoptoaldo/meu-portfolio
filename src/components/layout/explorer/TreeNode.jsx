import { memo, useState } from 'react'
import { useWorkspace } from '../../../hooks/useWorkspace'
import Icon from '../../ui/Icon'
import FileIcon from '../../ui/FileIcon'
import ContextMenu from './ContextMenu'

/** Nó da árvore: pasta (expansível) ou arquivo (seção). */
const TreeNode = memo(function TreeNode({ entry, depth, onNavigate }) {
  const { activeId, openFile, openFileNewTab, closeTab, openTabs } =
    useWorkspace()
  const [open, setOpen] = useState(entry.defaultOpen ?? false)
  const [menu, setMenu] = useState(null)
  const isFolder = entry.type === 'folder'
  const isActive = activeId === entry.id
  const isOpen = openTabs.includes(entry.id)

  if (isFolder) {
    return (
      <li>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex w-full items-center gap-1 px-2 py-1 text-left text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary"
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          <Icon
            name={open ? 'chevronDown' : 'chevronRight'}
            className="h-3.5 w-3.5 shrink-0"
          />
          <FileIcon
            type={open ? 'folder-open' : 'folder'}
            className="h-4 w-4"
          />
          <span className="truncate font-mono text-xs tracking-wide">
            {entry.file}/
          </span>
        </button>
        {open && entry.children && (
          <ul className="m-0 list-none p-0">
            {entry.children.map((child) => (
              <TreeNode
                key={child.id}
                entry={child}
                depth={depth + 1}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        )}
      </li>
    )
  }

  return (
    <li>
      <button
        type="button"
        onClick={() => {
          openFile(entry.id)
          onNavigate?.()
          setMenu(null)
        }}
        onContextMenu={(e) => {
          e.preventDefault()
          setMenu({ x: e.clientX, y: e.clientY })
        }}
        aria-current={isActive ? 'page' : undefined}
        className={`flex w-full items-center gap-1.5 px-2 py-1 text-left transition-colors ${
          isActive
            ? 'bg-bg-active text-text-primary'
            : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
        }`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        <span aria-hidden="true" className="w-3.5 shrink-0" />
        <FileIcon type={entry.icon} className="h-4 w-4" />
        <span className="truncate font-mono text-xs">{entry.file}</span>
      </button>

      {menu && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          onClose={() => setMenu(null)}
          items={[
            {
              label: 'Abrir',
              onClick: () => {
                openFile(entry.id)
                onNavigate?.()
                setMenu(null)
              },
            },
            {
              label: 'Abrir em nova aba',
              onClick: () => {
                openFileNewTab(entry.id)
                setMenu(null)
              },
            },
            ...(isOpen
              ? [
                  {
                    label: 'Fechar',
                    onClick: () => {
                      closeTab(entry.id)
                      setMenu(null)
                    },
                  },
                ]
              : []),
          ]}
        />
      )}
    </li>
  )
})

export default TreeNode
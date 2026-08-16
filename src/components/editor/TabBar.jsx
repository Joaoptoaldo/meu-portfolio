/**
 * Tab Bar — abas dos arquivos abertos.
 *
 * - Seleção de aba com manutenção do foco (teclado);
 * - navegação por Setas ←/→ e Ctrl/Cmd+W para fechar;
 * - reordenação por drag and drop;
 * - botão de split (abrir ao lado) por aba;
 * - abordagem padrão de tabs ARIA (role=tablist / role=tab / arrow keys).
 */
import { useRef, useState } from 'react'
import { useWorkspace } from '../../hooks/useWorkspace'
import FileIcon from '../ui/FileIcon'
import Icon from '../ui/Icon'

function Tab({ file, isActive, onActivate, onClose, onSplit, onDragStart, onDragOver, onDrop, tabRef }) {
  return (
    <button
      ref={tabRef}
      type="button"
      role="tab"
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={onActivate}
      className={`group relative flex h-9 shrink-0 items-center gap-1.5 border-r border-border pl-3 pr-2 font-mono text-xs transition-colors ${
        isActive
          ? 'border-t-2 border-t-accent bg-bg-tab-active'
          : 'border-t-2 border-t-transparent bg-bg-tab'
      }`}
    >
      {!isActive && (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-0.5 bg-text-muted opacity-0 transition-opacity group-hover:opacity-40"
        />
      )}
      <span
        className={`min-w-0 truncate transition-colors ${
          isActive ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'
        }`}
      >
        {file.file}
      </span>
      <FileIcon
        type={file.icon}
        className={`h-3.5 w-3.5 transition-opacity ${
          isActive ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'
        }`}
      />
      <span
        role="button"
        tabIndex={-1}
        aria-label={`Abrir ${file.file} ao lado`}
        onClick={(e) => {
          e.stopPropagation()
          onSplit()
        }}
        className="hidden h-4 w-4 cursor-pointer items-center justify-center rounded text-text-disabled opacity-0 transition-opacity hover:bg-bg-hover group-hover:flex group-hover:opacity-100"
      >
        <Icon name="split" className="h-3 w-3" />
      </span>
      <span
        role="button"
        tabIndex={-1}
        aria-label={`Fechar aba ${file.file}`}
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            e.stopPropagation()
            onClose()
          }
        }}
        className="flex h-4 w-4 cursor-pointer items-center justify-center rounded text-text-disabled opacity-0 transition-opacity group-hover:opacity-100 hover:bg-bg-hover focus-visible:opacity-100"
      >
        <span className="text-[10px] leading-none">✕</span>
      </span>
    </button>
  )
}

export default function TabBar({ groupId = null }) {
  const ws = useWorkspace()
  const {
    fileIndex,
    groups,
    activeGroupId,
    openFileInGroup,
    activateFileInGroup,
    closeTabInGroup,
    moveTabInGroup,
    splitOpen,
    setActiveGroup,
  } = ws
  const tabRefs = useRef({})
  const [dragFrom, setDragFrom] = useState(null)

  const group = groupId
    ? groups.find((g) => g.id === groupId)
    : groups.find((g) => g.id === activeGroupId)
  const tabs = group?.tabs ?? []
  const active = group?.active ?? null
  const id = group?.id ?? activeGroupId

  function onKeyDown(e) {
    const idx = tabs.indexOf(active)
    let nextIndex = null

    if (e.key === 'ArrowRight' && idx < tabs.length - 1) nextIndex = idx + 1
    if (e.key === 'ArrowLeft' && idx > 0) nextIndex = idx - 1
    if (e.key === 'Home') nextIndex = 0
    if (e.key === 'End') nextIndex = tabs.length - 1

    if (nextIndex !== null) {
      e.preventDefault()
      const nextId = tabs[nextIndex]
      activateFileInGroup(nextId, id)
      tabRefs.current[nextId]?.focus()
      return
    }

    if (e.key === 'w' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      closeTabInGroup(active, id)
    }
  }

  return (
    <div className="flex items-stretch border-b border-border bg-bg-title">
      <div
        role="tablist"
        aria-label="Arquivos abertos"
        onKeyDown={onKeyDown}
        className="scrollbar-hidden flex flex-1 items-stretch overflow-x-auto"
      >
        {tabs.map((fileId, index) => {
          const file = fileIndex[fileId]
          if (!file) return null
          return (
            <Tab
              key={fileId}
              file={file}
              isActive={fileId === active}
              onActivate={() => {
                setActiveGroup(id)
                activateFileInGroup(fileId, id)
              }}
              onClose={() => closeTabInGroup(fileId, id)}
              onSplit={() => splitOpen(fileId)}
              onDragStart={() => setDragFrom(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault()
                if (dragFrom !== null) moveTabInGroup(dragFrom, index, id)
                setDragFrom(null)
              }}
              tabRef={(el) => {
                tabRefs.current[fileId] = el
              }}
            />
          )
        })}
      </div>

      <button
        type="button"
        onClick={() => openFileInGroup('welcome', id)}
        aria-label="Abrir nova aba (Welcome)"
        className="flex h-9 w-9 shrink-0 items-center justify-center border-l border-border text-lg leading-none text-text-muted transition-colors hover:bg-bg-hover hover:text-text-primary"
      >
        +
      </button>
    </div>
  )
}

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  workspaceTree,
  flattenFiles,
  initialOpened,
  initialActive,
} from '../data/sections'
import { loadState, saveState } from '../utils/persist'
import { getSymbolsForSection } from '../data/symbols'
import { WorkspaceContext } from './WorkspaceContext'

// Gerencia o estado global do workspace (abas, tema, paineis)

const DEFAULT_THEME = 'dark'
const ACCENTS = ['blue', 'purple', 'green', 'orange', 'pink']
const DEFAULT_ACCENT = 'blue'

const ACCENT_COLORS = {
  blue: '#4daafc',
  purple: '#a78bfa',
  green: '#4ade80',
  orange: '#fb923c',
  pink: '#f472b6',
}

const DEFAULT_GROUP = { id: 'g1', tabs: initialOpened, active: initialActive }

function makeGroupId() {
  return `g${Math.random().toString(36).slice(2, 7)}`
}

function sanitizePersisted(saved) {
  if (!saved || typeof saved !== 'object') return {}

  const ids = new Set(flattenFiles(workspaceTree).map((f) => f.id))
  const pickIds = (arr) =>
    Array.isArray(arr)
      ? arr.filter((id) => typeof id === 'string' && ids.has(id)).slice(0, 12)
      : []

  const groups = Array.isArray(saved.groups) && saved.groups.length
    ? saved.groups
        .map((g) => ({
          id: typeof g?.id === 'string' ? g.id : makeGroupId(),
          tabs: pickIds(g?.tabs),
          active: ids.has(g?.active) ? g.active : null,
        }))
        .filter((g) => g.tabs.length)
        .slice(0, 3)
    : null

  return {
    theme: saved.theme === 'light' ? 'light' : DEFAULT_THEME,
    accent: ACCENTS.includes(saved.accent) ? saved.accent : DEFAULT_ACCENT,
    // não restaura o Zen Mode para evitar travar a tela
    zen: false,
    explorerVisible: saved.explorerVisible !== false,
    explorerView:
      saved.explorerView === 'search' ||
      saved.explorerView === 'scm' ||
      saved.explorerView === 'explorer'
        ? saved.explorerView
        : 'explorer',
    explorerWidth:
      typeof saved?.explorerWidth === 'number' &&
      !Number.isNaN(saved.explorerWidth) &&
      saved.explorerWidth >= 160 &&
      saved.explorerWidth <= 500
        ? saved.explorerWidth
        : 264,
    panelOpen: saved?.panelOpen !== false,
    panelView:
      saved?.panelView === 'problems' ||
      saved?.panelView === 'output' ||
      saved?.panelView === 'terminal'
        ? saved.panelView
        : 'terminal',
    panelHeight:
      typeof saved?.panelHeight === 'number' &&
      !Number.isNaN(saved.panelHeight) &&
      saved.panelHeight >= 80 &&
      saved.panelHeight <= 600
        ? saved.panelHeight
        : 160,
    groups,
    activeGroupId: typeof saved?.activeGroupId === 'string' ? saved.activeGroupId : null,
    navHistory: Array.isArray(saved?.navHistory)
      ? saved.navHistory.filter((id) => typeof id === 'string' && ids.has(id)).slice(-50)
      : [],
  }
}

function createDefaultGroups() {
  return [DEFAULT_GROUP]
}

export function WorkspaceProvider({ children }) {
  const [persisted, setPersisted] = useState(() => sanitizePersisted(loadState()))
  const [theme, setTheme] = useState(() => persisted.theme ?? DEFAULT_THEME)
  const [accent, setAccent] = useState(() => persisted.accent ?? DEFAULT_ACCENT)
  const [zen, setZen] = useState(false)
  const [explorerVisible, setExplorerVisible] = useState(
    () => persisted.explorerVisible !== false,
  )
  const [explorerView, setExplorerViewState] = useState(
    () => persisted.explorerView ?? 'explorer',
  )
  const [explorerWidth, setExplorerWidthState] = useState(
    () => persisted.explorerWidth ?? 264,
  )
  const [panelOpen, setPanelOpen] = useState(() => persisted.panelOpen !== false)
  const [panelView, setPanelViewState] = useState(() => persisted.panelView ?? 'terminal')
  const [panelHeight, setPanelHeightState] = useState(
    () => persisted.panelHeight ?? 160,
  )
  const [groups, setGroups] = useState(() => persisted.groups?.length ? persisted.groups : createDefaultGroups())
  const [activeGroupId, setActiveGroupId] = useState(() => {
    if (persisted.activeGroupId && (persisted.groups ?? []).some((g) => g.id === persisted.activeGroupId)) {
      return persisted.activeGroupId
    }
    return (persisted.groups?.[0]?.id ?? DEFAULT_GROUP.id)
  })

  const [quickOpen, setQuickOpen] = useState(false)
  const [commandPalette, setCommandPalette] = useState(false)
  const [goToSymbol, setGoToSymbol] = useState(false)
  const [searchInFile, setSearchInFile] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [toasts, setToasts] = useState([])
  const toastTimers = useRef(new Map())
  const toastId = useRef(0)

  const fileIndex = useMemo(() => {
    const index = {}
    for (const entry of flattenFiles(workspaceTree)) index[entry.id] = entry
    return index
  }, [])
  const files = useMemo(() => flattenFiles(workspaceTree), [])

  const activeGroup = groups.find((g) => g.id === activeGroupId) ?? groups[0] ?? DEFAULT_GROUP
  const openTabs = activeGroup?.tabs ?? []
  const activeId = activeGroup?.active ?? null
  const activeFile = activeId ? fileIndex[activeId] : null

  // salva estado no localStorage (única fonte de persistência, com debounce
  // para agrupar escritas rápidas como drag de resize)
  useEffect(() => {
    const timer = setTimeout(() => {
      saveState({
        theme,
        accent,
        zen,
        explorerVisible,
        explorerView,
        explorerWidth,
        panelOpen,
        panelView,
        panelHeight,
        groups,
        activeGroupId,
        navHistory: persisted.navHistory ?? [],
      })
    }, 50)
    return () => clearTimeout(timer)
  }, [theme, accent, zen, explorerVisible, explorerView, explorerWidth, panelOpen, panelView, panelHeight, groups, activeGroupId, persisted.navHistory])

  const setExplorerWidth = useCallback((w) => {
    const num = typeof w === 'number' && !Number.isNaN(w) ? w : 264
    const next = Math.max(160, Math.min(500, num))
    setExplorerWidthState(next)
  }, [])

  const setPanelHeight = useCallback((h) => {
    const num = typeof h === 'number' && !Number.isNaN(h) ? h : 160
    const next = Math.max(80, Math.min(600, num))
    setPanelHeightState(next)
  }, [])

  // aplica o tema e as cores de destaque no css global
  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.dataset.accent = accent
    root.style.setProperty('--color-accent', ACCENT_COLORS[accent] ?? ACCENT_COLORS.blue)
  }, [theme, accent])

  function updateGroup(nextGroups, nextActiveGroupId = activeGroupId) {
    setGroups(nextGroups)
    setActiveGroupId(nextActiveGroupId)
  }

  function setExplorerView(view) {
    setExplorerViewState(view)
    setExplorerVisible(true)
  }

  function toggleExplorerView(view) {
    if (explorerView === view) {
      toggleExplorer()
      return
    }
    setExplorerView(view)
  }

  function toggleExplorer() {
    setExplorerVisible((value) => !value)
  }

  function selectPanelView(view) {
    setPanelViewState(view)
    setPanelOpen(true)
  }

  function togglePanel() {
    setPanelOpen((value) => !value)
  }

  function openFile(id) {
    const entry = fileIndex[id]
    if (!entry) return
    updateGroup(
      groups.map((g) =>
        g.id === activeGroupId
          ? {
              ...g,
              tabs: g.tabs.includes(id) ? g.tabs : [...g.tabs, id],
              active: id,
            }
          : g,
      ),
      activeGroupId,
    )
  }

  function openFileInGroup(id, groupId = activeGroupId) {
    const entry = fileIndex[id]
    if (!entry) return
    updateGroup(
      groups.map((g) =>
        g.id === groupId
          ? {
              ...g,
              tabs: g.tabs.includes(id) ? g.tabs : [...g.tabs, id],
              active: id,
            }
          : g,
      ),
      groupId,
    )
  }

  function openFileNewTab(id) {
    openFile(id)
  }

  function activateFileInGroup(id, groupId = activeGroupId) {
    const group = groups.find((g) => g.id === groupId)
    if (!fileIndex[id] || !group?.tabs.includes(id)) return
    updateGroup(
      groups.map((g) => (g.id === groupId ? { ...g, active: id } : g)),
      groupId,
    )
  }

  function activateFile(id) {
    activateFileInGroup(id, activeGroupId)
  }

  function closeTabInGroup(id, groupId = activeGroupId) {
    const group = groups.find((g) => g.id === groupId)
    if (!group) return
    const closedAt = group.tabs.indexOf(id)
    const next = group.tabs.filter((t) => t !== id)
    const nextActive = group.active === id ? (next[closedAt] ?? next[next.length - 1] ?? null) : group.active
    updateGroup(groups.map((g) => (g.id === groupId ? { ...g, tabs: next, active: nextActive } : g)), groupId)
  }

  function closeTab(id) {
    closeTabInGroup(id, activeGroupId)
  }

  function closeTabs(ids) {
    const idsSet = new Set(ids)
    const next = openTabs.filter((t) => !idsSet.has(t))
    const nextActive = idsSet.has(activeId) ? next[next.length - 1] ?? null : activeId
    updateGroup(groups.map((g) => (g.id === activeGroupId ? { ...g, tabs: next, active: nextActive } : g)), activeGroupId)
  }

  function closeAllTabs() {
    updateGroup(groups.map((g) => (g.id === activeGroupId ? { ...g, tabs: [], active: null } : g)), activeGroupId)
  }

  function moveTabInGroup(from, to, groupId = activeGroupId) {
    const group = groups.find((g) => g.id === groupId)
    if (!group) return
    if (from < 0 || to < 0 || from >= group.tabs.length || to >= group.tabs.length || from === to) return
    const next = [...group.tabs]
    const [id] = next.splice(from, 1)
    next.splice(to, 0, id)
    updateGroup(groups.map((g) => (g.id === groupId ? { ...g, tabs: next } : g)), groupId)
  }

  function moveTab(from, to) {
    moveTabInGroup(from, to, activeGroupId)
  }

  function splitOpen(id) {
    const entry = fileIndex[id]
    if (!entry) return
    const newGroup = { id: makeGroupId(), tabs: [id], active: id }
    const next = [...groups, newGroup]
    updateGroup(next, newGroup.id)
  }

  function closeGroup(groupId) {
    const next = groups.filter((g) => g.id !== groupId)
    if (!next.length) {
      const reset = createDefaultGroups()
      updateGroup(reset, reset[0].id)
      return
    }
    const nextActive = activeGroupId === groupId ? next[next.length - 1].id : activeGroupId
    updateGroup(next, nextActive)
  }

  function setActiveGroup(groupId) {
    if (!groups.some((g) => g.id === groupId)) return
    setActiveGroupId(groupId)
  }

  const navHistory = persisted.navHistory ?? []
  const historyIndexRef = useRef(-1)
  const recordedRef = useRef(null)

  useEffect(() => {
    if (!activeId || activeId === recordedRef.current) return
    recordedRef.current = activeId
    setPersisted((prev) => {
      const base = Array.isArray(prev.navHistory) ? prev.navHistory : []
      const trimmed = historyIndexRef.current >= base.length - 1 ? base : base.slice(0, historyIndexRef.current + 1)
      const next = trimmed[trimmed.length - 1] === activeId ? trimmed : [...trimmed, activeId].slice(-50)
      historyIndexRef.current = next.length - 1
      return { ...prev, navHistory: next }
    })
  }, [activeId])

  function navigateHistory(dir) {
    const target = historyIndexRef.current + dir
    if (target < 0 || target >= navHistory.length) return
    historyIndexRef.current = target
    const id = navHistory[target]
    if (fileIndex[id]) activateFile(id)
  }

  function toggleQuickOpen() {
    setQuickOpen((value) => !value)
    setCommandPalette(false)
    setGoToSymbol(false)
    setSearchInFile(false)
  }

  function toggleCommandPalette() {
    setCommandPalette((value) => !value)
    setQuickOpen(false)
    setGoToSymbol(false)
    setSearchInFile(false)
  }

  function toggleGoToSymbol() {
    setGoToSymbol((value) => !value)
    setQuickOpen(false)
    setCommandPalette(false)
    setSearchInFile(false)
  }

  function toggleSearchInFile() {
    setSearchInFile((value) => !value)
    setQuickOpen(false)
    setCommandPalette(false)
    setGoToSymbol(false)
  }

  function toggleSettings() {
    setSettingsOpen((value) => !value)
  }

  function toggleZen() {
    setZen((value) => !value)
  }

  function restoreLayout() {
    setZen(false)
    setExplorerVisible(true)
    setExplorerViewState('explorer')
  }

  function notify(message, type = 'info') {
    const id = toastId.current++
    setToasts((prev) => [...prev.slice(-3), { id, message, type }])
    clearTimeout(toastTimers.current.get(id))
    const timer = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
      toastTimers.current.delete(id)
    }, 4200)
    toastTimers.current.set(id, timer)
  }

  function dismissToast(id) {
    const timer = toastTimers.current.get(id)
    if (timer) clearTimeout(timer)
    toastTimers.current.delete(id)
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const showOutline = useCallback((fileId) => {
    return Promise.resolve(getSymbolsForSection(fileId))
  }, [])

  function openSearchResult(fileId) {
    if (fileIndex[fileId]) openFile(fileId)
  }

  function nextTab() {
    if (openTabs.length < 2) return
    const idx = openTabs.indexOf(activeId)
    const nextIdx = (idx + 1) % openTabs.length
    activateFile(openTabs[nextIdx])
  }

  function previousTab() {
    if (openTabs.length < 2) return
    const idx = openTabs.indexOf(activeId)
    const nextIdx = (idx - 1 + openTabs.length) % openTabs.length
    activateFile(openTabs[nextIdx])
  }

  const value = {
    files,
    fileIndex,
    openTabs,
    activeId,
    activeFile,
    explorerVisible,
    explorerView,
    explorerWidth,
    setExplorerWidth,
    panelHeight,
    setPanelHeight,
    quickOpen,
    commandPalette,
    goToSymbol,
    searchInFile,
    settingsOpen,
    panelOpen,
    panelView,
    toasts,
    theme,
    accent,
    zen,
    groups,
    activeGroupId,
    symbols: [],
    ACCENTS,
    ACCENT_COLORS,
    toggleExplorer,
    setExplorerView,
    toggleExplorerView,
    toggleQuickOpen,
    toggleCommandPalette,
    toggleGoToSymbol,
    toggleSearchInFile,
    toggleSettings,
    togglePanel,
    selectPanelView,
    openFile,
    openFileInGroup,
    openFileNewTab,
    activateFile,
    activateFileInGroup,
    closeTab,
    closeTabInGroup,
    closeTabs,
    closeAllTabs,
    moveTab,
    moveTabInGroup,
    splitOpen,
    closeGroup,
    setActiveGroup,
    navigateHistory,
    nextTab,
    previousTab,
    notify,
    dismissToast,
    showOutline,
    openSearchResult,
    setTheme,
    setAccent,
    toggleZen,
    restoreLayout,
  }

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  )
}

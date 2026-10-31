import { useEffect, useRef } from 'react'
import { useWorkspace } from './useWorkspace'

/**
 * Registra atalhos globais de teclado do workspace:
 *  - Ctrl/Cmd+P              -> Quick Open
 *  - Ctrl/Cmd+Shift+P        -> Command Palette
 *  - Ctrl/Cmd+Shift+O        -> Go to Symbol (arquivo ativo)
 *  - Ctrl/Cmd+F              -> buscar dentro do arquivo ativo
 *  - Ctrl/Cmd+B              -> alterna a sidebar (Explorer/Search/SCM)
 *  - Ctrl/Cmd+Shift+E        -> abre view Explorer
 *  - Ctrl/Cmd+Shift+F        -> busca global (Search)
 *  - Ctrl/Cmd+Shift+G        -> Source Control (SCM)
 *  - Ctrl/Cmd+J              -> alterna painel inferior
 *  - Ctrl/Cmd+\               -> split editor (abre grupo ao lado)
 *  - Ctrl/Cmd+Tab             -> próxima aba (wrap)
 *  - Ctrl/Cmd+Shift+Tab       -> aba anterior (wrap)
 *  - Alt+← / Alt+→            -> voltar / avançar no histórico
 *  - Ctrl/Cmd+K Z            -> zen mode (chord: pressiona Ctrl+K, solta, Z)
 *  - Ctrl/Cmd+,              -> Settings
 *
 * Esc nos overlays é tratado no próprio componente (Palette).
 *
 * NOTA: Destructuring explícito das dependências para evitar re-registro
 * do listener a cada render. As funções do contexto são estáveis (useCallback),
 * mas o objeto ws muda a cada render (contexto não memoizado).
 */
export function useGlobalShortcuts() {
  const {
    zen,
    activeId,
    restoreLayout,
    navigateHistory,
    toggleZen,
    notify,
    toggleCommandPalette,
    toggleQuickOpen,
    showOutline,
    toggleGoToSymbol,
    toggleExplorerView,
    toggleSearchInFile,
    toggleExplorer,
    togglePanel,
    splitOpen,
    toggleSettings,
    previousTab,
    nextTab,
    closeTab,
    openFile,
  } = useWorkspace()

  // Chord Ctrl+K (zen). Reset por timeout: reproduz o comportamento do VS Code
  // (solta-se Ctrl entre K e Z, então não se limpa no keyup de Ctrl).
  const chordRef = useRef({ k: false, timer: null })

  // Refs estáveis para valores de estado que mudam (zen, activeId).
  // Evita re-registro do listener por mudança de estado.
  const zenRef = useRef(zen)
  const activeIdRef = useRef(activeId)
  zenRef.current = zen
  activeIdRef.current = activeId

  useEffect(() => {
    function onKeyDown(e) {
      const mod = e.ctrlKey || e.metaKey
      const key = e.key.toLowerCase()

      if (zenRef.current && e.key === 'Escape') {
        e.preventDefault()
        restoreLayout()
        return
      }

      if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault()
        navigateHistory(-1)
        return
      }
      if (e.altKey && e.key === 'ArrowRight') {
        e.preventDefault()
        navigateHistory(1)
        return
      }

      // Ctrl+K inicia o chord (e Z fecha logo depois).
      if (mod && !e.shiftKey && key === 'k') {
        e.preventDefault()
        chordRef.current.k = true
        clearTimeout(chordRef.current.timer)
        chordRef.current.timer = setTimeout(() => {
          chordRef.current.k = false
        }, 2000)
        return
      }

      // Z após Ctrl+K: alterna zen mode. Aceita com ou sem Ctrl pressionado.
      if (chordRef.current.k && key === 'z') {
        e.preventDefault()
        chordRef.current.k = false
        clearTimeout(chordRef.current.timer)
        toggleZen()
        notify('Zen Mode ativado/desativado', 'success')
        return
      }

      // Qualquer outra tecla cancela o chord.
      if (chordRef.current.k) {
        chordRef.current.k = false
        clearTimeout(chordRef.current.timer)
      }

      if (!mod) return

      if (key === 'p' && e.shiftKey) {
        e.preventDefault()
        toggleCommandPalette()
        return
      }
      if (key === 'p') {
        e.preventDefault()
        toggleQuickOpen()
        return
      }
      if (key === 'o' && e.shiftKey) {
        e.preventDefault()
        const id = activeIdRef.current
        if (id) {
          showOutline(id).then(() => toggleGoToSymbol())
        }
        return
      }
      if (key === 'f' && e.shiftKey) {
        // Ctrl+Shift+F: busca global na sidebar.
        e.preventDefault()
        toggleExplorerView('search')
        return
      }
      if (key === 'f') {
        e.preventDefault()
        toggleSearchInFile()
        return
      }
      if (key === 'e' && e.shiftKey) {
        e.preventDefault()
        toggleExplorerView('explorer')
        return
      }
      if (key === 'g' && e.shiftKey) {
        e.preventDefault()
        toggleExplorerView('scm')
        return
      }
      if (key === 'b') {
        e.preventDefault()
        toggleExplorer()
        return
      }
      if (key === 'j') {
        e.preventDefault()
        togglePanel()
        return
      }
      if (key === '\\') {
        e.preventDefault()
        const id = activeIdRef.current
        if (id) splitOpen(id)
        return
      }
      if (key === ',' && !e.shiftKey) {
        e.preventDefault()
        toggleSettings()
        return
      }
      if (key === 'tab') {
        // Ctrl+Tab / Ctrl+Shift+Tab: alterna abas do grupo ativo.
        e.preventDefault()
        if (e.shiftKey) previousTab()
        else nextTab()
        return
      }
      if (key === 'w') {
        e.preventDefault()
        if (activeIdRef.current) closeTab(activeIdRef.current)
        return
      }
      if (key === 'n' && e.shiftKey) {
        e.preventDefault()
        openFile('welcome')
        return
      }
    }

    const chord = chordRef.current
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      clearTimeout(chord.timer)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restoreLayout, navigateHistory, toggleZen, notify, toggleCommandPalette,
    toggleQuickOpen, showOutline, toggleGoToSymbol, toggleExplorerView,
    toggleSearchInFile, toggleExplorer, togglePanel, splitOpen,
    toggleSettings, previousTab, nextTab, closeTab, openFile])

  return null
}

export default useGlobalShortcuts
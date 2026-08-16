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
 */
export function useGlobalShortcuts() {
  const ws = useWorkspace()

  // Chord Ctrl+K (zen). Reset por timeout: reproduz o comportamento do VS Code
  // (solta-se Ctrl entre K e Z, então não se limpa no keyup de Ctrl).
  const chordRef = useRef({ k: false, timer: null })

  useEffect(() => {
    function onKeyDown(e) {
      const mod = e.ctrlKey || e.metaKey
      const key = e.key.toLowerCase()

      if (ws.zen && e.key === 'Escape') {
        e.preventDefault()
        ws.restoreLayout()
        return
      }

      if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault()
        ws.navigateHistory(-1)
        return
      }
      if (e.altKey && e.key === 'ArrowRight') {
        e.preventDefault()
        ws.navigateHistory(1)
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
        ws.toggleZen()
        ws.notify('Zen Mode ativado/desativado', 'success')
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
        ws.toggleCommandPalette()
        return
      }
      if (key === 'p') {
        e.preventDefault()
        ws.toggleQuickOpen()
        return
      }
      if (key === 'o' && e.shiftKey) {
        e.preventDefault()
        const id = ws.activeId
        if (id) {
          ws.showOutline(id).then(() => ws.toggleGoToSymbol())
        }
        return
      }
      if (key === 'f' && e.shiftKey) {
        // Ctrl+Shift+F: busca global na sidebar.
        e.preventDefault()
        ws.toggleExplorerView('search')
        return
      }
      if (key === 'f') {
        e.preventDefault()
        ws.toggleSearchInFile()
        return
      }
      if (key === 'e' && e.shiftKey) {
        e.preventDefault()
        ws.toggleExplorerView('explorer')
        return
      }
      if (key === 'g' && e.shiftKey) {
        e.preventDefault()
        ws.toggleExplorerView('scm')
        return
      }
      if (key === 'b') {
        e.preventDefault()
        ws.toggleExplorer()
        return
      }
      if (key === 'j') {
        e.preventDefault()
        ws.togglePanel()
        return
      }
      if (key === '\\') {
        e.preventDefault()
        const id = ws.activeId
        if (id) ws.splitOpen(id)
        return
      }
      if (key === ',' && !e.shiftKey) {
        e.preventDefault()
        ws.toggleSettings()
        return
      }
      if (key === 'tab') {
        // Ctrl+Tab / Ctrl+Shift+Tab: alterna abas do grupo ativo.
        e.preventDefault()
        if (e.shiftKey) ws.previousTab()
        else ws.nextTab()
        return
      }
      if (key === 'w') {
        e.preventDefault()
        if (ws.activeId) ws.closeTab(ws.activeId)
        return
      }
      if (key === 'n' && e.shiftKey) {
        e.preventDefault()
        ws.openFile('welcome')
        return
      }
    }

    const chord = chordRef.current
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      clearTimeout(chord.timer)
    }
  }, [ws])

  return null
}

export default useGlobalShortcuts
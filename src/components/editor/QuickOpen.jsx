/**
 * Quick Open (Ctrl/Cmd+P) — busca arquivos/seções e abre/ativa a aba.
 */
import { useWorkspace } from '../../hooks/useWorkspace'
import Palette from './Palette'

export default function QuickOpen() {
  const { files, quickOpen, openFile, toggleQuickOpen } = useWorkspace()

  if (!quickOpen) return null

  const items = files.map((file) => ({
    key: file.id,
    label: file.file,
    detail: file.description,
    icon: '📄',
  }))

  return (
    <Palette
      placeholder="Ir para o arquivo…"
      items={items}
      onSelect={(item) => {
        openFile(item.key)
        toggleQuickOpen()
      }}
      onClose={toggleQuickOpen}
    />
  )
}
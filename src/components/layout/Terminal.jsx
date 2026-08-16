/**
 * Terminal interativo do painel inferior.
 *
 * O usuário digita comandos (help, whoami, skills, projects, open …) e o
 * terminal executa ações reais do portfólio: abrir seções, listar dados
 * factuais (skills/projects/experience) e navegar o workspace.
 * Atalhos: ↑/↓ histórico, Tab completa comandos, Esc limpa a linha.
 */
import { useEffect, useRef, useState } from 'react'
import { useWorkspace } from '../../hooks/useWorkspace'
import { profile } from '../../data/profile'
import { skillCategories } from '../../data/skills'
import { projects } from '../../data/projects'
import { experience } from '../../data/experience'
import { TERMINAL_COMMANDS } from '../../data/terminal'

/** Prompt do "shell". */
const PROMPT = `${profile.firstName.toLowerCase().replace(/\s+/g, '-')}@portfolio`
const PROMPT_STR = `${PROMPT}:~$`

/** Linhas iniciais exibidas ao abrir o terminal. */
const BANNER = [
  `Bem-vindo ao terminal do portfólio de ${profile.name}`,
  `Digite "help" para ver os comandos disponíveis.`,
  '',
]

const ARROW = '>'

/** Comandos que abrem seções do workspace (accionam via openFile). */
const OPEN_MAP = {
  Welcome: 'welcome',
  'Sobre.jsx': 'sobre',
  'habilidades.json': 'habilidades',
  projetos: 'projetos',
  'experiencia.jsx': 'experiencia',
  'formacao.jsx': 'formacao',
  'contato.jsx': 'contato',
}

function formatExperience() {
  const lines = []
  for (const item of experience.items) {
    lines.push(`${item.period}  •  ${item.role}`)
    lines.push(`           ${item.company}`)
  }
  return lines
}

function formatProjects() {
  const lines = []
  for (const p of projects) {
    lines.push(`${p.title}`)
    lines.push(`  ${p.tagline}`)
    lines.push(`  Tech: ${p.technologies.join(', ')}`)
    lines.push(`  ${p.repository}`)
    lines.push('')
  }
  return lines
}

function formatSkills() {
  const lines = []
  for (const cat of skillCategories) {
    lines.push(`[${cat.title}]`)
    for (const s of cat.skills) {
      const pct = Math.round(s.progress ?? 0)
      const level = s.level === 'learning' ? ' (estudando)' : ''
      lines.push(`  ${s.name}${level}  —  ${pct}%`)
    }
    lines.push('')
  }
  return lines
}

/** Resposta de um comando que navega o workspace (retorna null para silêncio). */
function handleOpen(cmd, openFile, setPanelView) {
  const key = Object.keys(OPEN_MAP).find(
    (k) => k.toLowerCase() === cmd.trim().toLowerCase().replace(/^open\s+/, ''),
  )
  if (!key) {
    return { output: [`Arquivo não encontrado: "${cmd.replace(/^open\s+/, '')}". Use "help".`] }
  }
  const entry = OPEN_MAP[key]
  openFile(entry)
  setPanelView('terminal')
  return { output: [`Abrindo ${key} no editor…`] }
}

/**
 * Executa um comando e devolve a saída formatada.
 * Retorna: { output, clear } — wrap para centralizar formatação.
 */
function runCommand(raw, ws) {
  const { openFile, selectPanelView } = ws
  const cmd = raw.trim()
  const lower = cmd.toLowerCase()

  if (!cmd) return { output: [] }

  const base = lower.split(/\s+/)[0]

  switch (base) {
    case 'help':
      return {
        output: [
          `Comandos disponíveis (atalho: Tab completa):`,
          ...TERMINAL_COMMANDS.map(
            (c) => `  ${c.name.padEnd(18)} ${c.description}`,
          ),
          '',
        ],
      }
    case 'whoami':
      return {
        output: [
          `${profile.name} — ${profile.role}`,
          `Área: ${profile.area}`,
          `Formação: ${profile.formation} — ${profile.institution}`,
          '',
        ],
      }
    case 'profile':
      return {
        output: [
          `Nome: ${profile.name}`,
          `Área: ${profile.area}`,
          `Formação: ${profile.formation} (${profile.institutionShort})`,
          `Localização: ${profile.location}`,
          `E-mail: ${profile.email}`,
          `GitHub: ${profile.github}`,
          `LinkedIn: ${profile.linkedin}`,
          ...(profile.whatsapp ? [`WhatsApp: ${profile.whatsapp}`] : []),
          '',
        ],
      }
    case 'skills':
      return { output: formatSkills() }
    case 'experience':
      return { output: formatExperience() }
    case 'projects':
      return { output: formatProjects() }
    case 'project':
      return handleOpen(`open projetos`, openFile, selectPanelView)
    case 'contact':
      return {
        output: [
          `E-mail: ${profile.email}`,
          `GitHub: ${profile.github}`,
          `LinkedIn: ${profile.linkedin}`,
          ...(profile.whatsapp ? [`WhatsApp: ${profile.whatsapp}`] : []),
          '',
        ],
      }
    case 'open':
      return handleOpen(cmd, openFile, selectPanelView)
    case 'cls':
    case 'clear':
      return { output: [], clear: true }
    case 'exit':
      return { output: ['Até logo! Use Ctrl/Cmd+J para reabrir o terminal.'], exit: true }
    default:
      return { output: [`Comando não reconhecido: "${raw}". Digite "help".`] }
  }
}

export default function Terminal() {
  const ws = useWorkspace()
  const { panelOpen, selectPanelView } = ws

  const [lines, setLines] = useState([...BANNER])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [hint, setHint] = useState('')
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  const clear = () => setLines([])

  // Rola até o final a cada mudança de conteúdo.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [lines])

  // Botões do painel mantêm o foco no input ao trocar de aba/altura.
  useEffect(() => {
    if (panelOpen) inputRef.current?.focus()
  }, [panelOpen])

  function submit(e) {
    e.preventDefault()
    const raw = input
    const result = runCommand(raw, ws)

    if (result.clear) {
      clear()
    } else {
      setLines((prev) => [
        ...prev,
        `${ARROW} ${raw}`,
        ...result.output,
      ])
    }

    if (result.exit) selectPanelView('terminal')

    // Registra no histórico (sem repetir o último) e reseta a navegação.
    if (raw.trim()) {
      setHistory((h) => (h[h.length - 1] === raw ? h : [...h, raw]))
    }
    setHistoryIndex(-1)
    setHint('')
    setInput('')
    inputRef.current?.focus()
  }

  function onKeyDown(e) {
    if (e.key === 'Enter') {
      submit(e)
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!history.length) return
      const next = Math.max(0, historyIndex === -1 ? history.length - 1 : historyIndex - 1)
      setHistoryIndex(next)
      setInput(history[next])
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === -1) return
      const next = historyIndex + 1
      if (next >= history.length) {
        setHistoryIndex(-1)
        setInput('')
      } else {
        setHistoryIndex(next)
        setInput(history[next])
      }
      return
    }
    if (e.key === 'Tab') {
      e.preventDefault()
      const value = input.toLowerCase()
      const candidate =
        TERMINAL_COMMANDS.map((c) => c.name).find((n) => n.startsWith(value) && value) ??
        Object.keys(OPEN_MAP).find(
          (k) => k.toLowerCase().startsWith(value) && value,
        )
      if (value && candidate) setInput(candidate)
      else if (value) setHint('(sem completação)')
      return
    }
    // Toda tecla limpa o hint.
    setHint('')
  }

  return (
    <div
      className="flex h-full flex-col font-mono text-xs"
      onClick={() => inputRef.current?.focus()}
    >
      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-auto px-3 py-2 leading-5 text-text-secondary"
        role="log"
        aria-label="Saída do terminal"
      >
        {lines.map((line, i) =>
          line === '' ? (
            <div key={i} className="h-4" aria-hidden="true" />
          ) : line.startsWith('[') ? (
            <div key={i} className="text-accent-dim">
              {line}
            </div>
          ) : (
            <div key={i}>{line}</div>
          ),
        )}
        <form onSubmit={submit} className="mt-0.5 flex items-center gap-2">
          <span className="shrink-0 text-accent">{PROMPT_STR}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Comando do terminal"
            placeholder="digite help e pressione Enter"
            className="min-w-0 flex-1 bg-transparent text-text-primary caret-accent placeholder:text-text-muted focus:outline-none"
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
          />
          {hint && <span className="shrink-0 text-text-muted">{hint}</span>}
        </form>
      </div>
    </div>
  )
}
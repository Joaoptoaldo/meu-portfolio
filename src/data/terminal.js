// comandos disponiveis no terminal
export const TERMINAL_COMMANDS = [
  { name: 'help', description: 'mostra a lista de comandos' },
  { name: 'whoami', description: 'exibe quem você está conhecendo' },
  { name: 'profile', description: 'resumo de formação e perfil' },
  { name: 'skills', description: 'lista as tecnologias (por categoria)' },
  { name: 'projects', description: 'lista os projetos do portfólio' },
  { name: 'project <nome>', description: 'detalhes de um projeto (comando auxiliar, usa `projects` no site)' },
  { name: 'experience', description: 'linha do tempo de experiência' },
  { name: 'contact', description: 'canais de contato' },
  { name: 'open <arquivo>', description: 'abre o arquivo/seção no editor (Ex.: Sobre.jsx)' },
  { name: 'cls', description: 'limpa o terminal' },
  { name: 'exit', description: 'encerra esta sessão do terminal' },
]

/** Comandos que navegam o workspace (precisam de callbacks do componente). */
export const OPENABLE_TARGETS = ['welcome', 'sobre', 'habilidades', 'projetos', 'experiencia', 'formacao', 'contato']
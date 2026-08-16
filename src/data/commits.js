/**
 * Commits reais do repositório (coletados via `git log`).
 * Apenas commits do repositório local deste portfólio — nenhum inventado.
 * Ordem: mais recente primeiro (como no VS Code Source Control).
 */

/** Branch real do repositório local (via `git branch --show-current`). */
export const currentBranch = 'master'

const commits = [
  {
    id: 'f9a8221',
    message: 'adiciona funcionalidade de entrada e estilos globais do projeto',
    author: 'João Pedro Toaldo',
    date: '2026-08-15',
  },
  {
    id: '9fc73eb',
    message: 'adiciona funcionalidade das seções de conteúdo do portfólio',
    author: 'João Pedro Toaldo',
    date: '2026-08-15',
  },
  {
    id: '8751958',
    message: 'adiciona funcionalidade do editor central com abas e navegação',
    author: 'João Pedro Toaldo',
    date: '2026-08-15',
  },
  {
    id: '6f3ebd4',
    message: 'adiciona funcionalidade de layout da interface estilo IDE',
    author: 'João Pedro Toaldo',
    date: '2026-08-15',
  },
  {
    id: '871aaed',
    message: 'adiciona funcionalidade de componentes de UI reutilizáveis',
    author: 'João Pedro Toaldo',
    date: '2026-08-15',
  },
  {
    id: '1b297f0',
    message: 'adiciona funcionalidade de contexto global e dados do workspace',
    author: 'João Pedro Toaldo',
    date: '2026-08-15',
  },
  {
    id: 'da887df',
    message: 'adiciona funcionalidade base de configuração do projeto',
    author: 'João Pedro Toaldo',
    date: '2026-08-15',
  },
]

export default commits
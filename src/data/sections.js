/**
 * Definição da árvore do workspace (Explorer) e da navegação.
 *
 * Cada "arquivo" representa uma seção do portfólio.
 * Pastas (`type: 'folder'`) apenas agrupam arquivos — não têm conteúdo próprio.
 *
 * A pasta `projetos/` lista os nomes de projetos conhecidos (do contexto).
 * Detalhes de cada projeto vivem em `projects.js` (Etapa 12); nesta fase os
 * arquivos de projeto apenas abrem a seção de Projetos.
 */
export const workspaceTree = {
  rootName: 'joao-pedro',
  files: [
    {
      id: 'welcome',
      file: 'Welcome.jsx',
      section: 'welcome',
      icon: 'react',
      description: 'Início',
    },
    {
      id: 'sobre',
      file: 'Sobre.jsx',
      section: 'about',
      icon: 'react',
      description: 'Sobre',
    },
    {
      id: 'habilidades',
      file: 'habilidades.json',
      section: 'skills',
      icon: 'json',
      description: 'Habilidades',
    },
    {
      id: 'projetos',
      file: 'projetos',
      type: 'folder',
      section: 'projects',
      icon: 'folder',
      description: 'Projetos',
      defaultOpen: true,
      children: [
        {
          id: 'projeto-analytics-dashboard',
          file: 'analytics-dashboard.js',
          section: 'projects',
          icon: 'js',
          description: 'Analytics Dashboard',
        },
        {
          id: 'projeto-imobsystem',
          file: 'imobsystem.js',
          section: 'projects',
          icon: 'js',
          description: 'ImobSystem',
        },
        {
          id: 'projeto-acervohub',
          file: 'acervohub.js',
          section: 'projects',
          icon: 'js',
          description: 'AcervoHub',
        },
        {
          id: 'projeto-somdiabetes',
          file: 'somdiabetes.js',
          section: 'projects',
          icon: 'js',
          description: 'SomDiabetes',
        },
      ],
    },
    {
      id: 'experiencia',
      file: 'experiencia.js',
      section: 'experience',
      icon: 'js',
      description: 'Experiência',
    },
    {
      id: 'formacao',
      file: 'formacao.js',
      section: 'education',
      icon: 'js',
      description: 'Formação',
    },
    {
      id: 'contato',
      file: 'contato.jsx',
      section: 'contact',
      icon: 'react',
      description: 'Contato',
    },
  ],
}

/**
 * Achata a árvore em uma lista plana de entradas abertáveis (com `section`).
 * Usado pelo contexto (fileIndex) e por quem precisar de uma lista simples.
 */
export function flattenFiles(tree) {
  const result = []
  const walk = (entries) => {
    for (const entry of entries) {
      if (entry.section) result.push(entry)
      if (entry.children) walk(entry.children)
    }
  }
  walk(tree.files)
  return result
}

/** Abas abertas ao iniciar (Welcome + Sobre). */
export const initialOpened = ['welcome', 'sobre']

/** Arquivo ativo ao iniciar. */
export const initialActive = 'welcome'

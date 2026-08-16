import { projects } from './projects'

// converte projeto em item da arvore do explorer
export function getProjectFileNode(project) {
  let icon = project.icon
  if (!icon) {
    const techs = (project.technologies || []).map((t) => t.toLowerCase())
    if (techs.some((t) => t.includes('typescript') || t === 'ts')) icon = 'ts'
    else if (techs.some((t) => t.includes('python') || t === 'py')) icon = 'python'
    else if (techs.some((t) => t.includes('react') || t === 'jsx')) icon = 'react'
    else icon = 'js'
  }

  let fileName = project.file
  if (!fileName) {
    const ext = icon === 'python' ? '.py' : icon === 'ts' ? '.ts' : icon === 'react' ? '.jsx' : '.js'
    fileName = `${project.id}${ext}`
  }

  return {
    id: `projeto-${project.id}`,
    file: fileName,
    section: 'projects',
    icon,
    description: project.title,
    projectId: project.id,
  }
}

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
      get children() {
        return projects.map(getProjectFileNode)
      },
    },
    {
      id: 'experiencia',
      file: 'experiencia.jsx',
      section: 'experience',
      icon: 'react',
      description: 'Experiência',
    },
    {
      id: 'formacao',
      file: 'formacao.jsx',
      section: 'education',
      icon: 'react',
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

// transforma a arvore em uma lista plana de arquivos
export function flattenFiles(tree = workspaceTree) {
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

// abas abertas por padrao
export const initialOpened = ['welcome', 'sobre']

// aba inicial
export const initialActive = 'welcome'


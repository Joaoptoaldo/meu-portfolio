/**
 * Conteúdo da tela de boas-vindas (Welcome).
 * Atalhos de "Iniciar" para as principais seções do portfólio.
 * Contatos usam placeholders explícitos até serem fornecidos.
 */
import { profile } from './profile'

export const welcomeStarter = [
  { section: 'about', label: 'Sobre mim' },
  { section: 'experience', label: 'Ver experiência' },
  { section: 'projects', label: 'Ver projetos' },
  { section: 'contact', label: 'Entrar em contato' },
]

export const welcomeConnect = [
  { label: 'GitHub', value: profile.github, href: profile.github },
  { label: 'LinkedIn', value: profile.linkedin, href: profile.linkedin },
  { label: 'E-mail', value: profile.email, href: `mailto:${profile.email}` },
]
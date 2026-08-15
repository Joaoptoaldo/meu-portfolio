/**
 * Dados da seção "Contato".
 * Canais usam placeholders explícitos [ ... ] até serem fornecidos
 * (regra §9 do PORTFOLIO_CONTEXT.md).
 */
import { profile } from './profile'

export const contact = {
  intro:
    'Prefere conversar? Fique à vontade para me chamar por um dos canais abaixo.',
  channels: [
    {
      label: 'E-mail',
      value: profile.email,
      href: `mailto:${profile.email}`,
      hint: 'Resposta direta',
    },
    { label: 'GitHub', value: profile.github, href: profile.github },
    { label: 'LinkedIn', value: profile.linkedin, href: profile.linkedin },
  ],
}
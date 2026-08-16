/**
 * Dados da seção "Contato".
 * Canais usam os dados reais do perfil (profile.js).
 */
import { profile } from './profile'

/** Número do WhatsApp apenas com dígitos, para o link wa.me. */
const whatsAppDigits = (profile.whatsapp ?? '').replace(/\D/g, '')

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
    {
      label: 'WhatsApp',
      value: profile.whatsapp ?? '',
      href: `https://wa.me/${whatsAppDigits}`,
      hint: whatsAppDigits ? 'Resposta rápida' : 'Em breve',
    },
  ],
}
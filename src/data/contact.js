/**
 * Modelo de dados Orientado a Objetos para Canais de Contato.
 *
 * Ao adicionar um novo canal de contato, altere APENAS este arquivo.
 */
import { profile } from './profile'

export class ContactChannel {
  /**
   * @param {Object} data
   * @param {string} data.label - Nome de exibição (ex: 'E-mail', 'WhatsApp')
   * @param {string} data.value - Valor real (endereço de e-mail, telefone, URL)
   * @param {string} [data.href] - Link de destino (gerado automaticamente se omitido)
   * @param {string} [data.hint] - Texto auxiliar/dica (ex: 'Resposta direta')
   */
  constructor({ label, value, href, hint }) {
    this.label = label
    this.value = value || ''
    this.hint = hint
    this._customHref = href
  }

  get href() {
    if (this._customHref) return this._customHref
    if (this.label === 'E-mail' && this.value) return `mailto:${this.value}`
    if (this.label === 'WhatsApp' && this.value) {
      const digits = this.value.replace(/\D/g, '')
      return digits ? `https://wa.me/${digits}` : '#'
    }
    return this.value || '#'
  }

  toSearchableLines() {
    return [this.label, this.value, this.hint].filter(Boolean)
  }
}

const whatsAppDigits = (profile.whatsapp ?? '').replace(/\D/g, '')

export const contact = {
  intro:
    'Prefere conversar? Fique à vontade para me chamar por um dos canais abaixo.',
  channels: [
    new ContactChannel({
      label: 'E-mail',
      value: profile.email,
      hint: 'Resposta direta',
    }),
    new ContactChannel({
      label: 'GitHub',
      value: profile.github,
    }),
    new ContactChannel({
      label: 'LinkedIn',
      value: profile.linkedin,
    }),
    new ContactChannel({
      label: 'WhatsApp',
      value: profile.whatsapp ?? '',
      hint: whatsAppDigits ? 'Resposta rápida' : 'Em breve',
    }),
  ],
}
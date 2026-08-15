/**
 * Conteúdo da seção "Sobre".
 * Estritamente factual; dados ausentes ficam como placeholders explícitos.
 */
import { profile } from './profile'

export const about = {
  intro: `[PARÁGRAFO DE APRESENTAÇÃO SOBRE QUEM É O JOÃO PEDRO — a definir.]`,
  highlights: [
    `Curso de ${profile.formation} na ${profile.institution}`,
    `Desenvolvimento web e APIs com foco em backend`,
    `Projetos acadêmicos e pessoais — algoritmos, banco de dados e sistemas`,
  ],
  focus: [
    'Aprender e resolver problemas com software',
    'Código limpo, testável e de fácil manutenção',
    'Desenvolvimento orientado a dados e à arquitetura',
  ],
}
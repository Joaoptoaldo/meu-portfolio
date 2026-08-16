/**
 * Conteúdo da seção "Sobre".
 * Estritamente factual; dados ausentes ficam como placeholders explícitos.
 */
import { profile } from './profile'

export const about = {
  intro: `Sou estudante de Sistemas de Informação e desenvolvedor de software, interessado em transformar problemas em soluções através da tecnologia. Tenho desenvolvido projetos envolvendo aplicações web, APIs, bancos de dados e análise de dados, buscando evoluir continuamente na construção de software organizado, funcional e de fácil manutenção.`,
  highlights: [
    `Curso de ${profile.formation} na ${profile.institution}`,
    `Desenvolvimento web e APIs com foco em backend`,
    `Projetos acadêmicos e pessoais - algoritmos, banco de dados e sistemas`,
  ],
  focus: [
    'Aprender e resolver problemas com software',
    'Código limpo, testável e de fácil manutenção',
    'Desenvolvimento orientado a dados e à arquitetura',
  ],
}
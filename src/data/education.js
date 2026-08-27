/**
 * Modelo de dados Orientado a Objetos para Formação Acadêmica.
 *
 * Ao adicionar um novo item de formação, altere APENAS este arquivo.
 */

export class EducationItem {
  /**
   * @param {Object} data
   * @param {string} data.title - Nome do curso
   * @param {string} data.institution - Nome da instituição
   * @param {string} [data.status='Em andamento'] - Status do curso
   * @param {string} data.duration - Duração (ex: '8 semestres')
   */
  constructor({ title, institution, status = 'Em andamento', duration }) {
    this.title = title
    this.institution = institution
    this.status = status
    this.duration = duration
  }

  /**
   * Retorna os dados em linhas pesquisáveis para a busca global.
   */
  toSearchableLines() {
    return [this.title, this.institution, this.status, this.duration]
  }
}

/**
 * Formação acadêmica do portfólio.
 */
export const education = {
  items: [
    {
      title: 'Sistemas de Informação',
      institution: 'Universidade Franciscana — UFN',
      status: 'Em andamento',
      duration: '8 semestres',
    },
  ].map((item) => new EducationItem(item)),
}
/**
 * Experiência — seção dividida em duas partes:
 *   - experiência profissional (ainda sem dados confirmados);
 *   - experiência acadêmica e colaborativa (apenas o comprovado).
 *
 * Nada de períodos, cargos, empresas ou métricas sem evidência.
 */
export const experience = {
  professional: {
    heading: 'Experiência profissional',
    empty: 'Ainda não há experiências profissionais cadastradas.',
  },
  academic: {
    heading: 'Experiência acadêmica e colaborativa',
    items: [
      {
        title: 'SomDiabetes',
        kind: 'Projeto colaborativo — aluno · Sistemas de Informação',
        detail:
          'Participação em equipe no desenvolvimento de sistema de monitoramento de diabetes, em parceria UFN + Laboratório de Práticas da Computação + ER Clinic. Detalhes e tecnologias na seção Projetos.',
      },
      {
        title: 'Desenvolvimento de projetos acadêmicos e pessoais',
        kind: 'Sistemas de Informação · UFN',
        detail:
          'Construção de aplicações web, APIs, projetos de algoritmos e estruturas de dados e sistemas — ver seção Projetos para a lista atual.',
      },
    ],
  },
}
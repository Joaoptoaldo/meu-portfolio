/**
 * Registro de seções: associa o id de seção (definido em data/sections.js)
 * ao componente que renderiza o conteúdo.
 * Toda seção prevista já possui componente real.
 */
import Welcome from './Welcome'
import About from './About'
import Skills from './Skills'
import Projects from './Projects'
import Experience from './Experience'
import Education from './Education'
import Contact from './Contact'

// Cada entrada é trocada pelo componente real conforme a etapa avança.
const sections = {
  welcome: Welcome,
  about: About,
  skills: Skills,
  projects: Projects,
  experience: Experience,
  education: Education,
  contact: Contact,
}

export default sections

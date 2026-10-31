/**
 * Registro de seções: associa o id de seção (definido em data/sections.js)
 * ao componente que renderiza o conteúdo.
 * Toda seção prevista já possui componente real.
 *
 * Lazy loading implementado para melhorar performance:
 * - Reduz bundle size inicial
 * - Melhora TBT (Total Blocking Time)
 * - Carrega seções sob demanda
 */
import { lazy } from 'react'

// Lazy loading de cada seção (code splitting)
const Welcome = lazy(() => import('./Welcome'))
const About = lazy(() => import('./About'))
const Skills = lazy(() => import('./Skills'))
const Projects = lazy(() => import('./Projects'))
const Experience = lazy(() => import('./Experience'))
const Education = lazy(() => import('./Education'))
const Contact = lazy(() => import('./Contact'))

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

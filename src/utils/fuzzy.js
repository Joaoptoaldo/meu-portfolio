/**
 * Fuzzy matching — ranking de resultados estilo Quick Open do VS Code.
 *
 * Implementa subsequência com pontuação:
 *  - bônus para correspondência em inícios de palavra/camelCase/fronteiras;
 *  - bônus de continuidade (caractere consecutivo) e de início de string;
 *  - penalidade linear pelo avanço na string.
 *
 * Retorna um score (quanto maior, melhor); 0/negativo = sem match.
 */

/** Acumula `delta` em `score` com `weight` e aplica a penalidade por salto. */
function bump(score, weight, delta) {
  return score + weight - delta * 0.1
}

/**
 * Pontua o match de `query` dentro de `target`.
 * @returns {number} score (0 se não houver match).
 */
export function fuzzyScore(query, target) {
  const q = query.toLowerCase()
  const t = target.toLowerCase()
  if (!q) return 0
  if (t === q) return Number.MAX_SAFE_INTEGER

  const qLen = q.length
  const tLen = t.length
  let score = 0
  let qi = 0

  // cache de letras para tokenização de fronteiras
  let prevWasWordBoundary = true
  let consecutive = 0

  for (let i = 0; i < tLen && qi < qLen; i++) {
    const c = t[i]
    if (c === q[qi]) {
      // fronteira de palavra ou camelCase
      const isBoundary =
        prevWasWordBoundary ||
        (i > 0 &&
          (c === c.toUpperCase() && t[i - 1] !== c.toUpperCase() && /[a-z]/.test(t[i - 1]))) ||
        !/[a-z0-9_.-]/.test(c) ||
        /[\s_/.-]/.test(t[i - 1])

      if (isBoundary && i > 0) {
        score = bump(score, 0.9, consecutive ? 0.001 : 0.5)
      } else if (i === 0) {
        // começo de string: forte prioridade
        score = bump(score, 3, 0)
      } else {
        score = bump(score, consecutive ? 0.9 : 0.4, 0.5)
      }

      if (consecutive) score = bump(score, 0.9, 0)
      consecutive++
      qi++
      if (qi === qLen) break
    } else {
      consecutive = 0
    }
    prevWasWordBoundary = /[\s/._-]/.test(c)
  }

  return qi === qLen ? score : 0
}

/**
 * Ordena `items` pela pontuação fuzzy da `query` nos campos `haystacks`.
 * Retorna os itens que tiveram match.
 */
export function fuzzySearch(items, query, haystackOf) {
  const q = query.trim().toLowerCase()
  if (!q) return items

  const scored = []
  for (const item of items) {
    const text = haystackOf(item)
    if (!text) continue
    const score = fuzzyScore(q, text)
    if (score > 0) scored.push({ item, score })
  }

  scored.sort((a, b) => b.score - a.score)
  return scored.map((s) => s.item)
}
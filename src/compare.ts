import { compareSegments, validateAndParse } from './utils'

export function compareVersion(v1: string, v2: string) {
  const n1 = validateAndParse(v1)
  const n2 = validateAndParse(v2)

  const p1 = n1.pop()
  const p2 = n2.pop()

  // compare number
  const r = compareSegments(n1, n2)
  if (r !== 0)
    return r

  // compare pre
  if (p1 && p2)
    return compareSegments(p1.split('.'), p2.split('.'))
  else if (p1 || p2)
    return p1 ? -1 : 1

  return 0
}

export function getMaxVersion(v1: string, v2: string) {
  return compareVersion(v1, v2) > 0 ? v1 : v2
}

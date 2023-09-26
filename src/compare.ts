export const semver
  = /^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i

export function validateAndParse(version: string) {
  if (typeof version !== 'string')
    throw new TypeError('Expected string')

  const match = version.match(semver)
  if (!match)
    throw new Error(`Invalid ${version} received`)

  match.shift()
  return match
}

function tryParse(v: string) {
  const n = Number.parseInt(v, 10)
  return Number.isNaN(n) ? v : n
}

function forceType(a: string | number, b: string | number) {
  return typeof a !== typeof b ? [String(a), String(b)] : [a, b]
}

function compareStrings(a: string, b: string) {
  const [ap, bp] = forceType(tryParse(a), tryParse(b))
  if (ap > bp)
    return 1
  if (ap < bp)
    return -1
  return 0
}

export function compareSegments(a: string | string[] | RegExpMatchArray, b: string | string[] | RegExpMatchArray) {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const r = compareStrings(a[i] || '0', b[i] || '0')
    if (r !== 0)
      return r
  }
  return 0
}

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

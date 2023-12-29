export default function toHaveLength(a: unknown, b: number): boolean {
  if (!a) { return false }

  if (typeof a === 'object') {
    return Object.keys(a).length === b
  } else if (typeof a === 'string' || Array.isArray(a)) {
    return a.length === b
  }

  return false
}

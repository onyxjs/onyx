export default function toBe(a: unknown, b: unknown): boolean {
  return (a === b) && (a !== b || Object.is(a, b))
}

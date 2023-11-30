export default function toBeInstanceOf(a: unknown, b: Function): boolean {
  return (a instanceof b) || (a?.constructor === b)
}

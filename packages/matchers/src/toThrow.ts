export default function toThrow(a: (...args: unknown[]) => unknown, b?: string | Function |  Error): boolean {
  try {
    a()
  } catch (e) {
    if (e instanceof Error) {
      if (typeof b === 'undefined') {
        return true
      } else if (typeof b === 'string') {
        return e.message.includes(b) || e.name === b
      } else {
        return e.name === b.name
      }
    } else if (e instanceof String && b instanceof String) {
      return e === b
    }
  }
  return false
}

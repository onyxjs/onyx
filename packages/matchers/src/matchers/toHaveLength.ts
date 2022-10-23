export default function toHaveLength (actual: any, expected: number): boolean {
  // console.log('actual: ', actual, ' expected: ', expect)
  // console.log('actual type: ', typeof actual)
  // console.log('expected type: ', typeof expected)
  if (!actual || typeof actual === 'boolean') return false
  // else if (typeof actual === 'function') { console.log('function'); return actual().length === expected}
  // else if (typeof actual === 'object') { console.log('object'); return Object.keys(expected).length === expected}
  else return (actual as any[]).length === expected
}
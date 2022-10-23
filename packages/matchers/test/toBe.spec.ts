import { expect as onyxExpect } from '../src/Expectation'

describe('toBe', () => {
  const pass: any[] = [
    [1, 1, true],
    ['1', '1', true],
    [null, null, true],
    [undefined, undefined, true],
  ]

  const failMsg = 'onyxToBe failed'

  const fail: any[] = [
    ['1', 1, failMsg],
    [{ a: 1 }, { b: 2 }, failMsg],
    [{ a: 1 }, { a: 1 }, failMsg],
    [[1, 2], [2, 3], failMsg],
    [[], [], failMsg],
    [{}, {}, failMsg],
  ]
  
  test.each(pass)('toBe(%p, %p) should return true', (a, b, expected) => {
    expect(onyxExpect(a).onyxToBe(b)).toBe(expected)
  })

  test.each(fail)('toBe(%p, %p) should throw an expect error', (a, b, expected: string) => {
    expect(() => onyxExpect(a).onyxToBe(b)).toThrowError(expected)
  })
})
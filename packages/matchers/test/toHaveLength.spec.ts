import { expect as onyxExpect } from '../src/Expectation'

describe('toBe', () => {
  const pass: any[] = [
    [[1, 2, 3], 3, true],
    ['1', 1, true],
    // [{ a: 1, b: 2, c: 3 }, 3, true],
    // [(() => [1, 2, 3, 4, 5])(), 5, true],
    // [() => [1, 2, 3, 4, 5], 5, true],
  ]

  const failMsg = 'onyxToHaveLength failed'

  const fail: any[] = [
    ['1', 0, failMsg],
    [true, { b: 2 }, failMsg],
    [false, { a: 1 }, failMsg],
    [[1, 2], [2, 3], failMsg],
    [[], [], failMsg],
    [{}, {}, failMsg],
  ]
  
  test.each(pass)('toHaveLength(%p, %p) should return true', (a, b: number, expected) => {
    expect(onyxExpect(a).onyxToHaveLength(b)).toBe(expected)
  })

  test.each(fail)('toHaveLength(%p, %p) should throw an expect error', (a, b: number, expected: string) => {
    expect(() => onyxExpect(a).onyxToHaveLength(b)).toThrowError(expected)
  })
})
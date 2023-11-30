import toBe from '../src/toBe'

describe('toBe', () => {
  it('should match simple values', () => {
    expect(toBe(1, 1)).toBeTruthy()
    expect(toBe('onyx', 'onyx')).toBeTruthy()
    expect(toBe(0, 0)).toBeTruthy()
    expect(toBe(0, -1)).toBeFalsy()
  })

  it('should not match objects', () => {
    expect(toBe({}, {})).toBeFalsy()
    expect(toBe({ a: 'b' }, { a: 'b' })).toBeFalsy()
    expect(toBe({ a: { b: 'c' } }, { a: { b: 'c' } })).toBeFalsy()
    expect(toBe({}, { a: 'b' })).toBeFalsy()
    expect(toBe({ a: 'b' }, { a: 'c' })).toBeFalsy()
  })

  it('should not match NaN', () => {
    expect(toBe(NaN, NaN)).toBeFalsy()
    expect(toBe(NaN, 0)).toBeFalsy()
  })

  it('should differ 0 from -0', () => {
    expect(toBe(0, -0)).toBeFalsy()
  })
})

import toBeInstanceOf from '../src/toBeInstanceOf'

describe('toBeInstanceOf', () => {
  it('Should be an instance of', () => {
    expect(toBeInstanceOf('string', String)).toBeTruthy()
    expect(toBeInstanceOf(123, Number)).toBeTruthy()
    expect(toBeInstanceOf([], Array)).toBeTruthy()
    expect(toBeInstanceOf({}, Promise)).toBeFalsy()
  })
})

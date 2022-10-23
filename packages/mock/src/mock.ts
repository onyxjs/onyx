export const mockSymbol = Symbol('isMock')

export interface Mock extends Function {
  calls: any[][]
  returns: any[]
  errors: any[]
  reset: () => void
  [mockSymbol]: true
}

export default function mock(fn: ((...args: any[]) => any), cb?: (args: any[], result: any) => any): Mock {
  const instance = ((...args: any[]) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment
      const result = fn(...args)
      if (cb) { cb(args, result) }
      instance.calls.push(args)
      instance.returns.push(result)
      return result as Mock
    } catch (e) {
      instance.errors.push(e)
      throw e
    }
  }) as unknown as Mock
  instance.calls = [] as any[][]
  instance.returns = [] as any[]
  instance.errors = [] as Error[]
  instance.reset = (): void => {
    instance.calls = []
    instance.returns = []
    instance.errors = []
  }
  instance[mockSymbol] = true

  return instance
}

export function isMock(v: unknown): v is Mock {
  if (typeof v !== 'function') {
    return false
  }

  return (v as Mock)[mockSymbol]
}

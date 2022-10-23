// Matchers
import { matchers, AnyMatchers, onyx } from './matchers'

type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never

type Expectations<M extends AnyMatchers> = { [K in keyof M]: OmitFirstArg<M[K]> }

export type NegatedExpectations<M extends AnyMatchers> = Expectations<M> & {
  not: Expectations<M>
}


type ExpectResult<A, E> = {
  matcher: string
  error?: ExpectError
  status: ExpectStatus
  actual: A
  expected: E
}

enum ExpectStatus {
  PASS = 'Pass',
  FAIL = 'Fail',
}

const _expectFail = <F, P = never> (fail: F): ExpectationResult<F, P> => ({ _status: ExpectStatus.FAIL, fail })
const _expectPass = <P, F = never> (pass: P): ExpectationResult<F, P> => ({ _status: ExpectStatus.PASS, pass })

const expectPass: <F = never, P = never> (pass: P) => ExpectationResult<F, P> = _expectPass
const expectFail: <F = never, P = never> (fail: F) => ExpectationResult<F, P> = _expectFail

interface IExpectFail<F> {
  readonly _status: ExpectStatus.FAIL
  readonly fail: F
}

interface IExpectPass<P> {
  readonly _status: ExpectStatus.PASS
  readonly pass: P
}

type ExpectationResult<F, P> = IExpectFail<F> | IExpectPass<P>

export function expectations<M extends AnyMatchers = AnyMatchers>(
  currentMatchers: M,
  expectation: any,
  not = false,
): Expectations<M> {
  const entries = Object.entries(currentMatchers)
    .map(([key, value]) => [
      key,
      (...args: any[]): boolean => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const result = value(expectation, ...args)
        if (result === not) { throw new ExpectError(`${not ? 'not.' : ''}${key} failed`) } // TODO diff
        return result
      },
    ])
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment
  return Object.assign({}, ...Array.from(entries, ([k, v]: any[]) => ({[k]: v}) ))
}


export function expect<M extends onyx.Matchers> (
  expectation: any,
): NegatedExpectations<M> {
  return {
      ...expectations<M>(matchers as M, expectation, false),
      not: expectations<M>(matchers as M, expectation, true),
    }
}

export class ExpectError extends Error {
  public constructor(message: string) {
    super(message)
    this.name = 'ExpectError'
  }
}

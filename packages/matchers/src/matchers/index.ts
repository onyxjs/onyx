import onyxToBe from './toBe'
import onyxToHaveLength from './toHaveLength'

export interface AnyMatchers {
  [key: string]: (expectation: any, ...args: any[]) => boolean
}

export let matchers = {
  onyxToBe,
//  toBeDefined,
//  toBeFalse,
//  toBeFalsy,
//  toBeInstanceOf,
//  toBeNaN,
//  toBeNull,
//  toBeTrue,
//  toBeTruthy,
//  toBeTypeOf,
//  toBeUndefined,
//  toContain,
//  toEqual,
  onyxToHaveLength,
//  toStrictlyEqual,
//  toThrow,
}

type BuiltInMatchers = typeof matchers & AnyMatchers

export namespace onyx {
  export type Matchers = BuiltInMatchers
}

export function extendMatchers(ext: AnyMatchers): void {
  matchers = {
    ...matchers,
    ...ext,
  }
}
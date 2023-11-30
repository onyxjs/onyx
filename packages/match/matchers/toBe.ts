import { MatcherResult, MatcherFn } from './'

export type ToBe = MatcherFn<'toBe'>

export const toBe: ToBe = function (received, expected) {
  
  return {
    actual: received,
    expected,
    message: '',
    name: 'toBe',
    passed: true,
    result: false
  }
}

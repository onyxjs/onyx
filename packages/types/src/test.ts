import { Suite } from '.'

type TestFn = () => void | Promise<void>

interface OnyxSpec {
  description: string
  fn: TestFn
  parent: Suite
}

export type {
  OnyxSpec,
  TestFn,
}

import { Hooks } from "../hooks"

export enum RunStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  PASSED = 'passed',
  FAILED = 'failed',
  SKIPPED = 'skipped',
  TODO = 'todo',
}

export type BaseResult = {
  description: string
  messages: Array<string>
  failures: Array<Error>
  hooks: Hooks
  status: RunStatus
  fullDescription: string
  time: number
}

type TestResult = { type: 'test' }
type SuiteResult = { type: 'suite' }

export type Result<T extends 'suite' | 'test'> = (
  T extends 'suite' ?
    SuiteResult :
      T extends 'test' ?
        TestResult :
          never
)

export interface RunnableResult extends BaseResult {
  id: string
  description: string
  time: number
}

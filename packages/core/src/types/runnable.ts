type RunnableOptions = {
  bail: boolean
  sequential: boolean
  timeout: number
}

export enum RunStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  PASSED = 'passed',
  FAILED = 'failed',
  SKIPPED = 'skipped',
  TODO = 'todo',
}

type _RunStatus = keyof typeof RunStatus

export type {
  _RunStatus,
  RunnableOptions,
}

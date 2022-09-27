import { BaseResult } from "./types/result"
import { RunnableOptions, RunStatus } from "./types/runnable"
import { Suite } from "."

export enum RunnableTypes {
  SUITE = 'suite',
  TEST = 'test',
}

export type Runnables = RunnableTypes

export type RunnableType<T extends Runnables> = (
  T extends RunnableTypes.SUITE ? 'suite'
    : T extends RunnableTypes.TEST ? 'test' 
      : never
)

export const runnableSymbol = Symbol('isRunnable')

abstract class Runnable {
  public description: string
  public options: RunnableOptions
  public parent: Suite | null
  public start = 0
  public status: RunStatus


  constructor (description: string, options: RunnableOptions, parent: Suite | null) {
    this.description = description
    this.options = options
    this.parent = parent
    this.status = RunStatus.PENDING
  }

  public abstract run(options: Partial<RunnableOptions>): Promise<BaseResult>
}

export {
  Runnable,
}

import { Runnable } from "./runnable"
import { BaseResult } from "./types/result"
import { RunnableOptions } from "./types/runnable"
import { Suite } from "."

const runnableSymbol = Symbol('isRunnable')

class Test extends Runnable {
  constructor(description: string, options: any, parent: Suite) {
    super(description, options, parent)
  }

  public run(options: Partial<RunnableOptions>): Promise<BaseResult> {
    if (options.sequential) {}
    else {}
    return {} as Promise<BaseResult>
  }
}

export {
  Test,
  runnableSymbol,
}

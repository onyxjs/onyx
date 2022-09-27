type RunOptions = { skip: boolean }

type TestFn = (() => void) | (() => Promise<void>)


export default class Spec {
  public description: string
  public fn: TestFn
  public parent: null

  constructor (description: string, fn: TestFn, parent = null) {
    this.description = description
    this.fn = fn
    this.parent = parent
  }

  async execute (options: RunOptions): Promise<void> {
    if (options.skip) 
    try {
      await this.fn.call(this)
    } catch (error) {
      throw error
    }
  }

  
}
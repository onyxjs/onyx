import { onyxGlobalContext } from "./context";
import { Test } from "./test";

import type { PromisableFn, TaskStatus } from "./types";

interface SuiteTask {
  description: string;
  parent?: Suite;
  suites: Suite[];
  tests: Test[];

  addSuite(suite: Suite): void;
  addTest(test: Test): void;

  run(): Promise<void>;
}

class Suite implements SuiteTask {
  description: string;
  parent?: Suite;
  root: boolean = false;
  suites: Suite[] = [];
  tests: Test[] = [];

  // hooks
  beforeAllHooks: PromisableFn<void>[] = [];
  afterAllHooks: PromisableFn<void>[] = [];
  beforeEachHooks: PromisableFn<void>[] = [];
  afterEachHooks: PromisableFn<void>[] = [];

  constructor(description: string, parent?: Suite, fn?: PromisableFn<void>) {
    this.description = description;
    this.suites = [];
    this.tests = [];

    this.parent = parent;
  }

  addSuite(suite: Suite) {
    console.log("this === rootSuite?", this.root);
    console.log("Adding suite:", suite.description);
    this.suites.push(suite);
    console.log("After push, suites count:", this.suites.length);
  }

  addTest(test: Test) {
    this.tests.push(test);
  }

  async run() {
    for (const hook of this.beforeAllHooks) {
      await hook();
    }

    for (const test of this.tests) {
      for (const hook of this.beforeEachHooks) {
        await hook();
      }

      await test.run();

      for (const hook of this.afterEachHooks) {
        await hook();
      }
    }

    for (const childSuite of this.suites) {
      await childSuite.run();
    }

    for (const afterAllHook of this.afterAllHooks) {
      await afterAllHook();
    }
  }

  getFullDescription(): string {
    if (this.parent && !this.parent.root) {
      return `${this.parent.getFullDescription()} -> ${this.description}`;
    }
    return this.description;
  }

  reset() {
    this.tests = [];
    this.suites = [];
    this.beforeAllHooks = [];
    this.afterAllHooks = [];
    this.beforeEachHooks = [];
    this.afterEachHooks = [];
  }

  getResults(): {
    description: string;
    status: TaskStatus;
    error?: Error;
    durationMs: number;
  }[] {
    let results: Array<{
      description: string;
      status: TaskStatus;
      error?: Error;
      durationMs: number;
    }> = [];

    for (const test of this.tests) {
      results.push({
        description: `${this.getFullDescription()} > ${test.description}`,
        status: test.status,
        error: test.error,
        durationMs: test.durationMs ?? 0,
      });
    }

    for (const child of this.suites)
      results = results.concat(child.getResults());
    return results;
  }
}

export const rootSuite = new Suite("root");

export function getCurrentSuite() {
  return onyxGlobalContext.currentSuite || rootSuite;
}

export function clearContext() {
  onyxGlobalContext.suites.length = 0;
  rootSuite.reset();
  onyxGlobalContext.currentSuite = rootSuite;
}

export { Suite };

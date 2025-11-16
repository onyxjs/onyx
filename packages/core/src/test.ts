interface TestTask {
  description: string;
  fn: () => Promise<void> | void;
  result?: TestResult;
}

interface TestResult {
  test: Test;
  status: Extract<TaskStatus, "pass" | "fail" | "skipped">;
  error?: Error;
  duration?: number;
}

enum TaskStatus {
  Pending = "pending",
  Running = "running",
  Pass = "pass",
  Fail = "fail",
  Skipped = "skipped",
}

class Test implements Test {
  description: string;
  fn: () => Promise<void> | void;
  state: TaskStatus = TaskStatus.Pending;

  // parent?: Suite; // @TODO - this should be a reference to the parent once they are created
  result?: TestResult;

  constructor(description: string, fn: () => Promise<void> | void) {
    this.description = description;
    this.fn = fn;
  }

  async run() {
    const start = performance.now();

    try {
      this.state = TaskStatus.Running;
      await this.fn();

      this.result = {
        test: this,
        status: TaskStatus.Pass,
        duration: performance.now() - start,
      };
    } catch (error) {
      this.result = {
        test: this,
        status: TaskStatus.Fail,
        error: error instanceof Error ? error : new Error(String(error)),
        duration: performance.now() - start,
      };
    }
  }
}

export { Test, type TestResult, type TestTask };

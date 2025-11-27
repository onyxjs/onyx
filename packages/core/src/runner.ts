// runner.ts
import fs from "fs";
import path from "path";
import chalk from "chalk";
import { onyxGlobalContext } from "./context"; // worker-local context not needed here
import { clearContext, rootSuite } from "./suite";
import { pathToFileURL } from "url";
import { clear } from "console";

interface RunnerOptions {
  testDir?: string;
  pattern?: RegExp;
}

async function runTestsCLI(options: RunnerOptions = {}) {
    // Log context instance identity before importing tests
    console.log("[runner] rootSuite instance:", rootSuite);
  // Always use the source test directory relative to the package root
  const packageRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
  const testDir = path.resolve(packageRoot, "test");
  // const packageRoot = path.resolve(__dirname, "..");
  // const testDir = path.resolve(packageRoot, "test");
  console.log("Using test directory:", testDir);

  // discover test files
  let files = fs
    .readdirSync(testDir)
    .filter((f) => f.endsWith(".spec.js"))
    .map((f) => path.join(testDir, f));

  if (options.pattern) files = files.filter((f) => options.pattern!.test(f));

  console.log("Discovered test files:", files);

  for (const file of files) {
    console.log("Importing test file:", file);
    // Reset rootSuite
    clearContext();

    onyxGlobalContext.currentSuite = rootSuite;

    // Run file within currentSuite context
    await (async function () {
      const previousSuite = onyxGlobalContext.currentSuite;
      onyxGlobalContext.currentSuite = rootSuite;

      try {
        await import(pathToFileURL(file).href);
      } finally {
        onyxGlobalContext.currentSuite = previousSuite;
      }
    })();
  }

  // Run all tests
  await rootSuite.run();

  // Collect and report results
  const results = rootSuite.getResults();

  // reporting
  let total = 0,
    passed = 0,
    failed = 0;

  for (const r of results) {
    total++;
    if (r.status === "pass") {
      passed++;
      console.log(chalk.green("✅"), r.description, `(${r.durationMs}ms)`);
    } else {
      failed++;
      console.log(chalk.red("❌"), r.description, `(${r.durationMs}ms)`);
      if (r.error) console.error(chalk.red(r.error));
    }
  }

  console.log(chalk.bold(`\nTotal: ${total}, Passed: ${passed}, Failed: ${failed}`));

  if (failed > 0) process.exit(1);
}

export { runTestsCLI };

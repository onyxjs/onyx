# Usage

## Setup

```bash
# Install dependencies
pnpm setup:deps

# Build all packages
bazel build //...

# Build target package
bazel build //packages/<package_name>

# Test all packages
bazel test //...

# Test target package
bazel test //packages/<package_name>

# Lint *.bazel files
pnpm bazel:lint

# Lint && Fix *.bazel files
pnpm bazel:lint-fix

# Lint JavaScript && TypeScript files
pnpm lint

# Lint && Fix JavaScript && TypeScript files
pnpm lint:fix
```
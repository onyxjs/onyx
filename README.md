# Usage

## Setup

```bash
# Install dependencies
yarn setup:deps

# Build all packages
bazel build //...

# Build target package
bazel build //packages/<package_name>

# Test all packages
bazel test //...

# Test target package
bazel test //packages/<package_name>
```
"""Wrapper for compiling with typescript
"""

load("@aspect_rules_ts//ts:defs.bzl", _ts_project = "ts_project")

def ts_project(srcs, name = "tsconfig", tsconfig = "//:tsconfig", deps = [], data = [], **kwargs):
    """
        A macro around the typescript ts_project rule

    Args:
        name: name
        srcs: srcs
        tsconfig: tsconfig
        deps: deps
        data: data
        **kwargs: **kwargs

    """

    srcs = srcs if srcs else native.glob(
        include = ["packages/**/src/**/*.ts"],
        exclude = ["test/**/*.spec.ts", "node_modules/**/*"],
    )

    all_deps = ["//:node_modules/@types/node"]
    all_deps.extend(deps)

    _ts_project(
        name = name,
        srcs = srcs,
        data = data,
        declaration = True,
        declaration_map = True,
        source_map = True,
        tsconfig = tsconfig,
        deps = all_deps,
        **kwargs,
    )

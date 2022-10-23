""" Node JS dependencies
"""

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

# Variables set for pulling specific bazel dependencies

# JavaScript
RULES_JS_TAG = "1.5.3"

RULES_JS_SHA = "515277ae357e62f52e29e0bfb60b73d2d062b8d00d21351d31f37c5bb275d4f5"

# TypeScript
RULES_TS_TAG = "1.0.0-rc4"

RULES_TS_SHA = "743f0e988e4e3f1e25e52c79f9dc3da1ddd77507ae88787ae95b4e70c537872b"

# Jest
RULES_JEST_TAG = "0.10.0"

RULES_JEST_SHA = "bb3226707f9872185865a6381eb3a19311ca7b46e8ed475aad50975906a6cb6a"

# Macro function for installing dependencies
def fetch_build_bazel_rules_nodejs():
    http_archive(
        name = "aspect_rules_js",
        sha256 = RULES_JS_SHA,
        strip_prefix = "rules_js-%s" % RULES_JS_TAG,
        url = "https://github.com/aspect-build/rules_js/archive/refs/tags/v%s.tar.gz" % RULES_JS_TAG,
    )

    http_archive(
        name = "aspect_rules_ts",
        sha256 = RULES_TS_SHA,
        strip_prefix = "rules_ts-%s" % RULES_TS_TAG,
        url = "https://github.com/aspect-build/rules_ts/archive/refs/tags/v%s.tar.gz" % RULES_TS_TAG,
    )

    http_archive(
        name = "aspect_rules_jest",
        sha256 = RULES_JEST_SHA,
        strip_prefix = "rules_jest-%s" % RULES_JEST_TAG,
        url = "https://github.com/aspect-build/rules_jest/archive/refs/tags/v%s.tar.gz" % RULES_JEST_TAG,
    )

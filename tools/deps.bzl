""" Node JS dependencies
"""

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

# Variables set for pulling specific bazel dependencies

# JavaScript
RULES_JS_TAG = "1.34.0"

RULES_JS_SHA = "d9ceb89e97bb5ad53b278148e01a77a3e9100db272ce4ebdcd59889d26b9076e"

# TypeScript
RULES_TS_TAG = "2.1.0"

RULES_TS_SHA = "bd3e7b17e677d2b8ba1bac3862f0f238ab16edb3e43fb0f0b9308649ea58a2ad"

# Jest
RULES_JEST_TAG = "0.19.6"

RULES_JEST_SHA = "cae44cf7862b71f30c2ba6df6473bc8021c7a6c92c7d1771a58ebf5c99eb5776"

# Macro function for installing dependencies
def fetch_build_bazel_rules_nodejs():
    http_archive(
        name = "aspect_rules_js",
        sha256 = RULES_JS_SHA,
        strip_prefix = "rules_js-%s" % RULES_JS_TAG,
        url = "https://github.com/aspect-build/rules_js/releases/download/v%s/rules_js-v%s.tar.gz" % (RULES_JS_TAG, RULES_JS_TAG)
    )

    http_archive(
        name = "aspect_rules_ts",
        sha256 = RULES_TS_SHA,
        strip_prefix = "rules_ts-%s" % RULES_TS_TAG,
        url = "https://github.com/aspect-build/rules_ts/releases/download/v%s/rules_ts-v%s.tar.gz" % (RULES_TS_TAG, RULES_TS_TAG)
    )

    http_archive(
        name = "aspect_rules_jest",
        sha256 = RULES_JEST_SHA,
        strip_prefix = "rules_jest-%s" % RULES_JEST_TAG,
        url = "https://github.com/aspect-build/rules_jest/releases/download/v%s/rules_jest-v%s.tar.gz" % (RULES_JEST_TAG, RULES_JEST_TAG)
    )

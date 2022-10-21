"""Tools used internal for this repository.
"""

load("//tools:jest.bzl", _jest = "jest", _jest_test = "jest_test")
load("//tools:typescript.bzl", _ts_project = "ts_project")

jest = _jest
jest_test = _jest_test
ts_project = _ts_project

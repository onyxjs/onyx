// import { currentRoot } from './interface'

export type HookFn = (() => void) | (() => Promise<void>)
export type Hook = HookFn[]
export interface Hooks {
  beforeAll: Hook
  afterAll: Hook
  beforeEach: Hook
  afterEach: Hook
}
export type HookName = keyof Hooks

// @TODO: revisit hooks after Suite and Test are done
export const beforeAll: (root: { hooks: Hooks }, ...hooks: HookFn[]) => number = (root: { hooks: Hooks }, ...hooks: HookFn[]) => root.hooks.beforeAll.push(...hooks)
export const afterAll: (root: { hooks: Hooks }, ...hooks: HookFn[]) => number = (root: { hooks: Hooks }, ...hooks: HookFn[]) => root.hooks.afterAll.push(...hooks)
export const beforeEach: (root: { hooks: Hooks }, ...hooks: HookFn[]) => number = (root: { hooks: Hooks }, ...hooks: HookFn[]) => root.hooks.beforeEach.push(...hooks)
export const afterEach: (root: { hooks: Hooks }, ...hooks: HookFn[]) => number = (root: { hooks: Hooks }, ...hooks: HookFn[]) => root.hooks.afterEach.push(...hooks)

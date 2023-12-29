import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
    moduleFileExtensions: ['ts', 'js'],
    preset: "ts-jest",
    testMatch: [
        "**/test/*.spec.js",
        "**/test/*.spec.ts"
    ],
    testEnvironment: "jsdom",
}

export default config

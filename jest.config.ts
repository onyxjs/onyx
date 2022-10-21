import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
    moduleFileExtensions: ['ts', 'js'],
    preset: "ts-jest",
    testMatch: [
        "**/*.spec.js",
        "**/*.spec.ts"
    ],
}

export default config

import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
    preset: 'ts-jest/presets/default-esm', // or other ESM presets
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                useESM: true,
                diagnostics: { ignoreCodes: [ 'TS151001' ] }
            },
        ],
    },
    roots: [ "src", "tst" ]
}

export default jestConfig

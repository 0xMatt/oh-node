module.exports = {
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json'
        }
    },
    moduleFileExtensions: [
        'ts',
        'js'
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    testMatch: [
      '**/packages/*/test/*.spec.ts'
    ],
    "collectCoverageFrom": [
      "**/packages/*/src/**/*.{ts,tsx}",
      "!**/node_modules/**",
      "!**/index.ts",
    ],
    testEnvironment: 'node'
};


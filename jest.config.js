module.exports = {
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json'
        }
    },
  testPathIgnorePatterns: ["/dist/", "/node_modules/", "/index/"],
    moduleFileExtensions: [
        'ts',
        'js'
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    testMatch: [
      '**/packages/*/test/*.spec.(ts|js)'
    ],
    "collectCoverageFrom": [
      "**/packages/*/src/**/*.{ts,tsx}",
      "!**/node_modules/**",
      "!**/index.ts",
    ],
    testEnvironment: 'node'
};


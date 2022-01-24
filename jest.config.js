module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: './',
    modulePaths: ['<rootDir>'],
    setupFiles: ['<rootDir>/__tests__/setup.ts'],
    modulePathIgnorePatterns: ['<rootDir>/test/'],
    collectCoverageFrom: ['src/**/*.ts'],
    testPathIgnorePatterns: ['<rootDir>/.build', '<rootDir>/node_modules'],
    // testRegex: ".spec.ts$",
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    testMatch: ['<rootDir>/__tests__/(unit|integration)/**/*.spec.ts'],
    coverageDirectory: './coverage',
    testEnvironment: 'node',
};

module.exports = {
    testEnvironment: 'node',
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.js',
        '!src/**/*.test.js',
        '!src/**/*.spec.js'
    ],
    testMatch: [
        '**/src/**/*.test.js',
        '**/src/**/*.spec.js'
    ],
    coverageThreshold: {
        global: {
            lines: 80,
            functions: 80,
            branches: 70,
            statements: 80
        }
    }
};

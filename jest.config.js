module.exports = {
    "moduleNameMapper": {
        "\\.(css|less|scss|sass)$": "<rootDir>/src/__mocks__/styleMock.js",
        "\\.svg": "<rootDir>/src/__mocks__/svgMock.js"
    },
    collectCoverageFrom: [
        "src/**/*.js"
    ],
    coveragePathIgnorePatterns: [
        "src/index.js"
    ],
    coverageReporters: [
        "lcov", "text", "text-summary"
    ],
    coverageThreshold: {
        "src/**/*.js": {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        }
    },
};
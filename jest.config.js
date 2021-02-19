module.exports = {
    "moduleNameMapper": {
        "\\.(css|less|scss|sass)$": "<rootDir>/src/__mocks__/styleMock.js",
        "\\.svg": "<rootDir>/src/__mocks__/svgMock.js"
    },
    "setupFiles": [
        "<rootDir>/src/__mocks__/client.js"
    ]
};
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    collectCoverage: true,
    coverageReporters: ["text", "cobertura"],
    preset: "ts-jest",
    setupFilesAfterEnv: [
        "<rootDir>/src/setupTests.js"
    ],
    testEnvironment: "jsdom",
    testMatch: ["**/__tests__/**/*.(test|spec).(ts|tsx)"]
};


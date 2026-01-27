module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.json"
      }
    ]
  },
  moduleNameMapper: {
    "^@inventory/tokens$": "<rootDir>/../tokens/src",
    "^@inventory/shared$": "<rootDir>/../shared/src"
  }
};

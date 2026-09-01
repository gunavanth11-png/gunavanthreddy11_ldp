import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.jest.json",
      },
    ],
  },

  moduleFileExtensions: ["ts", "tsx", "js"],
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],

  moduleNameMapper: {
    "\\.(css|less|scss)$": "<rootDir>/src/test/styleMock.ts",
  },
};

export default config;
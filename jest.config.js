/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  extends: "./tsconfig.json",
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "^@controller/(.*)$": "<rootDir>/src/controller/$1",
  },
};

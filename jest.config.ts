import type {Config} from 'jest';

module.exports = {
  moduleNameMapper: {
    '\\.(scss)$': '<rootDir>/test/stylesMocks.js',
  },
  testEnvironment: 'jsdom'
};

const config: Config = {
  "maxWorkers": 1,
  "testEnvironment": "jsdom",
  "testPathIgnorePatterns": [
    "/node_modules/",
    "/.next/"
  ],
  "verbose": true
}

export default config;
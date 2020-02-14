const jestPreset = require('@testing-library/react-native/jest-preset')

module.exports = {
  preset: '@testing-library/react-native',
  setupFiles: jestPreset.setupFiles,
  setupFilesAfterEnv: ['./jest/setup.ts'],
  transform: {
    '^.+\\.(js|jsx)?$': '<rootDir>/node_modules/babel-jest',
    '\\.(ts|tsx)$': '<rootDir>/node_modules/ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
      babelConfig: 'babel.config.js',
    },
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native-community|react-native)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  cacheDirectory: './jest/cache',
}

module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/.jest/setup-tests.ts'],
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/.jest/__mocks__/fileMock.ts',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
}
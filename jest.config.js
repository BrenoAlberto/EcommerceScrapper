module.exports = {
  roots: ['<rootDir>/tests'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@tests/(.*)$': '<rootDir>/tests/$1',
    '^@infra/(.*)$': '<rootDir>/src/infra/$1',
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@main/(.*)$': '<rootDir>/src/main/$1'
  }
}

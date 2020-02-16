import 'jest-styled-components'

jest.mock('react-native/Libraries/YellowBox/YellowBox')

jest.mock('react-native-background-timer', () => ({
  start: jest.fn(),
  stop: jest.fn(),
  setInterval: jest.fn(),
  clearInterval: jest.fn(),
}))

jest.mock('react-native/Libraries/Animated/src/Animated', () => {
  const realAnimated = jest.requireActual(
    'react-native/Libraries/Animated/src/Animated',
  )
  const react_native = require('react-native')
  return {
    ...realAnimated,
    loop: jest.fn(() => {
      return {
        start: jest.fn(),
        stop: jest.fn(),
      }
    }),
    createTimer: jest.fn(),
    sequence: jest.fn(),
    timing: jest.fn(() => {
      return {
        start: jest.fn(),
        stop: jest.fn(),
      }
    }),
    Value: jest.fn(() => {
      return {
        addListener: jest.fn(),
      }
    }),
    Text: react_native.Text,
  }
})

import React, { useRef, useEffect } from 'react'
import { render } from '../../jest/test-utils'
import { Timer, TimerInstance } from 'src/components'
import TimerText from 'src/components/Timer/TimerText'

jest.useFakeTimers()

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
    timing: jest.fn(),
    Value: jest.fn(() => {
      return {
        addListener: jest.fn(),
      }
    }),
    Text: react_native.Text,
  }
})

describe('TimerText', () => {
  it('renders correctly', () => {
    const { container } = render(<TimerText>text</TimerText>)

    expect(container.children[0]).toMatchSnapshot()
  })
})

describe('Timer', () => {
  it('renders correctly', () => {
    const { container } = render(<Timer />)

    expect(container.children[0]).toMatchSnapshot()
  })

  it('should call the callbacks and show 00:00', () => {
    const onHalfTimePassed = jest.fn()
    const onTimeUp = jest.fn()

    const StatefulTimer: React.FC = () => {
      const ref = useRef<TimerInstance>(null)
      useEffect(() => {
        ref.current!.start(30)
      })
      return (
        <Timer
          ref={ref}
          onHalfTimePassed={onHalfTimePassed}
          onTimeUp={onTimeUp}
        />
      )
    }
    const { getByText, rerender } = render(<StatefulTimer />)

    getByText('00:30')

    expect(onHalfTimePassed).not.toHaveBeenCalled()
    expect(onTimeUp).not.toHaveBeenCalled()

    jest.runAllTimers()

    expect(onHalfTimePassed).toHaveBeenCalledTimes(1)
    expect(onTimeUp).toHaveBeenCalled()

    getByText('00:00')

    rerender(<StatefulTimer />)

    jest.runAllTimers()

    expect(onHalfTimePassed).toHaveBeenCalledTimes(2)
    expect(onTimeUp).toHaveBeenCalledTimes(2)
  })
})

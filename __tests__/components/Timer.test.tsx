import React, { useRef, useEffect } from 'react'
import { render } from '../../jest/test-utils'
import { Timer, TimerInstance } from 'src/components'

describe('Timer', () => {
  it('renders correctly', () => {
    const { container } = render(<Timer />)

    expect(container.children[0]).toMatchSnapshot()
  })

  jest.useFakeTimers()

  it('should call the callbacks and show 00:00', () => {
    const onHalfTimePassed = jest.fn()
    const onTimeUp = jest.fn()

    const StatefulTimer: React.FC = () => {
      const ref = useRef<TimerInstance>(null)
      useEffect(() => {
        ref.current!.start()
      })
      return (
        <Timer
          ref={ref}
          onHalfTimePassed={onHalfTimePassed}
          onTimeUp={onTimeUp}
          initialSeconds={5}
        />
      )
    }
    const { getByText, rerender } = render(<StatefulTimer />)

    getByText('00:05')

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

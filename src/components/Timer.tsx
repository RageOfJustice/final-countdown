import React, {
  memo,
  useRef,
  useEffect,
  forwardRef,
  useReducer,
  useCallback,
  useImperativeHandle,
} from 'react'
import styled from 'src/styled-components'

// TODO: вынести в helpers/formatTime и протестировать
const formatTime = (seconds: number): string => {
  if (seconds === 0) {
    return '00:00'
  }
  const minutes = Math.trunc(seconds / 60)
  const restSeconds = Math.trunc(seconds % 60)

  const formattedMinutes = `${minutes < 10 ? '0' : ''}${minutes}`
  const formattedSeconds = `${restSeconds < 10 ? '0' : ''}${restSeconds}`

  return `${formattedMinutes}:${formattedSeconds}`
}

interface Props {
  initialSeconds?: number
  speedMultiplier?: number
  onTimeUp?: () => void
  onHalfTimePassed?: () => void
}

export interface TimerInstance {
  start: () => void
  pause: () => void
  stop: () => void
}

type State = number
type Action =
  | { type: 'reset' }
  | { type: 'decrease' }
  | { type: 'setup'; seconds: number }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'reset':
      return 0
    case 'setup':
      return action.seconds
    case 'decrease':
      return state - 1
  }
}

const Timer = forwardRef<TimerInstance, Props>(
  (
    { onTimeUp, onHalfTimePassed, speedMultiplier = 1, initialSeconds = 0 },
    ref,
  ) => {
    const intervalId = useRef<number>()
    const halfTimeCalled = useRef(false)
    const [secondsLeft, dispatch] = useReducer(reducer, initialSeconds)

    const startTimer = useCallback(() => {
      if (!intervalId.current) {
        let interval
        if (speedMultiplier === 0) {
          interval = 1000
        } else {
          interval = Math.trunc(1000 / speedMultiplier)
        }
        const updateTime = () => {
          dispatch({ type: 'decrease' })
        }

        intervalId.current = setInterval(updateTime, interval)
      }
    }, [speedMultiplier, initialSeconds])

    const pauseTimer = useCallback(() => {
      clearInterval(intervalId.current!)
      intervalId.current = undefined
    }, [])

    const stopTimer = useCallback(() => {
      pauseTimer()
      halfTimeCalled.current = false
      dispatch({ type: 'reset' })
    }, [pauseTimer])

    useImperativeHandle(
      ref,
      () => ({
        start: startTimer,
        pause: pauseTimer,
        stop: stopTimer,
      }),
      [startTimer, pauseTimer, stopTimer],
    )

    useEffect(() => {
      const shouldContinue = !!intervalId.current
      if (shouldContinue) {
        pauseTimer()
      }

      dispatch({ type: 'setup', seconds: initialSeconds })

      if (shouldContinue) {
        startTimer()
      }
    }, [initialSeconds])

    useEffect(() => {
      if (intervalId.current) {
        pauseTimer()
        startTimer()
      }
    }, [speedMultiplier])

    useEffect(() => {
      if (secondsLeft <= 0 && intervalId.current) {
        stopTimer()
        onTimeUp?.()
        return
      }
      if (
        !halfTimeCalled.current &&
        secondsLeft < Math.ceil(initialSeconds / 2)
      ) {
        halfTimeCalled.current = true
        onHalfTimePassed?.()
      }
    }, [secondsLeft, onTimeUp, onHalfTimePassed, initialSeconds])

    return <TimeText>{formatTime(secondsLeft)}</TimeText>
  },
)

const TimeText = styled.Text`
  font-size: 80px;
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
`

export default memo(Timer)

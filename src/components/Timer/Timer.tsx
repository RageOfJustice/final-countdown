import React, {
  memo,
  useRef,
  useState,
  useEffect,
  forwardRef,
  useReducer,
  useCallback,
  useImperativeHandle,
} from 'react'
import BackgroundTimer from 'react-native-background-timer'

import TimerText from './TimerText'

// TODO: вынести в helpers/formatTime и протестировать
const formatTime = (seconds: number): string => {
  if (seconds <= 0) {
    return '00:00'
  }
  const minutes = Math.trunc(seconds / 60)
  const restSeconds = Math.trunc(seconds % 60)

  const formattedMinutes = `${minutes < 10 ? '0' : ''}${minutes}`
  const formattedSeconds = `${restSeconds < 10 ? '0' : ''}${restSeconds}`

  return `${formattedMinutes}:${formattedSeconds}`
}

interface Props {
  speedMultiplier?: number
  onTimeUp?: () => void
  onHalfTimePassed?: () => void
}

export interface TimerInstance {
  start: (seconds: number) => void
  resume: () => void
  pause: () => void
  stop: () => void
}

type State = number
type Action =
  | { type: 'reset' }
  | { type: 'decrease' }
  | { type: 'setup'; seconds: number }

function secondsLeftReducer(state: State, action: Action): State {
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
  ({ onTimeUp, onHalfTimePassed, speedMultiplier = 1 }, ref) => {
    const intervalId = useRef<number>()
    const halfTimeCalled = useRef(false)
    const initialSeconds = useRef(0)
    const [isBlinking, setBlinking] = useState(false)
    const [showWarn, setShowWarn] = useState(false)
    const [secondsLeft, dispatch] = useReducer(secondsLeftReducer, 0)

    const startTimer = useCallback(() => {
      if (!intervalId.current) {
        let interval
        if (speedMultiplier === 0) {
          interval = 1000
        } else {
          interval = Math.trunc(1000 / speedMultiplier)
        }

        BackgroundTimer.start()
        intervalId.current = BackgroundTimer.setInterval(() => {
          dispatch({ type: 'decrease' })
        }, interval)
      }
    }, [speedMultiplier])

    const pauseTimer = useCallback(() => {
      BackgroundTimer.clearInterval(intervalId.current!)
      BackgroundTimer.stop()
      intervalId.current = undefined
    }, [])

    const stopTimer = useCallback(() => {
      pauseTimer()
      halfTimeCalled.current = false
      initialSeconds.current = 0
      setBlinking(false)
      setShowWarn(false)
      dispatch({ type: 'reset' })
    }, [pauseTimer])

    useImperativeHandle(
      ref,
      () => ({
        start: (seconds: number) => {
          dispatch({ type: 'setup', seconds })
          initialSeconds.current = seconds
          startTimer()
        },
        resume: startTimer,
        pause: pauseTimer,
        stop: stopTimer,
      }),
      [startTimer, pauseTimer, stopTimer],
    )

    useEffect(() => {
      if (intervalId.current) {
        pauseTimer()
        startTimer()
      }
    }, [speedMultiplier])

    useEffect(() => {
      if (!intervalId.current) {
        return
      }
      if (secondsLeft <= 20) {
        setShowWarn(true)
      }
      if (secondsLeft <= 10) {
        setBlinking(true)
      }
      if (secondsLeft <= 0) {
        onTimeUp?.()
        stopTimer()
        return
      }
      if (
        !halfTimeCalled.current &&
        secondsLeft < Math.ceil(initialSeconds.current / 2)
      ) {
        halfTimeCalled.current = true
        onHalfTimePassed?.()
      }
    }, [secondsLeft, onTimeUp, onHalfTimePassed])

    useEffect(() => {
      return () => {
        clearInterval(intervalId.current!)
      }
    }, [])

    return (
      <TimerText showWarn={showWarn} isBlinking={isBlinking}>
        {formatTime(secondsLeft)}
      </TimerText>
    )
  },
)

export default memo(Timer)

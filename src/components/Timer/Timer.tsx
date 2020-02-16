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
import { formatTime } from 'src/utils'

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

const WARN_THRESHOLD = 20
const BLINK_THRESHOLD = 10

const Timer = forwardRef<TimerInstance, Props>(
  ({ onTimeUp, onHalfTimePassed, speedMultiplier = 1 }, ref) => {
    const intervalId = useRef<number>()
    const halfTimeCalled = useRef(false)
    const initialSeconds = useRef(0)
    const [isBlinking, setBlinking] = useState(false)
    const [showWarn, setShowWarn] = useState(false)
    const [secondsLeft, dispatch] = useReducer(secondsLeftReducer, 0)

    const startTimer = useCallback(() => {
      if (intervalId.current) {
        return
      }

      const interval =
        speedMultiplier === 0 ? 1000 : Math.trunc(1000 / speedMultiplier)

      BackgroundTimer.start()
      intervalId.current = BackgroundTimer.setInterval(() => {
        dispatch({ type: 'decrease' })
      }, interval)
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
      if (!intervalId.current) {
        return
      }

      pauseTimer()
      startTimer()
    }, [speedMultiplier])

    useEffect(() => {
      if (!intervalId.current) {
        return
      }
      if (secondsLeft <= WARN_THRESHOLD) {
        setShowWarn(true)
      }
      if (secondsLeft <= BLINK_THRESHOLD) {
        setBlinking(true)
      }
      if (secondsLeft <= 0) {
        onTimeUp?.()
        stopTimer()
        return
      }
      const isPassedMoreThenHalf =
        secondsLeft < Math.ceil(initialSeconds.current / 2)

      if (!halfTimeCalled.current && isPassedMoreThenHalf) {
        halfTimeCalled.current = true
        onHalfTimePassed?.()
      }
    }, [secondsLeft, onTimeUp, onHalfTimePassed])

    useEffect(() => {
      return () => {
        pauseTimer()
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

import React, { useRef, useState, useCallback } from 'react'

import styled from 'src/styled-components'
import {
  Timer,
  Toggles,
  TogglePressHandler,
  ToggleValue,
  TimerInstance,
  CountdownForm,
  CountdownFormMode,
  CountdownFormPressHandler,
} from 'src/components'
import { icons, styles } from 'src/constants'

const toggles: ToggleValue[] = [
  { title: '1X', value: 1 },
  { title: '1.5X', value: 1.5 },
  { title: '2X', value: 255 },
]

const TimerScreen: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [formMode, setFormMode] = useState<CountdownFormMode>('start')
  const [speedMultiplier, setSpeedMultiplier] = useState(1)
  const [infoText, setInfoText] = useState<string>()

  const timerRef = useRef<TimerInstance>(null)

  const changeSpeedMultiplier: TogglePressHandler = useCallback(
    ({ value }, index) => {
      setActiveIndex(index)
      setSpeedMultiplier(value)
    },
    [],
  )

  const startOrStopTimer: CountdownFormPressHandler = useCallback(
    minutes => {
      if (formMode === 'start') {
        setFormMode('stop')
        timerRef.current?.start(minutes! * 60)
      } else {
        setFormMode('start')
        timerRef.current?.stop()
      }
      setInfoText('')
    },
    [formMode],
  )

  const handleTimeUp = useCallback(() => {
    setFormMode('start')
    setInfoText("Time's Up!")
  }, [])
  const onHalfTimePassed = useCallback(() => {
    setInfoText('More than halfway there!')
  }, [])

  return (
    <Wrapper>
      <CountdownForm onPress={startOrStopTimer} mode={formMode} />

      {/* убрал условный рендер текста из-за "скачков" */}
      <InfoText>{infoText}</InfoText>

      <TimerWrapper>
        <Stretcher />
        <Timer
          ref={timerRef}
          onTimeUp={handleTimeUp}
          onHalfTimePassed={onHalfTimePassed}
          speedMultiplier={speedMultiplier}
        />
        <Stretcher>
          <ControlWrapper>
            <ControlIcon mode={'play'} />
          </ControlWrapper>
        </Stretcher>
      </TimerWrapper>

      <Toggles
        onPress={changeSpeedMultiplier}
        activeIndex={activeIndex}
        values={toggles}
      />
    </Wrapper>
  )
}

const Wrapper = styled.SafeAreaView`
  flex: 1;
  padding: 16px;
  justify-content: center;
`

const InfoText = styled.Text`
  font-style: italic;
  text-align: center;
  padding: 10px 0;
`

const TimerWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`

const Stretcher = styled.View`
  flex: 1;
`

const ControlWrapper = styled.TouchableOpacity.attrs(() => ({
  hitSlop: styles.HIT_SLOP,
}))`
  padding: 12px;
  align-self: flex-start;
`

interface ControlIconProps {
  mode: 'play' | 'pause'
}
const ControlIcon = styled.Image.attrs(({ mode }: ControlIconProps) => ({
  source: mode === 'play' ? icons.PLAY_ICON : icons.PAUSE_ICON,
}))<ControlIconProps>``

export default TimerScreen

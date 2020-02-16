import React, { useState, useRef } from 'react'
import { Button } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import { Timer, TimerInstance } from 'src/components'

import styled from 'src/styled-components'

const ControlledTimer: React.FC = () => {
  const [speed, setSpeed] = useState(1)
  const [startTime, setStartTime] = useState(1)
  const [isPaused, setPaused] = useState(true)
  const timerRef = useRef<TimerInstance>(null)
  return (
    <>
      <Timer ref={timerRef} speedMultiplier={speed} />
      <Text>Speed</Text>
      <Input
        keyboardType="decimal-pad"
        value={speed.toString()}
        onChangeText={text => {
          const newSpeed = parseInt(text, 10)
          setSpeed(isNaN(newSpeed) ? 0 : newSpeed)
        }}
      />
      <Text>Start time</Text>
      <Input
        keyboardType="decimal-pad"
        value={startTime.toString()}
        onChangeText={text => {
          const newTime = parseInt(text, 10)
          setStartTime(isNaN(newTime) ? 0 : newTime)
        }}
      />
      <Button
        title="toggle timer"
        onPress={() => {
          if (isPaused) {
            timerRef.current?.start(startTime * 60)
          } else {
            timerRef.current?.pause()
          }
          setPaused(!isPaused)
        }}
      />
    </>
  )
}

const Input = styled.TextInput`
  border-width: 1px;
  padding: 4px;
  margin-bottom: 16px;
`

const Text = styled.Text``

storiesOf('Timer', module).add('Default', () => <ControlledTimer />)

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Animated, TextProps } from 'react-native'

import styled from 'src/styled-components'

interface Props extends TextProps {
  isBlinking?: boolean
  showWarn?: boolean
}

const TimerText: React.FC<Props> = ({ showWarn, isBlinking, children }) => {
  const animatedValueRef = useRef(new Animated.Value(1))
  const animationRef = useRef<Animated.CompositeAnimation>()
  const [opacity, setOpacity] = useState<number>(1)

  useEffect(() => {
    animatedValueRef.current.addListener(({ value }) => setOpacity(value))
  }, [])

  useEffect(() => {
    if (isBlinking) {
      startBlinking()
      return
    }
    if (animationRef.current) {
      stopBlinking()
    }
  }, [isBlinking])

  useEffect(() => {
    return () => {
      stopBlinking()
    }
  }, [])

  const startBlinking = useCallback(() => {
    animationRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValueRef.current, {
          toValue: 0,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(animatedValueRef.current, {
          toValue: 1,
          useNativeDriver: true,
          duration: 500,
        }),
      ]),
    )
    animationRef.current.start(() => {
      Animated.timing(animatedValueRef.current, {
        toValue: 1,
        useNativeDriver: true,
        duration: 500,
      }).start()
    })
  }, [])

  const stopBlinking = useCallback(() => {
    animationRef.current?.stop()
  }, [])

  return (
    <Text showWarn={showWarn} op={opacity}>
      {children}
    </Text>
  )
}

const Text = styled(Animated.Text)<{ op: number; showWarn?: boolean }>`
  font-size: 80px;
  text-align: center;
  color: ${({ theme, showWarn }) =>
    showWarn ? theme.colors.red : theme.colors.black};
  opacity: ${({ op }) => op};
`

export default TimerText

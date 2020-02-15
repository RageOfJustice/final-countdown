import React, { useState, useRef } from 'react'
import { TextInput, Keyboard } from 'react-native'
import styled from 'src/styled-components'

export type CountdownFormMode = 'start' | 'stop'
export type CountdownFormPressHandler = (minutes?: number) => void

interface Props {
  mode: CountdownFormMode
  onPress?: CountdownFormPressHandler
}

const CountdownForm: React.FC<Props> = ({ mode, onPress }) => {
  const [value, setValue] = useState('')

  const inputRef = useRef<TextInput>(null)

  const isInStartState = mode === 'start'

  const handlePress = () => {
    if (!isInStartState) {
      onPress?.()
    }
    const parsed = parseInt(value, 10)
    if (!isNaN(parsed)) {
      onPress?.(parsed)
    }
    setValue('')
    inputRef.current?.clear()
    Keyboard.dismiss()
  }

  return (
    <Wrapper>
      <Text>Countdown:</Text>
      <Input
        ref={inputRef}
        value={value}
        editable={isInStartState}
        onChangeText={setValue}
        placeholder="Minutes"
        keyboardType="decimal-pad"
      />
      <ButtonWrapper
        disabled={isInStartState && !value}
        onPress={handlePress}
        testID="controlButton"
      >
        <ButtonText>{isInStartState ? 'Start' : ' Stop'}</ButtonText>
      </ButtonWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.black};
`

const Input = styled.TextInput.attrs(({ theme }) => ({
  underlineColorAndroid: 'transparent',
  placeholderTextColor: theme.colors.lightGrey,
  selectionColor: theme.colors.darkGrey,
}))`
  color: ${({ theme }) => theme.colors.black};
  margin-horizontal: 8px;
  border-width: 1px;
  padding: 8px 4px;
  width: 100px;
  border-color: ${({ theme }) => theme.colors.black};
  opacity: ${({ editable }) => (editable ? 1 : 0.6)};
`

const ButtonWrapper = styled.TouchableOpacity`
  padding: 8px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  background-color: ${({ theme }) => theme.colors.cyan};
`

const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
`

export default CountdownForm

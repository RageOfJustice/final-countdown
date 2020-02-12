import React from 'react'
import styled from 'src/styled-components'

interface Props {
  isActive?: boolean
  onPress?: () => void
  title: string
}

const ToggleButton: React.FC<Props> = ({ isActive, title, onPress }) => (
  <Wrapper onPress={onPress} isActive={isActive}>
    <Text isActive={isActive}>{title}</Text>
  </Wrapper>
)

const Wrapper = styled.TouchableOpacity<{ isActive?: boolean }>`
  padding: 8px 16px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.darkGrey : 'transparent'};
  align-items: center;
  justify-content: center;
`

const Text = styled.Text<{ isActive?: boolean }>`
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.white : theme.colors.black};
  font-size: 14px;
`

export default ToggleButton

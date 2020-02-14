import React from 'react'
import styled from 'src/styled-components'

import ToggleButton from './ToggleButton'

interface ToggleValue {
  title: string
  value: number
}

interface Props {
  values: ToggleValue[]
  onPress?: (value: ToggleValue, index: number) => void
  activeIndex?: number
}

// FIXME: поправить нажатие на активный индекс
const Toggles: React.FC<Props> = ({ values, onPress, activeIndex = 0 }) => {
  return (
    <Wrapper>
      {values.map((value, index) => (
        <Col key={value.title}>
          <ToggleButton
            isActive={index === activeIndex}
            title={value.title}
            onPress={() => {
              onPress?.(value, index)
            }}
          />
        </Col>
      ))}
    </Wrapper>
  )
}

//   margin-horizontal: -2px; - на случай если займет всю ширину выделенной области
const Wrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-horizontal: -2px;
`

const Col = styled.View`
  padding-horizontal: 2px;
`

export default Toggles

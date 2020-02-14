import React, { useState } from 'react'
import { storiesOf } from '@storybook/react-native'
import { Toggles } from 'src/components'

const StatefulToggles = () => {
  const [activeIndex, setIndex] = useState(0)
  return (
    <Toggles
      onPress={(_, index) => setIndex(index)}
      activeIndex={activeIndex}
      values={[
        { title: '1X', value: 1 },
        { title: '1.5X', value: 1.5 },
        { title: '2X', value: 2 },
        { title: '3X', value: 3 },
      ]}
    />
  )
}

storiesOf('Toggles')
  .add('Default', () => (
    <Toggles
      values={[
        { title: '1X', value: 1 },
        { title: '1.5X', value: 1.5 },
        { title: '2X', value: 2 },
      ]}
      activeIndex={1}
    />
  ))
  .add('Pressable', () => <StatefulToggles />)

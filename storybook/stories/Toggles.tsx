import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { Toggles } from 'src/components'

storiesOf('Toggles').add('Default', () => (
  <Toggles
    values={[
      { title: '1X', value: 1 },
      { title: '1.5X', value: 1.5 },
      { title: '2X', value: 2 },
    ]}
    activeIndex={1}
  />
))

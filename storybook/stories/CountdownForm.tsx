import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { CountdownForm } from 'src/components'

storiesOf('CountdownForm', module)
  .add('Start', () => <CountdownForm mode="start" />)
  .add('Stop', () => <CountdownForm mode="stop" />)

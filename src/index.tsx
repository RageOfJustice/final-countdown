import React, { useEffect } from 'react'
import { StatusBar, Platform } from 'react-native'

import { ThemeProvider } from './styled-components'
import theme from './theme'
import { TimerScreen } from './screens'

interface Props {}

const App: React.FC<Props> = () => {
  useEffect(() => {
    if (Platform.OS === 'ios') {
      StatusBar.setBarStyle('dark-content', true)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <TimerScreen />
    </ThemeProvider>
  )
}

export default App

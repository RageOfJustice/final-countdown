import React from 'react'
import { ThemeProvider } from './styled-components'
import theme from './theme'
import { TimerScreen } from './screens'

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <ThemeProvider theme={theme}>
      <TimerScreen />
    </ThemeProvider>
  )
}

export default App

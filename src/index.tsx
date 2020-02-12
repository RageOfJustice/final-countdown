import React from 'react'
import { ThemeProvider } from './styled-components'
import theme from './theme'

interface Props {}

const App: React.FC<Props> = () => {
  return <ThemeProvider theme={theme} />
}

export default App

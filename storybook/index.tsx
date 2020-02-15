import React from 'react'
import { getStorybookUI, configure } from '@storybook/react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { ThemeProvider } from 'src/styled-components'
import theme from 'src/theme'

// import stories
configure(() => {
  require('./stories')
}, module)

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
// @ts-ignore
const StorybookUIRoot = getStorybookUI({
  asyncStorage: AsyncStorage,
  onDeviceUI: true,
  disableWebsockets: true,
})

const StorybookScreen = () => (
  <ThemeProvider theme={theme}>
    <StorybookUIRoot />
  </ThemeProvider>
)

export default StorybookScreen

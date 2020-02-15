/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './src'
import { name as appName } from './app.json'
import StoryBook from './storybook'

AppRegistry.registerComponent(appName, () => StoryBook)
// AppRegistry.registerComponent(appName, () => App)

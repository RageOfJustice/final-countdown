import { Platform } from 'react-native'

import styled from 'src/styled-components'

// на некоторых андроидах обрезаются слова
// поэтому надо явно указать шрифт
const TextBase = styled.Text`
  ${Platform.OS === 'android' && 'font-family: Roboto;'}
`

export default TextBase

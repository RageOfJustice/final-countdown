import * as styledComponents from 'styled-components/native'

export interface ThemeColors {
  cyan: string
  black: string
  white: string
  red: string
  darkGrey: string
  lightGrey: string
}

export interface ITheme {
  colors: ThemeColors
}

const {
  default: styled,
  css,
  withTheme,
  ThemeContext,
  ThemeProvider,
} = styledComponents as styledComponents.ReactNativeThemedStyledComponentsModule<
  ITheme
>

export { css, withTheme, ThemeProvider, ThemeContext }
export default styled

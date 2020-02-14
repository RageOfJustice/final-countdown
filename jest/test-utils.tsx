import React, { ReactElement, FC } from 'react'
import { render, RenderOptions } from '@testing-library/react-native'
import theme from 'src/theme'
import { ThemeProvider } from 'src/styled-components'

const Providers: FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children as ReactElement}</ThemeProvider>
}

const customRender = (
  ui: ReactElement<any>,
  options?: Omit<RenderOptions, 'queries'>,
) => render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react-native'

export { customRender as render }

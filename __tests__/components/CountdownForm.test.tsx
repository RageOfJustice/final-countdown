import React from 'react'
import { render, fireEvent } from '../../jest/test-utils'
import { CountdownForm } from 'src/components'

describe('CountdownForm', () => {
  it('renders correctly in start mode', () => {
    const { container } = render(<CountdownForm mode="start" />)

    expect(container.children[0]).toMatchSnapshot()
  })

  it('renders correctly in start stop', () => {
    const { container } = render(<CountdownForm mode="stop" />)

    expect(container.children[0]).toMatchSnapshot()
  })

  it('behaves right in start mode', () => {
    const onPress = jest.fn()
    const { getByTestId, getByDisplayValue } = render(
      <CountdownForm onPress={onPress} mode="start" />,
    )

    const input = getByDisplayValue('')
    const button = getByTestId('controlButton')

    fireEvent.changeText(input, 'test')
    fireEvent.press(button)

    expect(onPress).not.toHaveBeenCalled()

    fireEvent.changeText(input, '12')

    fireEvent.press(button)
    expect(onPress).toHaveBeenCalledWith(12)
  })

  it('behaves right in stop mode', () => {
    const onPress = jest.fn()
    const { getByTestId } = render(
      <CountdownForm onPress={onPress} mode="stop" />,
    )

    const button = getByTestId('controlButton')

    fireEvent.press(button)
    expect(onPress).toHaveBeenCalledWith()
  })
})

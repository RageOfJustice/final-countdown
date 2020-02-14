import React from 'react'
import { render, fireEvent } from '../../jest/test-utils'
import { Toggles } from 'src/components'
// тут такой импорт, потому что кнопка "скрыта" от отсальной части приложения
// является частью компонента Toggles
import ToggleButton from 'src/components/Toggles/ToggleButton'

describe('ToggleButton', () => {
  it('renders correclty', () => {
    const { container } = render(<ToggleButton title="title" />)

    expect(container.children[0]).toMatchSnapshot()
  })
  it('renders correclty in active state', () => {
    const { container } = render(<ToggleButton isActive title="title" />)

    expect(container.children[0]).toMatchSnapshot()
  })
  it('can be pressed', () => {
    const onPress = jest.fn()
    const { container } = render(
      <ToggleButton onPress={onPress} title="title" />,
    )
    fireEvent.press(container.children[0])
    expect(onPress).toHaveBeenCalled()
  })
})

describe('Toggles', () => {
  const values = [
    { title: '1X', value: 1 },
    { title: '1.5X', value: 1.5 },
    { title: '2X', value: 2 },
  ]

  it('renders correctly', () => {
    const { container } = render(<Toggles values={values} />)

    expect(container.children[0]).toMatchSnapshot()
  })

  it('can be pressed', () => {
    const onPress = jest.fn()
    const { getAllByTestId } = render(
      <Toggles onPress={onPress} values={values} />,
    )
    const component = getAllByTestId('toggleButton')[1]
    fireEvent.press(component)
    expect(onPress).toHaveBeenCalledWith(values[1], 1)
  })
})

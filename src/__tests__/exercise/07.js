// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'

/*
2. 💯 create a custom render method
The duplication is cramping my style. Create a custom render method that encapsulates this shared logic. It'll need to accept an option for the theme (dark or light).
*/
/*
import {render as rtlRender} from '@testing-library/react'
// "rtl" is short for "react testing library" not "right-to-left" 😅

function render(ui, options) {
  return rtlRender(ui, {wrapper: Wrapper, ...options})
}

// then in your tests, you don't need to worry about context at all:
const {rerender} = render(<ComponentToTest />)

rerender(<ComponentToTest newProp={true} />)
*/

function renderCustomized(theme) {
  return render(
    <ThemeProvider initialTheme={theme}>
      <EasyButton>Easy</EasyButton>
    </ThemeProvider>
  )
}

test('renders with the light styles for the light theme', () => {
  function Wrapper({children}) {
    return <ThemeProvider initialTheme="light">{children}</ThemeProvider>
  }
  
  // render(<EasyButton>Easy</EasyButton>, {wrapper: Wrapper})
  renderCustomized('light')

  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
})

test('renders with the dark styles for the dark theme', () => {
  function Wrapper({children}) {
    return <ThemeProvider initialTheme="dark">{children}</ThemeProvider>
  }
  
  // render(<EasyButton>Easy</EasyButton>, {wrapper: Wrapper})
  renderCustomized('dark')

  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `)
})

/* eslint no-unused-vars:0 */

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

// my solution
function renderCustomized(theme) {
  return render(
    <ThemeProvider initialTheme={theme}>
      <EasyButton>Easy</EasyButton>
    </ThemeProvider>
  )
}

// KCD's version
function renderWithTheme(ui, {theme='light', ...options}) {
  function Wrapper({children}) {
    return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  }
  return render(ui, {wrapper: Wrapper, ...options})
}

/*
My initial reaction is based on where I was thinking about where the abstraction was. In what I'm
testing right now, the implementation of the component is the same all the time. And it's not like
Wrapper is versatile at all, instead of specific to the ThemeProvider component. I'm set up to
accept the prop itself, and don't have to worry about the Wrapper utility, which may have some
useful additional functions, I guess (read docs more?), but doesn't use any of them here. His
solution feels more like general best practices, WHICH IS GOOD AND WHAT I DON'T KNOW, even if it
feels to me a bit like overkill here.

And in the video, he does exactly what I did. But his emphasis is that this test, as of right now,
is only for the Easy Button component, and only for a specific implementation of that. His version
lets you test ANY version of ANY component, so it's a wrapper for anything using the ThemeProvider.
*/

test('renders with the light styles for the light theme', () => {
  // renderCustomized('light')
  renderWithTheme(<EasyButton>Easy</EasyButton>)

  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
})

test('renders with the dark styles for the dark theme', () => {
  // renderCustomized('dark')
  renderWithTheme(<EasyButton>Easy</EasyButton>, {theme: 'dark'})

  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `)
})

/* eslint no-unused-vars:0 */

// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
// test-utils exports not just the re-done render method but everything from R-T-L, so we don't
// to import screen from R-T-L itself b/c test-utils gives us all of that directly

// jest.config allows us to configure our modules directory to look directly in src/, instead of using ../.. as
// EasyButton import. jest.config is part of react-scripts, so it's abstracted away in this application.
// See KCD's basic jest.config at https://github.com/kentcdodds/kcd-scripts/blob/main/src/config/jest.config.js,
// specifically under moduleDirectories
import {render, screen} from 'test/test-utils'
import EasyButton from '../../components/easy-button'

/*
KCD recommendation: do not import React Testing Library. Instead, make your own module that has a renderWithProviders
type of function. Which he already wrote in test-utils (same function as themeWithProviders function in Extra Credit 2).

Providers should be an implementation detail of each of your components, so components should have all of the providers
they're going to have when you ship the actual app. Also, you don't need to import the ThemeProvider into here, because
you have access to it as a render method.

The biggest quesiton I have about applying this at scale are (1) how do you do it with different providers. Do you have
three or five or 27 different render functions, or 3 or 5 or 27 different test utils, one for each component that takes
a particular provider?
*/

// once we get the re-done render method, we can delete our custom render and make no further changes
test('renders with the light styles for the light theme', () => {
  render(<EasyButton>Easy</EasyButton>)

  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
})

test('renders with the dark styles for the dark theme', () => {
  render(<EasyButton>Easy</EasyButton>, {
    theme: 'dark',
  })

  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `)
})

/* eslint no-unused-vars:0 */

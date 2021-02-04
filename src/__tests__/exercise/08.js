// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

/*
2. 💯 setup function
Add tests titled:

allows customization of the initial count
allows customization of the step
And test those use cases. Then abstract away the common logic into a setup function. This one might be a little tricky thanks to variable references, but I know you can do it!

💰 Here's a little tip. Due to variable references, you'll need to change your test component a bit:

const results = {}
function TestComponent(props) {
  Object.assign(results, useCustomHook())
  return null
}

// interact with and assert on results here
*/

function setup(initialProps = {}) {
  const results = {}
  function TestComponent(initialProps) {
    Object.assign(results, useCounter(initialProps))
    return null
  }
  render(<TestComponent {...initialProps} />)
  return results
}

test('exposes the count and increment/decrement functions', () => {
  const result = setup()
  expect(result.count).toBe(0)
  act(() => {result.increment()})
  expect(result.count).toBe(1)
  act(() => result.decrement())
  expect(result.count).toBe(0)
})

test('accepts an initialCount variable and adjusts from there', () => {
  const result = setup({initialCount : 2})
  expect(result.count).toBe(2)
  act(() => {result.increment()})
  expect(result.count).toBe(3)
  act(() => result.decrement())
  expect(result.count).toBe(2)
})

test('accepts a step variable and adjusts from there', () => {
  const result = setup({step: 2})
  expect(result.count).toBe(0)
  act(() => {result.increment()})
  expect(result.count).toBe(2)
  act(() => result.decrement())
  expect(result.count).toBe(0)
})

/* eslint no-unused-vars:0 */

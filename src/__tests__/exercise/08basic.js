// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

/*
KCD recommendation: don't test Custom Hooks

Explanation: most custom hooks are used by 1 or 2 components, and can rightly be regarded as an implementation detail of
the component, and you generally don't want to test implementation details. If the component is working as expected,
then the hook must necessarily be doing what it's supposed to be doing. If the component isn't working as expected, it
could be the hook or something else. But, again, implementation detail. If you want to test implementation details to
debug, well... (last note me).

But if you're building a resuable hook, or a library of hooks, that's KCD's recommendation "testing a hook" scenario.
*/

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
function UseCounterHook({initialCount=0, step=1}) {
  const {count, increment, decrement} = useCounter({initialCount, step})
  return (
    <div>
      <div>Current count: {count}</div>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  )
}
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()

test('exposes the count and increment/decrement functions', () => {
  // 🐨 render the component
  render(<UseCounterHook />)
  // 🐨 get the elements you need using screen
  const increment = screen.getByRole('button', {name: /increment/i})
  const decrement = screen.getByRole('button', {name: /decrement/i})
  const message = screen.getByText(/current count/i)
  // 🐨 assert on the initial state of the hook
  expect(message).toHaveTextContent('Current count: 0')
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
  // increment.userEvent('click')
  // userEvent('click', increment)
  userEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')
  userEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})

// KCD-suggested extension
test('accepts an initialCount variable and adjusts from there', () => {
  render(<UseCounterHook initialCount={2} />)
  const increment = screen.getByRole('button', {name: /increment/i})
  const decrement = screen.getByRole('button', {name: /decrement/i})
  const message = screen.getByText(/current count/i)
  expect(message).toHaveTextContent('Current count: 2')
  userEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 3')
  userEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 2')
})

test('accepts a step variable and adjusts from there', () => {
  render(<UseCounterHook step={2} />)
  const increment = screen.getByRole('button', {name: /increment/i})
  const decrement = screen.getByRole('button', {name: /decrement/i})
  const message = screen.getByText(/current count/i)
  expect(message).toHaveTextContent('Current count: 0')
  userEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 2')
  userEvent.click(decrement)
  userEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: -2')
})

/* eslint no-unused-vars:0 */

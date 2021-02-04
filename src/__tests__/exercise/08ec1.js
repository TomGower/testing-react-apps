// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'

/*
1. 💯 fake component
Sometimes it's hard to write a test component without making a pretty complicated "TestComponent." For those situations, you can try something like this:

let result
function TestComponent(props) {
  result = useCustomHook(props)
  return null
}

// interact with and assert on results here
Learn more about this approach from my blog post: How to test custom React hooks
*/

test('exposes the count and increment/decrement functions', () => {
  let result
  function TestComponent(props) {
    result = useCounter(props)
    return null
  }
  render(<TestComponent />)
  expect(result.count).toBe(0)
  act(() => {result.increment()})
  expect(result.count).toBe(1)
  act(() => result.decrement())
  expect(result.count).toBe(0)
})

/* eslint no-unused-vars:0 */

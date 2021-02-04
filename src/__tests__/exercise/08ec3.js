// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {renderHook, act} from '@testing-library/react-hooks'
import useCounter from '../../components/use-counter'

/*
3. 💯 using react-hooks testing library
Your setup function is very similar to the renderHook function from @testing-library/react-hooks! Swap your own setup function with that.
*/

test('exposes the count and increment/decrement functions', () => {
  const {result} = renderHook(useCounter)
  expect(result.current.count).toBe(0)
  act(() => {result.current.increment()})
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('accepts an initialCount variable and adjusts from there', () => {
  // const {result} = renderHook(() => useCounter({initialCount : 2}))
  const {result} = renderHook(useCounter, {initialProps: {initialCount: 2}})
  expect(result.current.count).toBe(2)
  act(() => {result.current.increment()})
  expect(result.current.count).toBe(3)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(2)
})

test('accepts a step variable and adjusts from there', () => {
  // const {result} = renderHook(() => useCounter({step : 3}))
  // alternate formulation
  const {result} = renderHook(useCounter, {initialProps: {step: 3}})
  expect(result.current.count).toBe(0)
  act(() => {result.current.increment()})
  expect(result.current.count).toBe(3)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('the step can be changed', () => {
  // const {result, rerender} = renderHook(() => useCounter({step : 3}))
  // alternate formulation
  const {result, rerender} = renderHook(useCounter, {initialProps: {step: 3}})
  expect(result.current.count).toBe(0)
  act(() => {result.current.increment()})
  expect(result.current.count).toBe(3)
  // the alternate formulation allows us to change the props. THAT is the difference
  rerender({step: 2})
  act(() => result.current.decrement())
  expect(result.current.count).toBe(1)
})

/* eslint no-unused-vars:0 */

// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  const newDiv = document.createElement('div')
  document.body.append(newDiv)
  ReactDOM.render(<Counter />, newDiv)
  const [decrement, increment] = newDiv.querySelectorAll('button')
  const message = newDiv.firstChild.querySelector('div')
  expect(message.textContent).toBe('Current count: 0')
  const clickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })
  increment.dispatchEvent(clickEvent)
  expect(message.textContent).toBe('Current count: 1')
  decrement.dispatchEvent(clickEvent)
  expect(message.textContent).toBe('Current count: 0')
  newDiv.remove()
})

/* eslint no-unused-vars:0 */

// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'

beforeAll(() => {
  window.navigator.geolocation = {
    getCurrentPosition: jest.fn()
  }
})

function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139,
    },
  }
  const {promise, resolve, reject} = deferred()

  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    callback => {
      promise.then(() => callback(fakePosition))
    },
  )
  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
  await act(async () => {
    resolve()
    await promise
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

// no video message for this one
test('displays error message when geolocation is not supported', async () => {
  // KCD uses this for what sort of result we should get if there is an error
  // my conception of problem did not have this in it, instead used empty coords object
  const fakeError = new Error(
    'Geolocation is not supported or permission denied',
  )
  const {promise, reject} = deferred()

  // see MDN documents for getCurrentPosition, takes a success callback and error callback
  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    (successCallback, errorCallback) => {
      promise.catch(() => errorCallback(fakeError))
    },
  )

  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
  // do not need to await promise once resolve is called like above, reject() ends the process
  await act(async () => {
    reject()
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  // check for contents of error message, my initial conception was having alert in document
  expect(screen.getByRole(/alert/i)).toHaveTextContent(fakeError.message)
})

/*
eslint
  no-unused-vars: "off",
*/

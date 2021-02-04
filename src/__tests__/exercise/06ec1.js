// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import {useCurrentPosition} from 'react-use-geolocation'
import Location from '../../examples/location'

// this re-writes the module to be a jest mock function
jest.mock('react-use-geolocation')

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 31,
      longitude: 98,
    },
  }
  
  let setReturnValue
  // custom hook for testing mock
  function useMockCurrentPosition() {
    // useCurrentPosition in react-use-geolocation returns an array, thus the array here
    const state = React.useState([])
    setReturnValue = state[1]
    return state[0]
  }
  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  render(<Location />)
  // if the thing we are mocking has arguments, we would want to check here if it had been called with correct arguments
  // expect(useCurrentPosition).toHaveBeenCalledWith('all the greatest arguments')
  // but we don't want to also mock how many times it's been called, because React will do its own thing,
  // function components could be idempotent (doesn't matter how many times they've been called)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  // do some action, then flush all the side effects
  act(() => {
    setReturnValue([fakePosition])
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

/*
eslint
  no-unused-vars: "off",
*/

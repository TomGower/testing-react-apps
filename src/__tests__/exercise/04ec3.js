// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)

  const username = screen.getByLabelText(/username/i)
  const password = screen.getByLabelText(/password/i)
  const submit = screen.getByRole('button', {name: /submit/i})

  // const testUsername = faker.internet.userName()
  // const testPassword = faker.internet.password()
  const buildLoginForm = (override) => ({
    testUsername: faker.internet.userName(),
    testPassword: faker.internet.password(),
    ...override,
  })
  const {testUsername, testPassword} = buildLoginForm({testPassword: 'breathe'})

  userEvent.type(username, testUsername)
  userEvent.type(password, testPassword)
  userEvent.click(submit)

  expect(handleSubmit).toHaveBeenCalledWith({username: testUsername, password: testPassword})
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

/*
eslint
  no-unused-vars: "off",
*/

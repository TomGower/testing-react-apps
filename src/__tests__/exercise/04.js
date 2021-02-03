// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)

  const username = screen.getByLabelText(/username/i)
  const password = screen.getByLabelText(/password/i)
  const submit = screen.getByRole('button', {name: /submit/i})

  const buildLoginForm = build({
    fields: {
      testUsername: fake(f => f.internet.userName()),
      testPassword: fake(f => f.internet.password()),
    },
  })
  const {testUsername, testPassword} = buildLoginForm({testPassword: 'abc'})

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

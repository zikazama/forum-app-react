/**
 * skenario testing
 *
 *   - RegisterInput component
 *   - should call register function when login button is clicked
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegisterInput from './RegisterInput'
import '@testing-library/jest-dom'

describe('RegisterInput component', () => {
  it('should call login function when login button is clicked', async () => {
    // Arrange
    const mockRegister = jest.fn()
    render(<RegisterInput onRegister={mockRegister} />)
    const nameInput = await screen.getByPlaceholderText('name')
    await userEvent.type(nameInput, 'nametest')
    const emailInput = await screen.getByPlaceholderText('email')
    await userEvent.type(emailInput, 'emailtest')
    const passwordInput = await screen.getByPlaceholderText('password')
    await userEvent.type(passwordInput, 'passwordtest')
    const registerButton = await screen.getByRole('button', { name: 'Register' })

    // Action
    await userEvent.click(registerButton)

    // Assert
    expect(mockRegister).toBeCalledWith({
      name: 'nametest',
      email: 'emailtest',
      password: 'passwordtest'
    })
  })
})

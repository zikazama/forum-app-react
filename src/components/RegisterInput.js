import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Copyright from '../components/Copyright'
import useInput from '../hooks/useInput'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { PropTypes } from 'prop-types'

function RegisterInput ({ onRegister }) {
  const [name, onNameChange] = useInput('')
  const [email, onEmailChange] = useInput('')
  const [password, onPasswordChange] = useInput('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onRegister({ name, email, password })
  }

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        autoComplete="name"
        autoFocus
        onChange={onNameChange}
        placeholder="name"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={onEmailChange}
        placeholder="email"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={onPasswordChange}
        placeholder="password"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        name="Register"
      >
        Register
      </Button>
      <Grid container>
        <Grid item xs></Grid>
      </Grid>
      <Copyright sx={{ mt: 5 }} />
    </Box>
  )
}

RegisterInput.propTypes = {
  onRegister: PropTypes.func
}

export default RegisterInput

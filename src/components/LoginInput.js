import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Copyright from '../components/Copyright'
import Grid from '@mui/material/Grid'
import useInput from '../hooks/useInput'
import { PropTypes } from 'prop-types'

function LoginInput ({ onLogin }) {
  const [email, onEmailChange] = useInput('')
  const [password, onPasswordChange] = useInput('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin({ email, password })
  }

  return (
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                placeholder='email'
                autoComplete="email"
                autoFocus
                onChange={onEmailChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                placeholder='password'
                autoComplete="current-password"
                onChange={onPasswordChange}
              />
              <Button
              name="Login"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>

                </Grid>

              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
  )
}

LoginInput.propTypes = {
  onLogin: PropTypes.func
}

export default LoginInput

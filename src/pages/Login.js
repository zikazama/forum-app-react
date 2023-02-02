import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { useNavigate, Link } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { asyncSetAuthUser } from '../states/authUser/action'
import Avatar from '@mui/material/Avatar'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import LoginInput from '../components/LoginInput'
import Box from '@mui/material/Box'

const theme = createTheme()

export default function Login () {
  const {
    authUser
  } = useSelector((states) => states)
  const navigate = useNavigate()
  const dispatch = useDispatch() // @TODO: get dispatch function from store

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }))
    if (authUser) {
      navigate('/home')
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://img.freepik.com/free-vector/happy-woman-chatting-with-friends-online_74855-14073.jpg?w=2000)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
          <LoginInput onLogin={onLogin}/>
          <Grid item>
                  <Link to="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

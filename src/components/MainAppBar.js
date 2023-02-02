import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import MuiAppBar from '@mui/material/AppBar'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import { PropTypes } from 'prop-types'
import { useNavigate } from 'react-router-dom'

const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

function MainAppBar ({ setOpen, open }) {
  const navigate = useNavigate()
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  return (
        <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography onClick={(e) => navigate('/home')} variant="h6" noWrap component="div">
            FORUM
          </Typography>
        </Toolbar>
      </AppBar>
  )
}

MainAppBar.propTypes = {
  setOpen: PropTypes.func,
  open: PropTypes.bool
}

export default MainAppBar

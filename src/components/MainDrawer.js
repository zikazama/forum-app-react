import React from 'react'
import { useTheme } from '@mui/material/styles'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import ForumIcon from '@mui/icons-material/Forum'
import LogoutIcon from '@mui/icons-material/Logout'
import Drawer from '@mui/material/Drawer'
import { PropTypes } from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { asyncUnsetAuthUser } from '../states/authUser/action'
import Swal from 'sweetalert2'
import CardHeader from '@mui/material/CardHeader'

const drawerWidth = 240

function MainDrawer ({ setOpen, open, drawerHeader: DrawerHeader }) {
  const {
    authUser
  } = useSelector((states) => states)

  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleLogout = () => {
    Swal.fire({
      title: 'Apakah anda yakin ingin logout?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Ya'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Berhasil logout!', '', 'success')
        dispatch(asyncUnsetAuthUser())
        navigate('/')
      }
    })
  }

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box'
        }
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <img src={authUser?.avatar}/>
        <CardHeader
          action={<IconButton aria-label="settings"></IconButton>}
          title={authUser?.name}
        />
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr'
            ? (
            <ChevronLeftIcon />
              )
            : (
            <ChevronRightIcon />
              )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem onClick={(e) => navigate('/home')} key="forum" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ForumIcon />
            </ListItemIcon>
            <ListItemText primary="Forum" />
          </ListItemButton>
        </ListItem>
        <ListItem onClick={(e) => navigate('/leaderboard')} key="leaderboard" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LeaderboardIcon />
            </ListItemIcon>
            <ListItemText primary="Leaderboard" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {['Logout'].map((text, index) => (
          <ListItem key={text} disablePadding onClick={handleLogout}>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

MainDrawer.propTypes = {
  setOpen: PropTypes.func,
  open: PropTypes.bool,
  drawerHeader: PropTypes.object
}

export default MainDrawer

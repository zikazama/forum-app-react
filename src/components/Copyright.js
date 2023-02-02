import * as React from 'react'
import Typography from '@mui/material/Typography'

function Copyright (props) {
  return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
          Forum
        {' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
  )
}

export default Copyright

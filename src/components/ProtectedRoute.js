import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

function ProtectedRoute (props) {
  const navigate = useNavigate()
  const { authUser } = useSelector(
    (states) => states
  )

  useEffect(() => {
    if (props.unprotected === true) {
      if (authUser !== null) {
        navigate('/home')
      }
    } else {
      if (authUser === null) {
        navigate('/')
      }
    }
  }, [authUser])

  return (<>{props.children}</>)
}

ProtectedRoute.propTypes = PropTypes.children

export default ProtectedRoute

/**
 * @TODO: Define all the actions (creator) for the authUser state
 */
import api from '../../utils/api'
import Swal from 'sweetalert2'

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER'
}

function setAuthUserActionCreator (authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser
    }
  }
}

function unsetAuthUserActionCreator () {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null
    }
  }
}

function asyncSetAuthUser ({ email, password }) {
  return async (dispatch) => {
    try {
      const token = await api.login({ email, password })
      api.putAccessToken(token)
      const authUser = await api.getOwnProfile()

      dispatch(setAuthUserActionCreator(authUser))
    } catch (error) {
      console.log(error.message)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      })
    }
  }
}

function asyncUnsetAuthUser () {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator())
    api.putAccessToken('')
  }
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser
}
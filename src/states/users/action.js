/**
 * @TODO: Define all the actions (creator) for the users state
 */
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import api from '../../utils/api'
import Swal from 'sweetalert2'

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS'
}

function receiveUsersActionCreator (users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users
    }
  }
}

function asyncRegisterUser ({ email, name, password }) {
  return async (dispatch) => {
    dispatch(showLoading())

    try {
      await api.register({ email, name, password })
      Swal.fire('Registrasi berhasil!', '', 'success')
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      })
    }

    dispatch(hideLoading())
  }
}

export {
  ActionType,
  receiveUsersActionCreator,
  asyncRegisterUser
}

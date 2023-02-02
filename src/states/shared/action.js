/**
 * @TODO: Define all the actions (creator) that uses a combination of actions from various domain
 */
import api from '../../utils/api'
import Swal from 'sweetalert2'
import { receiveThreadsActionCreator } from '../threads/action'
import { receiveUsersActionCreator } from '../users/action'
import { hideLoading, showLoading } from 'react-redux-loading-bar'

function asyncPopulate () {
  return async (dispatch) => {
    dispatch(showLoading())

    try {
      const users = await api.seeAllUsers()
      const threads = await api.seeAllThreads()

      dispatch(receiveUsersActionCreator(users))
      dispatch(receiveThreadsActionCreator(threads))
    } catch (error) {
      console.log(error.message)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      })
    }

    dispatch(hideLoading())
  }
}

export { asyncPopulate }

/**
 * @TODO: Define all the actions (creator) for the authUser state
 */
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import api from '../../utils/api'
import Swal from 'sweetalert2'

const ActionType = {
  SET_LEADERBOARDS: 'SET_LEADERBOARDS'
}

function setLeaderboardsActionCreator (leaderboards) {
  return {
    type: ActionType.SET_LEADERBOARDS,
    payload: {
      leaderboards
    }
  }
}

function asyncSetLeaderboards () {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      const leaderboards = await api.leaderboards()
      dispatch(setLeaderboardsActionCreator(leaderboards))
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

export {
  ActionType,
  setLeaderboardsActionCreator,
  asyncSetLeaderboards
}

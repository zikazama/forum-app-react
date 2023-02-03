/**
 * @TODO: Define all the actions (creator) for the talkDetail state
 */
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import api from '../../utils/api'
import Swal from 'sweetalert2'

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  UP_VOTE_THREAD_DETAIL: 'UP_VOTE_THREAD_DETAIL',
  DOWN_VOTE_THREAD_DETAIL: 'DOWN_VOTE_THREAD_DETAIL',
  NEUTRAL_VOTE_THREAD_DETAIL: 'NEUTRAL_VOTE_THREAD_DETAIL'
}

function receiveThreadDetailActionCreator (threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail
    }
  }
}

function clearThreadDetailActionCreator () {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL
  }
}

function UpVoteThreadDetailActionCreator (userId) {
  return {
    type: ActionType.UP_VOTE_THREAD_DETAIL,
    payload: {
      userId
    }
  }
}

function DownVoteThreadDetailActionCreator (userId) {
  return {
    type: ActionType.DOWN_VOTE_THREAD_DETAIL,
    payload: {
      userId
    }
  }
}

function NeutralVoteThreadDetailActionCreator (userId) {
  return {
    type: ActionType.NEUTRAL_VOTE_THREAD_DETAIL,
    payload: {
      userId
    }
  }
}

function asyncReceiveThreadDetail (id) {
  return async (dispatch) => {
    dispatch(showLoading())

    try {
      const threadDetail = await api.seeDetailThread({ id })
      dispatch(receiveThreadDetailActionCreator(threadDetail))
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

function asyncUpVoteThreadDetail () {
  return async (dispatch, getState) => {
    dispatch(showLoading())
    const { authUser, threadDetail } = getState()
    dispatch(UpVoteThreadDetailActionCreator(authUser.id))

    try {
      await api.UpVoteThread({ id: threadDetail.id })
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

function asyncDownVoteThreadDetail () {
  return async (dispatch, getState) => {
    dispatch(showLoading())

    const { authUser, threadDetail } = getState()
    dispatch(DownVoteThreadDetailActionCreator(authUser.id))

    try {
      await api.DownVoteThread({ id: threadDetail.id })
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

function asyncNeutralVoteThreadDetail () {
  return async (dispatch, getState) => {
    dispatch(showLoading())

    const { authUser, threadDetail } = getState()
    dispatch(NeutralVoteThreadDetailActionCreator(authUser.id))

    try {
      await api.NeutralVoteThread({ id: threadDetail.id })
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
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  UpVoteThreadDetailActionCreator,
  DownVoteThreadDetailActionCreator,
  NeutralVoteThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncNeutralVoteThreadDetail
}

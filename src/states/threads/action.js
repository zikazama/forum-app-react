/**
 * @TODO: Define all the actions (creator) for the talks state
 */
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import api from '../../utils/api'
import Swal from 'sweetalert2'

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_TREADS',
  ADD_THREAD: 'ADD_THREAD',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  NEUTRAL_VOTE_THREAD: 'NEUTRAL_VOTE_THREAD'
}

function receiveThreadsActionCreator (threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads
    }
  }
}

function addThreadActionCreator (thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread
    }
  }
}

function UpVoteThreadActionCreator ({ id, userId }) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      id, userId
    }
  }
}

function DownVoteThreadActionCreator ({ id, userId }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      id, userId
    }
  }
}

function NeutralVoteThreadActionCreator ({ id, userId }) {
  return {
    type: ActionType.NEUTRAL_VOTE_THREAD,
    payload: {
      id, userId
    }
  }
}

function asyncAddThread ({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading())

    try {
      const thread = await api.createThread({ title, body, category })
      dispatch(addThreadActionCreator(thread))
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

function asyncUpVoteThread (id) {
  return async (dispatch, getState) => {
    dispatch(showLoading())

    const { authUser } = getState()
    dispatch(UpVoteThreadActionCreator({ id, userId: authUser.id }))

    try {
      await api.UpVoteThread({ id })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      })
      dispatch(UpVoteThreadActionCreator({ id, userId: authUser.id }))
    }

    dispatch(hideLoading())
  }
}

function asyncDownVoteThread (id) {
  return async (dispatch, getState) => {
    dispatch(showLoading())

    const { authUser } = getState()
    dispatch(DownVoteThreadActionCreator({ id, userId: authUser.id }))

    try {
      await api.DownVoteThread({ id })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      })
      dispatch(DownVoteThreadActionCreator({ id, userId: authUser.id }))
    }

    dispatch(hideLoading())
  }
}

function asyncNeutralVoteThread (id) {
  return async (dispatch, getState) => {
    dispatch(showLoading())

    const { authUser } = getState()
    dispatch(NeutralVoteThreadActionCreator({ id, userId: authUser.id }))

    try {
      await api.NeutralVoteThread({ id })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      })
      dispatch(NeutralVoteThreadActionCreator({ id, userId: authUser.id }))
    }

    dispatch(hideLoading())
  }
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  UpVoteThreadActionCreator,
  asyncAddThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread
}

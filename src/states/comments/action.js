/**
 * @TODO: Define all the actions (creator) for the comments state
 */
import api from '../../utils/api'
import Swal from 'sweetalert2'

const ActionType = {
  ADD_COMMENT: 'ADD_COMMENT',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRAL_VOTE_COMMENT: 'NEUTRAL_VOTE_COMMENT'
}

function addCommentActionCreator (comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment
    }
  }
}

function UpVoteCommentActionCreator ({ threadId, commentId, userId }) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      threadId, commentId, userId
    }
  }
}

function DownVoteCommentActionCreator ({ threadId, commentId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      threadId, commentId, userId
    }
  }
}

function NeutralVoteCommentActionCreator ({ threadId, commentId, userId }) {
  return {
    type: ActionType.NEUTRAL_VOTE_COMMENT,
    payload: {
      threadId, commentId, userId
    }
  }
}

function asyncAddComment ({ id, content }) {
  return async (dispatch) => {
    try {
      const comment = await api.createComment({ id, content })
      dispatch(addCommentActionCreator(comment))
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      })
    }
  }
}

function asyncUpVoteComment ({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(UpVoteCommentActionCreator({ threadId, commentId, userId: authUser.id }))

    try {
      await api.UpVoteComment({ threadId, commentId })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      })
      dispatch(UpVoteCommentActionCreator({ threadId, commentId, userId: authUser.id }))
    }
  }
}

function asyncDownVoteComment ({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(DownVoteCommentActionCreator({ threadId, commentId, userId: authUser.id }))

    try {
      await api.DownVoteComment({ threadId, commentId })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      })
      dispatch(DownVoteCommentActionCreator({ threadId, commentId, userId: authUser.id }))
    }
  }
}

function asyncNeutralVoteComment ({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState()
    dispatch(NeutralVoteCommentActionCreator({ threadId, commentId, userId: authUser.id }))

    try {
      await api.NeutralVoteComment({ threadId, commentId })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      })
      dispatch(NeutralVoteCommentActionCreator({ threadId, commentId, userId: authUser.id }))
    }
  }
}

export {
  ActionType,
  addCommentActionCreator,
  UpVoteCommentActionCreator,
  DownVoteCommentActionCreator,
  NeutralVoteCommentActionCreator,
  asyncAddComment,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment
}

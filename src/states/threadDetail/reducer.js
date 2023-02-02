/**
 * @TODO: Define reducer for the talkDetail state
 */
import { ActionType } from './action'

function threadDetailReducer (threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail
    case ActionType.CLEAR_THREAD_DETAIL:
      return null
    case ActionType.UP_VOTE_THREAD_DETAIL:
    {
      let upVotesBy = null
      let downVotesBy = null
      if (!threadDetail.upVotesBy.includes(action.payload.userId) && !threadDetail.downVotesBy.includes(action.payload.userId)) {
        upVotesBy = threadDetail.upVotesBy.concat([action.payload.userId])
        downVotesBy = threadDetail.downVotesBy
      } else if (threadDetail.upVotesBy.includes(action.payload.userId) && !threadDetail.downVotesBy.includes(action.payload.userId)) {
        upVotesBy = threadDetail.upVotesBy.filter((id) => id !== action.payload.userId)
        downVotesBy = threadDetail.downVotesBy
      } else if (!threadDetail.upVotesBy.includes(action.payload.userId) && threadDetail.downVotesBy.includes(action.payload.userId)) {
        upVotesBy = threadDetail.upVotesBy.concat([action.payload.userId])
        downVotesBy = threadDetail.downVotesBy.filter((id) => id !== action.payload.userId)
      }
      return {
        ...threadDetail,
        upVotesBy,
        downVotesBy
      }
    }
    case ActionType.DOWN_VOTE_THREAD_DETAIL:
    {
      let upVotesBy = null
      let downVotesBy = null
      if (!threadDetail.upVotesBy.includes(action.payload.userId) && !threadDetail.downVotesBy.includes(action.payload.userId)) {
        downVotesBy = threadDetail.downVotesBy.concat([action.payload.userId])
        upVotesBy = threadDetail.upVotesBy
      } else if (!threadDetail.upVotesBy.includes(action.payload.userId) && threadDetail.downVotesBy.includes(action.payload.userId)) {
        downVotesBy = threadDetail.downVotesBy.filter((id) => id !== action.payload.userId)
        upVotesBy = threadDetail.upVotesBy
      } else if (threadDetail.upVotesBy.includes(action.payload.userId) && !threadDetail.downVotesBy.includes(action.payload.userId)) {
        downVotesBy = threadDetail.downVotesBy.concat([action.payload.userId])
        upVotesBy = threadDetail.upVotesBy.filter((id) => id !== action.payload.userId)
      }
      return {
        ...threadDetail,
        upVotesBy,
        downVotesBy
      }
    }
    case ActionType.NEUTRAL_VOTE_THREAD_DETAIL:
    {
      let upVotesBy = null
      let downVotesBy = null
      if (threadDetail.upVotesBy) {
        if (threadDetail.upVotesBy.includes(action.payload.userId)) {
          upVotesBy = threadDetail.upVotesBy.filter((id) => id !== action.payload.userId)
        } else {
          upVotesBy = []
        }
      }
      if (threadDetail.downVotesBy) {
        if (threadDetail.downVotesBy.includes(action.payload.userId)) {
          downVotesBy = threadDetail.downVotesBy.filter((id) => id !== action.payload.userId)
        } else {
          downVotesBy = []
        }
      }
      return {
        ...threadDetail,
        upVotesBy,
        downVotesBy
      }
    }
    default:
      return threadDetail
  }
}

export default threadDetailReducer

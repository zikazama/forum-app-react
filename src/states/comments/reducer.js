/**
 * @TODO: Define the reducer for the talks state
 */
import { ActionType } from './action'

function commentsReducer (comments = [], action = {}) {
  switch (action.type) {
    case ActionType.ADD_COMMENT:
      return [action.payload.comment, ...comments]
    case ActionType.UP_VOTE_COMMENT:
      return comments.map((comment) => {
        if (comment.id === action.payload.id) {
          let upVotesBy = null
          let downVotesBy = null
          if (!comment.upVotesBy.includes(action.payload.userId) && !comment.downVotesBy.includes(action.payload.userId)) {
            upVotesBy = comment.upVotesBy.concat([action.payload.userId])
            downVotesBy = comment.downVotesBy
          } else if (comment.upVotesBy.includes(action.payload.userId) && !comment.downVotesBy.includes(action.payload.userId)) {
            upVotesBy = comment.upVotesBy.filter((id) => id !== action.payload.userId)
            downVotesBy = comment.downVotesBy
          } else if (!comment.upVotesBy.includes(action.payload.userId) && comment.downVotesBy.includes(action.payload.userId)) {
            upVotesBy = comment.upVotesBy.concat([action.payload.userId])
            downVotesBy = comment.downVotesBy.filter((id) => id !== action.payload.userId)
          }
          return {
            ...comment,
            upVotesBy,
            downVotesBy
          }
        }
        return comment
      })
    case ActionType.DOWN_VOTE_COMMENT:
      return comments.map((comment) => {
        if (comment.id === action.payload.id) {
          let upVotesBy = null
          let downVotesBy = null
          if (!comment.upVotesBy.includes(action.payload.userId) && !comment.downVotesBy.includes(action.payload.userId)) {
            downVotesBy = comment.downVotesBy.concat([action.payload.userId])
            upVotesBy = comment.upVotesBy
          } else if (!comment.upVotesBy.includes(action.payload.userId) && comment.downVotesBy.includes(action.payload.userId)) {
            downVotesBy = comment.downVotesBy.filter((id) => id !== action.payload.userId)
            upVotesBy = comment.upVotesBy
          } else if (comment.upVotesBy.includes(action.payload.userId) && !comment.downVotesBy.includes(action.payload.userId)) {
            downVotesBy = comment.downVotesBy.concat([action.payload.userId])
            upVotesBy = comment.upVotesBy.filter((id) => id !== action.payload.userId)
          }
          return {
            ...comment,
            upVotesBy,
            downVotesBy
          }
        }
        return comment
      })
    case ActionType.NEUTRAL_VOTE_COMMENT:
      return comments.map((comment) => {
        if (comment.id === action.payload.id) {
          let upVotesBy = null
          let downVotesBy = null
          if (comment.upVotesBy) {
            if (comment.upVotesBy.includes(action.payload.userId)) {
              upVotesBy = comment.upVotesBy.filter((id) => id !== action.payload.userId)
            } else {
              upVotesBy = []
            }
          }
          if (comment.downVotesBy) {
            if (comment.downVotesBy.includes(action.payload.userId)) {
              downVotesBy = comment.downVotesBy.filter((id) => id !== action.payload.userId)
            } else {
              downVotesBy = []
            }
          }
          return {
            ...comment,
            upVotesBy,
            downVotesBy
          }
        }
        return comment
      })
    default:
      return comments
  }
}

export default commentsReducer

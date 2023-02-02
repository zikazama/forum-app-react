/**
 * @TODO: Define the reducer for the authUser state
 */
import { ActionType } from './action'

function leaderboardsReducer (leaderboards = null, action = {}) {
  switch (action.type) {
    case ActionType.SET_LEADERBOARDS:
      return action.payload.leaderboards
    default:
      return leaderboards
  }
}

export default leaderboardsReducer

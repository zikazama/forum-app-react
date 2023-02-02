/**
 * @TODO: Create Redux store
 */
import { configureStore } from '@reduxjs/toolkit'
import { loadingBarReducer } from 'react-redux-loading-bar'
import authUserReducer from './authUser/reducer'
import commentsReducer from './comments/reducer'
import threadDetailReducer from './threadDetail/reducer'
import threadsReducer from './threads/reducer'
import usersReducer from './users/reducer'
import leaderboardsReducer from './leaderboards/reducer'
import isPreloadReducer from './isPreload/reducer'

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    comments: commentsReducer,
    threadDetail: threadDetailReducer,
    threads: threadsReducer,
    users: usersReducer,
    leaderboards: leaderboardsReducer,
    isPreload: isPreloadReducer,
    loadingBar: loadingBarReducer
  }
})

export default store

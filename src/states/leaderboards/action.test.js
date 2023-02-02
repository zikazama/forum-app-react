import { hideLoading, showLoading } from 'react-redux-loading-bar'
import api from '../../utils/api'
import { setLeaderboardsActionCreator, asyncSetLeaderboards } from '../leaderboards/action'

/**
 * skenario test
 *
 *  - asyncSetLeaderboards thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

const fakeLeaderboardsResponse = [
  {
    user: {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg'
    },
    score: 10
  }
]

const fakeErrorResponse = new Error('Ups, something went wrong')

describe('asyncSetLeaderboards thunk', () => {
  beforeEach(() => {
    // backup original implementation
    api._leaderboards = api.leaderboards
  })

  afterEach(() => {
    // restore original implementation
    api.leaderboards = api._leaderboards

    // delete backup
    delete api._leaderboards
  })

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.leaderboards = () => Promise.resolve(fakeLeaderboardsResponse)
    // mock dispatch
    const dispatch = jest.fn()

    // action
    await asyncSetLeaderboards()(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(setLeaderboardsActionCreator(fakeLeaderboardsResponse))
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.leaderboards = () => Promise.reject(fakeErrorResponse)
    // mock dispatch
    const dispatch = jest.fn()
    // mock alert
    window.alert = jest.fn()
    console.log = jest.fn()

    // action
    await asyncSetLeaderboards()(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
    expect(console.log).toHaveBeenCalledWith(fakeErrorResponse.message)
  })
})

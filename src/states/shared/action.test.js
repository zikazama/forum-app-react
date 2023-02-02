import { hideLoading, showLoading } from 'react-redux-loading-bar'
import api from '../../utils/api'
import { receiveThreadsActionCreator } from '../threads/action'
import { receiveUsersActionCreator } from '../users/action'
import { asyncPopulate } from './action'

/**
 * skenario test
 *
 *  - asyncPopulate thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0
  }
]

const fakeUsersResponse = [
  {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg'
  }
]

const fakeErrorResponse = new Error('Ups, something went wrong')

describe('asyncPopulate thunk', () => {
  beforeEach(() => {
    // backup original implementation
    api._seeAllUsers = api.seeAllUsers
    api._seeAllThreads = api.seeAllThreads
  })

  afterEach(() => {
    // restore original implementation
    api.seeAllUsers = api._seeAllUsers
    api.seeAllThreads = api._seeAllThreads

    // delete backup
    delete api._seeAllUsers
    delete api._seeAllThreads
  })

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.seeAllUsers = () => Promise.resolve(fakeUsersResponse)
    api.seeAllThreads = () => Promise.resolve(fakeThreadsResponse)
    // mock dispatch
    const dispatch = jest.fn()

    // action
    await asyncPopulate()(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse))
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse))
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.seeAllUsers = () => Promise.reject(fakeErrorResponse)
    api.seeAllThreads = () => Promise.reject(fakeErrorResponse)
    // mock dispatch
    const dispatch = jest.fn()
    // mock alert
    window.alert = jest.fn()
    console.log = jest.fn()

    // action
    await asyncPopulate()(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
    expect(console.log).toHaveBeenCalledWith(fakeErrorResponse.message)
  })
})

import threadsReducer from './reducer'

/**
 * test scenario for threadsReducer
 *
 *  - threadsReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the threads when given by RECEIVE_THREADS action
 *  - should return the threads with the new thread when given by ADD_THREAD action
 *  - should return the threads with the toggled up vote thread when given by UP_VOTE_THREAD action
 *  - should return the threads with the toggled down vote thread when given by DOWN_VOTE_THREAD action
 *  - should return the threads with the toggled neutral vote threads when given by NEUTRAL_VOTE_THREAD action
 *
 */

describe('threadReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = []
    const action = { type: 'UNKNOWN' }

    // action
    const nextState = threadsReducer(initialState, action)

    // assert
    expect(nextState).toEqual(initialState)
  })

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    // arrange
    const initialState = [
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
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0
      }
    ]

    const action = {
      type: 'RECEIVE_THREADS',
      payload: {
        threads: [
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
          },
          {
            id: 'thread-2',
            title: 'Thread Kedua',
            body: 'Ini adalah thread kedua',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-2',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0
          }
        ]
      }
    }

    // action
    const nextState = threadsReducer(initialState, action)

    // assert
    expect(nextState).toEqual(action.payload.threads)
  })

  it('should return the threads with the new thread when given by ADD_THREAD action', () => {
    // arrange
    const initialState = [
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

    const action = {
      type: 'ADD_THREAD',
      payload: {
        thread: {
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
      }
    }

    // action
    const nextState = threadsReducer(initialState, action)

    // assert
    expect(nextState).toEqual([action.payload.thread, ...initialState])
  })

  it('should return the threads with the toggled up vote thread when given by UP_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
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

    const action = {
      type: 'UP_VOTE_THREAD',
      payload: {
        id: 'thread-1',
        userId: 'user-1'
      }
    }

    // action: up vote thread
    const nextState = threadsReducer(initialState, action)

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [action.payload.userId]
      }
    ])

    // action: unvote thread
    const nextState2 = threadsReducer(nextState, action)

    // assert
    expect(nextState2).toEqual(initialState)
  })

  it('should return the threads with the toggled down vote thread when given by DOWN_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
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

    const action = {
      type: 'DOWN_VOTE_THREAD',
      payload: {
        id: 'thread-1',
        userId: 'user-1'
      }
    }

    // action: down vote thread
    const nextState = threadsReducer(initialState, action)

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        downVotesBy: [action.payload.userId]
      }
    ])

    // action: unvote thread
    const nextState2 = threadsReducer(nextState, action)

    // assert
    expect(nextState2).toEqual(initialState)
  })

  it('should return the threads with the toggled neutral vote thread when given by NEUTRAL_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
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

    const actionUpVote = {
      type: 'UP_VOTE_THREAD',
      payload: {
        id: 'thread-1',
        userId: 'user-1'
      }
    }

    // action: up vote thread
    const nextState = threadsReducer(initialState, actionUpVote)

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [actionUpVote.payload.userId]
      }
    ])

    const actionNeutralVote = {
      type: 'NEUTRAL_VOTE_THREAD',
      payload: {
        id: 'thread-1',
        userId: 'user-1'
      }
    }

    // action: neutral thread
    const nextState2 = threadsReducer(nextState, actionNeutralVote)

    // assert
    expect(nextState2).toEqual([
      {
        ...initialState[0],
        upVotesBy: []
      }
    ])

    const actionDownVote = {
      type: 'DOWN_VOTE_THREAD',
      payload: {
        id: 'thread-1',
        userId: 'user-1'
      }
    }

    // action: up vote thread
    const nextState3 = threadsReducer(initialState, actionDownVote)

    // assert
    expect(nextState3).toEqual([
      {
        ...initialState[0],
        downVotesBy: [actionUpVote.payload.userId]
      }
    ])

    // action: neutral thread
    const nextState4 = threadsReducer(nextState, actionNeutralVote)

    // assert
    expect(nextState4).toEqual([
      {
        ...initialState[0],
        downVotesBy: []
      }
    ])
  })
})

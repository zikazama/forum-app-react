import threadDetailReducer from './reducer'

/**
 * test scenario for threadDetailReducer
 *
 *  - threadDetailReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the detailThread when given by RECEIVE_THREAD_DETAIL action
 *  - should return the detailThread when given by CLEAR_THREAD_DETAIL action
 *  - should return the detailThread with the toggled up vote thread detail when given by UP_VOTE_THREAD_DETAIL action
 *  - should return the detailThread with the toggled down vote thread detail when given by DOWN_VOTE_THREAD_DETAIL action
 *  - should return the detailThread with the toggled neutral vote thread detail when given by NEUTRAL_VOTE_THREAD_DETAIL action
 *
 */

describe('threadDetailReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = []
    const action = { type: 'UNKNOWN' }

    // action
    const nextState = threadDetailReducer(initialState, action)

    // assert
    expect(nextState).toEqual(initialState)
  })

  it('should return the detail thread when given by RECEIVE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg'
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg'
          },
          upVotesBy: [],
          downVotesBy: []
        }
      ]
    }

    const action = {
      type: 'RECEIVE_THREAD_DETAIL',
      payload: {
        detailThread: {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg'
          },
          upVotesBy: [],
          downVotesBy: [],
          comments: [
            {
              id: 'comment-1',
              content: 'Ini adalah komentar pertama',
              createdAt: '2021-06-21T07:00:00.000Z',
              owner: {
                id: 'users-1',
                name: 'John Doe',
                avatar: 'https://generated-image-url.jpg'
              },
              upVotesBy: [],
              downVotesBy: []
            }
          ]
        }
      }
    }

    // action
    const nextState = threadDetailReducer(initialState, action)

    // assert
    expect(nextState).toEqual(action.payload.threads)
  })

  it('should return the detail thread with the toggled up vote thread when given by UP_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg'
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg'
          },
          upVotesBy: [],
          downVotesBy: []
        }
      ]
    }

    const action = {
      type: 'UP_VOTE_THREAD_DETAIL',
      payload: {
        userId: 'user-1'
      }
    }

    // action: up vote thread
    const nextState = threadDetailReducer(initialState, action)

    // assert
    expect(nextState).toEqual(
      {
        ...initialState,
        upVotesBy: [action.payload.userId]
      }
    )

    // action: unvote thread
    const nextState2 = threadDetailReducer(nextState, action)

    // assert
    expect(nextState2).toEqual(initialState)
  })

  it('should return the threads with the toggled down vote thread when given by DOWN_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg'
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg'
          },
          upVotesBy: [],
          downVotesBy: []
        }
      ]
    }

    const action = {
      type: 'DOWN_VOTE_THREAD_DETAIL',
      payload: {
        userId: 'user-1'
      }
    }

    // action: down vote thread
    const nextState = threadDetailReducer(initialState, action)

    // assert
    expect(nextState).toEqual(
      {
        ...initialState,
        downVotesBy: [action.payload.userId]
      }
    )

    // action: unvote thread
    const nextState2 = threadDetailReducer(nextState, action)

    // assert
    expect(nextState2).toEqual(initialState)
  })

  it('should return the threads with the toggled neutral vote thread when given by NEUTRAL_VOTE_THREAD action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg'
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg'
          },
          upVotesBy: [],
          downVotesBy: []
        }
      ]
    }

    const actionUpVote = {
      type: 'UP_VOTE_THREAD_DETAIL',
      payload: {
        userId: 'user-1'
      }
    }

    // action: up vote thread
    const nextState = threadDetailReducer(initialState, actionUpVote)

    // assert
    expect(nextState).toEqual(
      {
        ...initialState,
        upVotesBy: [actionUpVote.payload.userId]
      }
    )

    const actionNeutralVote = {
      type: 'NEUTRAL_VOTE_THREAD_DETAIL',
      payload: {
        userId: 'user-1'
      }
    }

    // action: neutral thread
    const nextState2 = threadDetailReducer(nextState, actionNeutralVote)

    // assert
    expect(nextState2).toEqual(
      {
        ...initialState,
        upVotesBy: []
      }
    )

    const actionDownVote = {
      type: 'DOWN_VOTE_THREAD_DETAIL',
      payload: {
        userId: 'user-1'
      }
    }

    // action: up vote thread
    const nextState3 = threadDetailReducer(initialState, actionDownVote)

    // assert
    expect(nextState3).toEqual(
      {
        ...initialState,
        downVotesBy: [actionUpVote.payload.userId]
      }
    )

    // action: neutral thread
    const nextState4 = threadDetailReducer(nextState, actionNeutralVote)

    // assert
    expect(nextState4).toEqual(
      {
        ...initialState,
        downVotesBy: []
      }
    )
  })
})

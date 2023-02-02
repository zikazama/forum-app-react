const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1'

  async function _fetchWithAuth (url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
  }

  function putAccessToken (token) {
    localStorage.setItem('accessToken', token)
  }

  function getAccessToken () {
    return localStorage.getItem('accessToken')
  }

  async function register ({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })

    const responseJson = await response.json()
    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const { data: { user } } = responseJson

    return user
  }

  async function login ({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const { data: { token } } = responseJson

    return token
  }

  async function seeAllUsers () {
    const response = await _fetchWithAuth(`${BASE_URL}/users`, {
      method: 'GET'
    })

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const { data: { users } } = responseJson

    return users
  }

  async function getOwnProfile () {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`)

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const { data: { user } } = responseJson

    return user
  }

  async function createThread ({ title, body, category }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title, body, category
      })
    })

    const responseJson = await response.json()
    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const { data: { thread } } = responseJson

    return thread
  }

  async function seeAllThreads () {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'GET'
    })

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const { data: { threads } } = responseJson

    return threads
  }

  async function seeDetailThread ({ id }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}`, {
      method: 'GET'
    })

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const { data: { detailThread } } = responseJson

    return detailThread
  }

  async function createComment ({ id, content }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content
      })
    })

    const responseJson = await response.json()
    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const { data: { comment } } = responseJson

    return comment
  }

  async function UpVoteThread ({ id }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/up-vote`, {
      method: 'POST'
    })

    const responseJson = await response.json()
    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const { data: { vote } } = responseJson

    return vote
  }

  async function DownVoteThread ({ id }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/down-vote`, {
      method: 'POST'
    })

    const responseJson = await response.json()
    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const { data: { vote } } = responseJson

    return vote
  }

  async function NeutralVoteThread ({ id }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/neutral-vote`, {
      method: 'POST'
    })

    const responseJson = await response.json()
    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const { data: { vote } } = responseJson

    return vote
  }

  async function UpVoteComment ({ threadId, commentId }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, {
      method: 'POST'
    })

    const responseJson = await response.json()
    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const { data: { vote } } = responseJson

    return vote
  }

  async function DownVoteComment ({ threadId, commentId }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`, {
      method: 'POST'
    })

    const responseJson = await response.json()
    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const { data: { vote } } = responseJson

    return vote
  }

  async function NeutralVoteComment ({ threadId, commentId }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`, {
      method: 'POST'
    })

    const responseJson = await response.json()
    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const { data: { vote } } = responseJson

    return vote
  }

  async function leaderboards () {
    const response = await _fetchWithAuth(`${BASE_URL}/leaderboards`, {
      method: 'GET'
    })

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const { data: { leaderboards } } = responseJson

    return leaderboards
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    seeAllUsers,
    getOwnProfile,
    createThread,
    seeAllThreads,
    seeDetailThread,
    createComment,
    UpVoteThread,
    DownVoteThread,
    NeutralVoteThread,
    UpVoteComment,
    DownVoteComment,
    NeutralVoteComment,
    leaderboards
  }
})()

export default api

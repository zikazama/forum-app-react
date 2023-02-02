import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { asyncPreloadProcess } from './states/isPreload/action'
import { useSelector, useDispatch } from 'react-redux'
import Loading from './components/Loading'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Detail from './pages/Detail'
import ProtectedRoute from './components/ProtectedRoute'
import Leaderboard from './pages/LeaderBoard'

function App () {
  const { isPreload = false } = useSelector((states) => states)

  const dispatch = useDispatch() // @TODO: get dispatch function from store

  useEffect(() => {
    dispatch(asyncPreloadProcess())
  }, [dispatch])

  if (isPreload) {
    return null
  }

  return (
    <>
    <Loading/>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute unprotected={true}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute unprotected={true}>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
         <Route
          path="/detail/:threadId"
          element={
            <ProtectedRoute>
              <Detail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App

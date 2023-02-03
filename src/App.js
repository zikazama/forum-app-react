import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { asyncPreloadProcess } from './states/isPreload/action'
import { useSelector, useDispatch } from 'react-redux'
import Loading from './components/Loading'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Detail from './pages/Detail'
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
              <Login />
          }
        />
        <Route
          path="/register"
          element={
              <Register />
          }
        />
        <Route
          path="/home"
          element={
              <Home />
          }
        />
         <Route
          path="/detail/:threadId"
          element={
              <Detail />
          }
        />
        <Route
          path="/leaderboard"
          element={
              <Leaderboard />
          }
        />
      </Routes>
    </>
  )
}

export default App

import * as React from 'react'
import Layout from './Layout'
import LeaderBoardCard from '../components/LeaderBoardCard'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { asyncSetLeaderboards } from '../states/leaderboards/action'
import ProtectedRoute from '../components/ProtectedRoute'

function LeaderBoard () {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncSetLeaderboards())
  }, [dispatch])

  return (
    <ProtectedRoute>
  <Layout>
    <h1>LeaderBoard</h1>
    <LeaderBoardCard/>
  </Layout>
  </ProtectedRoute>
  )
}

export default LeaderBoard

import * as React from 'react'
import Layout from './Layout'
import ThreadCard from './../components/ThreadCard'
import InputThread from '../components/InputThread'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { asyncPopulate } from '../states/shared/action'
import { useNavigate } from 'react-router-dom'

function Home () {
  const navigate = useNavigate()
  const { threads, users, authUser } = useSelector((states) => states)
  const dispatch = useDispatch()

  useEffect(() => {
    if (authUser === null) {
      navigate('/')
    }
    dispatch(asyncPopulate())
  }, [dispatch])

  return (
      <Layout>
        <InputThread />
        {threads.map((thread, index) => {
          return (
            <ThreadCard
              key={index}
              thread={thread}
              user={users.find((user) => user.id === thread.ownerId)}
              isHome={true}
            />
          )
        })}
      </Layout>
  )
}

export default Home

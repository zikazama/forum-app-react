import * as React from 'react'
import Layout from './Layout'
import ThreadCard from './../components/ThreadCard'
import Button from '@mui/material/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { asyncReceiveThreadDetail } from '../states/threadDetail/action'

function Detail () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { threadId } = useParams()
  const { threadDetail } = useSelector((states) => states)

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId))
  }, [threadId, dispatch])

  return (
    <Layout>
      <Button onClick={(e) => navigate('/home')} variant="contained">
        Kembali
      </Button>
      {threadDetail && <ThreadCard
        isHome={false}
        thread={threadDetail}
        user={threadDetail.owner}
      /> }
    </Layout>
  )
}

export default Detail

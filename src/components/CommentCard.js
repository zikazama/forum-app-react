import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral'
import { PropTypes } from 'prop-types'
import { postedAt } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { asyncUpVoteComment, asyncDownVoteComment, asyncNeutralVoteComment } from '../states/comments/action'
import { asyncReceiveThreadDetail } from '../states/threadDetail/action'

export default function CommentCard ({ thread, comment }) {
  const dispatch = useDispatch()
  const {
    authUser
  } = useSelector((states) => states)
  const [statusUpVote, setStatusUpVote] = useState()
  const [statusDownVote, setStatusDownVote] = useState()

  useEffect(() => {
    comment.upVotesBy && setStatusUpVote(comment.upVotesBy.find((vote) => vote === authUser.id))
    comment.downVotesBy && setStatusDownVote(comment.downVotesBy.find((vote) => vote === authUser.id))
  }, [comment])

  const upVoteAction = async () => {
    await dispatch(asyncUpVoteComment({ threadId: thread.id, commentId: comment.id }))
    await dispatch(asyncReceiveThreadDetail(thread.id))
  }

  const downVoteAction = async () => {
    await dispatch(asyncDownVoteComment({ threadId: thread.id, commentId: comment.id }))
    await dispatch(asyncReceiveThreadDetail(thread.id))
  }

  const neutralAction = async () => {
    await dispatch(asyncNeutralVoteComment({ threadId: thread.id, commentId: comment.id }))
    await dispatch(asyncReceiveThreadDetail(thread.id))
  }

  return (
    <Card sx={{ maxWidth: '100%' }}>
      <CardHeader
        avatar={
          <img src={comment.owner.avatar} />
        }
        action={
          <IconButton aria-label="settings">
          </IconButton>
        }
        title={comment.owner.name}
        subheader={postedAt(comment.createdAt)}
      />
      <CardContent>
        <Typography variant="body1" color="text.primary" dangerouslySetInnerHTML={{ __html: comment.content }}>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={upVoteAction} style={ statusUpVote !== undefined ? { color: 'green' } : {}} aria-label="up vote">
          <ThumbUpIcon />
        </IconButton>
        <IconButton onClick={neutralAction} aria-label="neutral">
          <SentimentNeutralIcon />
        </IconButton>
        <IconButton onClick={downVoteAction} style={ statusDownVote !== undefined ? { color: 'red' } : {}} aria-label="down vote">
          <ThumbDownIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

CommentCard.propTypes = {
  thread: PropTypes.object,
  comment: PropTypes.object
}

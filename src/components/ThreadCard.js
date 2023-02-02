import * as React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral'
import CommentCard from './CommentCard'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { PropTypes } from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { postedAt } from '../utils'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import useInput from './../hooks/useInput'
import { asyncUpVoteThread, asyncDownVoteThread, asyncNeutralVoteThread } from '../states/threads/action'
import { asyncUpVoteThreadDetail, asyncDownVoteThreadDetail, asyncNeutralVoteThreadDetail, asyncReceiveThreadDetail } from '../states/threadDetail/action'
import { asyncAddComment } from '../states/comments/action'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))

export default function ThreadCard ({ isHome = false, thread = null, user = null }) {
  const [expanded, setExpanded] = React.useState(false)
  const [content, onChangeContent, setContent] = useInput()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    authUser
  } = useSelector((states) => states)
  const [statusUpVote, setStatusUpVote] = useState()
  const [statusDownVote, setStatusDownVote] = useState()

  useEffect(() => {
    thread.upVotesBy && setStatusUpVote(thread.upVotesBy.find((vote) => vote === authUser.id))
    thread.downVotesBy && setStatusDownVote(thread.downVotesBy.find((vote) => vote === authUser.id))
  }, [thread, dispatch])

  const upVoteAction = () => {
    isHome ? dispatch(asyncUpVoteThread(thread.id)) : dispatch(asyncUpVoteThreadDetail(thread.id))
  }

  const downVoteAction = () => {
    isHome ? dispatch(asyncDownVoteThread(thread.id)) : dispatch(asyncDownVoteThreadDetail(thread.id))
  }

  const neutralAction = () => {
    isHome ? dispatch(asyncNeutralVoteThread(thread.id)) : dispatch(asyncNeutralVoteThreadDetail(thread.id))
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setContent('')
    dispatch(asyncAddComment({ id: thread.id, content }))
    dispatch(asyncReceiveThreadDetail(thread.id))
  }

  return (
    <Card sx={{ maxWidth: '100%', marginTop: '30px', marginBottom: '30px' }}>
      <CardHeader
        avatar={
          <img src={user.avatar} />
        }
        action={<IconButton aria-label="settings"></IconButton>}
        title={user.name}
        subheader={postedAt(thread.createdAt)}
      />
      <CardContent onClick={(e) => navigate(`/detail/${thread.id}`)}>
        <h1 color="text.primary">{thread.title}</h1>
        <h3 color="text.primary">{thread.category}</h3>
        <Typography variant="body1" dangerouslySetInnerHTML={{ __html: thread.body }} color="text.primary">

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
        {isHome === true && thread.totalComments + ' komentar'}
        {isHome === false && (
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        )}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {thread.comments &&
        <CardContent>
          <form onSubmit={onSubmit}>
          <TextField value={content} onChange={onChangeContent} fullWidth label="Komentar" id="fullWidth" />
          <Button type="submit" style={{ width: '100%', display: 'block' }} variant="contained">
            Kirim
          </Button>
          </form>
          {thread.comments.map((comment, index) => <CommentCard style={{ marginTop: '50px', marginBottom: '50px' }} key={index} thread={thread} comment={comment} />)}
        </CardContent>
      }
      </Collapse>
    </Card>
  )
}

ThreadCard.propTypes = {
  isHome: PropTypes.bool,
  thread: PropTypes.object,
  user: PropTypes.object
}

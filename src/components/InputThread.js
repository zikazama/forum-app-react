import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import useInput from './../hooks/useInput'
import { asyncAddThread } from '../states/threads/action'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

export default function InputThread () {
  const [title, onChangeTitle, setTitle] = useInput()
  const [category, onChangeCategory, setCategory] = useInput()
  const [body, onChangeBody, setBody] = useInput()
  const dispatch = useDispatch()

  const onPosting = (e) => {
    e.preventDefault()
    setTitle('')
    setCategory('')
    setBody('')
    dispatch(asyncAddThread({ title, body, category }))
    Swal.fire('Berhasil menambahkan thread!', '', 'success')
  }
  return (
    <Card sx={{ maxWidth: '100%' }}>
      <form onSubmit={onPosting}>
      <CardContent>
        <TextField
          style={{ width: '100%' }}
          helperText="Please enter your title"
          id="demo-helper-text-misaligned"
          label="Title"
          value={title}
          onChange={onChangeTitle}
        />
        <TextField
          style={{ width: '100%' }}
          helperText="Please enter your category"
          id="demo-helper-text-misaligned"
          label="Category"
          value={category}
          onChange={onChangeCategory}
        />
        <TextField
          id="outlined-multiline-static"
          style={{ width: '100%' }}
          label="Body"
          helperText="Please enter your body"
          multiline
          rows={3}
          value={body}
          onChange={onChangeBody}
        />
        <Button data-cy="posting-button" type="submit" style={{ width: '100%' }} variant="contained">Posting</Button>
      </CardContent>
      </form>
    </Card>
  )
}

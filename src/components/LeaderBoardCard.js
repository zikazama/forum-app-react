import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import { useSelector } from 'react-redux'

export default function LeaderBoardCard () {
  const {
    leaderboards
  } = useSelector((states) => states)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        {leaderboards && <TableBody>
          {leaderboards.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell component="th" scope="row">
              <Avatar alt="Remy Sharp" src={row.user.avatar} />
                {row.user.name}
              </TableCell>
              <TableCell align="right">{row.user.email}</TableCell>
              <TableCell align="right">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody> }
      </Table>
    </TableContainer>
  )
}

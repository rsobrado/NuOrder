import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import SearchBar from './SearchBar'
import Issues from './Issues'

const useStyles = makeStyles((theme) => ({
  search: {
    borderRadius: 20,
    boxShadow: 'inset 0 1px 4px 2px rgba(0,0,0,0.12)',
  },
  rounded: {
    borderRadius: 25,
    position: 'relative',
  },
  login: {
    color: '#717171',
    fontSize: 'small',
    marginRight: 18,
    fontWeight: 'bold',
  },
  title: {
    color: 'white',
    position: 'absolute',
    zIndex: '-1',
    top: '-55px',
    background: 'linear-gradient(123deg,#3978af 0,#2bbfc3 50%,#2898bb 100%)',
    padding: '15px 53px 50px 53px ',
    borderRadius: 30,
    textShadow: '1px 1px 2px rgba(0,0,0,0.22), 2px 2px 4px rgba(0,0,0,0.22)',
    maxWidth: 380,
  },
}))

export default function Dashboard() {
  const classes = useStyles()

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={12} lg={12}>
          <Paper elevation={24} className={classes.rounded}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Facebook / React / Issues
            </Typography>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table" lg={12}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Grid container spacing={4} direction="row">
                        <Grid item xs={12} lg={12}>
                          <SearchBar></SearchBar>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <Issues></Issues>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

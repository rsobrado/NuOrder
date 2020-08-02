import React, { useCallback, useState, useEffect, useRef } from 'react'
import axios from 'axios'
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
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

import Pagination from '@material-ui/lab/Pagination'

import Issues from './Issues'

const useStyles = makeStyles((theme) => ({
  search: {
    borderRadius: 20,
    background: 'white',
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
  pagination: {
    justifyContent: 'center',
    padding: '20px 0',
  },
  listbox: {
    boxShadow: 'none',
    padding: 0,
    margin: 0,
  },
  groupUl: {
    padding: 0,
    margin: 0,
  },
  option: {
    borderBottom: `1px solid rgba(0,0,0,0.1)`,
    // Hover
    '&[data-focus="true"]': {
      backgroundColor: 'rgba(0,0,0,0.05)',
      borderColor: 'transparent',
    },
    // Selected
    '&[aria-selected="true"]': {
      backgroundColor: 'rgba(0,0,0,0.05)',
      borderColor: 'transparent',
    },
  },
}))

export default function Dashboard() {
  const classes = useStyles()
  const [issues, setIssues] = useState([])
  const [value, setValue] = useState('')
  const [page, setPage] = useState(1)
  const timeRef = useRef(0)

  const handlePagination = (event, value) => {
    setPage(value)
  }

  const handleSearch = useCallback((event) => {
    if (timeRef.current >= 400) {
      setValue(event.target.value)
      timeRef.current = 0
    }
  }, [])

  const handleAuto = useCallback((event) => {
    if (timeRef.current >= 400) {
      setValue(event.target.innerHTML)
      timeRef.current = 0
    }
  }, [])

  useEffect(() => {
    setInterval(() => (timeRef.current += 100), 100)
  }, [])


  useEffect(() => {
    async function loadData() {
      if (value === '') {
        const result = await axios(
          `https://api.github.com/search/issues?q=repo:facebook/react&page=${page}+&per_page=30`
        )
        setIssues(result.data.items)
      } else {
        const result = await axios(
          `https://api.github.com/search/issues?q=${value}+&repo:facebook/react&page=${page}+&per_page=30`
        )
        setIssues(result.data.items)
      }
    }
    loadData()
  }, [page, value])

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
                          <Autocomplete
                            id="search-issue"
                            freeSolo
                            fullWidth={true}
                            options={issues.map((option) => option.title)}
                            onChange={handleAuto}
                            classes={{
                              option: classes.option,
                              listbox: classes.listbox,
                              popper: classes.popper,
                              groupUl: classes.groupUl,
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Search Issues..."
                                margin="normal"
                                variant="filled"
                                className={classes.search}
                                fullWidth={true}
                                onChange={handleSearch}
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <Issues issues={issues} />
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination
              count={10}
              page={page}
              onChange={handlePagination}
              classes={{
                ul: classes.pagination,
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  popper: {
    boxShadow:
      '0px 11px 15px -7px rgba(0,0,0,0.3), 0px 24px 38px 3px rgba(0,0,0,0.25), 0px 9px 46px 8px rgba(0,0,0,0.22)',
    backgroundColor: 'rgba(0,0,0,0.05)',
    padding: 0,
    borderRadius: 4,
    margin: 0,
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
  search: {
    borderRadius: 20,
    boxShadow: 'inset 0 1px 4px 2px rgba(0,0,0,0.12)',
    margin: 0,
    background: '#fff',
    padding: '0 20px',
  },
}))

export default function SearchBar(props) {
  const classes = useStyles()
  const [issues, setIssues] = useState([])
  useEffect(() => {
    setIssues(props.issues)
  }, [props])

  return (
    <div style={{ width: '95%' }}>
      <Autocomplete
        id="search-issue"
        freeSolo
        fullWidth={true}
        options={issues.map((option) => option.title)}
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
          />
        )}
      />
    </div>
  )
}

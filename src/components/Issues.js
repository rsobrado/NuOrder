import React, { useState, useEffect } from 'react'
import axios from 'axios'

import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  number: {
    color: '#b1b1b1',
    fontSize: 'small',
    marginRight: 5,
  },
  user: {
    color: '#717171',
    fontSize: 'small',
    marginRight: 2,
  },
  login: {
    color: '#717171',
    fontSize: 'small',
    marginRight: 20,
    fontWeight: 'bold',
  },
}))

export default function Issues() {
  const classes = useStyles()
  const [issues, setIssues] = useState(null)

  useEffect(() => {
    async function loadData() {
      const result = await axios(
        'https://api.github.com/repos/facebook/react/issues?per_page=100&state=all'
      )
      setIssues(result.data)
    }
    loadData()
  }, [])

  return (
    <React.Fragment>
      {issues &&
        issues.map((issue, index) => (
          <TableRow hover role="checkbox" tabIndex={-1} key={index}>
            <TableCell>
              <h3>
                <span className={classes.number}>#{issue.number} </span>
                <a href={issue.html_url} target="_new">
                  {issue.title}
                </a>
              </h3>
              <div>
                <span className={classes.user}>Opened by: </span>
                <span className={classes.login}>{issue.user.login} </span>

                {issue.labels &&
                  issue.labels.map((label, index) => (
                    <span
                      style={{
                        background: `#${label.color}`,
                        marginLeft: '5px',
                        fontSize: 'small',
                        borderRadius: 10,
                        padding: '2px 5px',
                      }}
                      key={index}>
                      {label.name}
                    </span>
                  ))}
              </div>
              {/* <span>{issue.body}</span> */}
            </TableCell>
          </TableRow>
        ))}
    </React.Fragment>
  )
}

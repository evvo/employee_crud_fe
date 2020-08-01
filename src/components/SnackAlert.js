import MuiAlert from '@material-ui/lab/Alert'
import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

function SnackAlert(props) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={props.open} autoHideDuration={props.duration} onClose={props.onClose}
    >
      <Alert onClose={props.onClose} severity={props.severity}>
        {props.children}
      </Alert>
    </Snackbar>
  )
}

export default SnackAlert

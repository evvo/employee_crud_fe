import SnackAlert from './SnackAlert'
import React from 'react'

function Messages(props) {
  return (
    <React.Fragment>
      <SnackAlert onClose={props.onClose} severity={'error'} duration={6000} open={props.messages.errors.length > 0}>
        {props.messages.errors.map((error, index) => <div key={index}>{error.param} : {error.msg}</div>)}
      </SnackAlert>

      <SnackAlert onClose={props.onClose} severity={'success'} duration={3000} open={props.messages.success !== null}>
        {props.messages.success}
      </SnackAlert>
    </React.Fragment>
  )
}

export default Messages

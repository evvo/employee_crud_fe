import React from 'react'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade';
import ProfileImage from './ProfileImage'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function CustomModal(props) {
  const classes = useStyles()

  return (
    props.modalData && <Modal
      open={true}
      onClose={props.onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.modal}
    >
      <Fade in={true}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Empoyee</h2>
          <div id="transition-modal-description">
            <ProfileImage rowData={props.modalData} height={100}/> <br/>
            Name: {props.modalData.employee_name} <br/>
            Salary: {props.modalData.employee_salary} <br/>
            Age: {props.modalData.employee_age} <br/>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

export default CustomModal
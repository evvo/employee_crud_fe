import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import EmployeeTable from './Table'
import Messages from './Messages'
import { fetchRecord } from '../requests'
import CustomModal from './CustomModal'

export default function App() {
  const [messages, setMessages] = React.useState({
    errors: [],
    success: null
  })
  const [modalData, setModalData] = React.useState(null)

  const setSuccess = (success) => {
    setMessages({
      errors: [],
      success
    })
  }

  const setErrors = (errors) => {
    setMessages({
      errors: errors,
      success: null
    })
  }

  const clearMessages = () => {
    setErrors([])
    setSuccess(null)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    
    clearMessages()
  }

  const handleModalClose = (event, reason) => {
    setModalData(null)
  }

  const handleModalOpen = (props, rowData) => {
    fetchRecord(props, rowData)
      .then(rowData => {
        setModalData(rowData.data)
      })
      .catch(error => {
        console.log(error)
      })
  }
  
  return (
    <Container maxWidth="lg">
      <Box my={6}>
        <h1>Employees CRUD</h1>
        <CustomModal onClose={handleModalClose} modalData={modalData} />
        <Messages onClose={handleClose} messages={messages} />
        <EmployeeTable setErrors={setErrors} setSuccess={setSuccess} clearMessages={clearMessages} rowClick={handleModalOpen} />
      </Box>
    </Container>
  )
}

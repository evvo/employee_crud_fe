import axios from 'axios'

function extractParams (body) {
  if (!body) {
    return undefined
  }
  // eslint-disable-next-line camelcase
  const { employee_name, employee_age, employee_salary, profile_image } = body
  return { employee_name, employee_age, employee_salary, profile_image }
}

const handleErrors = (props, error, reject) => {
  if (!error.response) {
    props.setErrors([
      { param: 'server', msg: 'Cannot send request', location: 'server' }
    ])

    return reject()
  }

  props.setErrors(error.response.data.data.errors)
  reject()
}

const handleSuccess = (props, resolve, result, message = null) => {
  if (message) {
    props.setSuccess(message)
  }

  resolve({
    data: result.data.data,
  })
}

const handleRequest = ({props, path, method, params = null, data = null, message = null }) => {
  return new Promise((resolve, reject) => {
    let url = `${process.env.REACT_APP_API_URL}${path}`

    axios({
      method,
      url,
      data: extractParams(data),
      params
    })
      .then(result => handleSuccess(props, resolve, result, message))
      .catch((errors) => handleErrors(props, errors, reject))
  })
}

const fetchRecord = (props, rowData) => {
  return handleRequest({
    path: `/employee/${rowData.id}`,
    method: 'get',
    props
  })
}

const fetchRecords = (props, query) => {
  let params = {}
  if (query.search) {
    params.employee_name = query.search
  }

  if (query.orderBy) {
    params.sort = query.orderBy.field
    params.direction = query.orderDirection.toUpperCase()
  }

  return handleRequest({
    props,
    path: `/employee`,
    method: 'get',
    params
  })
}

const createRecord = (props, newData) => {
  return handleRequest({
    props,
    path: `/employee`,
    method: 'post',
    data: newData,
    message: 'Employee added!'
  })
}

const updateRecord = (props, newData, oldData) => {
  return handleRequest({
    props,
    path: `/employee/${oldData.id}`,
    method: 'put',
    data: newData,
    message: 'Employee updated!'
  })
}

const deleteRecord = (props, oldData) => {
  return handleRequest({
    props,
    path: `/employee/${oldData.id}`,
    method: 'delete',
    message: 'Employee deleted!'
  })
}

export {
  fetchRecord,
  fetchRecords,
  createRecord,
  updateRecord,
  deleteRecord
}

import MaterialTable from 'material-table'
import { createRecord, deleteRecord, fetchRecords, updateRecord } from '../requests'
import React from 'react'
import ProfileImage from './ProfileImage'

// When the props change, the table re-renders for no reason, which brakes it's internal state
const EmployeeTable = React.memo(props => {

  const tableRef = React.createRef()
  const searchSort = (isEnabled) => {
    tableRef.current.props.options.sorting = isEnabled
    tableRef.current.props.options.search = isEnabled
  }

  const updateSearchSort = (rowData, mode) => {
    let current = tableRef.current

    if (!mode && !rowData && current.state.showAddRow) {
      searchSort(true)
      return
    }

    if (!mode && rowData && !current.state.showAddRow) {
      searchSort(true)
      return
    }

    searchSort(false)
  }

  return <MaterialTable
    tableRef={tableRef}
    title="Employees"
    columns={[
      { title: 'Profile Image', field: 'profile_image', sorting: false, render: rowData => (
          <ProfileImage rowData={rowData} />
        )},
      { title: 'Name', field: 'employee_name' },
      { title: 'Age', field: 'employee_age', type: 'numeric' },
      { title: 'Salary', field: 'employee_salary', type: 'numeric' }
    ]}
    localization={{ body: { editRow: { deleteText: 'Are you sure that you want to delete this employee?' } } }}
    options={{
      paging: false,
      draggable: false,
      sorting: true
    }}
    data={query => {
      // I'm looking for onLoad-type of event so that I can load this only once
      // This is needed, as there are no handlers startEditing-type of event
      const oldVersion = tableRef.current.dataManager.changeRowEditing.bind(tableRef.current)
      tableRef.current.dataManager.changeRowEditing = (rowData, mode) => {
        updateSearchSort(rowData, mode)
        oldVersion(rowData, mode)
      }
      return fetchRecords(props, query)
    }}
    onRowClick={(event, rowData) => props.rowClick(props, rowData)}
    editable={{
      onRowAdd: (newData) => createRecord(props, newData),
      onRowUpdate: (newData, oldData) => updateRecord(props, newData, oldData),
      onRowDelete: (oldData) => deleteRecord(props, oldData),
      onRowAddCancelled: (rowData) => searchSort(true)
    }}
  />},
  // When the props change, the table re-renders for no reason, which brakes it's internal state
  () => true)

export default EmployeeTable

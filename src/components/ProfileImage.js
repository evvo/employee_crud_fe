import React from 'react'

function ProfileImage(props) {
  const height = props.height || 60
  const roboHashLink = `https://robohash.org/${props.rowData.employee_name}?size=${height}x${height}`
  return (
    <img
      alt={props.rowData.employee_name}
      style={{ height }}
      src={props.rowData.profile_image ? props.rowData.profile_image : roboHashLink}
    />
  )
}

export default ProfileImage
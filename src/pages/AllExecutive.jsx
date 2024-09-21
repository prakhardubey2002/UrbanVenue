import React from 'react'
import CustomNavTopbar from '../components/CustomNavTopbar'
import { CREATE_EXECUTIVE } from '../routes/Routes'

const AllExecutive = () => {
  return (
    <>
      <CustomNavTopbar text={'Create Executive'} route={CREATE_EXECUTIVE} />
      <div>AllExecutive</div>
    </>
  )
}

export default AllExecutive

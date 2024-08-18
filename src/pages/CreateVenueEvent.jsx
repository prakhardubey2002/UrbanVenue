import React from 'react'
import { useParams } from 'react-router-dom'
import NavTopBar from '../components/NavTopBar'
import BreadCrumbBar from "../components/BreadCrumbBar"
const CreateVenueEvent = () => {
  const { venue, date } = useParams()
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <NavTopBar />
      <BreadCrumbBar />
    </div>
  )
}

export default CreateVenueEvent

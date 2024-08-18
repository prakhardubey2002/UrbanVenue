import React from 'react'
import { useParams } from 'react-router-dom'
const CreateVenueEvent = () => {
  const { venue, date,} = useParams()
  return <div>CreateVenueEvent {venue} {date} </div>
}

export default CreateVenueEvent

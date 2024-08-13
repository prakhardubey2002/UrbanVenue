import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)
const Calender = ({ events }) => {
  return (
    <div className="w-fit">
      <Calendar
        className="bg-white"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultDate={events[0].start}
        // showMultiDayTimes
        style={{ height: 350, margin: '50px' }}
      />
    </div>
  )
}

export default Calender

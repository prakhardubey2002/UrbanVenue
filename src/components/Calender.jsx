import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)
const Calender = ({ events, venue }) => {
  return (
    <div className="w-fit mx-6 my-6  px-1 py-1">
      <select
        name=""
        id=""
        className=" px-1 py-1 font-bold  w-full bg-white  border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
      >
        <option  selected disabled value="">
          {venue}
        </option>
      </select>
      <Calendar
        className="bg-white px-1 py-1 "
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultDate={events[0].start}
        // showMultiDayTimes
        style={{ height: 350 }}
      />
    </div>
  )
}

export default Calender

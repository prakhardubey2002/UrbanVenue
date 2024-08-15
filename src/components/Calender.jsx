import React, { Fragment, useState, useCallback } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

// Assuming you have a localizer imported or defined somewhere
const localizer = momentLocalizer(moment)

const CalendarComponent = ({ events, venue,setSelectedDate }) => {
  const [myEvents, setEvents] = useState(events)
  const [date, setDate] = useState('')

  const handleSelectSlot = useCallback(
    ({ start, end, ...rest }) => {
      setDate(JSON.stringify(rest?.slots[0]));
      setSelectedDate(JSON.stringify(rest?.slots[0].toISOString()));
      
    },
    [setEvents]
  )

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  )

  return (
    <Fragment>
      {venue && (
        <h2 className="px-1 py-1 font-bold w-full bg-white rounded-md shadow-sm focus:outline-none sm:text-sm">
          {venue}
        </h2>
      )}
      <h1>{date === '' ? 'empty' : date}</h1>
      <div className="w-fit mx-6 my-6 px-1 py-1">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultDate={events[0]?.start || new Date()}
          selectable
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          style={{ height: 350 }}
        />
      </div>
    </Fragment>
  )
}

export default CalendarComponent

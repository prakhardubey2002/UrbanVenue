import React, { useState, useCallback, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

const localizer = momentLocalizer(moment);

const CalenderD = ({ events, venue, setSelectedDate, initializer, setven, SetData}) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [defaultDate, setDefaultDate] = useState(new Date(initializer));

  useEffect(() => {
    if (events.length > 0) {
      setDefaultDate(new Date(initializer));
    }
  }, [events, initializer]);

  const handleSelectSlot = useCallback(
    ({ start, end, ...rest }) => {
      const selectedSlot = rest?.slots[0];
      setSelectedDate(selectedSlot.toISOString());
      setven(venue);
      SetData({ venue: venue, date: selectedSlot });
      console.log('Selected slot:', selectedSlot);
    },
    [setSelectedDate, venue, setven, SetData]
  );

  const handleSelectEvent = useCallback((event) => {
    setSelectedEvent(event);
    setven(venue);
  }, [venue, setven]);

  const handleCloseDialog = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-fit m-4 px-1 py-1">
        {venue && (
          <h2 className="px-2 py-2 font-bold w-fit bg-white rounded-md shadow-sm focus:outline-none sm:text-sm">
            {venue}
          </h2>
        )}
        {events[0]?.start && (
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultDate={defaultDate}
            selectable
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            style={{
              height: 340,
              width: '100%',
              maxWidth: '420px',
            }}
            views={{ month: true }}
          />
        )}
      </div>

      {selectedEvent && (
        <Dialog open={Boolean(selectedEvent)} onClose={handleCloseDialog}>
          <DialogTitle>Event Details</DialogTitle>
          <DialogContent>
            <p>
              <strong>Title:</strong> {selectedEvent.title}
            </p>
            <p>
              <strong>Start:</strong> {moment(selectedEvent.start).format('MMMM Do YYYY, h:mm:ss a')}
            </p>
            <p>
              <strong>End:</strong> {moment(selectedEvent.end).format('MMMM Do YYYY, h:mm:ss a')}
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default CalenderD;

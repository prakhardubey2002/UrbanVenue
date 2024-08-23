import React, { useState, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const localizer = momentLocalizer(moment);

const CalendarComponent = ({ events, venue, setSelectedDate }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [date, setDate] = useState('');

  const handleSelectSlot = useCallback(
    ({ start, end, ...rest }) => {
      setDate(JSON.stringify(rest?.slots[0]));
      setSelectedDate(JSON.stringify(rest?.slots[0].toISOString()));
    },
    [setSelectedDate]
  );

  const handleSelectEvent = useCallback((event) => {
    setSelectedEvent(event);
  }, []);

  const handleCloseDialog = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="">
      <div className="w-fit mx-6 my-6 px-1 py-1">
        {venue && (
          <h2 className="px-1 py-1 font-bold w-fit bg-white rounded-md shadow-sm focus:outline-none sm:text-sm">
            {venue}
          </h2>
        )}
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

      {selectedEvent && (
        <Dialog open={Boolean(selectedEvent)} onClose={handleCloseDialog}>
          <DialogTitle>Event Details</DialogTitle>
          <DialogContent>
            <p><strong>Title:</strong> {selectedEvent.title}</p>
            <p><strong>Start:</strong> {moment(selectedEvent.start).format('MMMM Do YYYY, h:mm:ss a')}</p>
            <p><strong>End:</strong> {moment(selectedEvent.end).format('MMMM Do YYYY, h:mm:ss a')}</p>
            {/* Add more details if needed */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default CalendarComponent;

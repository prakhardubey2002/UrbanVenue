import React, { useEffect, useState } from 'react';
import Calender from './Calender';
import { events } from '../data/CalenderDateDemoData';
import { CREATE_FORM } from '../routes/Routes';
import { useNavigate } from 'react-router-dom';

const CreatebyPropertyEvent = () => {
  const [selectedProperty, setSelectedProperty] = useState('Xyz farm');
  const [selectedDate, setSelectedDate] = useState('');
  const propertyOptions = Object.keys(events);
  const navigate = useNavigate();

 
  useEffect(() => {
    if (selectedDate) {
      try {
        const cleanedDate = selectedDate.replace(/['"]/g, '').trim();
        const date = new Date(cleanedDate);

        if (isNaN(date.getTime())) {
          throw new Error('Invalid date');
        }

        // Format the current date without adding a day
        const currentFormattedDate = date.toISOString().split('T')[0];

        // Add one day to the date
        date.setDate(date.getDate() + 1);

        // Format the date after adding a day
        const newFormattedDate = date.toISOString().split('T')[0];

        if (currentFormattedDate !== selectedDate) {
          // Only update if the date has not already been adjusted
          setSelectedDate(newFormattedDate);
        }
      } catch (error) {
        console.error('Error processing date:', error);
      }
    }
  }, [selectedDate]);

  const formcreate = () => {
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }

    // Clean the date again before formatting
    const cleanedDate = selectedDate.replace(/['"]/g, '').trim();

    let formattedDate;
    let formattedTime;

    try {
      const date = new Date(cleanedDate);

      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }

      formattedDate = date.toISOString().split('T')[0];
      formattedTime = date.toISOString().split('T')[1].split('.')[0]; // Extract time without milliseconds

      alert(`Date: ${formattedDate} Time: ${formattedTime}`);
    } catch (error) {
      console.error('Error parsing date:', error);
      alert(`Invalid date format: ${cleanedDate}`);
      return; // Exit function on error
    }

    // Construct the path with formatted values
    const path = CREATE_FORM.replace(':venue', selectedProperty).replace(
      ':date',
      formattedDate
    );

    navigate(path); // Navigate to the constructed path
  };

  return (
    <div className="h-full w-[100%] justify-center items-center">
      <div className="flex justify-between items-end">
        <div className="flex flex-col flex-1 mx-4">
          <label className="font-semibold mb-2">
            Select State <span className="text-Primary">*</span>
          </label>
          <select
            id="state"
            className="bg-white text-Textgray border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
            onChange={(e) => setSelectedProperty(e.target.value)}
          >
            <option value="">Select State</option>
            <option value="Noida">Noida</option>
            <option value="New Delhi">New Delhi</option>
          </select>
        </div>
        <div className="flex flex-col flex-1 mx-4">
          <label className="font-semibold mb-2">
            Select Place <span className="text-Primary">*</span>
          </label>
          <select
            id="place"
            className="bg-white text-Textgray border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
          >
            <option value="">Select Place</option>
            <option value="Noida">Noida</option>
            <option value="New Delhi">New Delhi</option>
          </select>
        </div>

        <div className="flex flex-col flex-1 mx-4">
          <label className="font-semibold mb-2">
            Select Property <span className="text-Primary">*</span>
          </label>
          <select
            id="property"
            className="bg-white text-Textgray border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
            onChange={(e) => setSelectedProperty(e.target.value)}
          >
            <option value="">Select Property</option>
            {propertyOptions.map((property) => (
              <option key={property} value={property}>
                {property}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col flex-1 mx-4">
          <label className="font-semibold mb-2">
            Date <span className="text-Primary">*</span>
          </label>
          <input
            type="date"
            className="bg-white text-Textgray border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <button onClick={formcreate} className="button">
          Done
        </button>
      </div>
      <div className="w-full flex justify-center items-center">
        <Calender
          events={events[selectedProperty]} // Dynamically pass events based on selected property
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          venue={selectedProperty}
        />
      </div>
    </div>
  );
};

export default CreatebyPropertyEvent;

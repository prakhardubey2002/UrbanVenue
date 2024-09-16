import React, { useEffect, useState, useCallback } from 'react';
import Calender from './Calender';
import { useNavigate } from 'react-router-dom';
import { CREATE_FORM } from '../routes/Routes';
import axios from 'axios';

const CreatebyDateRange = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [calenderEvents, setCalenderEvents] = useState({});
  const [selectedProperty, setSelectedProperty] = useState('');
  const [renderKey, setRenderKey] = useState(0);
  const [address, setAddress] = useState('');
  const [ven, setven] = useState()
  const navigate = useNavigate();

  // Fetch farms based on date range
  const fetchFarmsByDateRange = useCallback(async () => {
    if (startDate && endDate) {
      try {
        console.log(`Fetching farms from: ${startDate} to ${endDate}`);
        const response = await axios.get(
          `http://localhost:3000/api/calender/farms-free-by-date-range`,
          { params: { startDate, endDate } }
        );
        const farms = response.data;

        console.log('Farms data:', farms);

        // Transform the data into the desired format
        const formattedEvents = farms.reduce((acc, farm) => {
          acc[farm.name] = farm.events?.map(event => ({
            title: event.title,
            start: new Date(event.start).toISOString(),
            end: new Date(event.end).toISOString(),
            id: event._id
          }));
          return acc;
        }, {});

        setCalenderEvents(formattedEvents);
        setRenderKey(prevKey => prevKey + 1); // Update the key to force re-render
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }
  }, [startDate, endDate]);

  // Handle form submission
  const handleFormSubmit = useCallback(async () => {
    if (!startDate || !endDate || !selectedProperty) {
      alert('Please select both start and end dates, and a property');
      return;
    }

    try {
      const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
      const formattedEndDate = new Date(endDate).toISOString().split('T')[0];

      alert(`Property: ${selectedProperty} Start Date: ${new Date(formattedStartDate).toLocaleDateString('en-GB')} End Date: ${new Date(formattedEndDate).toLocaleDateString('en-GB')}`);

      // Fetch the address
      const addressResponse = await axios.get(
        `http://localhost:3000/api/calender/${selectedProperty}/address`
      );

      const address = addressResponse.data;
      setAddress(address);
      console.log('Address:', address);

      const path = CREATE_FORM.replace(':venue', selectedProperty || '')
                              .replace(':startDate', formattedStartDate)
                              .replace(':endDate', formattedEndDate);

      if (address) {
        navigate(path, { state: address });
      }
    } catch (error) {
      console.error('Error creating form:', error);
      alert('Failed to create form.');
    }
  }, [startDate, endDate, selectedProperty, navigate]);

  // Validate form
  const isFormValid = useCallback(
    () => selectedProperty && startDate && endDate,
    [selectedProperty, startDate, endDate]
  );

  // Fetch farms when date range changes
  useEffect(() => {
    if (startDate && endDate) {
      fetchFarmsByDateRange();
    }
  }, [startDate, endDate, fetchFarmsByDateRange]);

  return (
    <div className="h-full w-full flex flex-col items-center">
      <div className="flex flex-wrap justify-between items-end w-full px-4">
        <div className="flex flex-col flex-1 mx-4">
          <label className="font-semibold mb-2">
            Start Date <span className="text-Primary">*</span>
          </label>
          <input
            type="date"
            className="bg-white border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col flex-1 mx-4">
          <label className="font-semibold mb-2">
            End Date <span className="text-Primary">*</span>
          </label>
          <input
            type="date"
            className="bg-white border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col flex-1 mx-4">
          <label className="font-semibold mb-2">
            Select Property <span className="text-Primary">*</span>
          </label>
          <select
            id="property"
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
            className="bg-white border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
          >
            <option value="">Select Property</option>
            {Object.keys(calenderEvents)?.map((property) => (
              <option key={property} value={property}>
                {property}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleFormSubmit}
          className={`button md:m-5 ${isFormValid() ? '' : 'opacity-50 cursor-not-allowed'}`}
          disabled={!isFormValid()}
        >
          Done
        </button>
      </div>

      <div className="w-full flex justify-center mt-4">
        <div className="w-full grid grid-cols-2 md:grid-cols-1 gap-1">
          {Object.keys(calenderEvents)?.map((venue) => (
            <Calender
              key={`${venue}-${renderKey}`}
              events={calenderEvents[venue] || []}
              venue={venue}
              setven={setven}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatebyDateRange;

import React, { useEffect, useState } from 'react';
import Calender from './Calender';
import { Link, useNavigate } from 'react-router-dom';
import { CREATE_FORM } from '../routes/Routes';
import axios from 'axios';

const CreatebyDateEvent = () => {
  const [states, setStates] = useState([]);
  const [places, setPlaces] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [calenderEvents, setCalenderEvents] = useState({});
  const [renderKey, setRenderKey] = useState(0); // Added state to track re-renders
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const stateResponse = await axios.get('http://localhost:3000/api/calender/states');
        setStates(stateResponse.data);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      const fetchPlaces = async () => {
        try {
          const placeResponse = await axios.get(`http://localhost:3000/api/calender/${selectedState}/places`);
          setPlaces(placeResponse.data);
        } catch (error) {
          console.error('Error fetching places:', error);
        }
      };
      fetchPlaces();
    }
  }, [selectedState]);

  const handleFindProperty = async () => {
    if (selectedState && selectedPlace && selectedDate) {
      try {
        const response = await axios.get(`http://localhost:3000/api/calender/${selectedState}/${selectedPlace}/farms/${selectedDate}`);
        const farms = response.data;

        // Format the response into the structure needed by the Calender component
        const formattedEvents = farms.reduce((acc, farm) => {
          acc[farm.name] = farm.events;
          return acc;
        }, {});

        setCalenderEvents(formattedEvents);
        setRenderKey(prevKey => prevKey + 1); // Update the key to force re-render
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }
  };

  const formcreate = () => {
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }

    let formattedDate;

    try {
      const date = new Date(selectedDate);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }

      formattedDate = date.toISOString().split('T')[0];
      alert(`Date: ${formattedDate}`);
    } catch (error) {
      console.error('Error parsing date:', error);
      alert(`Invalid date format: ${selectedDate}`);
      return;
    }

    const path = CREATE_FORM.replace(':venue', selectedProperty).replace(':date', formattedDate);
    navigate(path);
  };

  const isFormValid = selectedState && selectedPlace && selectedProperty && selectedDate;

  return (
    <div className="h-full w-[100%] justify-center items-center">
      <div className="flex flex-wrap justify-between items-end">
        <div className="flex flex-col flex-1 mx-4">
          <label className="font-semibold mb-2">
            Select State <span className="text-Primary">*</span>
          </label>
          <select
            id="state"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-white text-Textgray border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col flex-1 mx-4">
          <label className="font-semibold mb-2">
            Select Place <span className="text-Primary">*</span>
          </label>
          <select
            id="place"
            value={selectedPlace}
            onChange={(e) => setSelectedPlace(e.target.value)}
            className="bg-white text-Textgray border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
          >
            <option selected disabled value="">
              Select Place
            </option>
            {places.map((place) => (
              <option key={place} value={place}>
                {place}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col flex-1 mx-4">
          <div className="w-full flex justify-between">
            <label className="font-semibold mb-2">
              Date<span className="text-Primary">*</span>
            </label>
            <Link onClick={handleFindProperty} className="text-Primary cursor-pointer">Find Property</Link>
          </div>
          <input
            type="date"
            className="bg-white text-Textgray border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
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
            {Object.keys(calenderEvents).map((property) => (
              <option key={property} value={property}>
                {property}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={formcreate}
          className={`button md:m-5  ${isFormValid ? '' : 'opacity-50 cursor-not-allowed'}`}
          disabled={!isFormValid}
        >
          Done
        </button>
      </div>

      <div className="w-full flex flex-wrap justify-center items-center">
        {Object.keys(calenderEvents).map((venue, index) => (
          <Calender
            key={`${venue}-${renderKey}`} // Use a dynamic key to force re-render
            events={calenderEvents[venue]}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            venue={venue}
            intializer={selectedDate}
          />
        ))}
      </div>
    </div>
  );
};

export default CreatebyDateEvent;

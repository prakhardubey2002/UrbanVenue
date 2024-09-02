import React, { useEffect, useState } from 'react';
import Calender from './Calender';
import { CREATE_FORM } from '../routes/Routes';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Add axios or use any method to fetch data
import { events } from '../data/CalenderDateDemoData';

const CreatebyPropertyEvent = () => {
  const [states, setStates] = useState([]);
  const [places, setPlaces] = useState([]);
  const [properties, setProperties] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  // Fetch states and properties from API
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

  // Fetch places based on selected state
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

  // Fetch properties based on selected state and place
  useEffect(() => {
    if (selectedState && selectedPlace) {
      const fetchProperties = async () => {
        try {
          const propertiesResponse = await axios.get(`http://localhost:3000/api/calender/${selectedState}/${selectedPlace}/farms`);
          setProperties(propertiesResponse.data);
        } catch (error) {
          console.error('Error fetching properties:', error);
        }
      };

      fetchProperties();
    }
  }, [selectedState, selectedPlace]);

  // Check if all required fields are filled
  useEffect(() => {
    if (selectedState && selectedPlace && selectedProperty && selectedDate) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [selectedState, selectedPlace, selectedProperty, selectedDate]);

  // Process date
  useEffect(() => {
    if (selectedDate) {
      try {
        const cleanedDate = selectedDate.replace(/['"]/g, '').trim();
        const date = new Date(cleanedDate);

        if (isNaN(date.getTime())) {
          throw new Error('Invalid date');
        }

        const currentFormattedDate = date.toISOString().split('T')[0];
        date.setDate(date.getDate() + 1);
        const newFormattedDate = date.toISOString().split('T')[0];

        if (currentFormattedDate !== selectedDate) {
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

    const cleanedDate = selectedDate.replace(/['"]/g, '').trim();

    let formattedDate;
    let formattedTime;

    try {
      const date = new Date(cleanedDate);

      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }

      formattedDate = date.toISOString().split('T')[0];
      formattedTime = date.toISOString().split('T')[1].split('.')[0];

      alert(`Date: ${formattedDate} Time: ${formattedTime}`);
    } catch (error) {
      console.error('Error parsing date:', error);
      alert(`Invalid date format: ${cleanedDate}`);
      return;
    }

    const path = CREATE_FORM.replace(':venue', selectedProperty).replace(
      ':date',
      formattedDate
    );

    navigate(path);
  };

  return (
    <div className="h-full w-[100%] justify-center items-center">
      <div className="flex flex-wrap justify-between items-end">
        <div className="flex flex-col flex-1 mx-4">
          <label className="font-semibold mb-2">
            Select State <span className="text-Primary">*</span>
          </label>
          <select
            id="state"
            className="bg-white text-Textgray border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
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
            className="bg-white text-Textgray border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
            value={selectedPlace}
            onChange={(e) => setSelectedPlace(e.target.value)}
          >
            <option value="">Select Place</option>
            {places.map((place) => (
              <option key={place} value={place}>
                {place}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col flex-1 mx-4">
          <label className="font-semibold mb-2">
            Select Property <span className="text-Primary">*</span>
          </label>
          <select
            id="property"
            className="bg-white text-Textgray border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
          >
            <option value="">Select Property</option>
            {properties.map((property) => (
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
        <button
          onClick={formcreate}
          className={`button md:m-5 ${
            !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={!isFormValid}
        >
          Done
        </button>
      </div>
      <div className="w-full flex justify-center items-center">
        <Calender
          events={events[selectedProperty] || []}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          venue={selectedProperty}
        />
      </div>
    </div>
  );
};

export default CreatebyPropertyEvent;

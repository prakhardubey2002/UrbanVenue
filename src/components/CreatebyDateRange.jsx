import React, { useEffect, useState, useCallback } from 'react';
import CalenderD from './CalenderD';
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
  const navigate = useNavigate();
  const [selectedDateString, setSelectedDateString] = useState(new Date());
  const [data, SetData] = useState({
    venue: '',
    date: '',
    city: '',
  });

  useEffect(() => {
    console.log(data.venue);
    console.log(data.date);
    console.log(data.city);
  }, [data]);

  // Fetch farms based on date range
  const fetchFarmsByDateRange = useCallback(async () => {
    if (startDate && endDate) {
      try {
        console.log(`Fetching farms from: ${startDate} to ${endDate}`);
        const response = await axios.get(
          `http://localhost:9000/api/calender/farms-free-by-date-range`,
          { params: { startDate, endDate } }
        );
        const farms = response.data;

        console.log('Farms data:', farms);

        // Transform the data into the desired format
        const formattedEvents = {};
        farms.forEach((farm) => {
          Object.keys(farm.places).forEach((place) => {
            if (!formattedEvents[farm.name]) {
              formattedEvents[farm.name] = {};
            }
            if (!formattedEvents[farm.name][place]) {
              formattedEvents[farm.name][place] = {};
            }
            farm.places[place].farms.forEach((farmItem) => {
              if (!formattedEvents[farm.name][place]) {
                formattedEvents[farm.name][place] = {};
              }
              if (!formattedEvents[farm.name][place][farmItem.name]) {
                formattedEvents[farm.name][place][farmItem.name] = [];
              }
              farmItem.events.forEach((event) => {
                formattedEvents[farm.name][place][farmItem.name].push({
                  title: event.title,
                  start: new Date(event.start).toISOString(),
                  end: new Date(event.end).toISOString(),
                  id: event._id
                });
              });
            });
          });
        });

        setCalenderEvents(formattedEvents);
        setRenderKey((prevKey) => prevKey + 1); // Update the key to force re-render
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }
  }, [startDate, endDate]);

  // Handle form submission
  const handleFormSubmit = useCallback(async () => {
    if (!endDate || !selectedProperty) {
      alert('Please select both end dates and a property');
      return;
    }

    try {
      const formattedStartDate = data.date ? new Date(data.date).toLocaleDateString('en-CA') : '';
      const formattedEndDate = new Date(endDate).toISOString().split('T')[0];

      alert(
        `Property: ${selectedProperty} Start Date: ${formattedStartDate} End Date: ${new Date(formattedEndDate).toLocaleDateString('en-CA')}`
      );


      // Fetch the address
      // console.log(`http://localhost:9000/api/calender/${data.city}/${selectedProperty}/details`)
      const addressResponse = await axios.get(
        `http://localhost:9000/api/calender/${data.city}/${selectedProperty}/details`
      );

      const address = addressResponse.data;
      setAddress(address);
      console.log('Address:', address);

      const path = CREATE_FORM.replace(':venue', selectedProperty)
        .replace(':date', formattedStartDate)
      // .replace(':endDate', formattedEndDate);

      if (address) {
        navigate(path, { state: address });
      }
    } catch (error) {
      console.error('Error creating form:', error);
      alert('Failed to create form.');
    }
  }, [endDate, selectedProperty, navigate]);


  // Validate form
  const isFormValid = useCallback(() => selectedProperty && startDate && endDate, [
    selectedProperty,
    startDate,
    endDate,
  ]);

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
            <option value="">Select Farm</option>
            {Object.entries(calenderEvents).map(([city, cityData]) =>
              Object.entries(cityData).map(([place, placeData]) => {
                const farmNames = Object.keys(placeData);
                return farmNames.map((farm) => (
                  <option key={`${city}-${place}-${farm}`} value={farm}>
                    {`${farm}`}
                  </option>
                ));
              })
            )}
          </select>
        </div>

        {/* Uneditable input for displaying selected date */}
        <div className="flex flex-col flex-1 mx-4">
          <label className="font-semibold mb-2">
            Event Date
          </label>
          <input
            type="date"
            className="bg-gray-100 border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
            value={data.date ? new Date(data.date).toLocaleDateString('en-CA') : ''}
            readOnly
          />
        </div>

        <button
          onClick={handleFormSubmit}
          className={`button md:m-5 ${isFormValid() ? '' : 'opacity-50 cursor-not-allowed'}`}
          disabled={!isFormValid()}
        >
          Done
        </button>
      </div>

      <div className="w-full grid grid-cols-2 md:grid-cols-1 gap-1 mt-4">
        {Object.keys(calenderEvents).map((city, index) => (
          <div key={`${city}-${renderKey}-${index}`}>
            {/* <h2>{city}</h2> */}
            {Object.entries(calenderEvents[city]).map(([place, placeData], placeIndex) => (
              <div key={`${city}-${place}-${renderKey}-${placeIndex}`}>
                {/* <h2>{`${city}-${renderKey}-${placeIndex}`}</h2> */}
                {/* {console.log(calenderEvents[city])} */}
                {Object.entries(placeData).map(([farm, farmData], farmIndex) => (
                  <div key={`${city}-${place}-${farm}-${renderKey}-${farmIndex}`}>

                    {farmData && farmData.length > 0 ? (
                      <CalenderD
                        events={farmData}
                        selectedDate={selectedDateString}
                        setSelectedDate={setSelectedDateString}
                        venue={farm}
                        initializer={new Date()}
                        setven={setSelectedProperty}
                        SetData={SetData}
                        city={city}
                      />
                    ) : (
                      <p>No events found for this farm.</p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatebyDateRange;

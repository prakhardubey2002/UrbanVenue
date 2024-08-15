import React, { useState } from 'react'
import Calender from './Calender'
import { events } from '../data/CalenderDateDemoData.js'
import { Link } from 'react-router-dom'

const CreatebyDateEvent = () => {
  // Initialize state variables
  const [selectedState, setSelectedState] = useState('')
  const [selectedPlace, setSelectedPlace] = useState('')
  const [selectedProperty, setSelectedProperty] = useState('')
  const [selectedDate, setSelectedDate] = useState('d')

  return (
    <div className="h-full w-[100%] justify-center items-center">
      <div className="flex justify-between items-end">
        {/* State Selection */}
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
            <option value="Noida">Noida</option>
            <option value="New Delhi">New Delhi</option>
          </select>
        </div>

        {/* Place Selection */}
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
            <option value="Noida">Noida</option>
            <option value="New Delhi">New Delhi</option>
          </select>
        </div>

        {/* Date Input */}
        <div className="flex flex-col flex-1 mx-4">
          <div className="w-full flex justify-between">
            <label className="font-semibold mb-2">
              Date<span className="text-Primary">*</span>
            </label>
            <Link className="text-Primary">Find Property {selectedDate} </Link>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-white text-Textgray border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
          />
        </div>

        {/* Property Selection */}
        <div className="flex flex-col flex-1 mx-4">
          <label className="font-semibold mb-2">
            Select Property <span className="text-Primary">*</span>
          </label>
          <select
            id="property"
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
            className="bg-white text-Textgray border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
          >
            <option selected disabled value="">
              Select Place
            </option>
            <option value="Noida">Noida</option>
            <option value="New Delhi">New Delhi</option>
          </select>
        </div>

        {/* Button */}
        <button className="button">Done</button>
      </div>
      <div className="w-full flex flex-wrap justify-center items-center">
        {Object.keys(events).map((venue, index) => (
          <Calender
            key={index}
            events={events[venue]}
            selectedDate={selectedDate} // Pass the selectedDate state
            setSelectedDate={setSelectedDate} // Pass the setSelectedDate function
            venue={venue}
          />
        ))}
      </div>
    </div>
  )
}

export default CreatebyDateEvent

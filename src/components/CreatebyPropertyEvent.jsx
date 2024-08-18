import React, { useState } from 'react'
import Calender from './Calender'
import { events } from '../data/CalenderDateDemoData.js'

const CreatebyPropertyEvent = () => {
  const [selectedProperty, setSelectedProperty] = useState('Xyz farm')
  const [selectedDate, setSelectedDate] = useState('')

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
            onChange={(e) => setSelectedProperty(e.target.value)}
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
            <option value="Venue Farm">Venue Farm</option>
            <option value="Mallu Farm">Mallu Farm</option>
            <option value="Xyz farm">Xyz farm</option>
            <option value="White farm">White farm</option>
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
        <button className="button">Done</button>
      </div>
      <div className="w-full flex justify-center items-center">
        <Calender
          events={events[selectedProperty]} // Dynamically pass events based on selected property
          selectedDate={selectedDate}
          venue={selectedProperty}
        />
      </div>
    </div>
  )
}

export default CreatebyPropertyEvent

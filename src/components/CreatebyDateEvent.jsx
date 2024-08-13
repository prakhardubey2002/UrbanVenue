import React from 'react'
import Calender from './Calender'
import { events } from '../data/CalenderDateDemoDate.js'
import { Link } from 'react-router-dom'

const CreatebyDateEvent = () => {
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
          >
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
            <option selected disabled value="">
              Select Place
            </option>
            <option value="Noida">Noida</option>
            <option value="New Delhi">New Delhi</option>
          </select>
        </div>
        <div className="flex flex-col flex-1 mx-4">
          <div className="w-full flex justify-between">
            <label className="font-semibold mb-2">
              Date<span className="text-Primary">*</span>
            </label>
            <Link className="text-Primary">Find Property</Link>
          </div>
          <input
            type="date"
            className="bg-white text-Textgray border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
          />
        </div>
        <div className="flex flex-col flex-1 mx-4">
          <label className="font-semibold mb-2">
            Select Property <span className="text-Primary">*</span>
          </label>
          <select
            id="property"
            className="bg-white text-Textgray border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
          >
            <option selected disabled value="">
              Select Place
            </option>
            <option value="Noida">Noida</option>
            <option value="New Delhi">New Delhi</option>
          </select>
        </div>

        <button className="button">Done</button>
      </div>
      <div className="w-full flex flex-wrap justify-center items-center">
        {Object.keys(events).map((venue, index) => (
          <Calender key={index}  events={events[venue]} venue={venue} />
        ))}
      </div>
    </div>
  )
}

export default CreatebyDateEvent

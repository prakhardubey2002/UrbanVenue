import React from 'react'
import Calender from './Calender'
import {events} from "../data/CalenderDemoData(byproperty)"
const CreatebyPropertyEvent = () => {
  return (
    <div className="h-full w-[100%] justify-center items-center">
      <div className="flex justify-between items-end">
        <div className="flex flex-col flex-1 mx-4">
          <label className="font-semibold mb-2  ">
            Select State <span className="text-Primary">*</span>{' '}
          </label>
          <select
            id="options"
            className="bg-white text-Textgray border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
          >
            <option value="By Choosing Property">Noida</option>
            <option value="By Choosing Date">New Delhi</option>
          </select>
        </div>
        <div className="flex flex-col flex-1 mx-4">
          <label className="font-semibold mb-2  ">
            Select Place <span className="text-Primary">*</span>{' '}
          </label>
          <select
            id="options"
            className="bg-white text-Textgray border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
          >
            <option selected disabled value="">
              Select Place{' '}
            </option>
            <option value="By Choosing Property">Noida</option>
            <option value="By Choosing Date">New Delhi</option>
          </select>
        </div>

        <div className="flex flex-col flex-1 mx-4">
          <label className="font-semibold mb-2  ">
            Select Property <span className="text-Primary">*</span>{' '}
          </label>
          <select
            id="options"
            className="bg-white text-Textgray border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
          >
            <option selected disabled value="">
              Select Place{' '}
            </option>
            <option value="By Choosing Property">Noida</option>
            <option value="By Choosing Date">New Delhi</option>
          </select>
        </div>
        <div className="flex flex-col flex-1 mx-4">
          <label className="font-semibold mb-2  ">
            Date<span className="text-Primary">*</span>{' '}
          </label>
          <input
            type="date"
            className="bg-white text-Textgray border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
          />
        </div>
        <button className="button">Done</button>
      </div>
      <div className='w-full flex justify-center items-center ' >
      <Calender events={events}/>
      </div>
    </div>
  )
}

export default CreatebyPropertyEvent

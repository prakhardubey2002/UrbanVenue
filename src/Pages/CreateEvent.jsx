import React from 'react'
import NavTopBar from '../components/NavTopBar'
import BreadCrumbBar from '../components/BreadCrumbBar'

const CreateEvent = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <NavTopBar />
      <BreadCrumbBar />
      <div className="flex flex-col">
        <div className='flex justify-center items-center' >
          <h2 className="font-bold text-2xl">Create New Event</h2>
          <select
            id="options"
            className=" bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="" disabled selected>
              Select an option
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default CreateEvent

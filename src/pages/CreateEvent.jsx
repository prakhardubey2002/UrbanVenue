import React, { useState } from 'react'
import NavTopBar from '../components/NavTopBar'
import BreadCrumbBar from '../components/BreadCrumbBar'
import CreatebyPropertyEvent from '../components/CreatebyPropertyEvent'
import CreatebyDateEvent from '../components/CreatebyDateEvent'

const CreateEvent = () => {
  const [selectedOption, setSelectedOption] = useState('By Choosing Property')

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value)
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <NavTopBar />
      <BreadCrumbBar />
      <div className="flex flex-col">
        <div className="flex justify-center items-center my-8">
          <h2 className="font-bold text-3xl mx-4">Create New Event</h2>
          <select
            id="options"
            className="bg-white text-Primary border border-Primary rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value="By Choosing Property">By Choosing Property</option>
            <option value="By Choosing Date">By Choosing Date</option>
          </select>
        </div>
      </div>
      <div className="w-[90%]">
        {selectedOption === 'By Choosing Property' && <CreatebyPropertyEvent />}
        {selectedOption === 'By Choosing Date' && <CreatebyDateEvent />}
      </div>
    </div>
  )
}

export default CreateEvent

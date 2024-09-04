import React, { useEffect, useState } from 'react'
import Calender from './Calender'
import { events } from '../data/CalenderDateDemoData'
import { Link } from 'react-router-dom'
import { CREATE_FORM } from '../routes/Routes'
import { useNavigate } from 'react-router-dom'
import axios from 'axios' // Import axios for API requests

const CreatebyDateEvent = () => {
  // Initialize state variables
  const [states, setStates] = useState([])
  const [places, setPlaces] = useState([])
  const [selectedState, setSelectedState] = useState('')
  const [selectedPlace, setSelectedPlace] = useState('')
  const [selectedProperty, setSelectedProperty] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const propertyOptions = Object.keys(events)
  const navigate = useNavigate()

  // Fetch states on component mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const stateResponse = await axios.get('http://localhost:3000/api/calender/states')
        setStates(stateResponse.data)
      } catch (error) {
        console.error('Error fetching states:', error)
      }
    }
    fetchStates()
  }, [])

  // Fetch places when a state is selected
  useEffect(() => {
    if (selectedState) {
      const fetchPlaces = async () => {
        try {
          const placeResponse = await axios.get(`http://localhost:3000/api/calender/${selectedState}/places`)
          setPlaces(placeResponse.data)
        } catch (error) {
          console.error('Error fetching places:', error)
        }
      }
      fetchPlaces()
    }
  }, [selectedState])

  // Date processing
  useEffect(() => {
    if (selectedDate) {
      try {
        const cleanedDate = selectedDate.replace(/['"]/g, '').trim()
        const date = new Date(cleanedDate)

        if (isNaN(date.getTime())) {
          throw new Error('Invalid date')
        }

        const currentFormattedDate = date.toISOString().split('T')[0]
        date.setDate(date.getDate() + 1)
        const newFormattedDate = date.toISOString().split('T')[0]

        if (currentFormattedDate !== selectedDate) {
          setSelectedDate(newFormattedDate)
        }
      } catch (error) {
        console.error('Error processing date:', error)
      }
    }
  }, [selectedDate])

  const formcreate = () => {
    if (!selectedDate) {
      alert('Please select a date')
      return
    }

    const cleanedDate = selectedDate.replace(/['"]/g, '').trim()

    let formattedDate
    let formattedTime

    try {
      const date = new Date(cleanedDate)

      if (isNaN(date.getTime())) {
        throw new Error('Invalid date')
      }

      formattedDate = date.toISOString().split('T')[0]
      formattedTime = date.toISOString().split('T')[1].split('.')[0]

      alert(`Date: ${formattedDate} Time: ${formattedTime}`)
    } catch (error) {
      console.error('Error parsing date:', error)
      alert(`Invalid date format: ${cleanedDate}`)
      return
    }

    const path = CREATE_FORM.replace(':venue', selectedProperty).replace(
      ':date',
      formattedDate
    )

    navigate(path)
  }

  const isFormValid =
    selectedState && selectedPlace && selectedProperty && selectedDate

  return (
    <div className="h-full w-[100%] justify-center items-center">
      <div className="flex flex-wrap justify-between items-end">
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
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
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
            {places.map((place) => (
              <option key={place} value={place}>
                {place}
              </option>
            ))}
          </select>
        </div>

        {/* Date Input */}
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
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        {/* Property Selection */}
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
            {propertyOptions.map((property) => (
              <option key={property} value={property}>
                {property}
              </option>
            ))}
          </select>
        </div>

        {/* Button */}
        <button
          onClick={formcreate}
          className={`button md:m-5  ${
            isFormValid ? '' : 'opacity-50 cursor-not-allowed'
          }`}
          disabled={!isFormValid}
        >
          Done
        </button>
      </div>
      <div className="w-full flex flex-wrap justify-center items-center">
        {Object.keys(events).map((venue, index) => (
          <Calender
            key={index}
            events={events[venue]}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            venue={venue}
          />
        ))}
      </div>
    </div>
  )
}

export default CreatebyDateEvent

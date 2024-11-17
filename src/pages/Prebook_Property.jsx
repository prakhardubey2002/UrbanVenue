import React, { useEffect, useState } from 'react'
import Calender from '../components/Calender'
import { CREATE_FORM } from '../routes/Routes'
import { useFetcher, useNavigate } from 'react-router-dom'
import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import axios from 'axios' // Add axios or use any method to fetch data
import { toast } from 'react-hot-toast'
// import { events } from '../data/CalenderDateDemoData'

const PrebookProperty = () => {
  const [states, setStates] = useState([])
  const [places, setPlaces] = useState([])
  const [properties, setProperties] = useState([])
  const [events, setEvents] = useState([])
  const [selectedState, setSelectedState] = useState('')
  const [selectedPlace, setSelectedPlace] = useState('')
  const [selectedProperty, setSelectedProperty] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [ven, setven] = useState()
  const [address, setAddress] = useState(null)
  const [isFormValid, setIsFormValid] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFields, setSelectedFields] = useState({
    bookingId: 'admin-prebook',
    guestName: 'prebook',
    phoneNumber: 'prebook',
    checkInDate:'',
    checkInTime: '',
    checkOutDate: '',
    checkOutTime: '',
    email: 'prebook',
    // maxPeople: '',
    numberOfKids: '0',
    numberOfAdults: '0',
    occasion: 'prebook',
    hostOwnerName: 'prebook',
    hostNumber: 'prebook',
    totalBooking: '0',
    bookingpartnerid: 'prebook',
    bookingPartnerName: 'admin',
    bookingPartnerPhoneNumber: 'prebook',
    farmTref: '0',
    otherServices: '0',
    advance: '0',
    advanceCollectedBy: 'prebook',
    pendingCollectedBy: 'prebook',
    // showAdvanceDetails: '',
    advanceMode: 'prebook',
    balancePayment: '0',
    securityAmount: '0',

    termsConditions: 'prebook',
    status: 'Upcoming',
    eventAddOns: 'prebook',
    venue: 'prebook',
    addressLine1: 'prebook',
    addressLine2: 'prebook',
    country: 'prebook',
    state: 'prebook',
    citySuburb: 'prebook',
    zipCode: 'prebook',
    urbanvenuecommission: '0', //total amount 10%
    surplus: '0',
    deficit: '0',
    photo: 'prebook',
    fullcloser: 'prebook',
    maplink: 'prebook',
    cancellledby: 'prebook',
    cancelreason: 'prebook',
  })
  const handleDoneClick = () => {
 
    const date = new Date(selectedDate)
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date')
    }
    let formattedDate;

    formattedDate = date.toISOString().split('T')[0];
    setSelectedFields(prevState => ({
      ...prevState, // Keep the previous state values intact
      checkInDate: formattedDate, // Set the current date in YYYY-MM-DD format
      state:selectedState,
      venue:selectedProperty,
      citySuburb:selectedPlace,
      

    }));
    setIsModalOpen(true) // Open modal
  }

  const handleCloseModal = () => {
    const formDataToSend = new FormData();
  
    // Append all the fields from selectedFields to the FormData object
    for (let key in selectedFields) {
      formDataToSend.append(key, selectedFields[key]);
    }
  console.log(formDataToSend)
    // Append the photo file, if exists
    if (selectedFields.photo) {
      formDataToSend.append('photo', selectedFields.photo);
    }
  
    // Send data via axios POST request
    axios
      .post('https://backend.urbanvenue.in/api/invoices/invoices', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for file uploads
        },
      })
      .then((response) => {
        console.log('Form submitted successfully:', response.data);
        toast.success('Successfully Saved data!');
        window.location.reload();
        setIsModalOpen(false); // Close modal
        // navigate(INVOICE_ROUTE, { state: selectedFields }); // Pass selectedFields, not formData
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        toast.error(`Failed to save data! ${error}`);
      });
  
    setIsModalOpen(false); // Close modal
  };
  // const [defaultDate, setDefaultDate] = useState(new Date())
  const navigate = useNavigate()

  // Fetch states and properties from API
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const stateResponse = await axios.get(
          'https://backend.urbanvenue.in/api/calender/states'
        )
        setStates(stateResponse.data)
      } catch (error) {
        console.error('Error fetching states:', error)
      }
    }

    fetchStates()
  }, [])

  // Fetch places based on selected state
  useEffect(() => {
    if (selectedState) {
      const fetchPlaces = async () => {
        try {
          const placeResponse = await axios.get(
            `https://backend.urbanvenue.in/api/calender/${selectedState}/places`
          )
          setPlaces(placeResponse.data)
        } catch (error) {
          console.error('Error fetching places:', error)
        }
      }

      fetchPlaces()
    }
  }, [selectedState])

  // Fetch properties based on selected state and place
  useEffect(() => {
    if (selectedState && selectedPlace) {
      const fetchProperties = async () => {
        try {
          const propertiesResponse = await axios.get(
            `https://backend.urbanvenue.in/api/calender/${selectedState}/${selectedPlace}/farms`
          )
          setProperties(propertiesResponse.data)
          console.log(propertiesResponse.data)
        } catch (error) {
          console.error('Error fetching properties:', error)
        }
      }

      fetchProperties()
    }
  }, [selectedState, selectedPlace])

  // Check if all required fields are filled
  useEffect(() => {
    if (selectedState && selectedPlace && selectedProperty && selectedDate) {
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
    }
  }, [selectedState, selectedPlace, selectedProperty, selectedDate])

  // Process date
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

      alert(`Farm : ${selectedProperty} Date: ${formattedDate}`)
    } catch (error) {
      console.error('Error parsing date:', error)
      alert(`Invalid date format: ${cleanedDate}`)
      return
    }

    const path = CREATE_FORM.replace(':venue', selectedProperty).replace(
      ':date',
      formattedDate
    )
    if (address != null) {

      navigate(path, { state: address })
    }

  }
  useEffect(() => {
    if (selectedState && selectedPlace && selectedProperty) {
      const fetchEvents = async () => {
        try {
          const eventsResponse = await axios.get(
            `https://backend.urbanvenue.in/api/calender/${selectedState}/${selectedPlace}/${selectedProperty}/events`
          )
          setEvents(eventsResponse.data)
          // setAddress(eventsResponse.data.address)
          // setDefaultDate(eventsResponse?.data[0]?.start)
          console.log(eventsResponse.data)
          // console.log(eventsResponse.data)
        } catch (error) {
          console.error('Error fetching events:', error)
        }
      }
      fetchEvents()
    }
  }, [selectedState, selectedPlace, selectedProperty])
  // Fetch address based on selected property
  useEffect(() => {
    if (selectedState && selectedPlace && selectedProperty) {
      const fetchAddress = async () => {
        try {
          const addressResponse = await axios.get(
            `https://backend.urbanvenue.in/api/calender/${selectedState}/${selectedPlace}/${selectedProperty}/details`
          )
          setAddress(addressResponse.data)
        } catch (error) {
          console.error('Error fetching address:', error)
        }
      }
      fetchAddress()
    }
  }, [selectedState, selectedPlace, selectedProperty])
  // useEffect(() => {
  //   // console.log(events[selectedProperty])
  // }, [selectedState, selectedPlace, selectedProperty])
  return (
    <div className="h-full w-[100%] justify-center items-center p-8">
      <div className="flex flex-wrap justify-between items-end">
        <div className="flex flex-col flex-1 mx-4">
          <label className="font-semibold mb-2">
            Select State <span className="text-Primary">*</span>
          </label>
          <select
            id="state"
            className="bg-white  border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
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
            className="bg-white border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
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
            className="bg-white  border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
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
            className="bg-white  border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <button
          onClick={handleDoneClick}
          className={`button md:m-5 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          disabled={!isFormValid}
        >
          Done
        </button>
      </div>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            maxHeight: '90vh',
            overflowY: 'auto',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" mb={2}>
            Event Details
          </Typography>
          <form>
            {Object.keys(selectedFields).map((field) => {
              const isDateField =
                field === 'checkInDate' || field === 'checkOutDate'
              const isTimeField =
                field === 'checkInTime' || field === 'checkOutTime' // Check for time fields

              return (
                <TextField
                  key={field}
                  label={field
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, (str) => str.toUpperCase())} // Format label
                  value={selectedFields[field]}
                  type={isDateField ? 'date' : isTimeField ? 'time' : 'text'} // Set type based on field
                  onChange={(e) =>
                    setSelectedFields({
                      ...selectedFields,
                      [field]: e.target.value,
                    })
                  }
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={
                    isDateField || isTimeField ? { shrink: true } : {}
                  }
                />
              )
            })}
            <Box mt={3} textAlign="center">
              <Button
                variant="contained"
                color="success"
                onClick={handleCloseModal}
              >
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
      <div className="w-full flex justify-center items-center">
        {events && (
          <Calender
            events={events}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            venue={selectedProperty}
            intializer={new Date()}
            setven={setven}
          // defaultDate={defaultDate}
          // setDefaultDate={setDefaultDate}
          />
        )}
      </div>
    </div>
  )
}

export default PrebookProperty

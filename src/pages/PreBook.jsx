import React, { useEffect, useState, useCallback, useContext } from 'react'
import Calender from '../components/Calender'
import { Link, useNavigate } from 'react-router-dom'
import { CREATE_FORM } from '../routes/Routes'
import axios from 'axios'
import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import { toast } from 'react-hot-toast'
import AuthContext from '../context/context'
const PreBook = () => {
  const { name, number, id } = useContext(AuthContext);
  const [states, setStates] = useState([])
  const [places, setPlaces] = useState([])
  const [selectedState, setSelectedState] = useState('')
  const [selectedPlace, setSelectedPlace] = useState('')
  const [selectedProperty, setSelectedProperty] = useState('')
  const [selectedDate, setSelectedDate] = useState("")
  const [calenderEvents, setCalenderEvents] = useState({})
  const [ven, setven] = useState('')
  const [selectedDateString, setSelectedDateString] = useState('')
  const [renderKey, setRenderKey] = useState(0)
  const [address, setAddress] = useState('')
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFields, setSelectedFields] = useState({
    bookingId: 'admin-prebook',
    guestName: 'prebook',
    phoneNumber: 'prebook',
    checkInDate: '',
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
    bookingpartnerid: id,
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
      state: selectedState,
      venue: selectedProperty,
      citySuburb: selectedPlace,


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
        // window.location.reload();
        setIsModalOpen(false); // Close modal
        // navigate(INVOICE_ROUTE, { state: selectedFields }); // Pass selectedFields, not formData
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        toast.error(`Failed to save data! ${error}`);
      });

    setIsModalOpen(false); // Close modal
  };

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

  useEffect(() => {
    if (ven && Object.keys(calenderEvents).includes(ven)) {
      setSelectedProperty(ven)
    }
  }, [ven, calenderEvents])

  const handleFindProperty = useCallback(async () => {
    if (selectedState && selectedPlace && selectedDate) {
      try {
        const response = await axios.get(
          `https://backend.urbanvenue.in/api/calender/${selectedState}/${selectedPlace}/farms/${selectedDate}`
        )
        const farms = response.data

        const formattedEvents = farms.reduce((acc, farm) => {
          acc[farm.name] = farm.events
          return acc
        }, {})

        setCalenderEvents(formattedEvents)
        setRenderKey((prevKey) => prevKey + 1) // Update the key to force re-render
      } catch (error) {
        console.error('Error fetching events:', error)
      }
    }
  }, [selectedState, selectedPlace, selectedDate])
  const handlePopupSubmit = () => {
    if (!executiveName || !executiveNumber || !checkoutDate) {
      alert('Please fill all fields.')
      return
    }
    alert(
      `Executive Name: ${executiveName}, Executive Number: ${executiveNumber}, Check-in Date: ${selectedDate}, Checkout Date: ${checkoutDate}`
    )
    closePopup()
  }

  const formcreate = useCallback(async () => {
    if (!selectedDate) {
      alert('Please select a date')
      return
    }

    let formattedDate

    try {
      const date = new Date(selectedDate)
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date')
      }

      formattedDate = date.toISOString().split('T')[0]
      alert(
        ` Propert : ${ven} Date: ${new Date(formattedDate).toLocaleDateString(
          'en-GB'
        )}`
      )
    } catch (error) {
      console.error('Error parsing date:', error)
      alert(`Invalid date format: ${selectedDate}`)
      return
    }

    try {
      // Fetch the address
      const addressResponse = await axios.get(
        `https://backend.urbanvenue.in/api/calender/${selectedState}/${selectedPlace}/${selectedProperty}/details`
      )

      // Set the address state
      const address = addressResponse.data
      setAddress(address)
      console.log(address)
      console.log(`${selectedState}/${selectedPlace}/${selectedProperty}`)
      // Navigate with the address in the state
      const path = CREATE_FORM.replace(
        ':venue',
        selectedProperty || ''
      ).replace(':date', formattedDate)
      if (address != null) {
        navigate(path, { state: address })
      }
    } catch (error) {
      console.error('Error fetching address:', error)
      alert('Failed to fetch the address.')
    }
  }, [selectedDate, selectedProperty, selectedState, selectedPlace, navigate])

  const isFormValid = useCallback(
    () => selectedState && selectedPlace && selectedProperty && selectedDate,
    [selectedState, selectedPlace, selectedProperty, selectedDate]
  )

  useEffect(() => {
    if (selectedDate) {
      handleFindProperty()
    }
  }, [selectedDate, handleFindProperty])

  return (
    <div className="h-full w-[100%] justify-center items-center p-8">
      <div className="flex flex-wrap justify-between items-end">
        <div className="flex flex-col flex-1 mx-4">
          <label className="font-semibold mb-2">
            Select State <span className="text-Primary">*</span>
          </label>
          <select
            id="state"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-white  border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
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
            value={selectedPlace}
            onChange={(e) => setSelectedPlace(e.target.value)}
            className="bg-white  border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
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

        <div className="flex flex-col flex-1 mx-4">
          <div className="w-full flex justify-between">
            <label className="font-semibold mb-2">
              Date<span className="text-Primary">*</span>
            </label>
            {/* Removed Link component */}
          </div>
          <input
            type="date"
            className="bg-white  border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="flex flex-col flex-1 mx-4">
          <label className="font-semibold mb-2">
            Select Property <span className="text-Primary">*</span>
          </label>
          <select
            id="property"
            value={selectedProperty || ''}
            onChange={(e) => setSelectedProperty(e.target.value)}
            className="bg-white  border border-black rounded-md shadow-sm focus:outline-none sm:text-sm px-2 py-2"
          >
            <option value="">Select Property</option>
            {Object.keys(calenderEvents).map((property) => (
              <option key={property} value={property}>
                {property}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleDoneClick}
          className={`button md:m-5  ${isFormValid() ? '' : 'opacity-50 cursor-not-allowed'
            }`}
          disabled={!isFormValid()}
        >
          Done
        </button>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full grid grid-cols-2 md:grid-cols-1 gap-1">
          {Object.keys(calenderEvents).map((venue, index) => {
            console.log(venue)

            return (
              <Calender
                key={`${venue}-${renderKey}`}
                events={calenderEvents[venue]}
                selectedDate={selectedDateString}
                setSelectedDate={setSelectedDateString}
                venue={venue}
                intializer={selectedDate}
                setven={setven}
              />
            )
          })}
        </div>
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
    </div>
  )
}

export default PreBook

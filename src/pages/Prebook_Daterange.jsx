import React, { useEffect, useState, useCallback, useContext } from 'react';
import CalenderD from '../components/CalenderD';
import { useNavigate } from 'react-router-dom';
import { CREATE_FORM } from '../routes/Routes';
import axios from 'axios';
import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import AuthContext from '../context/context';
import toast from 'react-hot-toast';

const PrebookbyDateRange = () => {
  const { name, number, id } = useContext(AuthContext);
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
    console.log("wnsdjnds")
    console.log(data.venue);
    console.log(data.date);
    console.log(data.city);
    console.log("wnsdjnds")
  }, [data]);
  const generateId = () => {
    const now = new Date();
  
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const date = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
  
    return `ID-${year}${month}${date}-${hours}${minutes}${seconds}${milliseconds}`;
  };
  
  // Example usage
  const uniqueId = generateId();
  console.log(uniqueId); // Output: "ID-20241117-123456789"
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFields, setSelectedFields] = useState({
    bookingId: `admin-prebook-${generateId()} `,
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
 console.log(data)
    const date = new Date(startDate)
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date')
    }
    let formattedDate;

    formattedDate = date.toISOString().split('T')[0];
    setSelectedFields(prevState => ({
      ...prevState, // Keep the previous state values intact
      checkInDate: formattedDate, // Set the current date in YYYY-MM-DD format
      state:data.city,
      venue:selectedProperty,
      citySuburb:data.city,
      

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
  // Fetch farms based on date range
  const fetchFarmsByDateRange = useCallback(async () => {
    if (startDate && endDate) {
      try {
        console.log(`Fetching farms from: ${startDate} to ${endDate}`);
        const response = await axios.get(
          `https://backend.urbanvenue.in/api/calender/farms-free-by-date-range`,
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
      // console.log(`https://backend.urbanvenue.in/api/calender/${data.city}/${selectedProperty}/details`)
      const addressResponse = await axios.get(
        `https://backend.urbanvenue.in/api/calender/${data.city}/${selectedProperty}/details`
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
          onClick={handleDoneClick}
          className={`button md:m-5 ${isFormValid() ? '' : 'opacity-50 cursor-not-allowed'}`}
          disabled={!isFormValid()}
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

export default PrebookbyDateRange;

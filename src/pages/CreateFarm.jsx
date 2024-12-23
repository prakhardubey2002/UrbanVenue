import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'

const CreateFarm = () => {
  const navigate = useNavigate()
  const [occasions, setOccasions] = useState([])

  // State to manage form values
  const [formData, setFormData] = useState({
    stateName: '',
    placeName: '',
    farmId: '',
    name: '',
    addressLine1: '',
    addressLine2: '',
    country: '',
    state: '',
    suburb: '',
    zipCode: '',
    phoneNumber: '',
    checkInTime: '',
    checkOutDate: '',
    checkOutTime: '',
    numberOfAdults: '', // Updated
    numberOfKids: '', // Updated
    occasion: '',
    hostOwnerName: '',
    hostNumber: '',
    totalBooking: '',
    advance: '',
    balancePayment: '',
    securityAmount: '',
    advanceCollectedBy: 'Not Assigned',
    pendingCollectedBy: 'Not Assigned',
    advanceMode: '',
    email: '',
    otherServices: '',
    urbanvenuecommission: '',
    termsConditions: '',
    eventAddOns: '',
    farmTref: '', // Added field
    status: 'Upcoming',
    maplink: '',
  })
  const capitalizeFirstLetter = (str) => {
    if (!str) return ''; // Return empty string if input is empty
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // Generate unique farmId based on stateName and placeName
  const generateFarmId = (stateName, placeName, name) => {
    const cleanedStateName = stateName
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/g, '')
    const cleanedPlaceName = placeName
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/g, '')
    const cleasedfarmname = name
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/g, '')
    const timestamp = 1
    return `${cleanedStateName}-${cleanedPlaceName}-${cleasedfarmname}-${timestamp}`
  }
  useEffect(() => {
    setFormData((prevFormData) => {
      // Ensure totalBooking is the sum of otherServices and farmTref
      const otherServices = Number(prevFormData.otherServices) || 0 // Convert to number or default to 0
      const farmTref = Number(prevFormData.farmTref) || 0 // Convert to number or default to 0
      const totalBooking = otherServices + farmTref // Perform addition

      return {
        ...prevFormData,
        totalBooking, // Ensure totalBooking remains consistent
        balancePayment: totalBooking - Number(prevFormData.advance || 0), // Calculate balancePayment
      }
    })
  }, [formData.advance, formData.farmTref, formData.otherServices]) // Adjusted dependencies
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Format stateName and placeName before updating
    const formattedValue = (name === 'stateName' || name === 'placeName')
      ? capitalizeFirstLetter(value)
      : value;

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: formattedValue };

      // If stateName or placeName is changed, update farmId
      if (name === 'stateName' || name === 'placeName' || name === 'name') {
        updatedData.farmId = generateFarmId(
          updatedData.stateName,
          updatedData.placeName,
          updatedData.name
        );
      }

      // If stateName is changed, update state to the same value
      if (name === 'stateName') {
        updatedData.state = formattedValue;
      }

      // If placeName is changed, update suburb to the same value
      if (name === 'placeName') {
        updatedData.suburb = formattedValue;
      }

      // If suburb is changed, update placeName to the same value
      if (name === 'suburb') {
        updatedData.placeName = formattedValue;
      }

      // Update balancePayment if totalBooking and advance are changed
      if (name === 'totalBooking' || name === 'advance') {
        updatedData.balancePayment =
          parseInt(updatedData.totalBooking) - parseInt(updatedData.advance) || 0;
      }

      return updatedData;
    });
  };

  useEffect(() => {
    // Fetch occasions from the API
    const fetchOccasions = async () => {
      try {
        const response = await axios.get(
          'http://localhost:9000/occasion/occasions'
        )
        setOccasions(response.data) // Assuming response.data is an array of occasion objects
      } catch (error) {
        console.error('Error fetching occasions:', error)
      }
    }

    fetchOccasions()
  }, [])
  // Handle form submission
  const handleSubmit = () => {
    // const requiredFields = [
    //   'farmId',
    //   'name',
    //   'addressLine1',
    //   'addressLine2',
    //   'country',
    //   'state',
    //   'suburb',
    //   'zipCode',
    //   'phoneNumber',
    //   'checkInTime',
    //   'checkOutDate',
    //   'checkOutTime',
    //   'numberOfAdults',
    //   'numberOfKids',
    //   'occasion',
    //   'hostOwnerName',
    //   'hostNumber',
    //   'totalBooking',
    //   'advance',
    //   'balancePayment',
    //   'securityAmount',
    //   'advanceCollectedBy',
    //   'pendingCollectedBy',
    //   'advanceMode',
    //   'email',
    //   'otherServices',
    //   'urbanvenuecommission',
    //   'termsConditions',
    //   'eventAddOns',
    //   'status',
    // ]

    // const missingFields = requiredFields.filter((field) => !formData[field])

    // if (missingFields.length > 0) {
    //   toast.error(
    //     `Please fill in the following fields: ${missingFields.join(', ')}`
    //   )
    // } else {
    // Structure the data as per the updated API requirements
    const apiData = {
      stateName: formData.stateName, // Assuming this is included in the form data
      placeName: formData.placeName, // Assuming this is included in the form data
      farmDetails: {
        farmId: formData.farmId,
        name: formData.name,
        address: {
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          country: formData.country,
          state: formData.state,
          suburb: formData.suburb,
          zipCode: formData.zipCode,
        },
        phoneNumber: formData.phoneNumber,
        checkInTime: formData.checkInTime,
        checkOutDate: formData.checkOutDate,
        checkOutTime: formData.checkOutTime,
        numberOfAdults: formData.numberOfAdults,
        numberOfKids: formData.numberOfKids,
        occasion: formData.occasion,
        hostOwnerName: formData.hostOwnerName,
        hostNumber: formData.hostNumber,
        totalBooking: formData.totalBooking,
        advance: formData.advance,
        balancePayment: formData.balancePayment,
        securityAmount: formData.securityAmount,
        advanceCollectedBy: formData.advanceCollectedBy,
        pendingCollectedBy: formData.pendingCollectedBy,
        advanceMode: formData.advanceMode,
        email: formData.email,
        otherServices: formData.otherServices,
        urbanvenuecommission: formData.urbanvenuecommission,
        termsConditions: formData.termsConditions,
        eventAddOns: formData.eventAddOns,
        status: formData.status,
        farmTref: formData.farmTref, // Added in the API data
        maplink: formData.maplink,
      },
    }

    console.log(apiData)
    axios
      .post('http://localhost:9000/api/calender/add-farm', apiData)
      .then((response) => {
        toast.success('Farm created successfully!')
        navigate('/farms')
      })
      .catch((error) => {
        toast.error('Error creating farm!')
        console.error('Error:', error)
      })
    // }
  }
  // State to manage commission percentages
  const [otherServicesPercentage, setOtherServicesPercentage] = useState(20)
  const [totalBookingPercentage, setTotalBookingPercentage] = useState(10)

  // Calculate urban venue commission
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      urbanvenuecommission:
        (otherServicesPercentage / 100) * Number(prevData.otherServices || 0) +
        (totalBookingPercentage / 100) * Number(prevData.totalBooking || 0),
    }))
  }, [
    formData.otherServices,
    formData.totalBooking,
    otherServicesPercentage,
    totalBookingPercentage,
  ])

  // Input handlers for the percentage values
  const handleOtherServicesPercentageChange = (e) =>
    setOtherServicesPercentage(Number(e.target.value) || 0)
  const handleTotalBookingPercentageChange = (e) =>
    setTotalBookingPercentage(Number(e.target.value) || 0)

  return (
    <div className="bg-[#f6f7f9] w-full h-full flex flex-col justify-center items-center">
      <Toaster position="top-right" reverseOrder={true} />
      <h2 className="my-8 font-bold text-3xl">Create Farm</h2>
      <div className="my-8 bg-white p-4 w-9/12 h-fit rounded-md shadow-sm">
        {/* Farm ID */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Farm ID</label>
          <input
            name="farmId"
            value={formData.farmId}
            onChange={handleChange}
            // readOnly
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="text"
            placeholder="Farm ID will be auto-generated"
          />
        </div>
        {/* State Name */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">State Name</label>
          <input
            name="stateName"
            value={formData.stateName}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="text"
            placeholder="Enter State Name"
          />
        </div>
        {/* Place Name */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Place Name</label>
          <input
            name="placeName"
            value={formData.placeName}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="text"
            placeholder="Enter Place Name"
          />
        </div>
        {/* Farm Name */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Farm Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="text"
            placeholder="Enter Farm Name"
          />
        </div>
        {/* Phone Number */}
        {/* <div className="flex flex-col border-b">
          <label className="font-semibold">Phone Number</label>
          <input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="tel"
            placeholder="Enter Phone Number"
            pattern="[0-9]{10}"
            maxLength={10}
            onWheel={(e) => e.target.blur()}
          />
        </div> */}
        {/* Email */}
        {/* <div className="flex flex-col border-b">
          <label className="font-semibold">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="email"
            placeholder="Enter Email"
          />
        </div> */}

        {/* Check-in Time */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Check-in Time</label>
          <input
            name="checkInTime"
            value={formData.checkInTime}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="time"
            placeholder="Enter Check-in Time"
          />
        </div>
        {/* Check-out Date */}
        {/* <div className="flex flex-col border-b">
          <label className="font-semibold">Check-out Date</label>
          <input
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="date"
          />
        </div> */}
        {/* Check-out Time */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Check-out Time</label>
          <input
            name="checkOutTime"
            value={formData.checkOutTime}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="time"
            placeholder="Enter Check-out Time"
          />
        </div>
        {/* Number of Adults */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Number of Adults</label>
          <input
            name="numberOfAdults"
            value={formData.numberOfAdults}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="number"
            placeholder="Enter Number of Adults"
            onWheel={(e) => e.target.blur()}
          />
        </div>
        {/* Number of Kids */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Number of Kids</label>
          <input
            name="numberOfKids"
            value={formData.numberOfKids}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="number"
            placeholder="Enter Number of Kids"
            onWheel={(e) => e.target.blur()}
          />
        </div>
        {/* Occasion */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Occasion</label>
          <select
            name="occasion"
            value={formData.occasion}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
          >
            <option value="">Select an occasion</option>
            {occasions.map((occasion, index) => (
              <option key={index} value={occasion.name}>
                {occasion.name}
              </option>
            ))}
            {/* <option value="Wedding">Wedding</option>
            <option value="Engagement">Engagement</option>
            <option value="Office Party">Office Party</option>
            <option value="Haldi Ceremony">Haldi Ceremony</option>
            <option value="Mehndi Ceremony">Mehndi Ceremony</option> */}
          </select>
        </div>
        {/* Host Owner Name */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Host Owner Name</label>
          <input
            name="hostOwnerName"
            value={formData.hostOwnerName}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="text"
            placeholder="Enter Host Owner Name"
          />
        </div>
        {/* Host Number */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Host Number</label>
          <input
            name="hostNumber"
            value={formData.hostNumber}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="tel"
            placeholder="Enter Host Number"
            pattern="[0-9]{10}"
            maxLength={10}
            onWheel={(e) => e.target.blur()}
          />
        </div>
        {/* Farm Tref */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Farm Tariff</label>
          <input
            name="farmTref"
            value={formData.farmTref}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="number"
            placeholder="Enter Farm Tariff"
            onWheel={(e) => e.target.blur()}
          />
        </div>
        {/* Farm Tref */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Other Service</label>
          <input
            name="otherServices"
            value={formData.otherServices}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="number"
            placeholder="Enter otherServices"
            onWheel={(e) => e.target.blur()}
          />
        </div>
        {/* Total Booking */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Total Booking</label>
          <input
            readOnly
            name="totalBooking"
            value={formData.totalBooking}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="number"
            placeholder="Enter Total Booking"
            onWheel={(e) => e.target.blur()}
          />
        </div>

        {/* Advance */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Advance</label>
          <input
            name="advance"
            value={formData.advance}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="number"
            placeholder="Enter Advance Amount"
            onWheel={(e) => e.target.blur()}
          />
        </div>
        {/* Advance Mode */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Advance Mode</label>
          <select
            name="advanceMode"
            value={formData.advanceMode}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
          >
            <option value="">Select Mode of Advance Payment</option>
            <option value="Cash">Cash</option>
            <option value="Online">Online</option>
          </select>
        </div>
        {/* Advance Collected By */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Advance Collected By</label>
          <select
            name="advanceCollectedBy"
            value={formData.advanceCollectedBy}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
          >
            <option value="">Select Person</option>
            <option value="Not Assigned">Not Assigned</option>
            <option value="Property Owner">Property Owner</option>
            <option value="Urban venue">Urban venue</option>
          </select>
        </div>
        {/* Balance Payment (calculated automatically based on Total Booking and Advance) */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Balance Payment</label>
          <input
            name="balancePayment"
            value={formData.balancePayment}
            readOnly
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="number"
            placeholder="Balance Payment"
          />
        </div>
        {/* Pending Collected By */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Pending Collected By</label>
          <select
            name="pendingCollectedBy"
            value={formData.pendingCollectedBy}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
          >
            {/* <option value="">Select Person</option> */}
            <option value="Not Assigned">Not Assigned</option>
            <option value="Property Owner">Property Owner</option>
            <option value="Urban venue">Urban venue</option>
          </select>
        </div>
        {/* Security Amount */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Security Amount</label>
          <input
            name="securityAmount"
            value={formData.securityAmount}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="number"
            placeholder="Enter Security Amount"
            onWheel={(e) => e.target.blur()}
          />
        </div>
        {/* Urban Venue Commission Percentage Controls */}
        <div className="grid grid-cols-2 gap-4 border-b pb-4">
          {/* Other Services Percentage */}
          <div className="flex flex-col">
            <label className="font-semibold">
              Other Services Percentage:
              <input
                type="number"
                value={otherServicesPercentage}
                onChange={handleOtherServicesPercentageChange}
                className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
              />
            </label>
          </div>

          {/* Total Booking Percentage */}
          <div className="flex flex-col">
            <label className="font-semibold">
              Total Booking Percentage:
              <input
                type="number"
                value={totalBookingPercentage}
                onChange={handleTotalBookingPercentageChange}
                className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
              />
            </label>
          </div>
        </div>

        {/* Urban Venue Commission */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Urban Venue Commission</label>
          <input
            name="urbanvenuecommission"
            value={formData.urbanvenuecommission}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="number"
            placeholder="Enter Urban Venue Commission"
            onWheel={(e) => e.target.blur()}
          />
        </div>
        <div className="flex flex-col border-b">
          <label className="font-semibold">Event status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
          >
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
            <option value="Paid">Paid</option>
            {/* <option value="Canceled">Canceled</option> */}
          </select>
        </div>
        {/* Terms and Conditions */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Terms and Conditions</label>
          <textarea
            name="termsConditions"
            value={formData.termsConditions}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            placeholder="Enter Terms and Conditions"
          />
        </div>
        {/* Event Add-Ons */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Event Add-Ons</label>
          <textarea
            name="eventAddOns"
            value={formData.eventAddOns}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            placeholder="Enter Event Add-Ons"
          />
        </div>
        <div className="flex flex-col border-b">
          <label className="font-semibold">Map Link</label>
          <textarea
            name="maplink"
            value={formData.maplink}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            placeholder="Enter Event Add-Ons"
          />
        </div>
        <div className="flex flex-col  my-4 ">
          <h2 className="font-semibold text-xl">
            Where is your event taking place? *
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Address Line 1 */}
          <div className="flex flex-col border-b">
            <label className="font-semibold">Address Line 1</label>
            <input
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
              type="text"
              placeholder="Enter Address Line 1"
            />
          </div>

          {/* Address Line 2 */}
          <div className="flex flex-col border-b">
            <label className="font-semibold">Address Line 2</label>
            <input
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
              type="text"
              placeholder="Enter Address Line 2"
            />
          </div>

          {/* Country */}
          <div className="flex flex-col border-b">
            <label className="font-semibold">Country</label>
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
              type="text"
              placeholder="Enter Country"
            />
          </div>

          {/* State */}
          <div className="flex flex-col border-b">
            <label className="font-semibold">State</label>
            <input
              readOnly
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
              type="text"
              placeholder="Enter State"
            />
          </div>

          {/* Suburb */}
          <div className="flex flex-col border-b">
            <label className="font-semibold">City</label>
            <input
              readOnly
              name="suburb"
              value={formData.suburb}
              onChange={handleChange}
              className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
              type="text"
              placeholder="Enter Suburb"
            />
          </div>

          {/* Zip Code */}
          <div className="flex flex-col border-b">
            <label className="font-semibold">Zip Code</label>
            <input
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
              type="text"
              placeholder="Enter Zip Code"
            />
          </div>
        </div>
        {/* Submit Button */}
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-3 rounded-md"
          >
            Create Farm
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateFarm

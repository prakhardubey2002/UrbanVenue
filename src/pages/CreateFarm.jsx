import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'

const CreateFarm = () => {
  const navigate = useNavigate()

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
    checkInDate: '',
    checkInTime: '',
    checkOutDate: '',
    checkOutTime: '',
    maxPeople: '',
    occasion: '',
    hostOwnerName: '',
    hostNumber: '',
    totalBooking: '',
    advance: '',
    balancePayment: '',
    securityAmount: '',
    status: 'Available',
  })

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Handle form submission
  const handleSubmit = () => {
    const requiredFields = [
      'stateName', 'placeName', 'name', 'addressLine1', 'country', 'state', 'suburb', 'zipCode', 'phoneNumber', 'checkInDate', 'checkInTime', 'checkOutDate', 'checkOutTime', 'maxPeople', 'occasion', 'hostOwnerName', 'hostNumber', 'totalBooking', 'advance', 'balancePayment', 'securityAmount', 'status'
    ]
    const missingFields = requiredFields.filter(field => !formData[field])

    if (missingFields.length > 0) {
      toast.error(`Please fill in the following fields: ${missingFields.join(', ')}`)
    } else {
      // Structure the data as per the API requirements
      const apiData = {
        stateName: formData.stateName,
        placeName: formData.placeName,
        farmDetails: {
          farmId: formData.farmId,
          name: formData.name,
          address: {
            addressLine1: formData.addressLine1,
            addressLine2: formData.addressLine2,
            country: formData.country,
            state: formData.state,
            suburb: formData.suburb,
            zipCode: formData.zipCode
          },
          phoneNumber: formData.phoneNumber,
          checkInDate: formData.checkInDate,
          checkInTime: formData.checkInTime,
          checkOutDate: formData.checkOutDate,
          checkOutTime: formData.checkOutTime,
          maxPeople: formData.maxPeople,
          occasion: formData.occasion,
          hostOwnerName: formData.hostOwnerName,
          hostNumber: formData.hostNumber,
          totalBooking: formData.totalBooking,
          advance: formData.advance,
          balancePayment: formData.balancePayment,
          securityAmount: formData.securityAmount,
          status: formData.status,
        }
      }

      axios.post('http://localhost:3000/api/calender/add-farm', apiData)
        .then(response => {
          toast.success('Farm created successfully!')
          navigate('/farms')
        })
        .catch(error => {
          toast.error('Error creating farm!')
          console.error('Error:', error)
        })
    }
  }

  return (
    <div className="bg-[#f6f7f9] w-full h-full flex flex-col justify-center items-center">
      <Toaster position="top-right" reverseOrder={true} />
      <h2 className="my-8 font-bold text-3xl">Create Farm</h2>
      <div className="my-8 bg-white p-4 w-9/12 h-fit rounded-md shadow-sm">
        
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

        {/* Farm ID */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Farm ID</label>
          <input
            name="farmId"
            value={formData.farmId}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="text"
            placeholder="Enter Farm ID"
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
          <label className="font-semibold">Suburb</label>
          <input
            name="suburb"
            value={formData.suburb}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="text"
            placeholder="Enter Suburb"
          />
        </div>

        {/* ZIP Code */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">ZIP Code</label>
          <input
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="text"
            placeholder="Enter ZIP Code"
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Phone Number</label>
          <input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="tel"
            placeholder="Enter Phone Number"
          />
        </div>

        {/* Check-in Date and Time */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Check-in Date</label>
          <input
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="date"
            placeholder="Enter Check-in Date"
          />
        </div>

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

        {/* Check-out Date and Time */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Check-out Date</label>
          <input
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="date"
            placeholder="Enter Check-out Date"
          />
        </div>

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

        {/* Max People */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Maximum People</label>
          <input
            name="maxPeople"
            value={formData.maxPeople}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="number"
            placeholder="Enter Maximum People"
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
    <option value="">Select Occasion</option>
    <option value="Wedding">Wedding</option>
    <option value="Engagement">Engagement</option>
    <option value="Office Party">Office Party</option>
    <option value="Haldi Ceremony">Haldi Ceremony</option>
    <option value="Mehndi Ceremony">Mehndi Ceremony</option>
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
          />
        </div>

        {/* Total Booking */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Total Booking</label>
          <input
            name="totalBooking"
            value={formData.totalBooking}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="number"
            placeholder="Enter Total Booking"
          />
        </div>

        {/* Advance Payment */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Advance Payment</label>
          <input
            name="advance"
            value={formData.advance}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="number"
            placeholder="Enter Advance Payment"
          />
        </div>

        {/* Balance Payment */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Balance Payment</label>
          <input
            name="balancePayment"
            value={formData.balancePayment}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="number"
            placeholder="Enter Balance Payment"
          />
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
          />
        </div>

        {/* Status */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
          >
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>

        {/* Submit Button */}
        <button onClick={handleSubmit} className="button my-8">
          Create Farm
        </button>
      </div>
    </div>
  )
}

export default CreateFarm

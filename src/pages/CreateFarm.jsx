import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const CreateFarm = () => {
  const navigate = useNavigate();

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
  });

  // Generate unique farmId based on stateName and placeName
  const generateFarmId = (stateName, placeName) => {
    const cleanedStateName = stateName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
    const cleanedPlaceName = placeName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
    const timestamp = Date.now();
    return `${cleanedStateName}-${cleanedPlaceName}-${timestamp}`;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      // If stateName or placeName is changed, update farmId
      if (name === 'stateName' || name === 'placeName') {
        updatedData.farmId = generateFarmId(updatedData.stateName, updatedData.placeName);
      }

      // If stateName is changed, update state to the same value
      if (name === 'stateName') {
        updatedData.state = value;
      }
      // If placeName is changed, update suburb to the same value
      if (name === 'placeName') {
        updatedData.suburb = value;
      }
      // If suburb is changed, update placeName to the same value
      if (name === 'suburb') {
        updatedData.placeName = value;
      }

      return updatedData;
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    const requiredFields = [
      'stateName',
      'placeName',
      'name',
      'addressLine1',
      'country',
      'state',
      'suburb',
      'zipCode',
      'phoneNumber',
      'checkInDate',
      'checkInTime',
      'checkOutDate',
      'checkOutTime',
      'maxPeople',
      'occasion',
      'hostOwnerName',
      'hostNumber',
      'totalBooking',
      'advance',
      'balancePayment',
      'securityAmount',
      'status',
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in the following fields: ${missingFields.join(', ')}`
      );
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
            zipCode: formData.zipCode,
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
        },
      };

      axios
        .post('http://localhost:3000/api/calender/add-farm', apiData)
        .then((response) => {
          toast.success('Farm created successfully!');
          navigate('/farms');
        })
        .catch((error) => {
          toast.error('Error creating farm!');
          console.error('Error:', error);
        });
    }
  };

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
            readOnly
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="text"
            placeholder="Farm ID will be auto-generated"
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
          <label className="font-semibold">Suburb</label>
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
            type="text"
            placeholder="Enter Phone Number"
          />
        </div>

        {/* Check-In Date & Time */}
        <div className="flex border-b">
          <div className="flex-1 flex flex-col mr-2">
            <label className="font-semibold">Check-In Date</label>
            <input
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
              type="date"
            />
          </div>
          <div className="flex-1 flex flex-col ml-2">
            <label className="font-semibold">Check-In Time</label>
            <input
              name="checkInTime"
              value={formData.checkInTime}
              onChange={handleChange}
              className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
              type="time"
            />
          </div>
        </div>

        {/* Check-Out Date & Time */}
        <div className="flex border-b">
          <div className="flex-1 flex flex-col mr-2">
            <label className="font-semibold">Check-Out Date</label>
            <input
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
              className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
              type="date"
            />
          </div>
          <div className="flex-1 flex flex-col ml-2">
            <label className="font-semibold">Check-Out Time</label>
            <input
              name="checkOutTime"
              value={formData.checkOutTime}
              onChange={handleChange}
              className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
              type="time"
            />
          </div>
        </div>

        {/* Max People */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Max People</label>
          <input
            name="maxPeople"
            value={formData.maxPeople}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="number"
            placeholder="Enter Max People"
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
            type="text"
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

        {/* Advance */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Advance</label>
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
    <option value="">Select Status</option>
    <option value="confirmed">Confirmed</option>
    <option value="pending">Pending</option>
    <option value="cancelled">Cancelled</option>
  </select>
</div>


        {/* Submit Button */}
        <button
          className="bg-blue-500 text-white p-2 rounded mt-4"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateFarm;

import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import NavTopBar from '../components/NavTopBar'
import BreadCrumbBar from '../components/BreadCrumbBar'
import InfoIcon from '@mui/icons-material/Info'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material'
const CreateVenueEvent = () => {
  const { venue, date } = useParams()
  // const history = useHistory();

  // State to manage form values
  const [formData, setFormData] = useState({
    bookingId: '',
    guestName: '',
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
    farmTref: '',
    otherServices: '',
    advance: '',
    advanceCollectedBy: 'owner',
    showAdvanceDetails: 'yes',
    advanceMode: 'cash',
    balancePayment: '',
    securityAmount: '',
    // termsConditions: '',
    venue: '',
    addressLine1: '',
    addressLine2: '',
    country: '',
    city: '',
    citySuburb: '',
    zipCode: '',
  })

  // State to manage dialog visibility
  const [openDialog, setOpenDialog] = useState(false)

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Handle Next button click
  const handleNext = () => {
    setOpenDialog(true)
  }

  // Handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  // Handle redirect to invoice page
  const handleSubmit = () => {
    // Redirect to invoice page or perform any action
    // history.push('/invoice-page');
  }
  return (
    <div className="bg-[#f6f7f9] w-full h-full flex flex-col justify-center items-center">
      <NavTopBar />
      <BreadCrumbBar />
      <h2 className="my-8 font-bold text-3xl ">Create Venue Event</h2>
      <div className="my-8 bg-white p-4 w-9/12 h-fit rounded-md shadow-sm ">
        <div className="flex flex-col border-b">
          <label className="font-semibold">Booking ID</label>
          <input
            name="bookingId"
            value={formData.bookingId}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="text"
            placeholder="0001"
          />
        </div>
        <div className="flex justify-start items-center border-b">
          <h2 className="font-bold text-xl py-4">
            <InfoIcon /> Details
          </h2>
        </div>
        <div className="flex flex-col border-b">
          <label className="font-semibold">Guest Name</label>
          <input
            name="guestName"
            value={formData.guestName}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="text"
            placeholder="Pooja"
          />
        </div>
        <div className="flex flex-col border-b">
          <label className="font-semibold">Phone Number</label>
          <input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="number"
            placeholder="9847777780"
          />
        </div>
        <div className="flex flex-col border-b">
          <div className="my-2">
            <h2 className="font-semibold">When is your event?</h2>
            <p>
              Tell your attendees when your event starts so they can get ready
              to attend.
            </p>
          </div>
          <div className="my-4 flex justify-between">
            <div className="flex-1 flex flex-col">
              <label className="font-semibold">Check-In Date</label>
              <input
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleChange}
                className="outline-none bg-Bordgrey my-4 mr-2 p-4 border border-Bordgrey rounded-sm"
                type="date"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label className="font-semibold">Time</label>
              <input
                name="checkInTime"
                value={formData.checkInTime}
                onChange={handleChange}
                className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
                type="time"
              />
            </div>
          </div>
          <div className="my-4 flex justify-between">
            <div className="flex-1 flex flex-col">
              <label className="font-semibold">Check-Out Date</label>
              <input
                name="checkOutDate"
                value={formData.checkOutDate}
                onChange={handleChange}
                className="outline-none bg-Bordgrey my-4 mr-2 p-4 border border-Bordgrey rounded-sm"
                type="date"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label className="font-semibold">Time</label>
              <input
                name="checkOutTime"
                value={formData.checkOutTime}
                onChange={handleChange}
                className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
                type="time"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col border-b">
          <label className="font-semibold">Maximum Number of People</label>
          <input
            name="maxPeople"
            value={formData.maxPeople}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="number"
            placeholder="150"
          />
        </div>
        <div className="flex flex-col border-b">
          <label className="font-semibold">Occasion</label>
          <input
            name="occasion"
            value={formData.occasion}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="text"
            placeholder="Wedding"
          />
        </div>
        <div className="flex flex-col border-b">
          <label className="font-semibold">Host Owner Name</label>
          <input
            name="hostOwnerName"
            value={formData.hostOwnerName}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="text"
            placeholder="Enter Owner Name here"
          />
        </div>
        <div className="flex flex-col border-b">
          <label className="font-semibold">Host Number</label>
          <input
            name="hostNumber"
            value={formData.hostNumber}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="number"
            placeholder="Enter Host number here"
          />
        </div>
        <div className="flex flex-col border-b">
          <label className="font-semibold">Total Booking</label>
          <input
            name="totalBooking"
            value={formData.totalBooking}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="text"
            placeholder="Enter Total Booking"
          />
        </div>
        <div className="flex flex-col border-b">
          <label className="font-semibold">Farm Tref</label>
          <input
            name="farmTref"
            value={formData.farmTref}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="number"
            placeholder="50,000"
          />
        </div>
        <div className="flex flex-col  border-b ">
          <label className="font-semibold"> other Services </label>
          <input
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm "
            type="number"
            placeholder="50,000"
          />
        </div>
        <div className="flex flex-col border-b">
          <label className="font-semibold">Advance</label>
          <input
            name="advance"
            value={formData.advance}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="text"
            placeholder="Enter Advance Payment"
          />
        </div>
        <div className="flex flex-col border-b">
          <label className="font-semibold">Advance Collected By</label>
          <select
            name="advanceCollectedBy"
            value={formData.advanceCollectedBy}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
          >
            <option value="owner">Owner</option>
            <option value="guest">Guest</option>
          </select>
        </div>
        <div className="flex flex-col border-b">
          <label className="font-semibold">
            Show advance collect, farm tref, other services to client invoice
          </label>
          <select
            name="showAdvanceDetails"
            value={formData.showAdvanceDetails}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="flex flex-col border-b">
          <label className="font-semibold">Advance Mode</label>
          <select
            name="advanceMode"
            value={formData.advanceMode}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="online">Online</option>
          </select>
        </div>

        <div className="flex flex-col border-b">
          <label className="font-semibold">Balance Payment</label>
          <input
            name="balancePayment"
            value={formData.balancePayment}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="text"
            placeholder="Enter Balance Payment"
          />
        </div>
        <div className="flex flex-col border-b">
          <label className="font-semibold">Security Amount</label>
          <input
            name="securityAmount"
            value={formData.securityAmount}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="text"
            placeholder="Enter Security Amount"
          />
        </div>
        <div className="flex flex-col  border-b ">
          <label className="font-semibold"> Terms & Condition</label>

          <textarea
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm "
            name=""
            id=""
            cols="30"
            rows="5"
          ></textarea>
        </div>
        <div className="flex flex-col">
          <div>
            <h2 className="font-semibold text-xl">
              Where is your event taking place? *
            </h2>
            <p>
              Add a venue to your event to tell your attendees where to join the
              event.
            </p>
          </div>
          <div className=" my-8 flex flex-col border-b">
            <label className="font-semibold">Venue</label>
            <input
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
              type="text"
              placeholder="Enter Venue Name"
            />
          </div>
          <div className=" my-4 flex justify-between ">
            <div className=" flex-1 flex flex-col">
              <label className="font-semibold">Address Line 1</label>
              <input
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                className="outline-none bg-Bordgrey mr-4 my-4 p-4 border border-Bordgrey rounded-sm"
                type="text"
                placeholder="Enter Address Line 1"
              />
            </div>
            <div className=" flex-1 flex flex-col">
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
          </div>
          <div className=" my-4 flex justify-between ">
            <div className=" flex-1 flex flex-col">
              <label className="font-semibold">Country</label>
              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="outline-none bg-Bordgrey mr-4 my-4 p-4 border border-Bordgrey rounded-sm"
                type="text"
                placeholder="Enter Country"
              />
            </div>
            <div className=" flex-1 flex flex-col">
              <label className="font-semibold">City</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
                type="text"
                placeholder="Enter City"
              />
            </div>
          </div>
          <div className=" my-4 flex justify-between ">
            <div className=" flex-1 flex flex-col">
              <label className="font-semibold">City/Suburb</label>
              <input
                name="citySuburb"
                value={formData.citySuburb}
                onChange={handleChange}
                className="outline-none bg-Bordgrey my-4 mr-8 p-4 border border-Bordgrey rounded-sm"
                type="text"
                placeholder="Enter City Suburb"
              />
            </div>
            <div className=" flex-1 flex flex-col">
              <label className="font-semibold">Zip/Post Code</label>
              <input
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
                type="text"
                placeholder="Enter ZIP Code"
              />
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleNext} className="button my-8 ">
        Next
      </button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle className='font-semibold' >Review Your Details</DialogTitle>
        <DialogContent className='p-4 min-w-[28vw] ' >
          {/* Display form data here */}
          <p>Booking ID: {formData.bookingId}</p>
          <p>Guest Name: {formData.guestName}</p>
          <p>Phone Number: {formData.phoneNumber}</p>
          <p>Check-In Date: {formData.checkInDate}</p>
          <p>Check-In Time: {formData.checkInTime}</p>
          <p>Check-Out Date: {formData.checkOutDate}</p>
          <p>Check-Out Time: {formData.checkOutTime}</p>
          <p>Maximum People: {formData.maxPeople}</p>
          <p>Occasion: {formData.occasion}</p>
          <p>Host Owner Name: {formData.hostOwnerName}</p>
          <p>Host Number: {formData.hostNumber}</p>
          <p>Total Booking: {formData.totalBooking}</p>
          <p>Farm Tref: {formData.farmTref}</p>
          <p>Other Services: {formData.otherServices}</p>
          <p>Advance: {formData.advance}</p>
          <p>Advance Collected By: {formData.advanceCollectedBy}</p>
          <p>Show Advance Details: {formData.showAdvanceDetails}</p>
          <p>Advance Mode: {formData.advanceMode}</p>
          <p>Balance Payment: {formData.balancePayment}</p>
          <p>Security Amount: {formData.securityAmount}</p>
          <p>Terms and Conditions: {formData.termsConditions}</p>
          <p>Venue: {formData.venue}</p>
          <p>Address Line 1: {formData.addressLine1}</p>
          <p>Address Line 2: {formData.addressLine2}</p>
          <p>Country: {formData.country}</p>
          <p>City: {formData.city}</p>
          <p>City Suburb: {formData.citySuburb}</p>
          <p>ZIP Code: {formData.zipCode}</p>
        </DialogContent>
        <DialogActions>
          <Button className='button' onClick={handleCloseDialog} color="primary">
            Close
          </Button>
          <button className='button'  onClick={handleSubmit} color="primary">
            Submit
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CreateVenueEvent

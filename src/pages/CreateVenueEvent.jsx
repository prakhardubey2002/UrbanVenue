import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
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
import { INVOICE_ROUTE } from '../routes/Routes'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import AuthContext from '../context/context'
const CreateVenueEvent = () => {
  const { name, number, id } = useContext(AuthContext)
  const { venue, date } = useParams()
  const location = useLocation()
  const data = location.state
  const [idx, setidx] = useState()
  const [photo, setPhoto] = useState(null)
  const navigate = useNavigate()
  // const history = useHistory();
  useEffect(() => {
    console.log(data)
  }, [])
  const [occasions, setOccasions] = useState([])

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
    const idxfetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/invoices/count/${data?.details?.name}`
        )

        const invoiceCount = response.data.invoiceCount

        // Extract the farmId
        const currentFarmId = data?.details?.farmId

        // Find the last number in the farmId (after the last hyphen)
        const parts = currentFarmId.split('-')
        const lastNumber = parseInt(parts[parts.length - 1], 10) // Parse the last part as a number

        // Increment the last number with the invoice count
        const updatedFarmId = `${parts.slice(0, -1).join('-')}-${lastNumber + invoiceCount
          }`

        console.log(updatedFarmId) // Log the updated farmId

        // Update the form data with the new bookingId
        setFormData((prevFormData) => ({
          ...prevFormData,
          bookingId: updatedFarmId,
        }))
      } catch (error) {
        console.error('Error fetching invoice count:', error)
      }
    }
    console.log('wfedgtb')
    console.log(data.details.maplink)
    // console.log(formData.maplink)

    idxfetch()
  }, [])
  // State to manage form values
  const [calculatedResult, setCalculatedResult] = useState({
    surplus: 0,
    deficit: 0,
  })
  const [formData, setFormData] = useState({
    bookingId: '',
    guestName: '',
    phoneNumber: '',
    checkInDate: date,
    checkInTime: data?.details?.checkInTime,
    checkOutDate: new Date(data?.details?.checkOutDate)
      .toISOString()
      .split('T')[0],
    checkOutTime: data.details.checkOutTime,
    email: '',
    // maxPeople: '',
    numberOfKids: data.details.numberOfKids,
    numberOfAdults: data.details.numberOfAdults,
    occasion: data.details.occasion,
    hostOwnerName: data.details.hostOwnerName,
    hostNumber: data.details.hostNumber,
    totalBooking: data.details.totalBooking,
    bookingpartnerid: id,
    bookingPartnerName: name,
    bookingPartnerPhoneNumber: number,
    farmTref: data.farmTref,
    otherServices: data.details.otherServices,
    advance: data.details.advance,
    advanceCollectedBy: data.details.advanceCollectedBy,
    pendingCollectedBy: data.details.pendingCollectedBy,
    // showAdvanceDetails: '',
    advanceMode: data.details.advanceMode || 'Cash',
    balancePayment: data.details.balancePayment,
    securityAmount: data.details.securityAmount,

    termsConditions: data.details.termsConditions,
    status: data.details.status || 'Upcoming',
    eventAddOns: data.details.eventAddOns,
    venue: venue,
    addressLine1: data.address.addressLine1,
    addressLine2: data.address.addressLine2,
    country: data.address.country,
    state: data.address.state,
    citySuburb: data.address.suburb,
    zipCode: data.address.zipCode,
    urbanvenuecommission: data.details.urbanvenuecommission, //total amount 10%
    surplus: '',
    deficit: '',
    photo: photo,
    fullcloser: 'Pending',
    maplink: data?.details?.maplink,
    cancellledby: '',
    cancelreason: '',
  })
  function generateBookingId() {
    const timestamp = new Date().getTime()
    let a = `BOOK-${venue}-${date}-${timestamp}`
    return a.replace(/\s+/g, '-')
  }

  useEffect(() => {
    const {
      advance,
      urbanvenuecommission,
      advanceCollectedBy,
      pendingCollectedBy,
      balancePayment,
    } = formData

    const advanceAmount = Number(advance)
    const commission = Number(urbanvenuecommission)
    const pendingAmount = Number(balancePayment)

    let surplus = 0
    let deficit = 0

    if (advanceCollectedBy === 'Urban venue') {
      if (pendingCollectedBy === 'Urban venue') {
        surplus = advanceAmount + pendingAmount - commission
      } else if (pendingCollectedBy === 'Property Owner') {
        surplus = advanceAmount - commission
      }
    } else if (advanceCollectedBy === 'Property Owner') {
      if (pendingCollectedBy === 'Urban venue') {
        surplus = pendingAmount - commission
      } else if (pendingCollectedBy === 'Property Owner') {
        deficit = commission
      }
    }

    if (surplus < 0) surplus = 0
    if (deficit < 0) deficit = 0

    console.log({ surplus, deficit })
    setFormData((prevFormData) => ({
      ...prevFormData,
      surplus,
      deficit,
    }))
  }, [
    formData.totalBooking,
    formData.advance,
    formData.urbanvenuecommission = 0,
    formData.advanceCollectedBy,
    formData.pendingCollectedBy,
    formData.balancePayment,
  ])

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]) // Set the selected file
    setFormData((prevformData) => ({
      ...prevformData,
      photo: e.target.files[0].name,
    }))
  }
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      balancePayment: prevFormData.totalBooking - prevFormData.advance,
    }))
  }, [formData.totalBooking, formData.advance])
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

  // State to manage dialog visibility
  const [openDialog, setOpenDialog] = useState(false)

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Handle Next button click
  const handleNext = () => {
    const requiredFields = [
      'guestName',
      'phoneNumber',
      'checkInDate',
      'checkInTime',
      'checkOutDate',
      'checkOutTime',
      // 'maxPeople',
      'occasion',
      'hostOwnerName',
      'hostNumber',
      'totalBooking',
      'advance',
      'balancePayment',
      'securityAmount',
      'status',
    ]
    const missing = requiredFields.filter(
      (field) => !formData[field] || formData[field] === 'Not Assigned'
    )
    if (missing.length > 0) {
      alert(
        `Please fill in the following fields:\n${missing
          .map((field) => field.replace(/([A-Z])/g, ' $1').trim())
          .join('\n')}`
      )
    } else {
      // Proceed to submit
      console.log(formData)
      setOpenDialog(true)
    }
  }

  // Handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  // Handle redirect to invoice page
  const handleSubmit = () => {
    const formDataToSend = new FormData()

    // Append all the form data to the FormData object
    for (let key in formData) {
      formDataToSend.append(key, formData[key])
    }

    // Append the photo file
    if (photo) {
      formDataToSend.append('photo', photo)
    }

    axios
      .post('http://localhost:9000/api/invoices/invoices', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for file uploads
        },
      })
      .then((response) => {
        console.log('Form submitted successfully:', response.data)
        toast.success('Successfully Saved data!')
        navigate(INVOICE_ROUTE, { state: formData })
      })
      .catch((error) => {
        console.error('Error submitting form:', error)
        toast.error(`Failed to save data! ${error} `)
      })
  }

  return (
    <div className="bg-[#f6f7f9] w-full h-full flex flex-col justify-center items-center">
      <NavTopBar />
      <BreadCrumbBar />
      <Toaster position="top-right" reverseOrder={true} />
      <h2 className="my-8 font-bold text-3xl ">
        Create Venue Event
        {/* Surplus: {calculatedResult.surplus} Deficiet:{' '}
        {calculatedResult.deficit}{' '} */}
      </h2>
      <div className="my-8 bg-white p-4 w-9/12 h-fit rounded-md shadow-sm ">
        <div className="flex flex-col border-b">
          <label className="font-semibold">Booking ID</label>
          <input
            disabled
            readOnly
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
            type="tel"
            placeholder="9847777780"
            onWheel={(e) => e.target.blur()}
            pattern="[0-9]{10}"
            maxLength={10}
          />
        </div>
        <div className="flex flex-col border-b">
          <label className="font-semibold">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="email"
            placeholder="xyz@gmail.com"
            onWheel={(e) => e.target.blur()}
          />
        </div>
        <div className="flex flex-col border-b">
          <label className="font-semibold">Booking Partner Name</label>
          <input
            readOnly
            name="bookingPartnerName"
            value={formData.bookingPartnerName}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="text"
            placeholder="Name"
            onWheel={(e) => e.target.blur()}
          />
        </div>
        <div className="flex flex-col border-b">
          <label className="font-semibold">Booking Partner Phone No.</label>
          <input
            readOnly
            name="bookingPartnerPhoneNumber"
            value={formData.bookingPartnerPhoneNumber}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="tel"
            placeholder="9847777780"
            onWheel={(e) => e.target.blur()}
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
          <div className="my-4 flex flex-wrap justify-between">
            <div className="flex-1 flex flex-col">
              <label className="font-semibold">Check-In Date</label>
              <input
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleChange}
                className="outline-none bg-Bordgrey my-4 mr-2 p-4 border border-Bordgrey rounded-sm"
                type="date"
                disabled
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
          <div className="my-4 flex flex-wrap justify-between">
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
        {/* <div className="flex flex-col border-b">
          <label className="font-semibold">Maximum Number of People</label>
          <input
            name="maxPeople"
            value={formData.maxPeople}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="number"
            placeholder="150"
            onWheel={(e) => e.target.blur()}
          />
        </div> */}
        <div className="flex flex-col border-b">
          <label className="font-semibold">Number of Adults</label>
          <input
            name="numberOfAdults"
            value={formData.numberOfAdults}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="number"
            placeholder="150"
            onWheel={(e) => e.target.blur()}
          />
        </div>
        <div className="flex flex-col border-b">
          <label className="font-semibold">Number of Kids</label>
          <input
            name="numberOfKids"
            value={formData.numberOfKids}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="number"
            placeholder="10"
            onWheel={(e) => e.target.blur()}
          />
        </div>

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
          </select>
        </div>

        <div className="flex flex-col border-b">
          <label className="font-semibold">Property Owner Name</label>
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
          <label className="font-semibold">Property Owner Number</label>
          <input
            name="hostNumber"
            value={formData.hostNumber}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="tel"
            placeholder="Enter Host number here"
            onWheel={(e) => e.target.blur()}
            pattern="[0-9]{10}"
            maxLength={10}
          />
        </div>
        <div className="flex flex-col border-b">
          <label className="font-semibold">Farm tariff</label>
          <input
            name="farmTref"
            value={formData.farmTref}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="number"
            placeholder="50000"
            onWheel={(e) => e.target.blur()}
          />
        </div>
        <div className="flex flex-col  border-b ">
          <label className="font-semibold"> other Services </label>
          <input
            // readOnly
            name="otherServices"
            value={formData.otherServices}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm "
            type="number"
            placeholder="50000"
            onWheel={(e) => e.target.blur()}
          />
        </div>
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

        <div className="flex flex-col border-b">
          <label className="font-semibold">Advance</label>
          <input
            name="advance"
            value={formData.advance}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="number"
            placeholder="Enter Advance Payment"
            onWheel={(e) => e.target.blur()}
          />
        </div>
        <div className="flex flex-col border-b">
          <label className="font-semibold">Advance Collected By</label>
          <select
            name="advanceCollectedBy"
            value={formData.advanceCollectedBy || 'Not Assigned'}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
          >
            <option value="Not Assigned">Not Assigned</option>
            <option value="Property Owner">Property Owner</option>
            <option value="Urban venue">Urban venue</option>
          </select>
        </div>
        <div className="flex flex-col border-b">
          <label className="font-semibold">Pending Collected By</label>
          <select
            name="pendingCollectedBy"
            value={formData.pendingCollectedBy || 'Not Assigned'}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
          >
            <option value="Not Assigned">Not Assigned</option>
            <option value="Property Owner">Property Owner</option>
            <option value="Urban venue">Urban venue</option>
          </select>
        </div>
        {/* <div className="flex flex-col border-b">
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
        </div> */}
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

        <div className="flex flex-col border-b">
          <label className="font-semibold">Advance Mode</label>
          <select
            name="advanceMode"
            value={formData.advanceMode}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
          >
            <option value="Cash">Cash</option>
            <option value="Online">Online</option>
          </select>
        </div>

        <div className="flex flex-col border-b">
          <label className="font-semibold">Balance Payment</label>
          <input
            disabled
            name="balancePayment"
            value={formData.balancePayment}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="number"
            placeholder="Enter Balance Payment"
            onWheel={(e) => e.target.blur()}
          />
        </div>
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
        {/* <div className="flex flex-col border-b">
          <label className="font-semibold">Urban Venue commission</label>
          <input
            name="urbanvenuecommission"
            value={formData.urbanvenuecommission}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="number"
            placeholder="Enter Commission"
            onWheel={(e) => e.target.blur()}
          />
        </div> */}
        <div className="flex flex-col  border-b ">
          <label className="font-semibold"> Terms & Condition</label>

          <textarea
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm "
            name="termsConditions"
            value={formData.termsConditions}
            onChange={handleChange}
            id=""
            cols="30"
            rows="5"
          ></textarea>
        </div>
        <div className="flex flex-col  border-b ">
          <label className="font-semibold">Events Add-ons</label>

          <textarea
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm "
            name="eventAddOns"
            value={formData.eventAddOns}
            onChange={handleChange}
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
              disabled
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
              type="text"
              placeholder="Enter Venue Name"
            />
          </div>
          <div className=" my-8 flex flex-col border-b">
            <label className="font-semibold">Upload File:</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
              onChange={handleFileChange}
            />
          </div>
          <div className=" my-4 flex flex-wrap justify-between ">
            <div className=" flex-1 flex flex-col">
              <label className="font-semibold">Address Line 1</label>
              <input
                disabled
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
                disabled
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
                type="text"
                placeholder="Enter Address Line 2"
              />
            </div>
          </div>
          <div className=" my-4 flex flex-wrap justify-between ">
            <div className=" flex-1 flex flex-col">
              <label className="font-semibold">Country</label>
              <input
                disabled
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="outline-none bg-Bordgrey mr-4 my-4 p-4 border border-Bordgrey rounded-sm"
                type="text"
                placeholder="Enter Country"
              />
            </div>
            <div className=" flex-1 flex flex-col">
              <label className="font-semibold">State</label>
              <input
                disabled
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
                type="text"
                placeholder="Enter state"
              />
            </div>
          </div>
          <div className=" my-4 flex flex-wrap justify-between ">
            <div className=" flex-1 flex flex-col">
              <label className="font-semibold">City/Suburb</label>
              <input
                disabled
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
                disabled
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
        <DialogTitle className="font-semibold">Review Your Details</DialogTitle>
        <DialogContent className="p-4 min-w-[28vw] font-semibold">
          <table className="min-w-full border-collapse border border-gray-300">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  Booking ID:
                </td>
                <td className="p-2">{formData.bookingId}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  Guest Name:
                </td>
                <td className="p-2">{formData.guestName}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  Phone Number:
                </td>
                <td className="p-2">{formData.phoneNumber}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  Check-In Date:
                </td>
                <td className="p-2">{formData.checkInDate}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  Check-In Time:
                </td>
                <td className="p-2">{formData.checkInTime}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  Check-Out Date:
                </td>
                <td className="p-2">{formData.checkOutDate}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  Check-Out Time:
                </td>
                <td className="p-2">{formData.checkOutTime}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  bookingpartnerid:
                </td>
                <td className="p-2">{id}</td>
              </tr>
              {/* <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  Maximum People:
                </td>
                <td className="p-2">{formData.maxPeople}</td>
              </tr> */}
              <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  Occasion:
                </td>
                <td className="p-2">{formData.occasion}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  Host Owner Name:
                </td>
                <td className="p-2">{formData.hostOwnerName}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  Host Number:
                </td>
                <td className="p-2">{formData.hostNumber}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  Total Booking:
                </td>
                <td className="p-2">{formData.totalBooking}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  Farm Tref:
                </td>
                <td className="p-2">{formData.farmTref}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  Other Services:
                </td>
                <td className="p-2">{formData.otherServices}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  Advance:
                </td>
                <td className="p-2">{formData.advance}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  Advance Collected By:
                </td>
                <td className="p-2">{formData.advanceCollectedBy}</td>
              </tr>
              {/* <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  Show Advance Details:
                </td>
                <td className="p-2">{formData.showAdvanceDetails}</td>
              </tr> */}
              <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  Advance Mode:
                </td>
                <td className="p-2">{formData.advanceMode}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  Balance Payment:
                </td>
                <td className="p-2">{formData.balancePayment}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  Security Amount:
                </td>
                <td className="p-2">{formData.securityAmount}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  Status:
                </td>
                <td className="p-2">{formData.status}</td>
              </tr>

              <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  Venue:
                </td>
                <td className="p-2">{formData.venue}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  Advance Collected By:
                </td>
                <td className="p-2">{formData.advanceCollectedBy}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  Pending Collected By:
                </td>
                <td className="p-2">{formData.pendingCollectedBy}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  Address Line 1:
                </td>
                <td className="p-2">{formData.addressLine1}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  Address Line 2:
                </td>
                <td className="p-2">{formData.addressLine2}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  Country:
                </td>
                <td className="p-2">{formData.country}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  State:
                </td>
                <td className="p-2">{formData.state}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  City Suburb:
                </td>
                <td className="p-2">{formData.citySuburb}</td>
              </tr>
              <tr>
                <td className="font-bold p-2 border-r border-gray-300">
                  ZIP Code:
                </td>
                <td className="p-2">{formData.zipCode}</td>
              </tr>
              <tr>
                <td className="font-bold p-2 border-r border-gray-300">
                  Photo:
                </td>
                <td className="p-2">{formData.photo}</td>
              </tr>
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <Button
            className="button"
            onClick={handleCloseDialog}
            color="primary"
          >
            Close
          </Button>
          <button className="button" onClick={handleSubmit} color="primary">
            Submit
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CreateVenueEvent

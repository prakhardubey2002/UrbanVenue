import React, { useEffect, useState } from 'react'
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
const CreateVenueEvent = () => {
  const { venue, date } = useParams()
  const location = useLocation()
  const data = location.state
  const navigate = useNavigate()
  // const history = useHistory();
  useEffect(() => {
    console.log(data)
  }, [])
  // State to manage form values
  const [formData, setFormData] = useState({
    bookingId: generateBookingId(),
    guestName: '',
    phoneNumber: '',
    checkInDate: date,
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
    advanceCollectedBy: 'Not Assigned',
    pendingCollectedBy: 'Not Assigned',
    showAdvanceDetails: '',
    advanceMode: 'cash',
    balancePayment: '',
    securityAmount: '',

    // termsConditions: '',
    status: '',
    venue: venue,
    addressLine1: data.addressLine1,
    addressLine2: data.addressLine2,
    country: data.country,
    state: data.state,
    citySuburb: data.suburb,
    zipCode: data.zipCode,
    urbanvenuecommission: 5000,
  })
  function generateBookingId() {
    const timestamp = new Date().getTime()
    return `BOOK-${venue}-${date}-${timestamp}`
  }
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      balancePayment: prevFormData.totalBooking - prevFormData.advance,
    }))
  }, [formData.totalBooking, formData.advance])
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
      'maxPeople',
      'occasion',
      'hostOwnerName',
      'hostNumber',
      'totalBooking',
      'advance',
      'balancePayment',
      'securityAmount',
      'status'
    ]
    const missing = requiredFields.filter(field => !formData[field] || formData[field] === 'Not Assigned')
    if (missing.length > 0) {
      alert(`Please fill in the following fields:\n${missing.map(field => field.replace(/([A-Z])/g, ' $1').trim()).join('\n')}`)
    } else {
      // Proceed to submit
      handleSubmit()
    }
  }
  
  // Handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  // Handle redirect to invoice page
  const handleSubmit = () => {
    // Redirect to invoice page or perform any action
    // history.push('/invoice-page');
    // navigate();
    axios
      .post('http://localhost:3000/api/invoices/invoices', formData)
      .then((response) => {
        console.log('Form submitted successfully:', response.data)
        toast.success('Successfully Saved data!')
        navigate(INVOICE_ROUTE, { state: formData })
        // Handle success (e.g., redirect or show a success message)
      })
      .catch((error) => {
        console.error('Error submitting form:', error)
        // Handle error (e.g., show an error message)
      })
  }
  return (
    <div className="bg-[#f6f7f9] w-full h-full flex flex-col justify-center items-center">
      <NavTopBar />
      <BreadCrumbBar />
      <Toaster position="top-right" reverseOrder={true} />
      <h2 className="my-8 font-bold text-3xl ">Create Venue Event</h2>
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
        <div className="flex flex-col border-b">
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
        </div>
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
            onWheel={(e) => e.target.blur()}
          />
        </div>
        <div className="flex flex-col border-b">
          <label className="font-semibold">Total Booking</label>
          <input
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
          <label className="font-semibold">Farm Tref</label>
          <input
            name="farmTref"
            value={formData.farmTref}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            type="number"
            placeholder="50,000"
            onWheel={(e) => e.target.blur()}
          />
        </div>
        <div className="flex flex-col  border-b ">
          <label className="font-semibold"> other Services </label>
          <input
            name="otherServices"
            value={formData.otherServices}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm "
            type="number"
            placeholder="50,000"
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
            <option value="Farm Owner">Farm Owner</option>
            <option value="Organiser">Organiser</option>
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
            <option value="Farm Owner">Farm Owner</option>
            <option value="Organiser">Organiser</option>
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
          <label className="font-semibold">Event status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
          >
            <option value="Upcoming">Upcoming</option>
            <option value="Paid">Paid</option>
            <option value="Canceled">Canceled</option>
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
        <div className="flex flex-col border-b">
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
              disabled
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
              type="text"
              placeholder="Enter Venue Name"
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
                  Maximum People:
                </td>
                <td className="p-2">{formData.maxPeople}</td>
              </tr>
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
              <tr className="border-b border-gray-300">
                <td className="font-bold p-2 border-r border-gray-300">
                  Show Advance Details:
                </td>
                <td className="p-2">{formData.showAdvanceDetails}</td>
              </tr>
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

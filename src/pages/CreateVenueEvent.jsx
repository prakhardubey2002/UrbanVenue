import React from 'react'
import { useParams } from 'react-router-dom'
import NavTopBar from '../components/NavTopBar'
import BreadCrumbBar from '../components/BreadCrumbBar'
import InfoIcon from '@mui/icons-material/Info'
const CreateVenueEvent = () => {
  const { venue, date } = useParams()
  return (
    <div className="bg-[#f6f7f9] w-full h-full flex flex-col justify-center items-center">
      <NavTopBar />
      <BreadCrumbBar />
      <h2 className="my-8 font-bold text-3xl ">Create Venue Event</h2>
      <div className="my-8 bg-white p-4 w-9/12 h-fit rounded-md shadow-sm ">
        <div className="flex flex-col  border-b ">
          <label className="font-semibold"> Booking ID </label>
          <input
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm "
            type="text"
            placeholder="0001"
          />
        </div>
        <div className="flex justify-start items-center  border-b ">
          <h2 className="font-bold text-xl py-4 ">
            {' '}
            <InfoIcon /> Details
          </h2>
        </div>
        <div className="flex flex-col  border-b ">
          <label className="font-semibold"> Guest Name </label>
          <input
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm "
            type="text"
            placeholder="Pooja"
          />
        </div>
        <div className="flex flex-col  border-b ">
          <label className="font-semibold"> Phone Number </label>
          <input
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm "
            type="number"
            placeholder="9847777780"
          />
        </div>
        <div className="flex flex-col  border-b ">
          <div className="my-2">
            <h2 className="font-semibold">When is your event?</h2>
            <p>
              Tell your attendees when your event starts so they can get ready
              to attend
            </p>
          </div>
          <div className=" my-4 flex justify-between ">
            <div className=" flex-1 flex flex-col">
              <label className="font-semibold">Check-In date.</label>
              <input
                className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm "
                type="date"
              />
            </div>
            <div className=" flex-1 flex flex-col">
              <label className="font-semibold">Time</label>
              <input
                className="  outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm "
                type="time"
              />
            </div>
          </div>
          <div className=" my-4 flex justify-between ">
            <div className=" flex-1 flex flex-col">
              <label className="font-semibold">Check-Out date.</label>
              <input
                className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm "
                type="date"
              />
            </div>
            <div className=" flex-1 flex flex-col">
              <label className="font-semibold">Time</label>
              <input
                className="  outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm "
                type="time"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col  border-b ">
          <label className="font-semibold"> Maximum Number of People </label>
          <input
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm "
            type="number"
            placeholder="150"
          />
        </div>
        <div className="flex flex-col  border-b ">
          <label className="font-semibold"> Occasion </label>
          <input
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm "
            type="text"
            placeholder="Wedding"
          />
        </div>
        <div className="flex flex-col  border-b ">
          <label className="font-semibold"> Host Owner Name </label>
          <input
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm "
            type="text"
            placeholder="Enter Owner Name here"
          />
        </div>
        <div className="flex flex-col  border-b ">
          <label className="font-semibold"> host Number </label>
          <input
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm "
            type="Number"
            placeholder="Enter Owner Name here"
          />
        </div>
        <div className="flex flex-col  border-b ">
          <label className="font-semibold"> Total Booking </label>
          <input
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm "
            type="text"
            placeholder="Enter Host number here"
          />
        </div>
        <div className="flex flex-col  border-b ">
          <label className="font-semibold"> farm tref </label>
          <input
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm "
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
        <div className="flex flex-col  border-b ">
          <label className="font-semibold"> Advance </label>
          <input
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm "
            type="number"
            placeholder="50,000"
          />
        </div>
        <div className="flex flex-col border-b">
          <label className="font-semibold">Advance Collected By</label>
          <select
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm"
            defaultValue="owner"
          >
            <option value="owner">Owner</option>
          </select>
        </div>
        <div className="flex flex-col border-b">
          <label className="font-semibold">
            Show advance collect, farm tref, other services to client invoice
          </label>
          <select className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="flex flex-col border-b">
          <label className="font-semibold">Advance Mode</label>
          <select className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm">
            <option value="cash">Cash</option>
            <option value="online">Online</option>
          </select>
        </div>

        <div className="flex flex-col  border-b ">
          <label className="font-semibold"> Balance payment</label>
          <input
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm "
            type="number"
            placeholder="50,000"
          />
        </div>
        <div className="flex flex-col  border-b ">
          <label className="font-semibold"> Security amount</label>
          <input
            className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm "
            type="number"
            placeholder="5000"
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
          <div className=" my-8 flex flex-col   ">
            <label className="font-semibold"> Venue</label>
            <input
              className="outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm "
              type="text"
              placeholder="Rose Gardern"
            />
          </div>
          <div className=" my-4 flex justify-between ">
            <div className=" flex-1 flex flex-col">
              <label className="font-semibold">Address Line 1</label>
              <input
                className="outline-none bg-Bordgrey my-4 mr-2 p-4 border border-Bordgrey rounded-sm "
                type="text"
                placeholder="Address Line 1"
              />
            </div>
            <div className=" flex-1 flex flex-col">
              <label className="font-semibold">Address Line 2</label>
              <input
                className="  outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm "
                type="text"
                placeholder="Address Line 2"
              />
            </div>
          </div>
          <div className=" my-4 flex justify-between ">
            <div className=" flex-1 flex flex-col">
              <label className="font-semibold">Country</label>
              <input
                className="outline-none bg-Bordgrey my-4 mr-2 p-4 border border-Bordgrey rounded-sm "
                type="text"
                placeholder="India"
              />
            </div>
            <div className=" flex-1 flex flex-col">
              <label className="font-semibold">City</label>
              <input
                className="  outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm "
                type="text"
                placeholder="New delhi"
              />
            </div>
          </div>
          <div className=" my-4 flex justify-between ">
            <div className=" flex-1 flex flex-col">
              <label className="font-semibold">City/Suburb</label>
              <input
                className="outline-none bg-Bordgrey my-4 mr-2 p-4 border border-Bordgrey rounded-sm "
                type="text"
                placeholder="New Delhi"
              />
            </div>
            <div className=" flex-1 flex flex-col">
              <label className="font-semibold">Zip/Post Code</label>
              <input
                className="  outline-none bg-Bordgrey my-4 p-4 border border-Bordgrey rounded-sm "
                type="number"
                placeholder="110074"
              />
            </div>
          </div>
        </div>
      </div>
      <button className='button my-8' >
        Next
      </button>
    </div>
  )
}

export default CreateVenueEvent

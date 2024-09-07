import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import { usePDF } from 'react-to-pdf'
import invoice from '../assets/invoice.png'
import qr from '../assets/qr.png'
import { DASHBOARD_ROUTE } from '../routes/Routes'
const Invoice = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const formData = location.state
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' })
  const Home = () => {
    navigate(DASHBOARD_ROUTE)
  }
  return (
    <div className="w-[100vw] h-[100vh] overflow-x-hidden flex justify-center items-start">
      <div
        ref={targetRef}
        className="flex flex-col w-[70%] border border-black"
      >
        <div className="px-4 bg-Primary h-[14vh] flex justify-between items-center">
          <img src={Logo} alt="" />
          <button onClick={() => toPDF()} className="text-white">
            Download
          </button>
        </div>
        <div className="m-4">
          <h2 className="font-semibold text-2xl">Invoice</h2>
          <div className="flex flex-col items-start">
            <div className="w-[90%] flex justify-between">
              <p>Invoice to {formData.guestName}</p>
              <p>Invoice ID: {formData.bookingId}</p>
            </div>
            <div className="w-[90%] flex justify-between">
              <p>{formData.phoneNumber}</p>
              <p>Order Date: {formData.checkInDate}</p>
            </div>
            <div className="w-[90%] flex justify-between">
              <p> </p>
              <p>{formData.venue}</p>
            </div>
            <div className="w-[90%] flex justify-between">
              <p>
                
              </p>
              <p>{formData.addressLine1}</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-Bordgrey">
                <th className="py-2 px-4 border-b text-left">Event Details</th>
                <th className="py-2 px-4 border-b text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b text-left">Guest Name</td>
                <td className="py-2 px-4 border-b text-right">
                  {formData.guestName}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-left">Phone Number</td>
                <td className="py-2 px-4 border-b text-right">
                  {formData.phoneNumber}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-left">Check-In</td>
                <td className="py-2 px-4 border-b text-right">
                  {formData.checkInDate}, {formData.checkInTime}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-left">Check-Out</td>
                <td className="py-2 px-4 border-b text-right">
                  {formData.checkOutDate}, {formData.checkOutTime}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-left">
                  Maximum Number Of People
                </td>
                <td className="py-2 px-4 border-b text-right">
                  {formData.maxPeople}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-4">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-Bordgrey">
                <th className="py-2 px-4 border-b text-left">#</th>
                <th className="py-2 px-4 border-b text-left">
                  Pricing Details
                </th>
                <th className="py-2 px-4 border-b text-left">Type</th>
                <th className="py-2 px-4 border-b text-left">Security</th>
                <th className="py-2 px-4 border-b text-left">Advance</th>
                <th className="py-2 px-4 border-b text-left">Pending</th>
                <th className="py-2 px-4 border-b text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b text-left">1</td>
                <td className="py-2 px-4 border-b text-left">
                  {formData.occasion} Event
                </td>
                <td className="py-2 px-4 border-b text-left">
                  {formData.occasion}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  ₹ {formData.securityAmount}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  ₹ {formData.advance}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  ₹ {formData.balancePayment}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  ₹{' '}
                  {Number(formData.balancePayment) +
                    Number(formData.advance) +
                    Number(formData.securityAmount)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-4 flex flex-col justify-end items-end">
          <h2 className="text-2xl font-semibold">
            Invoice Total: ₹{' '}
            {Number(formData.balancePayment) +
              Number(formData.advance) +
              Number(formData.securityAmount)}
          </h2>
          <p>Paid via {formData.advanceMode}</p>
        </div>
        {formData.showAdvanceDetails ==="yes" && (
          <div className="p-4">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-Bordgrey">
                  <th className="py-2 px-4 border-b text-left">#</th>
                  <th className="py-2 px-4 border-b text-left">Breakup</th>
                  <th className="py-2 px-4 border-b text-left">Farm Tref</th>
                  <th className="py-2 px-4 border-b text-left">
                    Other Service
                  </th>
                  <th className="py-2 px-4 border-b text-left">Urban Venue</th>
                  <th className="py-2 px-4 border-b text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b text-left">1</td>
                  <td className="py-2 px-4 border-b text-left">
                    Advance Breakup
                  </td>
                  <td className="py-2 px-4 border-b text-left">
                  ₹  {formData.farmTref}
                  </td>
                  <td className="py-2 px-4 border-b text-left">
                  ₹ {formData.otherServices}
                  </td>
                  <td className="py-2 px-4 border-b text-left">
                    ₹ {formData.urbanvenuecommission}
                  </td>
                  <td className="py-2 px-4 border-b text-left">
                    ₹{' '}
                    {Number(formData.farmTref) +
                      Number(formData.otherServices) +
                      Number(formData.urbanvenuecommission)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div>
          <div className="  flex items-center justify-between bg-white border-t border-gray-300">
            <div className="flex-1 flex items-center p-8">
              <img
                src={invoice} // Replace with the correct field name
                alt="invoice" // Replace with the correct field name
                className="w-[100px] h-[100px] object-cover rounded-lg"
              />
              <div className="ml-4">
                <h4 className="font-semibold">{formData.occasion}</h4>{' '}
                {/* Event Name */}
                <p className="text-sm text-gray-500">
                  {new Date(formData.checkInDate).toLocaleDateString()}{' '}
                  {new Date(formData.checkOutDate).toLocaleTimeString()}.
                  Duration{' '}
                  {/* {calculateDuration(formData.checkIn, formData.checkOut)}{' '} */}
                  {/* Calculated Duration */}
                </p>
                <p className="text-sm text-gray-500">{formData.guestName}</p>{' '}
                {/* Organizer Name */}
                <p className="text-sm text-gray-500">1 x Ticket</p>{' '}
                {/* Ticket Count */}
                <p className="font-semibold">
                  Total : ₹{' '}
                  {Number(formData.balancePayment) +
                    Number(formData.advance) +
                    Number(formData.securityAmount)}
                </p>{' '}
                {/* Total Amount */}
              </div>
            </div>
            <div className="flex-1 p-4 bg-Bordgrey flex flex-col items-start">
              <p className="text-2xl font-semibold my-2">Visit our site</p>
              <img
                src={qr}
                alt="QR Code"
                className="w-[80px] h-[80px] object-cover"
              />
              <p className="text-xs text-gray-500 mt-4">
                Powered by Urban Venue
              </p>
            </div>
          </div>
        </div>
        <div className=" my-8 flex justify-center items-center">
          <button onClick={() => Home()} className="button ">
            Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default Invoice

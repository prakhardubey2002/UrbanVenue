import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import { usePDF } from 'react-to-pdf'
import invoice from '../assets/invoice.png'
import qr from '../assets/qr.png'
import { DASHBOARD_ROUTE } from '../routes/Routes'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import HomeIcon from '@mui/icons-material/Home'
import EmailIcon from '@mui/icons-material/Email'
import LanguageIcon from '@mui/icons-material/Language'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';

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
        <div className="relative h-[14vh] flex">
          <div className="w-1/3 bg-black flex items-center justify-center z-0">
            <span className="text-white"> </span>
          </div>
          <div className="w-1/3 bg-[#ce2a33] flex items-center justify-center z-0">
            <span className="text-white"> </span>
          </div>
          <div className="w-1/3 bg-black flex items-center justify-center z-0">
            <span className="text-white"> </span>
          </div>
          <div className="absolute right-[1%] top-[45%] flex justify-between items-center px-4 z-10">
            <button onClick={() => toPDF()} className="text-white flex  ">
              <CloudDownloadIcon className="mx-2" />
              Download
            </button>
          </div>
        </div>
        <div className="m-4">
          <img src={Logo} className="w-24 my-4 h-auto" alt="Logo" />
          <h2 className="font-semibold text-2xl">Invoice</h2>
          <div className="flex flex-col items-start">
            <div className="w-full flex justify-between">
              <p>Invoice to {formData.guestName}</p>
              <p>Invoice ID: {formData.bookingId}</p>
            </div>
            <div className="w-full flex justify-between">
              <p>{formData.phoneNumber}</p>
              <p>Order Date: {formData.checkInDate}</p>
            </div>
            <div className="w-full flex justify-between">
              <p> </p>
              <p>{formData.venue}</p>
            </div>
            <div className="w-full flex justify-between">
              <p></p>
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
                  {new Date(formData.checkInDate).toLocaleDateString('en-GB')}, {formData.checkInTime}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-left">Check-Out</td>
                <td className="py-2 px-4 border-b text-right">
                  {new Date(formData.checkOutDate).toLocaleDateString('en-GB')}, {formData.checkOutTime}
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
        {formData.showAdvanceDetails === 'yes' && (
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
                    ₹ {formData.farmTref}
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
          {/* <div className="  flex items-center justify-between bg-white border-t border-gray-300">
            <div className="flex-1 flex items-center p-8">
              <img
                src={invoice}
                alt="invoice" 
                className="w-[100px] h-[100px] object-cover rounded-lg"
              />
              <div className="ml-4">
                <h4 className="font-semibold">{formData.occasion}</h4>{' '}
                
                <p className="text-sm text-gray-500">
                  {new Date(formData.checkInDate).toLocaleDateString()}{' '}
                  {new Date(formData.checkOutDate).toLocaleTimeString()}.
                  Duration{' '}
                 
                </p>
                <p className="text-sm text-gray-500">{formData.guestName}</p>{' '}
                
                <p className="text-sm text-gray-500">1 x Ticket</p>{' '}
              
                <p className="font-semibold">
                  Total : ₹{' '}
                  {Number(formData.balancePayment) +
                    Number(formData.advance) +
                    Number(formData.securityAmount)}
                </p>{' '}
               
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
          </div> */}
          <div className="relative h-[14vh] my-2 flex">
            <div className="w-1/3 relative bg-black flex  items-center justify-center z-0">
              <div className="absolute bg-[#ce2a33]  border border-white p-2 top-[-10%] rounded-3xl ">
                <LocalPhoneIcon className=" text-white" />
              </div>
              <a href="tel:+919871371364" className="text-white ">
                +91 9871371364
              </a>
            </div>
            <div className="w-1/3 bg-[#ce2a33] relative flex items-center justify-center z-0">
              <div className="absolute bg-[#ce2a33]  border border-white p-2 top-[-10%] rounded-3xl ">
                <EmailIcon className="text-white" />
              </div>
              <a href="mailto:TheUrbanVenue@gmail.com" className="text-white ">
                TheUrbanVenue@gmail.com
              </a>
            </div>
            <div className="w-1/3 relative bg-black flex items-center justify-center z-0">
              <div className="absolute bg-[#ce2a33]  border border-white p-2 top-[-10%] rounded-3xl ">
                <LanguageIcon className="text-white" />
              </div>
              <a
                href="https://www.urbanvenue.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline-none"
              >
                www.urbanvenue.in
              </a>
            </div>
          </div>
        </div>
        <div className="relative h-[7vh] flex flex-wrap">
          <div className="w-1/5 bg-black flex items-center justify-center z-0">
            <span className="text-white"> 
            <InstagramIcon/>
            @theurbanvenue
            </span>
          </div>
          <div className="w-1/5 bg-[#ce2a33] flex items-center justify-center z-0">
            <span className="text-white">
              <FacebookIcon/>
            @theurbanvenue
               </span>
          </div>
          <div className="w-1/5 bg-black flex items-center justify-center z-0">
            <span className="text-white"> 
            <YouTubeIcon/>
            @theurbanvenue
            </span>
          </div>
          <div className="w-1/5 bg-[#ce2a33] flex items-center justify-center z-0">
            <span className="text-white"> 
            <LinkedInIcon />
            @theurbanvenue
            </span>
          </div>
          <div className="w-1/5 bg-black flex items-center justify-center z-0">
            <span className="text-white"> 
            <PinterestIcon/>
            @theurbanvenue
            </span>
          </div>
        </div>
      </div>
      <div
        onClick={() => Home()}
        className=" cursor-pointer bg-Primary my-10 ml-2 p-2 flex justify-center items-center rounded "
      >
        {/* <button  className="button "> */}
        <HomeIcon className="text-white" />
        {/* </button> */}
      </div>
    </div>
  )
}

export default Invoice

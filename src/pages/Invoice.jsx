import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import { usePDF } from 'react-to-pdf'
import invoice from '../assets/invoice.png'
import Qr from '../assets/Invoice-Logo.png'
import invoLogo from '../assets/Invo-Logo.png'
import qr from '../assets/qr.png'
import { DASHBOARD_ROUTE } from '../routes/Routes'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import HomeIcon from '@mui/icons-material/Home'
import EmailIcon from '@mui/icons-material/Email'
import LanguageIcon from '@mui/icons-material/Language'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import YouTubeIcon from '@mui/icons-material/YouTube'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import PinterestIcon from '@mui/icons-material/Pinterest'

// const Invoice = () => {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const formData = location.state
//   const { toPDF, targetRef } = usePDF({ filename: `${formData.guestName}.pdf` })
//   const Home = () => {
//     navigate(DASHBOARD_ROUTE)
//   }
//   return (
//     <div className="w-[100vw] h-[100vh] overflow-x-hidden flex justify-center items-start">
//       <div
//         ref={targetRef}
//         className="flex flex-col w-[70%] border border-black"
//       >
//         <div className="relative h-[14vh] flex">
//           <div className="w-1/3 bg-black flex items-center justify-center z-0">
//             <span className="text-white"> </span>
//           </div>
//           <div className="w-1/3 bg-[#ce2a33] flex items-center justify-center z-0">
//             <span className="text-white"> </span>
//           </div>
//           <div className="w-1/3 bg-black flex items-center justify-center z-0">
//             <span className="text-white"> </span>
//           </div>
//           <div className="absolute right-[1%] top-[45%] flex justify-between items-center px-4 z-10">
//             <button onClick={() => toPDF()} className="text-white flex  ">
//               <CloudDownloadIcon className="mx-2" />
//               Download
//             </button>
//           </div>
//         </div>
//         <div className="m-4">
//           <img src={Logo} className="w-24 my-4 h-auto" alt="Logo" />
//           <h2 className="font-semibold text-2xl">Invoice</h2>
//           <div className="flex flex-col items-start">
//             <div className="w-full flex justify-between">
//               <p>Invoice to {formData.guestName}</p>
//               <p>Invoice ID: {formData.bookingId}</p>
//             </div>
//             <div className="w-full flex justify-between">
//               <p>{formData.phoneNumber}</p>
//               <p>Order Date: {new Date(formData.checkInDate).toLocaleDateString('en-GB')}</p>
//             </div>
//             <div className="w-full flex justify-between">
//               <p> </p>
//               <p>{formData.venue}</p>
//             </div>
//             <div className="w-full flex justify-between">
//               <p></p>
//               <p>{formData.addressLine1}</p>
//             </div>
//             <div className="w-full flex justify-between">
//               <p></p>
//               <p>{formData.addressLine2}</p>
//             </div>
//             <div className="w-full flex justify-between">
//               <p></p>
//               <p>{formData.state},{formData.country},{formData.zipCode}</p>
//             </div>
//           </div>
//         </div>
//         <div className="p-4">
//           <table className="min-w-full bg-white border border-gray-300">
//             <thead>
//               <tr className="bg-Bordgrey">
//                 <th className="py-2 px-4 border-b text-left">Event Details</th>
//                 <th className="py-2 px-4 border-b text-right">Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="py-2 px-4 border-b text-left">Guest Name</td>
//                 <td className="py-2 px-4 border-b text-right">
//                   {formData.guestName}
//                 </td>
//               </tr>
//               <tr>
//                 <td className="py-2 px-4 border-b text-left">Phone Number</td>
//                 <td className="py-2 px-4 border-b text-right">
//                   {formData.phoneNumber}
//                 </td>
//               </tr>
//               <tr>
//                 <td className="py-2 px-4 border-b text-left">Check-In</td>
//                 <td className="py-2 px-4 border-b text-right">
//                   {new Date(formData.checkInDate).toLocaleDateString('en-GB')}, {formData.checkInTime}
//                 </td>
//               </tr>
//               <tr>
//                 <td className="py-2 px-4 border-b text-left">Check-Out</td>
//                 <td className="py-2 px-4 border-b text-right">
//                   {new Date(formData.checkOutDate).toLocaleDateString('en-GB')}, {formData.checkOutTime}
//                 </td>
//               </tr>
//               <tr>
//                 <td className="py-2 px-4 border-b text-left">
//                   Maximum Number Of People
//                 </td>
//                 <td className="py-2 px-4 border-b text-right">
//                   {formData.maxPeople}
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//         <div className="p-4">
//           <table className="min-w-full bg-white border border-gray-300">
//             <thead>
//               <tr className="bg-Bordgrey">
//                 <th className="py-2 px-4 border-b text-left">#</th>
//                 <th className="py-2 px-4 border-b text-left">
//                   Pricing Details
//                 </th>
//                 <th className="py-2 px-4 border-b text-left">Type</th>
//                 <th className="py-2 px-4 border-b text-left">Security</th>
//                 <th className="py-2 px-4 border-b text-left">Advance</th>
//                 <th className="py-2 px-4 border-b text-left">Pending</th>
//                 <th className="py-2 px-4 border-b text-left">Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="py-2 px-4 border-b text-left">1</td>
//                 <td className="py-2 px-4 border-b text-left">
//                   {formData.occasion} Event
//                 </td>
//                 <td className="py-2 px-4 border-b text-left">
//                   {formData.occasion}
//                 </td>
//                 <td className="py-2 px-4 border-b text-left">
//                   ₹ {formData.securityAmount}
//                 </td>
//                 <td className="py-2 px-4 border-b text-left">
//                   ₹ {formData.advance}
//                 </td>
//                 <td className="py-2 px-4 border-b text-left">
//                   ₹ {formData.balancePayment}
//                 </td>
//                 <td className="py-2 px-4 border-b text-left">
//                   ₹{' '}
//                   {Number(formData.balancePayment) +
//                     Number(formData.advance) +
//                     Number(formData.securityAmount)}
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//         <div className="p-4 flex flex-col justify-end items-end">
//           <h2 className="text-2xl font-semibold">
//             Invoice Total: ₹{' '}
//             {Number(formData.balancePayment) +
//               Number(formData.advance) +
//               Number(formData.securityAmount)}
//           </h2>
//           <p>Paid via {formData.advanceMode}</p>
//         </div>
//         {formData.showAdvanceDetails === 'yes' && (
//           <div className="p-4">
//             <table className="min-w-full bg-white border border-gray-300">
//               <thead>
//                 <tr className="bg-Bordgrey">
//                   <th className="py-2 px-4 border-b text-left">#</th>
//                   <th className="py-2 px-4 border-b text-left">Breakup</th>
//                   <th className="py-2 px-4 border-b text-left">Farm Tref</th>
//                   <th className="py-2 px-4 border-b text-left">
//                     Other Service
//                   </th>
//                   <th className="py-2 px-4 border-b text-left">Urban Venue</th>
//                   <th className="py-2 px-4 border-b text-left">Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="py-2 px-4 border-b text-left">1</td>
//                   <td className="py-2 px-4 border-b text-left">
//                     Advance Breakup
//                   </td>
//                   <td className="py-2 px-4 border-b text-left">
//                     ₹ {formData.farmTref}
//                   </td>
//                   <td className="py-2 px-4 border-b text-left">
//                     ₹ {formData.otherServices}
//                   </td>
//                   <td className="py-2 px-4 border-b text-left">
//                     ₹ {formData.urbanvenuecommission}
//                   </td>
//                   <td className="py-2 px-4 border-b text-left">
//                     ₹{' '}
//                     {Number(formData.farmTref) +
//                       Number(formData.otherServices) +
//                       Number(formData.urbanvenuecommission)}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         )}

//         <div>
//           {/* <div className="  flex items-center justify-between bg-white border-t border-gray-300">
//             <div className="flex-1 flex items-center p-8">
//               <img
//                 src={invoice}
//                 alt="invoice"
//                 className="w-[100px] h-[100px] object-cover rounded-lg"
//               />
//               <div className="ml-4">
//                 <h4 className="font-semibold">{formData.occasion}</h4>{' '}

//                 <p className="text-sm text-gray-500">
//                   {new Date(formData.checkInDate).toLocaleDateString()}{' '}
//                   {new Date(formData.checkOutDate).toLocaleTimeString()}.
//                   Duration{' '}

//                 </p>
//                 <p className="text-sm text-gray-500">{formData.guestName}</p>{' '}

//                 <p className="text-sm text-gray-500">1 x Ticket</p>{' '}

//                 <p className="font-semibold">
//                   Total : ₹{' '}
//                   {Number(formData.balancePayment) +
//                     Number(formData.advance) +
//                     Number(formData.securityAmount)}
//                 </p>{' '}

//               </div>
//             </div>
//             <div className="flex-1 p-4 bg-Bordgrey flex flex-col items-start">
//               <p className="text-2xl font-semibold my-2">Visit our site</p>
//               <img
//                 src={qr}
//                 alt="QR Code"
//                 className="w-[80px] h-[80px] object-cover"
//               />
//               <p className="text-xs text-gray-500 mt-4">
//                 Powered by Urban Venue
//               </p>
//             </div>
//           </div> */}
//           <div className="relative h-[14vh] my-2 flex">
//             <div className="w-1/3 relative bg-black flex  items-center justify-center z-0">
//               <div className="absolute bg-[#ce2a33]  border border-white p-2 top-[-10%] rounded-3xl ">
//                 <LocalPhoneIcon className=" text-white" />
//               </div>
//               <a href="tel:+919871371364" className="text-white ">
//                 +91 9871371364
//               </a>
//             </div>
//             <div className="w-1/3 bg-[#ce2a33] relative flex items-center justify-center z-0">
//               <div className="absolute bg-[#ce2a33]  border border-white p-2 top-[-10%] rounded-3xl ">
//                 <EmailIcon className="text-white" />
//               </div>
//               <a href="mailto:TheUrbanVenue@gmail.com" className="text-white ">
//                 TheUrbanVenue@gmail.com
//               </a>
//             </div>
//             <div className="w-1/3 relative bg-black flex items-center justify-center z-0">
//               <div className="absolute bg-[#ce2a33]  border border-white p-2 top-[-10%] rounded-3xl ">
//                 <LanguageIcon className="text-white" />
//               </div>
//               <a
//                 href="https://www.urbanvenue.in"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-white underline-none"
//               >
//                 www.urbanvenue.in
//               </a>
//             </div>
//           </div>
//         </div>
//         <div className="relative h-[7vh] flex flex-wrap">
//           <div className="w-1/5 bg-black flex items-center justify-center z-0">
//             <span className="text-white">
//             <InstagramIcon/>
//             @theurbanvenue
//             </span>
//           </div>
//           <div className="w-1/5 bg-[#ce2a33] flex items-center justify-center z-0">
//             <span className="text-white">
//               <FacebookIcon/>
//             @theurbanvenue
//                </span>
//           </div>
//           <div className="w-1/5 bg-black flex items-center justify-center z-0">
//             <span className="text-white">
//             <YouTubeIcon/>
//             @theurbanvenue
//             </span>
//           </div>
//           <div className="w-1/5 bg-[#ce2a33] flex items-center justify-center z-0">
//             <span className="text-white">
//             <LinkedInIcon />
//             @theurbanvenue
//             </span>
//           </div>
//           <div className="w-1/5 bg-black flex items-center justify-center z-0">
//             <span className="text-white">
//             <PinterestIcon/>
//             @theurbanvenue
//             </span>
//           </div>
//         </div>
//       </div>
//       <div
//         onClick={() => Home()}
//         className=" cursor-pointer bg-Primary my-10 ml-2 p-2 flex justify-center items-center rounded "
//       >
//         {/* <button  className="button "> */}
//         <HomeIcon className="text-white" />
//         {/* </button> */}
//       </div>
//     </div>
//   )
// }
const Invoice = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const formData = location.state
  const { toPDF, targetRef } = usePDF({ filename: `${formData.guestName}.pdf` })
  const Home = () => {
    navigate(DASHBOARD_ROUTE)
  }
  const [imageExists, setImageExists] = useState(false);

  useEffect(() => {
    // Construct the image URL
    const imageUrl = `${import.meta.env.VITE_BACKEND_URL}${formData.photo}`;

    // Only check if formData.photo is defined
    if (formData.photo) {
      // Make a request to see if the image exists
      fetch(imageUrl, { method: "HEAD" })
        .then((response) => {
          if (response.ok) {
            setImageExists(true); // Image exists
          } else {
            setImageExists(false); // Image does not exist
          }
        })
        .catch((error) => {
          console.error("Error checking image:", error);
          setImageExists(false); // Handle error, assume image doesn't exist
        });
    }
  }, [formData.photo]);
  return (
    <div className="flex flex-col items-center bg-red-50 py-8">
      {/* Header with Logo */}
      <div className="flex">
        <button
          onClick={() => toPDF()}
          className=" mx-1 button text-white flex justify-center items-center "
        >
          <CloudDownloadIcon className="mr-1" />
          Download
        </button>
        <button
          onClick={() => Home()}
          className=" mx-1 button text-white flex  "
        >
          <HomeIcon className="mr-1" />
          Home
        </button>
      </div>
      <br />

      <div
        ref={targetRef}
        options={{
          orientation: 'portrait', // or 'landscape'
          unit: 'in',
          format: [8.5, 14], // Adjust the size of the PDF, try 'A4' or use custom sizes
        }}
        className="w-full max-w-4xl bg-white border border-x-4 border-red-600 shadow-lg "
      >
        <div className="h-[2vh] flex">
          <div className="flex-1 bg-black"></div>
          <div className="flex-1 bg-red-500"></div>
          <div className="flex-1 bg-black"></div>
        </div>
        <div className="p-8">
          <div className="flex flex-col items-center">
            <img
              src={invoLogo} // Replace this with your logo
              alt="Logo"
              className="mb-4  "
            />
            <h1 className=" w-[75%] text-l text-center  text-gray-700 ">
              Registration successful! We're excited to have you. Details are
              below. Contact us with any questions. Thank you!
            </h1>
          </div>

          {/* Form Sections */}
          <form className="space-y-6 mt-8">
            <h4 className="text-l font-bold ">Invoice Details</h4>
            {/* Invoice Details */}
            <div className="w-full grid grid-cols-2  gap-6">
              <div className="flex flex-col gap-2">
                <label className="block text-gray-700 flex-shrink-0 mb-1 ">
                  Invoice ID
                </label>
                <input
                  type="text"
                  value={formData.bookingId}
                  className="border border-gray-300 w-full p-2 rounded"
                  // defaultValue="INV12345"
                  readOnly
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block text-gray-700 flex-shrink-0 mb-1">
                  Guest Name
                </label>
                <input
                  value={formData.guestName}
                  type="text"
                  className="border border-gray-300 w-full p-2 rounded"
                  // defaultValue="John Doe"
                  readOnly
                />
              </div>
            </div>

            {/* Booking Partner */}
            <h4 className="text-l font-bold ">Booking Partner</h4>
            <div className="w-full grid grid-cols-2  gap-6">
              <div>
                <label className="block text-gray-700 mb-2">
                  Booking Partner Name
                </label>
                <input
                  type="text"
                  value={formData.bookingPartnerName}
                  className="border border-gray-300 w-full p-2 rounded"
                  // defaultValue="Urban Partner"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Booking Partner Phone No
                </label>
                <input
                  type="text"
                  value={formData.bookingPartnerPhoneNumber}
                  className="border border-gray-300 w-full p-2 rounded"
                  // defaultValue="+91-9987656876"
                  readOnly
                />
              </div>
            </div>

            {/* Booking Address */}
            <div>
              <label className="block text-gray-700 mb-2 ">
                Street Address
              </label>
              <input
                type="text"
                value={formData.addressLine1}
                className="border border-gray-300 w-full p-2 rounded"
                // defaultValue="123, Street Name"
                readOnly
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Street Address Line 2
              </label>
              <input
                type="text"
                value={formData.addressLine2}
                className="border border-gray-300 w-full p-2 rounded"
                // defaultValue="Apt 123"
                readOnly
              />
            </div>

            <div className="w-full grid grid-cols-2  gap-6">
              <div>
                <label className="block text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  value={formData.citySuburb}
                  className="border border-gray-300 w-full p-2 rounded"
                  // defaultValue="City Name"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  State / Province
                </label>
                <input
                  type="text"
                  value={formData.state}
                  className="border border-gray-300 w-full p-2 rounded"
                  // defaultValue="State Name"
                  readOnly
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2 ">
                Postal / Zip Code
              </label>
              <input
                type="text"
                value={formData.zipCode}
                className="border border-gray-300 w-full p-2 rounded"
                // defaultValue="110001"
                readOnly
              />
            </div>
            {/* Phone Number & Email */}
            <div className="w-full grid grid-cols-2  gap-6">
              <div>
                <label className="block text-gray-700 mb-2 ">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={formData.phoneNumber}
                  className="border border-gray-300 w-full p-2 rounded"
                  // defaultValue="(000) 000-0000"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 ">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  className="border border-gray-300 w-full p-2 rounded"
                  // defaultValue="example@example.com"
                  readOnly
                />
              </div>
            </div>

            {/* CheckIn Details */}
            <div className="w-full grid grid-cols-2  gap-6">
              <div>
                <label className="block text-gray-700 mb-2 ">
                  CheckIn - Date and Time
                </label>
                <input
                  type="date"
                  value={
                    new Date(formData.checkInDate).toISOString().split('T')[0]
                  }
                  className="border border-gray-300 w-full p-2 rounded"
                  // defaultValue="10/01/2024, 10:00 AM"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 ">
                  CheckIn Time
                </label>
                <input
                  type="time"
                  value={formData.checkInTime}
                  className="border border-gray-300 w-full p-2 rounded"
                  // defaultValue="10/01/2024, 10:00 AM"
                  readOnly
                />
              </div>
            </div>
            {/* CheckOut Details */}
            <div className="w-full grid grid-cols-2  gap-6">
              <div>
                <label className="block text-gray-700 mb-2 ">
                  Checkout - Date and Time
                </label>
                <input
                  type="date"
                  value={
                    new Date(formData.checkOutDate).toISOString().split('T')[0]
                  }
                  className="border border-gray-300 w-full p-2 rounded"
                  // defaultValue="10/01/2024, 10:00 AM"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 ">
                  Checkout - Date and Time
                </label>
                <input
                  type="time"
                  value={formData.checkOutTime}
                  className="border border-gray-300 w-full p-2 rounded"
                  // defaultValue="10/01/2024, 10:00 AM"
                  readOnly
                />
              </div>
            </div>

            {/* Booking Details */}
            <div className="w-full grid grid-cols-2  gap-6">
              <div>
                <label className="block text-gray-700 mb-2 ">
                  Number of Adults
                </label>
                <input
                  type="number"
                  value={formData.numberOfAdults}
                  className="border border-gray-300 w-full p-2 rounded"
                  // defaultValue={2}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 ">
                  Number of Kids
                </label>
                <input
                  type="number"
                  value={formData.numberOfKids}
                  className="border border-gray-300 w-full p-2 rounded"
                  // defaultValue={1}
                  readOnly
                />
              </div>
            </div>
            <div className="w-full grid grid-cols-2  gap-6">
              <div>
                <label className="block text-gray-700 mb-2 ">
                  Property Owner Number
                </label>
                <input
                  type="text"
                  value={formData.hostOwnerName}
                  className="border border-gray-300 w-full p-2 rounded"
                  // defaultValue="980000000"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2 ">
                    Property Owner Number
                  </label>
                  <input
                    type="text"
                    value={formData.hostNumber}
                    className="border border-gray-300 w-full p-2 rounded"
                    // defaultValue="Akshat"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="w-full grid grid-cols-2  gap-6">
              <div>
                <label className="block text-gray-700 mb-2 ">
                  Total Booking
                </label>
                <input
                  type="text"
                  value={formData.totalBooking}
                  className="border border-gray-300 w-full p-2 rounded"
                  // defaultValue="1,00,000"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 ">Farm Tref</label>
                <input
                  type="text"
                  value={formData.farmTref}
                  className="border border-gray-300 w-full p-2 rounded"
                  // defaultValue="10,000"
                  readOnly
                />
              </div>
            </div>

            <div className="w-full grid grid-cols-2  gap-6">
              <div>
                <label className="block text-gray-700 mb-2 ">Advance</label>
                <input
                  type="text"
                  value={formData.advance}
                  className="border border-gray-300 w-full p-2 rounded"
                  // defaultValue="50,000"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Advance Collected By
                </label>
                <input
                  type="text"
                  value={formData.advanceCollectedBy}
                  className="border border-gray-300 w-full p-2 rounded"
                  // defaultValue="50,000"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Balance Payment
                </label>
                <input
                  type="text"
                  value={formData.balancePayment}
                  className="border border-gray-300 w-full p-2 rounded"
                  // defaultValue="50,000"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Security</label>
                <input
                  type="text"
                  value={formData.securityAmount}
                  className="border border-gray-300 w-full p-2 rounded"
                  // defaultValue="organiser"
                  readOnly
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                Advance Payment Mode
              </label>
              <div className="flex">
                <input
                  className="mr-2"
                  defaultChecked
                  type="radio"
                  name="age"
                />
                <p>{formData.advanceMode}</p>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Event Add-Ons</label>
              <textarea
                value={formData.eventAddOns}
                className="border border-gray-300 w-full p-2 rounded h-24"
                // defaultValue="Terms and Conditions will apply."
                readOnly
              />
            </div>
            {/* Terms & Conditions */}
            <div>
              <label className="block text-gray-700 mb-2">
                Terms & Conditions
              </label>
              <textarea
                value={formData.termsConditions}
                className="border border-gray-300 w-full p-2 rounded h-24"
                // defaultValue="Terms and Conditions will apply."
                readOnly
              />
            </div>
            {imageExists && (
              <div className="">
                Refrence Doc : 
                <img className="w-full h-[50vh] object-contain" src={`${import.meta.env.VITE_BACKEND_URL}${formData.photo}`} alt="Passed Image" />
              </div>
            )}
          </form>

          {/* Footer with Contact Info */}
          <div className="w-full flex justify-between items-center ">
            <div className="flex flex-col justify-between items-center">
              <p className="font-semibold">Scan to visit our Site</p>
              <img
                src={Qr} // Replace this with your logo
                alt="Logo"
                // className="border border-emerald-100 "
              />
              <a
                className="font-semibold"
                target="_blank"
                href="https://www.urbanvenue.in"
              >
                www.urbanvenue.in
              </a>
            </div>
            <div className="flex flex-col justify-end items-end ">
              <div>
                <div className=" flex items-center justify-center border border-white p-1 top-[-10%] rounded-3xl ">
                  <p className="text-gray-700">+91-9987656876 </p>
                  <div className="bg-red-600 rounded-2xl p-1 ml-2 ">
                    <LocalPhoneIcon className="text-white  " />
                  </div>
                </div>
              </div>
              <div>
                <div className=" flex items-center justify-center border border-white p-1 top-[-10%] rounded-3xl ">
                  <p className="text-gray-700">urban@gmail.com </p>
                  <div className="bg-red-600 rounded-2xl p-1 ml-2">
                    <EmailIcon className="text-white" />
                  </div>
                </div>
              </div>
              <div>
                <div className=" flex items-center justify-center border border-white p-1 top-[-10%] rounded-3xl ">
                  <p className="text-gray-700">@theurbanvenue</p>
                  <div className="bg-red-600 rounded-2xl p-1 ml-2">
                    <InstagramIcon className="text-white" />
                  </div>
                </div>
              </div>
              <div>
                <div className=" flex items-center justify-center border border-white p-1 top-[-10%] rounded-3xl ">
                  <p className="text-gray-700">@theurbanvenue</p>
                  <div className="bg-red-600 rounded-2xl p-1 ml-2 ">
                    <FacebookIcon className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[2vh] flex">
          <div className="flex-1 bg-black"></div>
          <div className="flex-1 bg-red-500"></div>
          <div className="flex-1 bg-black"></div>
        </div>
      </div>
    </div>
  )
}

export default Invoice

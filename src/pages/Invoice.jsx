import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import generatePDF, { usePDF } from 'react-to-pdf'
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
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Invoice = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const formData = location.state
  const { toPDF, targetRef } = usePDF({ filename: `${formData.guestName}.pdf` })
  // const { toPDF: generateReferencePDF, targetRefpic } = usePDF({
  //   filename: `${formData.guestName}refrencedoc.pdf`,
  // })

  const Home = () => {
    navigate(DASHBOARD_ROUTE)
  }
  const [imageExists, setImageExists] = useState(false)
  const targetRefpic = useRef()
  const generatePDFx = () => {
    const input = document.getElementById('pdf-content');

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size PDF
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add more pages if content overflows
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Add clickable link for www.urbanvenue.in
      // Modify these coordinates based on the actual location in your PDF
      pdf.textWithLink('www.urbanvenue.in', 12, 272, { url: 'https://www.urbanvenue.in' });
      pdf.textWithLink('Click to see location on Google Map', 12, 215, { url: `${formData.maplink}` });

      pdf.save(`${formData.guestName}.pdf`);
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0)
    // Construct the image URL
    const imageUrl = `${import.meta.env.VITE_BACKEND_URL}${formData.photo}`

    // Only check if formData.photo is defined
    if (formData.photo) {
      // Make a request to see if the image exists
      fetch(imageUrl, { method: 'HEAD' })
        .then((response) => {
          if (response.ok) {
            setImageExists(true) // Image exists
          } else {
            setImageExists(false) // Image does not exist
          }
        })
        .catch((error) => {
          console.error('Error checking image:', error)
          setImageExists(false) // Handle error, assume image doesn't exist
        })
    }
  }, [formData.photo])
  return (
    <div className="flex flex-col items-center bg-red-50 py-8">
      {/* Header with Logo */}
      <div className="flex">
        {/* <button
          onClick={() => toPDF()}
          className=" mx-1 button text-white flex justify-center items-center "
        >
          <CloudDownloadIcon className="mr-1" />
          Download
        </button> */}
        <button
          onClick={() => generatePDF(targetRefpic, { filename: 'picpage.pdf' })} // Use targetRefpic, not targetRefPic
          className="mx-1 button text-white flex justify-center items-center"
        >
          <CloudDownloadIcon className="mr-1" />
          Download Reference Doc
        </button>

        <button
          onClick={() => Home()}
          className=" mx-1 button text-white flex  "
        >
          <HomeIcon className="mr-1" />
          Home
        </button>
        {/* <button onClick={generatePDFx}>Generate PDF</button> */}
        <button
          onClick={generatePDFx}
          className=" mx-1 button text-white flex justify-center items-center "
        >
          <CloudDownloadIcon className="mr-1" />
          Download
        </button>
      </div>
      <br />

      <div
      id="pdf-content"
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
          <div className="flex flex-col items-center my-2">
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
          <form className="space-y-6 mt-16">
            <h4 className="text-l font-bold ">Voucher Details</h4>
            {/* Invoice Details */}
            <div className="w-full grid grid-cols-2  gap-6">
              <div className="flex flex-col gap-2">
                <label className="block text-gray-700 flex-shrink-0 mb-1 ">
                  Voucher ID
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
                  CheckIn - Date
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
                  Checkout - Date 
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
                  Checkout Time
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
                  Property Owner Name
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
                Total booking amount
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
                <label className="block text-gray-700 mb-2 ">Farm Tariff</label>
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
                <label className="block text-gray-700 mb-2 ">Advance payment </label>
                <input
                  type="text"
                  value={formData.advance}
                  className="border border-gray-300 w-full p-2 rounded"
                  // defaultValue="50,000"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 ">Advance Collected by </label>
                <input
                  type="text"
                  value={formData.advanceCollectedBy}
                  className="border border-gray-300 w-full p-2 rounded"
                  // defaultValue="50,000"
                  readOnly
                />
              </div>

              {/* <div>
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
              </div> */}
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
                  // defaultValue="Urban venue"
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
                {formData.advanceMode === 'Cash' && (
                  <>
                    <input
                      className="mx-2"
                      type="radio"
                      name="age"
                      disabled
                    />
                    <p>Online</p>
                  </>
                )}
                {formData.advanceMode === 'Online' && (
                  <>
                    <input
                      className="mx-2"
                      type="radio"
                      name="age"
                      disabled
                    />
                    <p>Cash</p>
                  </>
                )}
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
            {/* <a href="https://maps.app.goo.gl/piZkuKoz9QPqR1Ma9" target="_blank" rel="noopener noreferrer">
       
        
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d234749.63073171166!2d79.6265894!3d23.1715512!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3981af3da20f1115%3A0xeb26adc4b56a3a18!2sDental%20square!5e0!3m2!1sen!2sin!4v1729079628551!5m2!1sen!2sin" width="100%" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </a> */}
          </form>
         

          {/* Footer with Contact Info */}
          <div className="w-full flex justify-between items-center mt-24">
            <div className="flex flex-col justify-between items-center">
              <p className="font-semibold">Scan to visit our Site</p>
              <img
                src={Qr} // Replace this with your logo
                alt="Logo"
                style={{ width: '200px', height: '200px' }}
                // className="border border-emerald-100 "
              />
              <a
                className="font-semibold"
                target="_blank"
                href="https://www.urbanvenue.in"
              >
                {/* www.urbanvenue.in */}
              </a>
            </div>
            <div className="flex flex-col justify-end items-end ">
              <div>
                <div className=" flex items-center justify-center border border-white p-1 top-[-10%] rounded-3xl ">
                  <p className="text-gray-700">+91-9871371364 </p>
                  <div className="bg-red-600 rounded-2xl p-1 ml-2 ">
                    <LocalPhoneIcon className="text-white  " />
                  </div>
                </div>
              </div>
              <div>
                <div className=" flex items-center justify-center border border-white p-1 top-[-10%] rounded-3xl ">
                  <p className="text-gray-700">info@urbanvenue.in </p>
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
          {/* {imageExists && (
              <div className="my-8">
                Refrence Doc :
                <img
                  className="w-full h-[50vh] object-contain"
                  src={`${import.meta.env.VITE_BACKEND_URL}${formData.photo}`}
                  alt="Passed Image"
                />
              </div>
            )} */}
        </div>
        <div className="h-[2vh] flex">
          <div className="flex-1 bg-black"></div>
          <div className="flex-1 bg-red-500"></div>
          <div className="flex-1 bg-black"></div>
        </div>
      </div>

      {/* photo section */}

      <div
        ref={targetRefpic}
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
        

          {/* Form Sections */}
          <form className="space-y-6 mt-16"></form>

          {/* Footer with Contact Info */}
          
          {imageExists && (
            <div className="my-8">
              
              <img
                className="w-full h-[50vh] object-contain"
                src={`${import.meta.env.VITE_BACKEND_URL}${formData.photo}`}
                alt="Passed Image"
              />
            </div>
          )}
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

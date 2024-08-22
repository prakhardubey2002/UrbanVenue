import React from 'react'
import { useLocation } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import { usePDF } from 'react-to-pdf'
const Invoice = () => {
  const location = useLocation()
  const formData = location.state
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' })
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-start">
      <div
        ref={targetRef}
        className="flex flex-col w-[70%] border border-black "
      >
        <div className="px-4 bg-Primary h-[14vh] flex justify-between items-center ">
          <img src={Logo} alt="" />
          <button onClick={() => toPDF()} className="text-white">
            Dwonload
          </button>
        </div>
        <div className="m-4">
          <h2 className="font-semibold text-2xl">Invoice</h2>
          <div className=" flex flex-col items-start ">
            <div className=" w-[80%] flex justify-between">
              <p>Invoice to Pooja</p>
              <p>Invoice ID: YCCURW-00000</p>
            </div>
            <div className=" w-[80%] flex justify-between">
              <p>140,Mehrauli</p>
              <p>Order Date : 02/07/2024</p>
            </div>
            <div className=" w-[80%] flex justify-between">
              <p>Invoice to Pooja</p>
              <p>Rose Gardern</p>
            </div>
            <div className=" w-[80%] flex justify-between">
              <p>110034,India</p>
              <p>C-879, Chhatarpur, Delhi,New Delhi - 110074</p>
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
                <td className="py-2 px-4 border-b text-right">Pooja</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-left">Phone Number</td>
                <td className="py-2 px-4 border-b text-right">9910765616</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-left">Check-In</td>
                <td className="py-2 px-4 border-b text-right">
                  02-July-2024, 07:00PM
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-left">Check-Out</td>
                <td className="py-2 px-4 border-b text-right">
                  03-July-2024, 12:00AM
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-left">
                  Maximum Number Of People
                </td>
                <td className="py-2 px-4 border-b text-right">150</td>
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
                  Pooja Wedding Event
                </td>
                <td className="py-2 px-4 border-b text-left">Wedding</td>
                <td className="py-2 px-4 border-b text-left">₹ 5,000</td>
                <td className="py-2 px-4 border-b text-left">₹ 25,000</td>
                <td className="py-2 px-4 border-b text-left">₹ 25,000</td>
                <td className="py-2 px-4 border-b text-left">₹ 55,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='px-4 flex flex-col justify-end items-end'>   
          <h2 className='text-2xl font-semibold' >Invoice Total" ₹ 55,000 </h2>
          <p>Paid via Online</p>
        </div>
      </div>
    </div>
  )
}

export default Invoice

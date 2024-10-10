import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { ADMIN_CALCULATE, INVOICE_ROUTE } from '../routes/Routes'
import { useNavigate } from 'react-router-dom'
const AdminTable = ({ data, setData, occasions }) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState({})

  const convertTo12HourFormat = (time24) => {
    // Split the input time into hours and minutes
    const [hours, minutes] = time24.split(':').map(Number)

    // Determine AM/PM and adjust hours for 12-hour format
    const period = hours >= 12 ? 'PM' : 'AM'
    const hours12 = hours % 12 || 12 // Convert 0 hours to 12 for 12 AM

    // Format hours and minutes with leading zero if necessary
    const formattedTime = `${hours12}:${minutes
      .toString()
      .padStart(2, '0')} ${period}`

    return formattedTime
  }
  const handleFilterNavigate=(guestName)=>{
    navigate(ADMIN_CALCULATE, { state: guestName })

  }
  const handleClickOpen = (row) => {
    setSelectedRow(row)
    console.log(row)
    setOpen(true)
  }
  const invoicenavigate = (formData) => {
    navigate(INVOICE_ROUTE, { state: formData })
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedRow(null)
  }
  useEffect(() => {
    if (selectedRow?.totalBooking && selectedRow?.advance) {
      setSelectedRow((prev) => ({
        ...prev,
        balancePayment: (prev.totalBooking || 0) - (prev.advance || 0),
      }))
    }
  }, [selectedRow?.totalBooking, selectedRow?.advance])
  useEffect(() => {
    setSelectedRow((prev) => {
      const farmTref = Number(prev?.farmTref) || 0 // Ensure farmTref is a number
      const otherServices = Number(prev?.otherServices) || 0 // Ensure otherServices is a number
      const totalBooking = farmTref + otherServices // Calculate totalBooking

      return {
        ...prev,
        totalBooking, // Update totalBooking
      }
    })
  }, [selectedRow?.farmTref, selectedRow?.otherServices])
  

  const handleFilterClick = (guestName) => {
    const filteredData = data.filter((row) =>
      row.guestName.toLowerCase().includes(guestName.toLowerCase())
    )
    setData(filteredData)
  }

  return (
    <div className="overflow-x-auto max-h-[44vh] my-4 text-sm">
      <table className="min-w-full bg-white border-b border-b-gray-300">
        <thead>
          <tr>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">
              Guest Name
            </th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">
              Owner Name
            </th>

            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">
              Property Name
            </th>

            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">
              Category
            </th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">
              Status
            </th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">
              Total
            </th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">
              Commisson
            </th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="border px-4 py-4 whitespace-nowrap">
                {row.guestName}
              </td>
              <td className="border px-4 py-4 whitespace-nowrap">
                {row.hostOwnerName}
              </td>

              <td className="border px-4 py-4 whitespace-nowrap">
                {row.venue}
              </td>

              <td className="border px-4 py-4 whitespace-nowrap">
                {row.occasion}
              </td>
              <td className="border px-4 py-4 whitespace-nowrap">
                <div
                  className={`flex items-center ${
                    row.status === 'Canceled'
                      ? 'text-red-500'
                      : row.status === 'Paid' || row.status === 'Completed'
                      ? 'text-green-500'
                      : row.status === 'Upcoming'
                      ? 'text-purple-500'
                      : 'text-gray-500'
                  }`}
                >
                  <span
                    className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      row.status === 'Canceled'
                        ? 'bg-red-500'
                        : row.status === 'Paid' || row.status === 'Completed'
                        ? 'bg-green-500'
                        : row.status === 'Upcoming'
                        ? 'bg-purple-500'
                        : 'bg-gray-500'
                    }`}
                  />
                  {row.status}
                </div>
              </td>

              <td className="border px-4 py-4 whitespace-nowrap">
                ₹ {row.totalBooking}
              </td>
              <td className="border px-4 py-4 whitespace-nowrap">
                {parseInt(
                  (row?.urbanvenuecommission / 100) * row?.totalBooking
                )}
                % (₹ {row.urbanvenuecommission})
              </td>
              <td className="border px-4 py-4 whitespace-nowrap">
                <p onClick={() => handleFilterNavigate(row.guestName)} className='text-blue-500' >View Details</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminTable

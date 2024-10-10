import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import FilterListIcon from '@mui/icons-material/FilterList'
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material'
import { toast } from 'react-hot-toast'
import { INVOICE_ROUTE } from '../routes/Routes'
import { useNavigate } from 'react-router-dom'
import DownloadIcon from '@mui/icons-material/Download'
const CalculateTable = ({ data, setData, occasions }) => {
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
      const farmTref = Number(prev?.farmTref) || 0; // Ensure farmTref is a number
      const otherServices = Number(prev?.otherServices) || 0; // Ensure otherServices is a number
      const totalBooking = farmTref + otherServices; // Calculate totalBooking
  
      return {
        ...prev,
        totalBooking, // Update totalBooking
      };
    });
  }, [selectedRow?.farmTref, selectedRow?.otherServices]);
  const handleFormSubmit = async () => {
    try {
      console.log(selectedRow)
      // Update API URL (use dynamic ID from selectedRow if needed)
      const apiUrl = `http://localhost:3000/api/invoices/invoices/${selectedRow._id}`

      // Send PUT request to update the invoice
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedRow),
      })

      // Check if the response is ok
      if (!response.ok) {
        throw new Error('Failed to update the invoice')
      }
      if (response.ok) {
        toast.success('Updated Successfully')
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }

      // Parse the response
      const result = await response.json()
      console.log('Form submitted:', result)

      // Handle successful update (e.g., show a success message)
      // For example, you might want to display a notification
    } catch (error) {
      console.error('Error updating the invoice:', error)
      // Handle error (e.g., show an error message)
    }

    // Close the dialog
    handleClose()
  }

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
              ID
            </th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">
              Guest Name
            </th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">
              Owner Name
            </th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">
              Phone Number
            </th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">
              Property Name
            </th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">
              Booking Date
            </th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">
              Check-In
            </th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">
              Check-Out
            </th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">
              Number of Adults
            </th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">
              Number of Kids
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
              Advance
            </th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">
              Pending
            </th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">
              Security
            </th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">
              Advance Mode
            </th>
          
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                {row.bookingId}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                {row.guestName}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                {row.hostOwnerName}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                {row.phoneNumber}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                {row.venue}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                {new Date(row.checkInDate).toLocaleDateString('en-GB')}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                {new Date(row.checkInDate).toLocaleDateString('en-GB')} -{' '}
                {convertTo12HourFormat(row.checkInTime)}{' '}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                {new Date(row.checkOutDate).toLocaleDateString('en-GB')} -{' '}
                {convertTo12HourFormat(row.checkOutTime)}{' '}
              </td>
              <td className="border-b px-4 py-4  whitespace-nowrap">
                {row.numberOfAdults}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                {row.numberOfKids}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                {row.occasion}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
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

              <td className="border-b px-4 py-4 whitespace-nowrap">
                ₹ {row.totalBooking}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                ₹ {row.advance} ({row.advanceCollectedBy})
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                ₹ {row.balancePayment}({row.pendingCollectedBy})
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                ₹ {row.securityAmount}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                {row.advanceMode}
              </td>
             
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default CalculateTable

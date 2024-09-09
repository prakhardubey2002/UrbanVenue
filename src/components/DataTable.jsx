import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import FilterListIcon from '@mui/icons-material/FilterList'
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material'
import { toast } from 'react-hot-toast'
const Table = ({ data, setData }) => {
  const [open, setOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
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

  const handleClose = () => {
    setOpen(false)
    setSelectedRow(null)
  }

  const handleFormSubmit = async () => {
    try {
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
        setTimeout(()=>{

          window.location.reload()
        },1000)
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
    <div className="overflow-x-auto my-4 text-sm">
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
              Maximum People
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
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">
              Action
            </th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">
              Filter
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
                {new Date(row.checkInDate).toLocaleDateString()}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                {new Date(row.checkInDate).toLocaleDateString()} -{' '}
                {convertTo12HourFormat(row.checkInTime)}{' '}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                {new Date(row.checkOutDate).toLocaleDateString()} -{' '}
                {convertTo12HourFormat(row.checkOutTime)}{' '}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                {row.maxPeople}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                {row.occasion}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                <div
                  className={`flex items-center ${
                    row.status === 'Canceled'
                      ? 'text-red-500'
                      : row.status === 'Paid'
                      ? 'text-green-500'
                      : 'text-blue-500'
                  }`}
                >
                  <span
                    className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      row.status === 'Canceled'
                        ? 'bg-red-500'
                        : row.status === 'Paid'
                        ? 'bg-green-500'
                        : 'bg-blue-500'
                    }`}
                  />
                  {row.status}
                </div>
              </td>

              <td className="border-b px-4 py-4 whitespace-nowrap">
                ₹ {row.advance + row.securityAmount + row.balancePayment}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                ₹ {row.advance}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                ₹ {row.balancePayment}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                ₹ {row.securityAmount}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">
                {row.advanceMode}
              </td>
              <td
                className="border-b px-4 py-4 text-blue-500 cursor-pointer whitespace-nowrap"
                onClick={() => handleClickOpen(row)}
              >
                View Detail
              </td>
              <td className="border-b px-4 py-4 text-blue-500 cursor-pointer whitespace-nowrap">
                <FilterListIcon
                  onClick={() => handleFilterClick(row.guestName)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialog Popup */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Details</DialogTitle>
        <DialogContent className="w-min-[80vw] h-min-[50vh] px-5 py-5 ">
          <div className="grid grid-cols-2 gap-4">
            <TextField
              disabled
              label="bookingId"
              fullWidth
              margin="dense"
              value={selectedRow?.bookingId || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  bookingId: e.target.value,
                })
              }
            />
            <TextField
              label="Guest Name"
              fullWidth
              margin="dense"
              value={selectedRow?.guestName || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  guestName: e.target.value,
                })
              }
            />
            <TextField
              label="Phone Number"
              fullWidth
              margin="dense"
              value={selectedRow?.phoneNumber || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  phoneNumber: e.target.value,
                })
              }
            />
            <TextField
              label="Property Name"
              fullWidth
              margin="dense"
              value={selectedRow?.venue || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  venue: e.target.value,
                })
              }
            />
            <TextField
              label="Booking Date"
              fullWidth
              margin="dense"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={
                selectedRow?.checkInDate
                  ? new Date(selectedRow.checkInDate)
                      .toISOString()
                      .substring(0, 10)
                  : ''
              }
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  checkInDate: e.target.value,
                })
              }
            />
            <TextField
              label="Check-In Time"
              fullWidth
              margin="dense"
              type="time"
              InputLabelProps={{ shrink: true }}
              value={selectedRow?.checkInTime || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  checkInTime: e.target.value,
                })
              }
            />

            <TextField
              label="Check-Out Date"
              fullWidth
              margin="dense"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={
                selectedRow?.checkOutDate
                  ? new Date(selectedRow?.checkOutDate)
                      .toISOString()
                      .split('T')[0]
                  : ''
              }
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  checkOutDate: e.target.value,
                })
              }
            />
            <TextField
              label="Check-Out Time"
              fullWidth
              margin="dense"
              type="time"
              InputLabelProps={{ shrink: true }}
              value={selectedRow?.checkOutTime || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  checkOutTime: e.target.value,
                })
              }
            />

            <TextField
              label="Maximum People"
              fullWidth
              margin="dense"
              type="number"
              value={selectedRow?.maxPeople || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  maxPeople: e.target.value,
                })
              }
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Occasion</InputLabel>
              <Select
                label="Occasion"
                value={selectedRow?.occasion || ''}
                onChange={(e) =>
                  setSelectedRow({
                    ...selectedRow,
                    occasion: e.target.value,
                  })
                }
              >
                <MenuItem value="">Select Occasion</MenuItem>
                <MenuItem value="Wedding">Wedding</MenuItem>
                <MenuItem value="Engagement">Engagement</MenuItem>
                <MenuItem value="Office Party">Office Party</MenuItem>
                <MenuItem value="Haldi Ceremony">Haldi Ceremony</MenuItem>
                <MenuItem value="Mehndi Ceremony">Mehndi Ceremony</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedRow?.status || 'Upcoming'}
                onChange={(e) =>
                  setSelectedRow({
                    ...selectedRow,
                    status: e.target.value,
                  })
                }
                label="Status"
              >
                <MenuItem value="Upcoming">Upcoming</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Canceled">Canceled</MenuItem>
              </Select>
            </FormControl>
            {/* <TextField
              disabled
              label="Total"
              type="number"
              fullWidth
              margin="dense"
              // value={selectedRow?.Total || ''}
              value={(
                (parseInt(selectedRow?.advance) || 0) +
                (parseInt(selectedRow?.securityAmount) || 0) +
                (parseInt(selectedRow?.balancePayment) || 0)
              ).toString()}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  Total: e.target.value,
                })
              }
            /> */}
            <TextField
              // disabled
              label="Total"
              type="number"
              fullWidth
              margin="dense"
              value={
                parseFloat(selectedRow?.totalBooking || 0) 
                +parseFloat(selectedRow?.securityAmount || 0)
              }
              // onChange={(e) =>
              //   setSelectedRow({
              //     ...selectedRow,
              //     totalBooking: e.target.value,
              //   })
              // }
              InputProps={{
                readOnly: true, 
              }}
            />
            <TextField
              label="Advance Amount"
              type="number"
              fullWidth
              margin="dense"
              value={selectedRow?.advance || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  advance: e.target.value,
                })
              }
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Advance Collected By</InputLabel>
              <Select
                value={selectedRow?.advanceCollectedBy || 'Not Assigned'}
                onChange={(e) =>
                  setSelectedRow({
                    ...selectedRow,
                    advanceCollectedBy: e.target.value,
                  })
                }
                label="Advance Collected By"
              >
                <MenuItem value="Not Assigned">Not Assigned</MenuItem>
                <MenuItem value="Farm Owner">Farm Owner</MenuItem>
                <MenuItem value="Organiser">Organiser</MenuItem>
              </Select>
            </FormControl>
            <TextField
              disabled
              label="Balance Payment"
              type="number"
              fullWidth
              margin="dense"
              value={
                (selectedRow?.totalBooking || 0) - (selectedRow?.advance || 0)
              }
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  balancePayment: e.target.value,
                })
              }
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Pending Collected By</InputLabel>
              <Select
                value={selectedRow?.pendingCollectedBy || 'Not Assigned'}
                onChange={(e) =>
                  setSelectedRow({
                    ...selectedRow,
                    pendingCollectedBy: e.target.value,
                  })
                }
                label="Pending Collected By"
              >
                <MenuItem value="Not Assigned">Not Assigned</MenuItem>
                <MenuItem value="Farm Owner">Farm Owner</MenuItem>
                <MenuItem value="Organiser">Organiser</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Security"
              type="number"
              fullWidth
              margin="dense"
              value={selectedRow?.securityAmount || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  securityAmount: e.target.value,
                })
              }
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Advance Mode</InputLabel>
              <Select
                value={selectedRow?.advanceMode || ''}
                onChange={(e) =>
                  setSelectedRow({
                    ...selectedRow,
                    advanceMode: e.target.value,
                  })
                }
                label="Advance Mode"
              >
                <MenuItem value="Cash">Cash</MenuItem>
                <MenuItem value="Online">Online</MenuItem>
              </Select>
            </FormControl>
            {/* <TextField
              label="Organiser"
              fullWidth
              margin="dense"
              value={selectedRow?.Organiser || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  Organiser: e.target.value,
                })
              }
            /> */}
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            className=" button2
            "
          >
            Cancel
          </button>
          <button onClick={handleFormSubmit} className="button ">
            Submit
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Table

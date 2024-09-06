import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import FilterListIcon from '@mui/icons-material/FilterList'

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
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedRow(null)
  }

  const handleFormSubmit = () => {
    console.log('Form submitted:', selectedRow)
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
          <div className="grid grid-cols-4 gap-4">
            <TextField
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
              type='number'
              value={selectedRow?.maxPeople || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  maxPeople: e.target.value,
                })
              }
            />
            <TextField
              label="Category"
              fullWidth
              margin="dense"
              value={selectedRow?.occasion|| ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  occasion: e.target.value,
                })
              }
            />
            <TextField
              label="Status"
              fullWidth
              margin="dense"
              value={selectedRow?.status || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  status: e.target.value,
                })
              }
            />
            <TextField
              label="Total"
              fullWidth
              margin="dense"
              // value={selectedRow?.Total || ''}
              value={selectedRow?.advance + selectedRow?.securityAmount + selectedRow?.balancePayment || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  Total: e.target.value,
                })
              }
            />
            <TextField
              label="Advance Amount"
              fullWidth
              margin="dense"
              value={selectedRow?.advance || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  Advance: e.target.value,
                })
              }
            />
            <TextField
              label="Balance Payment"
              fullWidth
              margin="dense"
              value={selectedRow?.balancePayment || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  Pending: e.target.value,
                })
              }
            />
            <TextField
              label="Security"
              fullWidth
              margin="dense"
              value={selectedRow?.securityAmount|| ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  Security: e.target.value,
                })
              }
            />
            <TextField
              label="Advance Mode"
              fullWidth
              margin="dense"
              value={selectedRow?.advanceMode|| ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  advanceMode: e.target.value,
                })
              }
            />
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

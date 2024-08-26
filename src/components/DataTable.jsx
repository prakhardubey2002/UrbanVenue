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
      row.GuestName.toLowerCase().includes(guestName.toLowerCase())
    )
    setData(filteredData)
  }

  return (
    <div className="overflow-x-auto my-4 text-sm">
      <table className="min-w-full bg-white border-b border-b-gray-300">
        <thead>
          <tr>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">ID</th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">Guest Name</th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">Phone Number</th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">Property Name</th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">Booking Date</th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">Check-In</th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">Check-Out</th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">Maximum People</th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">Category</th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">Status</th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">Total</th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">Advance</th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">Pending</th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">Security</th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">Payment Mode</th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">Action</th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">Filter</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="border-b px-4 py-4 whitespace-nowrap">{row.ID}</td>
              <td className="border-b px-4 py-4 whitespace-nowrap">{row.GuestName}</td>
              <td className="border-b px-4 py-4 whitespace-nowrap">{row.PhoneNumber}</td>
              <td className="border-b px-4 py-4 whitespace-nowrap">{row.PropertyName}</td>
              <td className="border-b px-4 py-4 whitespace-nowrap">{row.BookingDate}</td>
              <td className="border-b px-4 py-4 whitespace-nowrap">{row.CheckIn}</td>
              <td className="border-b px-4 py-4 whitespace-nowrap">{row.CheckOut}</td>
              <td className="border-b px-4 py-4 whitespace-nowrap">{row.MaximumPeople}</td>
              <td className="border-b px-4 py-4 whitespace-nowrap">{row.Category}</td>
              <td className={`border-b px-4 py-4 flex items-center ${row.Status === 'Canceled' ? 'text-red-500' : row.Status === 'Paid' ? 'text-green-500' : 'text-blue-500'}`}>
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${row.Status === 'Canceled' ? 'bg-red-500' : row.Status === 'Paid' ? 'bg-green-500' : 'bg-blue-500'}`} />
                {row.Status}
              </td>
              <td className="border-b px-4 py-4 whitespace-nowrap">{row.Total}</td>
              <td className="border-b px-4 py-4 whitespace-nowrap">{row.Advance}</td>
              <td className="border-b px-4 py-4 whitespace-nowrap">{row.Pending}</td>
              <td className="border-b px-4 py-4 whitespace-nowrap">{row.Security}</td>
              <td className="border-b px-4 py-4 whitespace-nowrap">{row.PaymentMode}</td>
              <td className="border-b px-4 py-4 text-blue-500 cursor-pointer whitespace-nowrap" onClick={() => handleClickOpen(row)}>
                View Detail
              </td>
              <td className="border-b px-4 py-4 text-blue-500 cursor-pointer whitespace-nowrap">
                <FilterListIcon onClick={() => handleFilterClick(row.GuestName)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialog Popup */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Details</DialogTitle>
        <DialogContent className="w-min-[50vw] h-min-[50vh] px-5 py-5 ">
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="ID"
              fullWidth
              margin="dense"
              value={selectedRow?.ID || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  ID: e.target.value,
                })
              }
            />
            <TextField
              label="Guest Name"
              fullWidth
              margin="dense"
              value={selectedRow?.GuestName || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  GuestName: e.target.value,
                })
              }
            />
            <TextField
              label="Phone Number"
              fullWidth
              margin="dense"
              value={selectedRow?.PhoneNumber || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  PhoneNumber: e.target.value,
                })
              }
            />
            <TextField
              label="Property Name"
              fullWidth
              margin="dense"
              value={selectedRow?.PropertyName || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  PropertyName: e.target.value,
                })
              }
            />
            <TextField
              label="Booking Date"
              fullWidth
              margin="dense"
              value={selectedRow?.BookingDate || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  BookingDate: e.target.value,
                })
              }
            />
            <TextField
              label="Check-In"
              fullWidth
              margin="dense"
              value={selectedRow?.CheckIn || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  CheckIn: e.target.value,
                })
              }
            />
            <TextField
              label="Check-Out"
              fullWidth
              margin="dense"
              value={selectedRow?.CheckOut || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  CheckOut: e.target.value,
                })
              }
            />
            <TextField
              label="Maximum People"
              fullWidth
              margin="dense"
              value={selectedRow?.MaximumPeople || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  MaximumPeople: e.target.value,
                })
              }
            />
            <TextField
              label="Category"
              fullWidth
              margin="dense"
              value={selectedRow?.Category || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  Category: e.target.value,
                })
              }
            />
            <TextField
              label="Status"
              fullWidth
              margin="dense"
              value={selectedRow?.Status || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  Status: e.target.value,
                })
              }
            />
            <TextField
              label="Total"
              fullWidth
              margin="dense"
              value={selectedRow?.Total || ''}
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
              value={selectedRow?.Advance || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  Advance: e.target.value,
                })
              }
            />
            <TextField
              label="Pending Amount"
              fullWidth
              margin="dense"
              value={selectedRow?.Pending || ''}
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
              value={selectedRow?.Security || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  Security: e.target.value,
                })
              }
            />
            <TextField
              label="Payment Mode"
              fullWidth
              margin="dense"
              value={selectedRow?.PaymentMode || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  PaymentMode: e.target.value,
                })
              }
            />
            <TextField
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
            />
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

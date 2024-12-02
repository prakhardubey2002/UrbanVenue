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
  const [formData, setFormData] = useState(selectedRow || {})
  const [surplus, setSurplus] = useState(0)
  const [deficit, setDeficit] = useState(0)
  useEffect(() => {
    setSelectedRow((prev) => {
      const advanceAmount = Number(prev?.advance) || 0 // Ensure advance is a number
      const commission = Number(prev?.urbanvenuecommission) || 0 // Ensure urbanvenuecommission is a number
      const pendingAmount = Number(prev?.balancePayment) || 0 // Ensure balancePayment is a number

      let calculatedSurplus = 0
      let calculatedDeficit = 0

      if (prev?.advanceCollectedBy === 'Urban venue') {
        if (prev?.pendingCollectedBy === 'Urban venue') {
          calculatedSurplus = advanceAmount + pendingAmount - commission
        } else if (prev?.pendingCollectedBy === 'Property Owner') {
          calculatedSurplus = advanceAmount - commission
        }
      } else if (prev?.advanceCollectedBy === 'Property Owner') {
        if (prev?.pendingCollectedBy === 'Urban venue') {
          calculatedSurplus = pendingAmount - commission
        } else if (prev?.pendingCollectedBy === 'Property Owner') {
          calculatedDeficit = commission
        }
      }

      if (calculatedSurplus < 0) calculatedSurplus = 0
      if (calculatedDeficit < 0) calculatedDeficit = 0

      return {
        ...prev,
        surplus: calculatedSurplus, // Update surplus
        deficit: calculatedDeficit, // Update deficit
      }
    })
  }, [
    selectedRow?.advance,
    selectedRow?.urbanvenuecommission,
    selectedRow?.advanceCollectedBy,
    selectedRow?.pendingCollectedBy,
    selectedRow?.balancePayment,
  ])

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
      const farmTref = Number(prev?.farmTref) || 0 // Ensure farmTref is a number
      const otherServices = Number(prev?.otherServices) || 0 // Ensure otherServices is a number
      const totalBooking = farmTref + otherServices // Calculate totalBooking

      return {
        ...prev,
        totalBooking, // Update totalBooking
      }
    })
  }, [selectedRow?.farmTref, selectedRow?.otherServices])

  const handleFormSubmit = async () => {
    try {
      console.log(selectedRow)
      // Update API URL (use dynamic ID from selectedRow if needed)
      const apiUrl = `http://localhost:9000/api/invoices/invoices/${selectedRow._id}`

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
              Surplus/Deficit
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
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">
              Commisson
            </th>
            <th className="py-4 border-b bg-Bordgrey px-4 whitespace-nowrap">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            return (
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
                {row.fullcloser == 'Pending' && row.surplus != 0 && (
                  <td className="border-b px-4 py-4 whitespace-nowrap bg-green-100 ">
                    {row.fullcloser == 'Pending' &&
                      row.surplus != 0 &&
                      row.surplus}
                  </td>
                )}
                {row.fullcloser == 'Pending' && row.deficit != 0 && (
                  <td className="border-b px-4 py-4 whitespace-nowrap bg-red-100 ">
                    {row.fullcloser == 'Pending' &&
                      row.deficit != 0 &&
                      row.deficit}
                  </td>
                )}
                {row.fullcloser == 'Paid' && (
                  <td className="border-b px-4 py-4 whitespace-nowrap  ">
                    Paid
                  </td>
                )}
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
                    className={`flex items-center ${row.status === 'Canceled'
                      ? 'text-red-500'
                      : row.status === 'Paid' || row.status === 'Completed'
                        ? 'text-green-500'
                        : row.status === 'Upcoming'
                          ? 'text-purple-500'
                          : 'text-gray-500'
                      }`}
                  >
                    <span
                      className={`inline-block w-2 h-2 rounded-full mr-2 ${row.status === 'Canceled'
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
                <td className="border-b px-4 py-4 whitespace-nowrap">
                  {row.urbanvenuecommission}
                </td>
                <td
                  className="border-b px-4 py-4 text-blue-500 cursor-pointer whitespace-nowrap"
                  onClick={() => handleClickOpen(row)}
                >
                  View Detail
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Details</DialogTitle>
        <DialogContent className="w-min-[80vw] h-min-[50vh] px-5 py-5">
          <div className="grid grid-cols-2 gap-4">
            {/* Booking ID (disabled) */}
            <TextField
              disabled
              label="Booking ID"
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
            {/* Guest Name */}
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
            {/* Phone Number */}
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
            {/* Property Name (Venue) */}
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

            {/* Check-In Date */}
            <TextField
              label="Check-In Date"
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
            {/* Check-In Time */}
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
            {/* Check-Out Date */}
            <TextField
              label="Check-Out Date"
              fullWidth
              margin="dense"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={
                selectedRow?.checkOutDate
                  ? new Date(selectedRow.checkOutDate)
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
            {/* Check-Out Time */}
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
            {/* Number of Adults */}
            <TextField
              label="Number of Adults"
              fullWidth
              margin="dense"
              type="number"
              value={selectedRow?.numberOfAdults || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  numberOfAdults: e.target.value,
                })
              }
            />
            {/* Number of Kids */}
            <TextField
              label="Number of Kids"
              fullWidth
              margin="dense"
              type="number"
              value={selectedRow?.numberOfKids || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  numberOfKids: e.target.value,
                })
              }
            />
            {/* Occasion */}
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
                {occasions?.map((occasion) => (
                  <MenuItem key={occasion._id} value={occasion.name}>
                    {occasion.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* Status */}
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
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Canceled">Canceled</MenuItem>
              </Select>
            </FormControl>
            {/* Total Booking */}
            <TextField
              disabled
              label="Total Booking"
              type="number"
              fullWidth
              margin="dense"
              value={parseFloat(selectedRow?.totalBooking || 0)}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  totalBooking: e.target.value,
                })
              }
            />
            {/* Advance Amount */}
            <TextField
              label="Advance Amount"
              type="number"
              fullWidth
              margin="dense"
              value={selectedRow?.advance || ''}
              onChange={(e) => {
                const value =
                  e.target.value === '' ? 0 : parseInt(e.target.value, 10)
                setSelectedRow({
                  ...selectedRow,
                  advance: value,
                })
              }}
            />
            {/* Advance Collected By */}
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
                <MenuItem value="Property Owner">Property Owner</MenuItem>
                <MenuItem value="Urban venue">Urban venue</MenuItem>
              </Select>
            </FormControl>
            {/* Balance Payment (disabled) */}
            <TextField
              disabled
              label="Balance Payment"
              type="number"
              fullWidth
              margin="dense"
              value={selectedRow?.balancePayment || 0} // Safely handle null values
            />
            {/* Pending Collected By */}
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
                <MenuItem value="Property Owner">Property Owner</MenuItem>
                <MenuItem value="Urban venue">Urban venue</MenuItem>
              </Select>
            </FormControl>
            {/* Security Amount */}
            <TextField
              label="Security"
              type="number"
              fullWidth
              margin="dense"
              value={selectedRow?.securityAmount || ''}
              onChange={(e) => {
                const value =
                  e.target.value === '' ? 0 : parseInt(e.target.value, 10)
                setSelectedRow({
                  ...selectedRow,
                  securityAmount: value,
                })
              }}
            />
            {/* Farm Tref */}
            <TextField
              label="Farm Tariff"
              fullWidth
              margin="dense"
              value={selectedRow?.farmTref || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  farmTref: e.target.value,
                })
              }
            />
            {/* otherServices */}
            <TextField
              label="Other Services"
              fullWidth
              margin="dense"
              value={selectedRow?.otherServices || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  otherServices: e.target.value,
                })
              }
            />
            {/* Terms and Conditions */}
            <TextField
              label="Terms and Conditions"
              fullWidth
              margin="dense"
              multiline
              rows={3}
              value={selectedRow?.termsConditions || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  termsConditions: e.target.value,
                })
              }
            />

            {/* Event Add-Ons */}
            <TextField
              label="Event Add-Ons"
              fullWidth
              margin="dense"
              multiline
              rows={3}
              value={selectedRow?.eventAddOns || ''}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  eventAddOns: e.target.value,
                })
              }
            />

            {/* Advance Mode */}
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
            <FormControl className='col-span-2' fullWidth margin="dense">
              <InputLabel>Full Closer</InputLabel>
              <Select

                value={selectedRow?.fullcloser || ''}
                onChange={(e) =>
                  setSelectedRow({
                    ...selectedRow,
                    fullcloser: e.target.value,
                  })
                }
                label="Full Closer"
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
              </Select>
            </FormControl>
            {selectedRow?.fullcloser !== "Paid" && (
              <>
                <TextField
                  label="Surplus"
                  fullWidth
                  margin="dense"
                  value={selectedRow?.surplus || 0}
                  disabled
                />
                <TextField
                  label="Deficit"
                  fullWidth
                  margin="dense"
                  value={selectedRow?.deficit || 0}
                  disabled
                />
              </>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose} className="button2">
            Cancel
          </button>
          <button onClick={() => handleFormSubmit()} className="button">
            Submit
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CalculateTable

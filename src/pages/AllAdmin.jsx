import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import CustomNavTopbar from '../components/CustomNavTopbar'
import { ADMIN_DASHBOARD, CREATE_EXECUTIVE, SUPER_ADMIN_DASHBOARD, CREATE_ADMIN } from '../routes/Routes'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import AuthContext from '../context/context'
const AllAdmin = () => {
  const { usertype } = useContext(AuthContext)
  const [executives, setExecutives] = useState([])
  const [filters, setFilters] = useState({
    name: '',
    username: '',
    status: '',
  })
  const [open, setOpen] = useState(false)
  const [selectedExecutive, setSelectedExecutive] = useState(null)

  const fetchExecutives = async () => {
    try {
      const response = await axios.get('http://localhost:9000/admin')
      setExecutives(response.data)
    } catch (error) {
      console.error('Error fetching admin:', error)
      toast.error('Failed to fetch admin')
    }
  }
  const handleRefresh = () => {
    setFilters({
      name: '',
      username: '',
      status: '',
    })
  }
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleUpdateClick = (executive) => {
    setSelectedExecutive(executive)
    setOpen(true)
  }

  const handleUpdate = async () => {
    try {
      await axios.patch(
        `http://localhost:9000/admin/${selectedExecutive._id}`,
        selectedExecutive
      )
      toast.success('Executive updated successfully!')
      fetchExecutives()
      setOpen(false)
    } catch (error) {
      console.error('Error updating executive:', error)
      toast.error('Failed to update executive')
    }
  }

  const handleDelete = async (executiveId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this Executive?'
    )
    if (confirmDelete) {
      try {
        console.log(`http://localhost:9000/admin/${executiveId}`)
        await axios.delete(`http://localhost:9000/admin/${executiveId}`)
        toast.success('Executive deleted successfully!')
        fetchExecutives() // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting executive:', error)
        toast.error('Failed to delete executive')
      }
    }
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedExecutive(null)
  }

  useEffect(() => {
    fetchExecutives()
  }, [])

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Resigned':
        return { color: 'red', dotColor: 'red' }
      case 'Working':
        return { color: 'green', dotColor: 'green' }
      case 'Terminated':
        return { color: 'purple', dotColor: 'purple' }
      default:
        return { color: 'black', dotColor: 'black' }
    }
  }

  return (
    <div className="bg-[#f6f7f9] w-full h-full flex flex-col justify-center items-center">
      <Toaster position="top-right" reverseOrder={true} />
      <CustomNavTopbar
        path={usertype === 'Admin' ? ADMIN_DASHBOARD : SUPER_ADMIN_DASHBOARD}
        text={'Create Admin'}
        route={CREATE_ADMIN}
      />
      <h2 className="my-8 font-bold text-3xl">All Admins</h2>

      {/* Filter Section */}
      <div className="my-4 bg-white p-4 w-full rounded-md shadow-sm">
        <h3 className="font-semibold">Filters</h3>
        <div className="flex space-x-4">
          <input
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            className="outline-none bg-Bordgrey p-2 border border-Bordgrey rounded-sm"
            type="text"
            placeholder="Filter by Name"
          />
          <input
            name="username"
            value={filters.username}
            onChange={handleFilterChange}
            className="outline-none bg-Bordgrey p-2 border border-Bordgrey rounded-sm"
            type="text"
            placeholder="Filter by Username"
          />
          <FormControl variant="outlined" className="w-1/4">
            <InputLabel>Filter by Status</InputLabel>
            <Select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              label="Filter by Status"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Working">Working</MenuItem>
              <MenuItem value="Resigned">Resigned</MenuItem>
              <MenuItem value="Terminated">Terminated</MenuItem>
            </Select>
          </FormControl>
          <div variant="outlined" onClick={handleRefresh} className=" m-2 button cursor-pointer ">
            Refresh Filters
          </div>
        </div>

      </div>

      {/* Executives Table */}
      <div className="my-8 bg-white p-4 w-full rounded-md shadow-sm">
        <table className="min-w-full bg-white border-b border-b-gray-300">
          <thead>
            <tr>
              <th className="py-4 border border-gray-300 bg-Bordgrey px-4 whitespace-nowrap">
                ID
              </th>
              <th className="py-4 border border-gray-300 bg-Bordgrey px-4 whitespace-nowrap">
                Name
              </th>
              <th className="py-4 border border-gray-300 bg-Bordgrey px-4 whitespace-nowrap">
                User ID
              </th>
              <th className="py-4 border border-gray-300 bg-Bordgrey px-4 whitespace-nowrap">
                Phone Number
              </th>
              <th className="py-4 border border-gray-300 bg-Bordgrey px-4 whitespace-nowrap">
                Joining Date
              </th>
              <th className="py-4 border border-gray-300 bg-Bordgrey px-4 whitespace-nowrap">
                End Date
              </th>
              <th className="py-4 border border-gray-300 bg-Bordgrey px-4 whitespace-nowrap">
                Status
              </th>
              <th className="py-4 border border-gray-300 bg-Bordgrey px-4 whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {executives
              .filter(
                (executive) =>
                  (!filters.name || executive.name.includes(filters.name)) &&
                  (!filters.username ||
                    executive.username.includes(filters.username)) &&
                  (!filters.status || executive.status === filters.status)
              )
              .slice()
              .reverse()
              .map((executive) => {
                const statusStyle = getStatusStyle(executive.status)
                return (
                  <tr key={executive.id}>
                    <td className="border border-gray-300 px-4 py-4  whitespace-nowrap">
                      {executive.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-4 whitespace-nowrap">
                      {executive.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-4 whitespace-nowrap">
                      {executive.username}
                    </td>
                    <td className="border border-gray-300 px-4 py-4 whitespace-nowrap">
                      {executive.phoneNumber}
                    </td>
                    <td className="border border-gray-300 px-4 py-4 whitespace-nowrap">
                      {new Date(executive.joiningDate).toLocaleDateString(
                        'en-US'
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-4 whitespace-nowrap">
                      {executive.endDate != null && new Date(executive.endDate).toLocaleDateString('en-US')}
                    </td>
                    <td className="border border-gray-300 px-4 py-4 whitespace-nowrap">
                      <div
                        className="flex items-center"
                        style={{ color: statusStyle.color }}
                      >
                        <span
                          style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: statusStyle.dotColor,
                            marginRight: '5px',
                          }}
                        />
                        {executive.status}
                      </div>
                    </td>
                    <td className="border px-4 border-gray-300 py-4 whitespace-nowrap">
                      <CreateIcon
                        className="text-blue-500"
                        onClick={() => handleUpdateClick(executive)}
                      />

                      <DeleteIcon
                        className="text-red-600"
                        onClick={() => handleDelete(executive._id)}
                        style={{ marginLeft: '8px' }}
                      />
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>

      {/* Update Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Executive</DialogTitle>
        <DialogContent>
          {selectedExecutive && (
            <>
              <TextField
                margin="dense"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedExecutive.name}
                onChange={(e) =>
                  setSelectedExecutive({
                    ...selectedExecutive,
                    name: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="User ID"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedExecutive.username}
                onChange={(e) =>
                  setSelectedExecutive({
                    ...selectedExecutive,
                    username: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Phone Number"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedExecutive.phoneNumber}
                onChange={(e) =>
                  setSelectedExecutive({
                    ...selectedExecutive,
                    phoneNumber: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Joining Date"
                type="date"
                fullWidth
                variant="outlined"
                value={selectedExecutive?.joiningDate?.split('T')[0]}
                onChange={(e) =>
                  setSelectedExecutive({
                    ...selectedExecutive,
                    joiningDate: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="End Date"
                type="date"
                fullWidth
                variant="outlined"
                value={selectedExecutive?.endDate?.split('T')[0]}
                onChange={(e) =>
                  setSelectedExecutive({
                    ...selectedExecutive,
                    endDate: e.target.value,
                  })

                }
                InputLabelProps={{
                  shrink: true, // Force the label to always stay above the field
                }}
              />
              <FormControl fullWidth variant="outlined" margin="dense">
                <InputLabel>Status</InputLabel>
                <Select
                  value={selectedExecutive.status}
                  onChange={(e) =>
                    setSelectedExecutive({
                      ...selectedExecutive,
                      status: e.target.value,
                    })
                  }
                >
                  <MenuItem value="Working">Working</MenuItem>
                  <MenuItem value="Resigned">Resigned</MenuItem>
                  <MenuItem value="Terminated">Terminated</MenuItem>
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AllAdmin

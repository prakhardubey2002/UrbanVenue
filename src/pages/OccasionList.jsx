import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import CustomNavTopbar from '../components/CustomNavTopbar'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import { ADMIN_DASHBOARD, SUPER_ADMIN_DASHBOARD } from '../routes/Routes'
import AuthContext from '../context/context'
const OccasionList = () => {
  const { usertype } = useContext(AuthContext)
  const [occasions, setOccasions] = useState([])
  const [filters, setFilters] = useState({
    id: '',
    name: '',
  })
  const [open, setOpen] = useState(false)
  const [selectedOccasion, setSelectedOccasion] = useState(null)

  const fetchOccasions = async () => {
    try {
      const response = await axios.get(
        'http://localhost:9000/occasion/occasions'
      )
      setOccasions(response.data)
    } catch (error) {
      console.error('Error fetching occasions:', error)
      toast.error('Failed to fetch occasions')
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleUpdateClick = (occasion) => {
    setSelectedOccasion(occasion)
    setOpen(true)
  }

  const handleUpdate = async () => {
    try {
      console.log(
        `http://localhost:9000/occasion/occasion/${selectedOccasion._id}`
      )
      console.log(selectedOccasion)
      await axios.patch(
        `http://localhost:9000/occasion/occasion/${selectedOccasion._id}`,
        selectedOccasion
      )
      toast.success('Occasion updated successfully!')
      fetchOccasions()
      setOpen(false)
    } catch (error) {
      console.error('Error updating occasion:', error)
      toast.error('Failed to update occasion')
    }
  }

  const handleDelete = async (occasionId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this Occasion?'
    )
    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:9000/occasion/occasions/${occasionId}`
        )
        toast.success('Occasion deleted successfully!')
        fetchOccasions()
      } catch (error) {
        console.error('Error deleting occasion:', error)
        toast.error('Failed to delete occasion')
      }
    }
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedOccasion(null)
  }

  useEffect(() => {
    fetchOccasions()
  }, [])

  return (
    <div className="bg-[#f6f7f9] w-full h-full flex flex-col justify-center items-center">
      <Toaster position="top-right" reverseOrder={true} />
      <CustomNavTopbar path={usertype === 'Admin' ? ADMIN_DASHBOARD : SUPER_ADMIN_DASHBOARD} text={'Create Occasion'} route={'/create-occasion'} />
      <h2 className="my-8 font-bold text-3xl">All Occasions</h2>

      {/* Filter Section */}
      <div className="my-4 bg-white p-4 w-full rounded-md shadow-sm">
        <h3 className="font-semibold">Filters</h3>
        <div className="flex space-x-4">
          <input
            name="id"
            value={filters.id}
            onChange={handleFilterChange}
            className="outline-none bg-Bordgrey p-2 border border-Bordgrey rounded-sm"
            type="text"
            placeholder="Filter by ID"
          />
          <input
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            className="outline-none bg-Bordgrey p-2 border border-Bordgrey rounded-sm"
            type="text"
            placeholder="Filter by Name"
          />
        </div>
      </div>

      {/* Occasions Table */}
      <div className="my-8 bg-white p-4 w-full rounded-md shadow-sm">
        <table className="min-w-full bg-white border border-gray-300 text-center">
          <thead>
            <tr>
              <th className="py-4 border-b bg-gray-100 px-4 whitespace-nowrap text-sm font-medium text-gray-700">
                S.no
              </th>
              <th className="py-4 border-b bg-gray-100 px-4 whitespace-nowrap text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="py-4 border-b bg-gray-100 px-4 whitespace-nowrap text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {occasions
              .filter(
                (occasion) =>
                  (!filters.id || occasion.id.includes(filters.id)) &&
                  (!filters.name || occasion.name.includes(filters.name))
              )
              .slice()
              .reverse()
              .map((occasion, index) => (
                <tr key={occasion.id} className="hover:bg-gray-50">
                  <td className="border-b px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {index + 1}
                  </td>
                  <td className="border-b px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {occasion.name}
                  </td>
                  <td className="border-b px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    <CreateIcon
                      onClick={() => handleUpdateClick(occasion)}
                      className="cursor-pointer text-blue-500 hover:text-blue-700"
                    />
                    {/* <Button
              color="secondary"
              onClick={() => handleDelete(occasion.id)}
              style={{ marginLeft: '8px' }}
              size="small"
            >
              Delete
            </Button> */}
                    <DeleteIcon
                      style={{ marginLeft: '8px' }}
                      className="cursor-pointer text-black-500 hover:text-black-700"
                      onClick={() => handleDelete(occasion.id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Update Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Occasion</DialogTitle>
        <DialogContent>
          {selectedOccasion && (
            <>
              <TextField
                margin="dense"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedOccasion.name}
                onChange={(e) =>
                  setSelectedOccasion({
                    ...selectedOccasion,
                    name: e.target.value,
                  })
                }
              />
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

export default OccasionList

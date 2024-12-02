import React, { useContext, useEffect, useState } from 'react'
import NavTopBar from '../components/NavTopBar'
import SearchIcon from '@mui/icons-material/Search'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import axios from 'axios'
import RefreshIcon from '@mui/icons-material/Refresh'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CustomNavTopbar from '../components/CustomNavTopbar'
import { ADMIN_DASHBOARD, CREATE_FARMS } from '../routes/Routes'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material'
import AuthContext from '../context/context'
import { SUPER_ADMIN_DASHBOARD } from '../routes/Routes'

const AllFarms = () => {
  const { usertype } = useContext(AuthContext);
  const [farms, setFarms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [states, setStates] = useState([])
  const [places, setPlaces] = useState([])
  const [farmNames, setFarmNames] = useState([])
  const [addresses, setAddresses] = useState([])

  const [selectedState, setSelectedState] = useState('')
  const [selectedPlace, setSelectedPlace] = useState('')
  const [selectedFarmName, setSelectedFarmName] = useState('')
  const [selectedAddress, setSelectedAddress] = useState('')

  const [filteredFarms, setFilteredFarms] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentFarm, setCurrentFarm] = useState(null)
  const [updatedFields, setUpdatedFields] = useState({
    place: '',
    address: {
      addressLine1: '',
      addressLine2: '',
      suburb: '',
      zipCode: '',
      country: '',
    },
    name: '',
    phoneNumber: '',
    checkInDate: '',
    checkInTime: '',
    checkOutDate: '',
    checkOutTime: '',
    email: '',
    eventAddOns: '',
    termsConditions: '',
    occasion: '',
    hostOwnerName: '',
    hostNumber: '',
    totalBooking: '',
    advance: '',
    balancePayment: '',
    securityAmount: '',
    status: '',
    advanceCollectedBy: '', // New field
    pendingCollectedBy: '', // New field
    advanceMode: 'cash', // New field, default value
    otherServices: '', // New field
    urbanvenuecommission: '', // New field
  })

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const response = await axios.get(
          'http://localhost:9000/api/calender/all-farms'
        )
        const farmData = response.data

        setFarms(farmData)
        setFilteredFarms(farmData) // Update filtered farms too
        console.log(farmData)
        // Extract unique values for filter options
        setStates([...new Set(farmData.map((farm) => farm.state))])
        setPlaces([...new Set(farmData.map((farm) => farm.place))])
        setFarmNames([...new Set(farmData.map((farm) => farm.name))])
        setAddresses([
          ...new Set(farmData.map((farm) => farm.address.addressLine1)),
        ])
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchFarms()
  }, [])

  const handleFind = () => {
    const filtered = farms.filter((farm) => {
      return (
        (selectedState ? farm.state === selectedState : true) &&
        (selectedPlace ? farm.place === selectedPlace : true) &&
        (selectedFarmName ? farm.name === selectedFarmName : true) &&
        (selectedAddress
          ? farm.address.addressLine1.includes(selectedAddress)
          : true)
      )
    })
    setFilteredFarms(filtered)
  }

  const resetFilters = () => {
    setSelectedState('')
    setSelectedPlace('')
    setSelectedFarmName('')
    setSelectedAddress('')
    setFilteredFarms(farms) // Reset to show all farms
  }

  const handleUpdateFarm = (farm) => {
    setCurrentFarm(farm)
    setUpdatedFields({
      place: farm.place,
      address: {
        addressLine1: farm.address.addressLine1,
        addressLine2: farm.address.addressLine2,
        state: farm.address.state,
        suburb: farm.address.suburb,
        zipCode: farm.address.zipCode,
        country: farm.address.country,
      },
      name: farm.name,
      phoneNumber: farm.phoneNumber,
      checkInDate: farm.checkInDate,
      checkInTime: farm.checkInTime,
      checkOutDate: farm.checkOutDate,
      checkOutTime: farm.checkOutTime,
      // Removed maxPeople as it is no longer part of updatedFields
      occasion: farm.occasion,
      hostOwnerName: farm.hostOwnerName,
      hostNumber: farm.hostNumber,
      totalBooking: farm.totalBooking,
      advance: farm.advance,
      balancePayment: farm.balancePayment,
      securityAmount: farm.securityAmount,
      status: farm.status,
      numberOfAdults: farm.numberOfAdults, // Include this if required
      numberOfKids: farm.numberOfKids,
      email: farm.email,

      advanceCollectedBy: farm.advanceCollectedBy || '', // New field
      pendingCollectedBy: farm.pendingCollectedBy || '', // New field
      advanceMode: farm.advanceMode || 'cash', // Default to 'cash'
      otherServices: farm.otherServices || '', // New field
      urbanvenuecommission: farm.urbanvenuecommission || '', // New field
      termsConditions: farm.termsConditions,
      eventAddOns: farm.eventAddOns,
    })
    setDialogOpen(true)
  }

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setUpdatedFields((prev) => ({ ...prev, [name]: value }))
  }

  // For nested address fields, create a specific handler
  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setUpdatedFields((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }))
  }

  const handleSubmitUpdate = async () => {
    try {
      const { farmId } = currentFarm; // Assuming `state` and `place` are part of `currentFarm`
      // console.log(`Submitting update to: http://localhost:9000/api/calender/update-farm/${state}/${place}/${farmId}`);
      console.log('Updated Fields:', updatedFields);
      console.log('==>>ID:', farmId);

      await axios.patch(
        `http://localhost:9000/api/calender/update-farm/${farmId}`,
        updatedFields
      );

      setDialogOpen(false);
      window.location.reload(); // Reload or fetch farms
    } catch (error) {
      console.error('Error updating farm:', error.response?.data || error.message);
    }
  };

  const handleDeleteFarm = async (state, place, farmId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this farm?'
    )
    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:9000/api/calender/farms/${state}/${place}/${farmId}`
        )
        setFarms(farms.filter((farm) => farm.farmId !== farmId))
        setFilteredFarms(filteredFarms.filter((farm) => farm.farmId !== farmId))
      } catch (error) {
        console.error('Error deleting farm:', error.message)
      }
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  function convertTo12HourFormat(time) {
    const [hours, minutes] = time.split(':').map(Number);
    const isPM = hours >= 12;
    const formattedHours = hours % 12 || 12; // Convert 0 hours to 12
    const formattedTime = `${formattedHours}:${String(minutes).padStart(2, '0')} ${isPM ? 'PM' : 'AM'}`;
    return formattedTime;
  }
  return (
    <div className="w-full h-screen flex flex-col">
      <CustomNavTopbar path={usertype === 'Admin' ? ADMIN_DASHBOARD : SUPER_ADMIN_DASHBOARD} text={'Create Property'} route={CREATE_FARMS} />
      <div className="flex-1 flex justify-center items-center">
        <div className="px-4 w-[90%] min-h-[60%]">
          <h2 className="text-2xl font-semibold my-4">Filter Farms</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* State Filter */}
            <div className="relative flex items-center bg-white py-2 px-4 border border-gray-300 rounded-md">
              <LocationOnIcon className="text-gray-400 mr-2" />
              <select
                className="outline-none border-none w-full"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <option value="">Select State</option>
                {states.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* Place Filter */}
            <div className="relative flex items-center bg-white py-2 px-4 border border-gray-300 rounded-md">
              <SearchIcon className="text-gray-400 mr-2" />
              <select
                className="outline-none border-none w-full"
                value={selectedPlace}
                onChange={(e) => setSelectedPlace(e.target.value)}
              >
                <option value="">Select Place</option>
                {places.map((place, index) => (
                  <option key={index} value={place}>
                    {place}
                  </option>
                ))}
              </select>
            </div>

            {/* Farm Name Filter */}
            <div className="relative flex items-center bg-white py-2 px-4 border border-gray-300 rounded-md">
              <SearchIcon className="text-gray-400 mr-2" />
              <select
                className="outline-none border-none w-full"
                value={selectedFarmName}
                onChange={(e) => setSelectedFarmName(e.target.value)}
              >
                <option value="">Select Farm</option>
                {farmNames.map((farmName, index) => (
                  <option key={index} value={farmName}>
                    {farmName}
                  </option>
                ))}
              </select>
            </div>

            {/* Address Filter */}
            {/* <div className="relative flex items-center bg-white py-2 px-4 border border-gray-300 rounded-md">
              <SearchIcon className="text-gray-400 mr-2" />
              <input
                type="text"
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
                className="outline-none border-none w-full"
                placeholder="Enter Address"
              />
            </div> */}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleFind}
              className="w-fit bg-Primary text-white h-[40px] flex items-center justify-center rounded-tl-[3px] border-t border-transparent px-4 py-[10px]"
            >
              Find
            </button>
            <button
              onClick={resetFilters}
              className="flex items-center justify-center py-[8px] px-[14px] border border-Bordgrey rounded-md"
            >
              <RefreshIcon className="text-black mr-2" />
              Reset
            </button>
          </div>

          {/* Farms Table */}
          <div className="overflow-x-auto max-h-[50vh]">
            <table className="overflow-auto max-h-40 bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left border border-gray-300">
                    Farm Id
                  </th>
                  <th className="py-3 px-6 text-left border border-gray-300">
                    State
                  </th>
                  <th className="py-3 px-6 text-left border border-gray-300">
                    Place
                  </th>
                  <th className="py-3 px-6 text-left border border-gray-300">
                    Farm Name
                  </th>
                  {/* <th className="py-3 px-6 text-left border border-gray-300">
                    Phone Number
                  </th> */}
                  {/* <th className="py-3 px-6 text-left border border-gray-300">
                    Check-In Date
                  </th> */}
                  <th className="py-3 px-6 text-left border border-gray-300">
                    Check-In Time
                  </th>
                  {/* <th className="py-3 px-6 text-left border border-gray-300">
                    Check-Out Date
                  </th> */}
                  <th className="py-3 px-6 text-left border border-gray-300">
                    Check-Out Time
                  </th>
                  <th className="py-3 px-6 text-left border border-gray-300">
                    Host Owner Name
                  </th>
                  <th className="py-3 px-6 text-left border border-gray-300">
                    Total Booking
                  </th>
                  <th className="py-3 px-6 text-left border border-gray-300">
                    Security Amount
                  </th>
                  <th className="py-3 px-6 text-left border border-gray-300">
                    Advance
                  </th>
                  <th className="py-3 px-6 text-left border border-gray-300">
                    AdvanceCollectedBy
                  </th>
                  <th className="py-3 px-6 text-left border border-gray-300">
                    PendingCollectedBy
                  </th>
                  <th className="py-3 px-6 text-left border border-gray-300">
                    Events & Addons
                  </th>
                  <th className="py-3 px-6 text-left border border-gray-300">
                    Terms & Conditions
                  </th>

                  <th className="py-3 px-6 text-left border border-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className=" text-gray-600 text-sm font-light">
                {filteredFarms
                  .slice()
                  .reverse()
                  .map((farm, index) => {
                    const address = farm.address || {}

                    return (
                      <tr key={index}>
                        <td className="py-3 px-6 border border-gray-300 whitespace-nowrap ">
                          {farm.farmId}
                        </td>
                        <td className="py-3 px-6 border border-gray-300 whitespace-nowrap ">
                          {farm.state}
                        </td>
                        <td className="py-3 px-6 border border-gray-300 whitespace-nowrap ">
                          {farm.place}
                        </td>
                        <td className="py-3 px-6 border border-gray-300 whitespace-nowrap">
                          {farm.name}
                        </td>
                        {/* <td className="py-3 px-6 border border-gray-300 whitespace-nowrap">
                          {farm.phoneNumber}
                        </td> */}
                        {/* <td className="py-3 px-6 border border-gray-300">
                        {new Date(farm.checkInDate).toLocaleDateString()}
                      </td> */}
                        <td className="py-3 px-6 border border-gray-300 whitespace-nowrap ">
                          {convertTo12HourFormat(farm.checkInTime)}
                        </td>
                        {/* <td className="py-3 px-6 border border-gray-300 whitespace-nowrap ">
                          { new Date(farm.checkOutDate).toLocaleDateString()}
                        </td> */}
                        <td className="py-3 px-6 border border-gray-300 whitespace-nowrap ">
                          {convertTo12HourFormat(farm.checkOutTime)}
                        </td>
                        <td className="py-3 px-6 border border-gray-300 whitespace-nowrap  ">
                          {farm.hostOwnerName}
                        </td>
                        <td className="py-3 px-6 border border-gray-300 whitespace-nowrap ">
                          {farm.totalBooking}
                        </td>
                        <td className="py-3 px-6 border border-gray-300 whitespace-nowrap ">
                          {farm.securityAmount}
                        </td>
                        <td className="py-3 px-6 border border-gray-300 whitespace-nowrap ">
                          {farm.advance}
                        </td>
                        <td className="py-3 px-6 border border-gray-300 whitespace-nowrap ">
                          {farm.advanceCollectedBy}
                        </td>
                        <td className="py-3 px-6 border border-gray-300 whitespace-nowrap ">
                          {farm.pendingCollectedBy}
                        </td>
                        <td className="py-3 px-6 border border-gray-300 whitespace-nowrap ">
                          {farm.eventAddOns}
                        </td>
                        <td className="py-3 px-6 border border-gray-300whitespace-nowrap ">
                          {farm.termsConditions}
                        </td>
                        <td className="py-3 px-6 border border-gray-300 whitespace-nowrap ">
                          <button
                            onClick={() => handleUpdateFarm(farm)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <EditIcon />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteFarm(
                                farm.state,
                                farm.place,
                                farm.farmId
                              )
                            } // Add delete button
                            className="text-red-500"
                          >
                            <DeleteIcon />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>

          {/* Update Dialog */}
          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>Update Farm</DialogTitle>
            <DialogContent>
              <TextField
                name="phoneNumber"
                label="Phone Number"
                value={updatedFields.phoneNumber || ''}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="checkInTime"
                label="Check-In Time"
                type="time"
                value={updatedFields.checkInTime || ''}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                name="checkOutDate"
                label="Check-Out Date"
                type="date"
                value={updatedFields.checkOutDate?.slice(0, 10) || ''}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                name="checkOutTime"
                label="Check-Out Time"
                type="time"
                value={updatedFields.checkOutTime || ''}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                name="hostOwnerName"
                label="Host Owner Name"
                value={updatedFields.hostOwnerName || ''}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="totalBooking"
                label="Total Booking"
                type="number"
                value={updatedFields.totalBooking || ''}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="securityAmount"
                label="Security Amount"
                type="number"
                value={updatedFields.securityAmount || ''}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="advance"
                label="Advance"
                type="number"
                value={updatedFields.advance || ''}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="advanceCollectedBy"
                label="Advance Collected By"
                value={updatedFields.advanceCollectedBy || ''}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="pendingCollectedBy"
                label="Pending Collected By"
                value={updatedFields.pendingCollectedBy || ''}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="advanceMode"
                label="Advance Mode"
                value={updatedFields.advanceMode || 'cash'} // Defaulting to 'cash'
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                value={updatedFields.email || ''}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="otherServices"
                label="Other Services"
                type="number"
                value={updatedFields.otherServices || ''}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="urbanvenuecommission"
                label="Urban Venue Commission"
                type="number"
                value={updatedFields.urbanvenuecommission || ''}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="termsConditions"
                label="Terms and Conditions"
                value={updatedFields.termsConditions || ''}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="eventAddOns"
                label="Event Add-Ons"
                value={updatedFields.eventAddOns || ''}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="status"
                label="Status"
                select
                value={updatedFields.status || ''}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
                SelectProps={{
                  native: true,
                }}
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="Canceled">Canceled</option>
                <option value="Paid">Paid</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
                <option value="confirmed">Confirmed</option>
              </TextField>
              {/* Address Fields */}
              <TextField
                name="addressLine1"
                label="Address Line 1"
                value={updatedFields.address?.addressLine1 || ''}
                onChange={handleAddressChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="addressLine2"
                label="Address Line 2"
                value={updatedFields.address?.addressLine2 || ''}
                onChange={handleAddressChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="suburb"
                label="Suburb"
                value={updatedFields.address?.suburb || ''}
                onChange={handleAddressChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="zipCode"
                label="Zip Code"
                value={updatedFields.address?.zipCode || ''}
                onChange={handleAddressChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="country"
                label="Country"
                value={updatedFields.address?.country || ''}
                onChange={handleAddressChange}
                fullWidth
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSubmitUpdate} color="primary">
                Update
              </Button>
              <Button onClick={() => setDialogOpen(false)} color="secondary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default AllFarms

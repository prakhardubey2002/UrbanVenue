import React, { useEffect, useState } from 'react'
import NavTopBar from '../components/NavTopBar'
import PieChartIcon from '@mui/icons-material/PieChart'
import SearchIcon from '@mui/icons-material/Search'
import HouseIcon from '@mui/icons-material/House'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import RefreshIcon from '@mui/icons-material/Refresh'
import DataTable from '../components/DataTable'
import axios from 'axios'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
const Dashboard = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [guests, setGuests] = useState([])
  const [owners, setOwners] = useState([])
  const [properties, setProperties] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGuest, setSelectedGuest] = useState('')
  const [selectedOwner, setSelectedOwner] = useState('')
  const [phonenumber, setPhonenumber] = useState([])
  const [selectedphonenumber, setSelectedPhonenumber] = useState([])
  const [selectedProperty, setSelectedProperty] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMessage, setDialogMessage] = useState('')

  const handleOpenDialog = (message) => {
    setDialogMessage(message)
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setDialogMessage('')
  }
  // const find = () => {
  //   console.log(
  //     `guest name : ${selectedGuest} venue : ${selectedProperty}  Owner : ${selectedOwner} Phone : ${selectedphonenumber} status : ${selectedStatus} start: ${startDate} End : ${endDate}  `
  //   )
  // }
  const find = async () => {
    if (startDate && !endDate) {
      handleOpenDialog('Please choose an end date')
    } else if (!startDate && endDate) {
      handleOpenDialog('Please choose a start date')
    }
    try {
      console.log(
        `guest name: ${selectedGuest} venue: ${selectedProperty} owner: ${selectedOwner} phone: ${selectedphonenumber} status: ${selectedStatus} category: ${selectedCategory} start: ${startDate} end: ${endDate}`
      )

      const queryParams = {
        selectedGuest,
        selectedOwner,
        selectedProperty,
        selectedPhoneNumber: selectedphonenumber || '',
        selectedStatus,
        selectedCategory, // Include selected category in query params
        startDate,
        endDate,
      }

      // Convert the query params to a URL search string
      const queryString = new URLSearchParams(queryParams).toString()

      // Make API request
      const response = await axios.get(
        `http://localhost:3000/api/invoices/search?${queryString}`
      )

      // Set the data received from the API
      setData(response.data.data)

      console.log('Filtered Invoices:', response.data.data)
    } catch (error) {
      console.error('Error fetching filtered invoices:', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Promise.all([
          axios.get('http://localhost:3000/api/invoices/invoices'),
          axios.get('http://localhost:3000/api/invoices/guests'),
          axios.get('http://localhost:3000/api/invoices/owners'),
          axios.get('http://localhost:3000/api/invoices/venues'),
          axios.get('http://localhost:3000/api/invoices/unique-phone-numbers'),
        ])

        setData(response[0].data)
        setGuests(response[1].data)
        setOwners(response[2].data)
        setProperties(response[3].data)
        setPhonenumber(response[4].data)

        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchData()
  }, [])
  const resetFilters = () => {
    setSelectedGuest('')
    setSelectedOwner('')
    setSelectedPhonenumber('')
    setSelectedProperty('')
    setSelectedStatus('')
    setStartDate('')
    setEndDate('')
    setSelectedCategory('')
  }
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="w-full h-screen flex flex-col">
      <NavTopBar />
      <div className="flex-1 flex justify-center items-center">
        <div className="px-4 w-[90%] min-h-[60%]">
          <div className="w-full">
            <div className="flex items-center">
              <PieChartIcon fontSize="large" className="mx-2" />
              <h2 className="font-roboto text-[24px] font-semibold leading-[28.8px] text-left my-2">
                Report
              </h2>
            </div>
            <br />
            <div className="bg-white rounded border border-Bordgrey">
              <div className="px-4 py-4">
                <div className="grid grid-cols-4 gap-4 mb-[21px] md:grid-cols-2 ">
                  {/* Filters and Search Inputs */}
                  <div className="relative flex items-center bg-white py-[8px] px-[10px] border border-Bordgrey rounded-md">
                    <SearchIcon className="text-Bordgrey" />
                    <input
                      type="text"
                      value={selectedGuest}
                      onChange={(e) => setSelectedGuest(e.target.value)}
                      className="outline-none border-none px-2 pr-12 w-full"
                      placeholder="Select Guest"
                      list="guestList"
                    />
                    <datalist id="guestList">
                      {guests.map((guest, index) => (
                        <option key={index} value={guest}>
                          {guest}
                        </option>
                      ))}
                    </datalist>
                  </div>

                  <div className="relative flex items-center bg-white py-[8px] px-[10px] border border-Bordgrey rounded-md">
                    <HouseIcon className="text-Bordgrey" />
                    <input
                      type="text"
                      value={selectedOwner}
                      onChange={(e) => setSelectedOwner(e.target.value)}
                      className="outline-none border-none px-2 w-full"
                      placeholder="Select Owner"
                      list="ownerList"
                    />
                    <datalist id="ownerList">
                      {owners.map((owner, index) => (
                        <option key={index} value={owner}>
                          {owner}
                        </option>
                      ))}
                    </datalist>
                  </div>

                  <div className="relative flex items-center bg-white py-[8px] px-[10px] border border-Bordgrey rounded-md">
                    <HouseIcon className="text-Bordgrey" />
                    <input
                      type="text"
                      value={selectedProperty}
                      onChange={(e) => setSelectedProperty(e.target.value)}
                      className="outline-none border-none px-2 w-full"
                      placeholder="Select Property"
                      list="propertyList"
                    />
                    <datalist id="propertyList">
                      {properties.map((property, index) => (
                        <option key={index} value={property}>
                          {property}
                        </option>
                      ))}
                    </datalist>
                  </div>

                  <div className="relative flex items-center bg-white py-[8px] px-[10px] border border-Bordgrey rounded-md">
                    <CalendarMonthIcon className="text-Bordgrey absolute left-3" />
                    <input
                      type="text"
                      className="outline-none border-none px-8 w-full" // Add padding-left to make space for the icon
                      value={startDate ? startDate : ''}
                      onChange={(e) => setStartDate(e.target.value)}
                      placeholder="Start date"
                      onFocus={(e) => (e.target.type = 'date')} // Switch input type to 'date' on focus
                      onBlur={(e) => {
                        if (!startDate) {
                          e.target.type = 'text' // Revert to 'text' if no date is selected
                        }
                      }}
                    />
                  </div>

                  <div className="relative flex items-center bg-white py-[8px] px-[10px] border border-Bordgrey rounded-md">
                    <CalendarMonthIcon className="text-Bordgrey mr-2" />
                    <input
                      type="text"
                      className="outline-none border-none px-2 w-full"
                      value={endDate ? endDate : ''}
                      onChange={(e) => setEndDate(e.target.value)}
                      placeholder="End date"
                      onFocus={(e) => (e.target.type = 'date')} // Change input type to 'date' on focus
                      onBlur={(e) => {
                        if (!endDate) {
                          e.target.type = 'text' // Revert back to 'text' if no date is chosen
                        }
                      }}
                    />
                  </div>

                  <div className="relative flex items-center bg-white py-[8px] px-[10px] border border-Bordgrey rounded-md">
                    <input
                      type="number"
                      className="outline-none border-none px-2 w-full"
                      placeholder="Phone Number"
                      value={selectedphonenumber}
                      onChange={(e) => setSelectedPhonenumber(e.target.value)}
                      list="phoneList"
                    />
                    <datalist id="phoneList">
                      {phonenumber.map((phone, index) => (
                        <option key={index} value={phone}>
                          {phone}
                        </option>
                      ))}
                    </datalist>
                  </div>

                  <div className="relative flex items-center bg-white py-[8px] px-[10px] border border-Bordgrey rounded-md">
                    <select
                      className="outline-none border-none px-2 w-full"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Status
                      </option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Paid">Paid</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                  </div>

                  <div className="relative flex items-center bg-white py-[8px] px-[10px] border border-Bordgrey rounded-md">
                    <select
                      className="outline-none border-none px-2 w-full"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Category
                      </option>
                      <option value="Wedding">Wedding</option>
                      <option value="Engagement">Engagement</option>
                      <option value="Office Party">Office Party</option>
                      <option value="Haldi Ceremony">Haldi Ceremony</option>
                      <option value="Mehndi Ceremony">Mehndi Ceremony</option>
                    </select>
                  </div>

                  <div className="mt-2 md:mt-0">
                    <button
                      onClick={() => find()}
                      className="w-full bg-Primary text-white h-[40px] flex items-center justify-center rounded-tl-[3px] border-t border-transparent px-4 py-[10px]"
                    >
                      <p>Find</p>
                    </button>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <button
                      onClick={(e) => resetFilters()}
                      className="flex items-center justify-center py-[8px] px-[14px] border border-Bordgrey rounded-md"
                    >
                      <RefreshIcon className="text-black mr-2" />
                      <p className="font-normal text-[14px]">Refresh</p>
                    </button>
                  </div>
                </div>

                {/* <div className="flex flex-wrap justify-between">
                  <div className="flex flex-wrap md:flex-col md:space-y-2">
                    <div className="flex items-center bg-white w-fit py-[8px] px-[4px] border border-Bordgrey rounded-md mr-2">
                      <input
                        type="text"
                        className="outline-none border-none px-2"
                        placeholder="Search Term"
                      />
                    </div>
                    <div className="flex items-center bg-white w-fit py-[8px] px-[4px] border border-Bordgrey rounded-md mr-2">
                      <select
                        className="outline-none border-none px-2"
                        value={selectedStatus} // Bind the state value to the select input
                        onChange={(e) => setSelectedStatus(e.target.value)} // Update the state when the value changes
                      >
                        <option value="" disabled>
                          Select Status
                        </option>
                        <option value="Upcoming">Upcoming</option>
                        <option value="Paid">Paid</option>
                        <option value="Canceled">Canceled</option>
                      </select>
                    </div>
                    <div className="flex items-center bg-white w-fit py-[8px] px-[4px] border border-Bordgrey rounded-md mr-2">
                      <input
                        type="number"
                        className="outline-none border-none px-2"
                        placeholder="Phone Number"
                        value={selectedphonenumber}
                        onChange={(e) => setSelectedPhonenumber(e.target.value)}
                        list="phoneList"
                      />
                      <datalist id="phoneList">
                        {phonenumber.map((phone, index) => (
                          <option key={index} value={phone}>
                            {phone}
                          </option>
                        ))}
                      </datalist>
                    </div>
                    <div className="flex items-center bg-white w-fit py-[8px] px-[4px] border border-Bordgrey rounded-md mr-2">
                      <select
                        className="outline-none border-none px-2"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        <option value="" disabled>
                          Select Category
                        </option>
                        <option value="Wedding">Wedding</option>
                        <option value="Engagement">Engagement</option>
                        <option value="Office Party">Office Party</option>
                        <option value="Haldi Ceremony">Haldi Ceremony</option>
                        <option value="Mehndi Ceremony">Mehndi Ceremony</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <button
                      onClick={() => find()}
                      className="w-full bg-Primary text-white h-[40px] flex items-center justify-center rounded-tl-[3px] border-t border-transparent px-4 py-[10px]"
                    >
                      <p>Find</p>
                    </button>
                  </div>
                </div> */}
              </div>
              <DataTable data={data} setData={setData} />
            </div>
          </div>
        </div>
      </div>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Date Boundary</DialogTitle>
        <DialogContent>
          <p>{dialogMessage}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Dashboard

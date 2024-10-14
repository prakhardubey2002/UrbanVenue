import React, { useContext, useEffect, useState } from 'react'
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
import CustomNavTopbar from '../components/CustomNavTopbar'
import { ADMIN_DASHBOARD, SUPER_ADMIN_DASHBOARD } from '../routes/Routes'
import AuthContext from '../context/context'
import AdminTable from '../components/AdminTable'
import CalculateTable from '../components/CalculateTable'
import { useLocation } from 'react-router-dom'
const Report = () => {
  const location = useLocation()
  const hostOwnerName = location?.state?.hostOwnerName
  const [surdefval, SetSurdefval] = useState(0)
  const { usertype } = useContext(AuthContext)
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
  const [occasions, setOccasions] = useState([])
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
  useEffect(() => {
    let tempSurdefval = surdefval // Temporary variable to hold the accumulated value

    data.forEach((datax) => {
      if (datax.fullcloser === 'Pending') {
        const surplus = datax.surplus ? Number(datax.surplus) : 0
        const deficit = datax.deficit ? Number(datax.deficit) : 0

        tempSurdefval = tempSurdefval - deficit + surplus

        console.log(datax.guestName)
        console.log(tempSurdefval)
      }
    })

    // Update the state only once after all iterations are complete
    SetSurdefval(tempSurdefval)
  }, [data])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Promise.all([
          axios.get(
            `${
              import.meta.env.VITE_BACKEND_API_URL
            }api/invoices/owner/${hostOwnerName}`
          ),
          axios.get(
            `${import.meta.env.VITE_BACKEND_API_URL}api/invoices/guests`
          ),
          axios.get(
            `${import.meta.env.VITE_BACKEND_API_URL}api/invoices/owners`
          ),
          axios.get(
            `${import.meta.env.VITE_BACKEND_API_URL}api/invoices/venues`
          ),
          axios.get(
            `${
              import.meta.env.VITE_BACKEND_API_URL
            }api/invoices/unique-phone-numbers`
          ),
          axios.get(
            `${import.meta.env.VITE_BACKEND_API_URL}occasion/occasions`
          ),
        ])

        setData(response[0].data)
        setGuests(response[1].data)
        setOwners(response[2].data)
        setProperties(response[3].data)
        setPhonenumber(response[4].data)
        setOccasions(response[5].data)

        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchData()
  }, [])
  const resetFilters = () => {
    // setSelectedGuest('')
    // setSelectedOwner('')
    // setSelectedPhonenumber('')
    // setSelectedProperty('')
    // setSelectedStatus('')
    // setStartDate('')
    // setEndDate('')
    // setSelectedCategory('')
    window.location.reload()
  }
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="w-full h-screen flex flex-col">
      <CustomNavTopbar
        path={usertype === 'Admin' ? ADMIN_DASHBOARD : SUPER_ADMIN_DASHBOARD}
        text={''}
      />
      <div className="flex-1 flex justify-center items-center">
        <div className="px-4 w-[90%] min-h-[60%]">
          <div className="w-full">
            <div className="flex items-center">
              <PieChartIcon fontSize="large" className="mx-2" />
              <h2 className="font-roboto text-[24px] font-semibold leading-[28.8px] text-left my-2">
                {hostOwnerName}
              </h2>
            </div>
            <br />
            <div className="w-full flex justify-center items-center">
              {surdefval >= 0 ? (
                <div className="w-fit border border-green-400 border-4 rounded-lg px-8 py-3 text-green-400 font-bold ">Total Surplus: {surdefval}</div>
              ) : (
                <div className="w-fit border border-red-400 border-4 rounded-lg px-8 py-3 text-red-400 font-bold ">
                  Total Deficit: {Math.abs(surdefval)}
                </div>
              )}
            </div>
            <br />
            <div className="bg-white rounded border border-Bordgrey">
              <CalculateTable
                occasions={occasions}
                data={[...data].reverse()}
                setData={setData}
              />
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

export default Report

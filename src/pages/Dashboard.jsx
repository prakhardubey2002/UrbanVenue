import React, { useEffect, useState } from 'react'
import NavTopBar from '../components/NavTopBar'
import PieChartIcon from '@mui/icons-material/PieChart'
import SearchIcon from '@mui/icons-material/Search'
import HouseIcon from '@mui/icons-material/House'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import RefreshIcon from '@mui/icons-material/Refresh'
import DataTable from '../components/DataTable'
import axios from 'axios'

const Dashboard = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [guests, setGuests] = useState([]) // State to store guest names
  const [filteredGuests, setFilteredGuests] = useState([]) // State for autocomplete suggestions
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/invoices/invoices')
        setData(response.data)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/invoices/guests')
        setGuests(response.data)
      } catch (error) {
        console.error('Error fetching guests:', error)
      }
    }

    fetchGuests()
  }, [])

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredGuests([])
    } else {
      const filtered = guests.filter((guest) =>
        guest.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredGuests(filtered)
    }
  }, [searchTerm, guests])

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
                <div className="flex flex-wrap justify-between mb-[21px]">
                  {/* Filters and Search Inputs */}
                  <div className="relative flex flex-wrap md:flex-col md:space-y-2">
                    <div className="relative flex items-center bg-white w-fit py-[8px] px-[10px] border border-Bordgrey rounded-md mr-2">
                      <SearchIcon className="text-Bordgrey" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="outline-none border-none px-2 pr-12"
                        placeholder="Search By guest Name"
                      />
                      {filteredGuests.length > 0 && (
                        <ul 
                          className="absolute bg-white border border-Bordgrey w-full mt-1 max-h-40 overflow-y-auto z-10 p-2"
                          style={{ top: 'calc(100% + 8px)' }}
                        >
                          {filteredGuests.map((guest, index) => (
                            <li
                              key={index}
                              className="cursor-pointer hover:bg-gray-200"
                              onClick={() => {
                                setSearchTerm(guest)
                                setFilteredGuests([])
                              }}
                            >
                              {guest}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="flex items-center bg-white w-fit py-[8px] px-[10px] border border-Bordgrey rounded-md mr-2">
                      <HouseIcon className="text-Bordgrey" />
                      <input
                        type="text"
                        className="outline-none border-none px-2"
                        placeholder="Search by property name"
                      />
                    </div>
                    <div className="flex items-center bg-white w-fit py-[8px] px-[10px] border border-Bordgrey rounded-md">
                      <HouseIcon className="text-Bordgrey" />
                      <input
                        type="text"
                        className="outline-none border-none px-2"
                        placeholder="Search by owner name"
                      />
                    </div>
                    <div className="flex items-center bg-white w-fit py-[8px] px-[10px] border border-Bordgrey rounded-md mt-2 md:mt-0">
                      <CalendarMonthIcon className="text-Bordgrey" />
                      <input
                        type="date"
                        className="outline-none border-none px-2"
                        placeholder="From date"
                      />
                    </div>
                    <div className="flex items-center bg-white w-fit py-[8px] px-[10px] border border-Bordgrey rounded-md mt-2 md:mt-0">
                      <CalendarMonthIcon className="text-Bordgrey" />
                      <input
                        type="date"
                        className="outline-none border-none px-2"
                        placeholder="To date"
                      />
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <button className="flex items-center justify-center py-[8px] px-[14px] border border-Bordgrey rounded-md">
                      <RefreshIcon className="text-black mr-2" />
                      <p className="font-normal text-[14px]">Refresh</p>
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap justify-between">
                  <div className="flex flex-wrap md:flex-col md:space-y-2">
                    <div className="flex items-center bg-white w-fit py-[8px] px-[4px] border border-Bordgrey rounded-md mr-2">
                      <input
                        type="text"
                        className="outline-none border-none px-2"
                        placeholder="Search Term"
                      />
                    </div>
                    <div className="flex items-center bg-white w-fit py-[8px] px-[4px] border border-Bordgrey rounded-md mr-2">
                      <input
                        type="text"
                        className="outline-none border-none px-2"
                        placeholder="Status"
                      />
                    </div>
                    {/* <div className="flex items-center bg-white w-fit py-[8px] px-[4px] border border-Bordgrey rounded-md mr-2">
                      <input
                        type="text"
                        className="outline-none border-none px-2"
                        placeholder="Last 30 days"
                      />
                    </div> */}
                    <div className="flex items-center bg-white w-fit py-[8px] px-[4px] border border-Bordgrey rounded-md mr-2">
                      <input
                        type="number"
                        className="outline-none border-none px-2"
                        placeholder="Phone Number"
                      />
                    </div>
                    <div className="flex items-center bg-white w-fit py-[8px] px-[4px] border border-Bordgrey rounded-md mr-2">
                      <input
                        type="text"
                        className="outline-none border-none px-2"
                        placeholder="Category"
                      />
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <button className="w-full bg-Primary text-white h-[40px] flex items-center justify-center rounded-tl-[3px] border-t border-transparent px-4 py-[10px]">
                      <p>Find</p>
                    </button>
                  </div>
                </div>
              </div>
              <DataTable data={data} setData={setData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

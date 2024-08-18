import React from 'react'
import NavTopBar from '../components/NavTopBar'
import PieChartIcon from '@mui/icons-material/PieChart'
import SearchIcon from '@mui/icons-material/Search'
import HouseIcon from '@mui/icons-material/House'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import RefreshIcon from '@mui/icons-material/Refresh'
import data from '../data/Demodata.json'
import DataTable from '../components/DataTable'
const Dashboard = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <NavTopBar />
      <div className="flex-1  flex justify-center items-center  ">
        <div className="px-4  w-[90%] min-h-[60%]  ">
          <div className="w-[100%]">
            <div className="flex items-center  ">
              <PieChartIcon fontSize="large" className="mx-2" />
              <h2 className="font-roboto text-[24px] font-semibold leading-[28.8px] text-left my-2 ">
                Report
              </h2>
            </div>
            <br />
            <div className="bg-white rounded border border-Bordgrey">
              <div className='px-4 py-4' >
                <div className="flex justify-between mb-[21px] ">
                  <div className="flex">
                    <div className=" flex justify-center items-center bg-white w-fit py-[8px] px-[10px] border border-Bordgrey rounded-md mr-2 ">
                      <SearchIcon className=" text-Bordgrey " />
                      <input
                        type="text"
                        className="outline-none border-none px-2 "
                        placeholder="Search By guest Name"
                      />
                    </div>
                    <div className=" flex justify-center items-center bg-white w-fit py-[8px] px-[10px] border border-Bordgrey rounded-md mr-2">
                      <HouseIcon className=" text-Bordgrey " />
                      <input
                        type="text"
                        className="outline-none border-none px-2 "
                        placeholder="Search by property name"
                      />
                    </div>
                    <div className="flex justify-center items-center bg-white w-fit py-[8px] px-[10px] border border-Bordgrey rounded-tl-lg rounded-bl-lg ">
                      <HouseIcon className=" text-Bordgrey " />
                      <input
                        type="text"
                        className="outline-none border-none px-2 "
                        placeholder="Search by owner name"
                      />
                    </div>
                    <div className="flex justify-center items-center bg-white w-fit py-[8px] px-[10px] border border-Bordgrey ">
                      <CalendarMonthIcon className=" text-Bordgrey " />
                      <input
                        type="date"
                        className="outline-none border-none px-2 "
                        placeholder="From date"
                      />
                    </div>
                    <div className="flex justify-center items-center bg-white w-fit py-[8px] px-[10px] border border-Bordgrey">
                      <CalendarMonthIcon className=" text-Bordgrey " />
                      <input
                        type="date"
                        className="outline-none border-none px-2 "
                        placeholder="From date"
                      />
                    </div>
                  </div>
                  <div>
                    <button className="text-center  flex justify-center items-center py-[8px] px-[14px] border border-Bordgrey rounded-md mr-2">
                      <RefreshIcon className=" text-black mr-2" />
                      <p className="font-normal text-[14px]">Refresh</p>
                    </button>
                  </div>
                </div>
                <div className="flex justify-between ">
                  <div className="flex">
                    <div className=" flex justify-center items-center bg-white w-fit py-[8px] px-[4px] border border-Bordgrey rounded-md mr-2  ">
                      {/* <SearchIcon className=" text-Bordgrey " /> */}
                      <input
                        type="text"
                        className="outline-none border-none px-2 "
                        placeholder="Search Term"
                      />
                    </div>
                    <div className=" flex justify-center items-center bg-white w-fit py-[8px] px-[4px] border border-Bordgrey rounded-md mr-2">
                      {/* <HouseIcon className=" text-Bordgrey " /> */}
                      <input
                        type="text"
                        className="outline-none border-none px-2 "
                        placeholder="Status"
                      />
                    </div>
                    <div className="flex justify-center items-center bg-white w-fit py-[8px] px-[4px] border border-Bordgrey rounded-md mr-2">
                      {/* <HouseIcon className=" text-Bordgrey " /> */}
                      <input
                        type="text"
                        className="outline-none border-none px-2 "
                        placeholder="Last 30 days"
                      />
                    </div>
                    <div className="flex justify-center items-center bg-white w-fit py-[8px] px-[4px] border border-Bordgrey rounded-md  mr-2">
                      {/* <HouseIcon className=" text-Bordgrey " /> */}
                      <input
                        type="number"
                        className="outline-none border-none px-2  "
                        placeholder="Phone Number"
                      />
                    </div>
                    <div className="flex justify-center items-center bg-white w-fit py-[8px] px-[4px] border border-Bordgrey rounded-md mr-2 ">
                      {/* <HouseIcon className=" text-Bordgrey " /> */}
                      <input
                        type="text"
                        className="outline-none border-none px-2 "
                        placeholder="Category"
                      />
                    </div>
                  </div>
                  <div>
                    <button className="max-w-[122px]  bg-Primary text-white h-[40px] flex justify-center items-center rounded-tl-[3px] border-t border-transparent px-[112px] py-[10px]">
                      <p>Find</p>
                    </button>
                  </div>
                </div>
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

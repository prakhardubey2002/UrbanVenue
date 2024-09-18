import React from 'react'
import PieChartIcon from '@mui/icons-material/PieChart'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useNavigate } from 'react-router-dom'
import { ALL_FARMS } from '../routes/Routes'
const Admin = () => {
  const navigate = useNavigate()
  const redirect = (data) => {
    switch (data) {
      case 'All Farms':
        return navigate(ALL_FARMS)
    }
  }
  return (
    <div className=" w-[100vw] h-[100vh] flex justify-center ">
      <div className="w-[80%] my-16 flex flex-col   ">
        <h2 className=" font-bold w-fit flex justify-center items-center text-Primary">
          <span className="text-black">
            <PieChartIcon fontSize="large" className="mx-2" />
          </span>
          Admin Dashboard
        </h2>
        <div className=" my-4 w-full h-fit grid grid-cols-2 md:grid-cols-1 ">
          <div
            onClick={() => redirect('All Farms')}
            className=" hover:drop-shadow-md cursor-pointer m-4 rounded-xl flex justify-between items-center font-medium p-4 leading-[37.5px] bg-[#efefef]"
          >
            <p>All Farms</p>
            <ArrowForwardIosIcon />
          </div>
          <div
            onClick={() => redirect('All Executive')}
            className=" hover:drop-shadow-md cursor-pointer m-4 rounded-xl flex justify-between items-center font-medium p-4 leading-[37.5px] bg-[#efefef]"
          >
            <p>All Executive</p>
            <ArrowForwardIosIcon />
          </div>
          <div
            onClick={() => redirect('All Occations')}
            className=" hover:drop-shadow-md cursor-pointer m-4 rounded-xl flex justify-between items-center font-medium p-4 leading-[37.5px] bg-[#efefef]"
          >
            <p>All Occations</p>
            <ArrowForwardIosIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
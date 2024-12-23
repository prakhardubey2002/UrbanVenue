import React from 'react'
import PieChartIcon from '@mui/icons-material/PieChart'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useNavigate } from 'react-router-dom'
import {
  ALL_EXECUTIVE,
  ALL_FARMS,
  ALL_OCCASION,
  All_ADMIN,
  REPORT,
  SUPER_ADMIN_INVOICE,
} from '../routes/Routes'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
const SuperAdmin = () => {
  const navigate = useNavigate()
  const redirect = (data) => {
    switch (data) {
      case 'All Farms':
        return navigate(ALL_FARMS)
      case 'All Executive':
        return navigate(ALL_EXECUTIVE)
      case 'All Occaions':
        return navigate(ALL_OCCASION)
      case 'All admins':
        return navigate(All_ADMIN)
      case 'Report':
        return navigate(REPORT)
      
    }
  }
  return (
    <div className=" w-[100vw] h-[100vh] flex justify-center ">
      <div className="w-[80%] my-16 flex flex-col   ">
        <h2 className=" font-bold w-fit flex justify-center items-center text-Primary">
          <span className="text-black">
            <PieChartIcon fontSize="large" className="mx-2" />
          </span>
          Superadmin Dashboard
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
            onClick={() => redirect('All Occaions')}
            className=" hover:drop-shadow-md cursor-pointer m-4 rounded-xl flex justify-between items-center font-medium p-4 leading-[37.5px] bg-[#efefef]"
          >
            <p>All Occasions</p>
            <ArrowForwardIosIcon />
          </div>
          <div
            onClick={() => redirect('All admins')}
            className=" hover:drop-shadow-md cursor-pointer m-4 rounded-xl flex justify-between items-center font-medium p-4 leading-[37.5px] bg-[#efefef]"
          >
            <p>All Admins</p>
            <ArrowForwardIosIcon />
          </div>
          <div
            onClick={() => redirect('Report')}
            className=" hover:drop-shadow-md cursor-pointer m-4 rounded-xl flex justify-between items-center font-medium p-4 leading-[37.5px] bg-[#efefef]"
          >
            <p>Report</p>
            <ArrowForwardIosIcon />
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default SuperAdmin

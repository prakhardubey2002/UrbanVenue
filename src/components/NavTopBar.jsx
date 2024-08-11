import React from 'react'
import Logo from '../assets/Logo.png'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Profile from '../assets/Profile.png'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
const NavTopBar = () => {
  return (
    <div className="w-full h-[67px] flex justify-between items-center border px-[100px] ">
      <div>
        <img src={Logo} alt="" className=" " />
      </div>
      <div className="flex w-fit">
        <button className="w-full  bg-[#ed7e7e] text-white h-[40px] flex justify-center items-center rounded-tl-[3px] border-t border-transparent px-6 py-[1px]">
          <CalendarMonthIcon className="mr-1" />
          <p>Create Property</p>
        </button>
        <div className="flex w-fit items-center justify-center ml-[24px] cursor-pointer ">
          <img src={Profile} className="rounded-full " alt="" />
          <ArrowDropDownIcon />
        </div>
      </div>
    </div>
  )
}

export default NavTopBar
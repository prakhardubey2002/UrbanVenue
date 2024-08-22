import React, { useState } from 'react'
import Logo from '../assets/Logo.png'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Profile from '../assets/Profile.png'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Link } from 'react-router-dom'
import { CREATE_ROUTE, SIGNIN_ROUTE } from '../routes/Routes'

const NavTopBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <div className="w-full h-[67px] flex justify-between items-center border px-[100px] relative">
      <div>
        <Link to={SIGNIN_ROUTE}>
          <img src={Logo} alt="" className="" />
        </Link>
      </div>
      <div className="flex w-fit">
        <button className="w-full bg-Primary text-white h-[40px] flex justify-center items-center rounded-tl-[3px] border-t border-transparent px-6 py-[1px]">
          <Link className="flex justify-center items-center" to={CREATE_ROUTE}>
            <CalendarMonthIcon className="mr-1" />
            <p>Create Event</p>
          </Link>
        </button>
        <div className="flex w-fit items-center justify-center ml-[24px] cursor-pointer relative">
          <img src={Profile} className="rounded-full" alt="" />
          {/* Conditionally render the arrow icon based on dropdown state */}
          {isDropdownOpen ? (
            <ArrowDropUpIcon onClick={toggleDropdown} />
          ) : (
            <ArrowDropDownIcon onClick={toggleDropdown} />
          )}

          {isDropdownOpen && (
            <div className="absolute top-[100%] right-0 mt-2 w-[150px] bg-white border rounded shadow-lg z-10">
              <Link
                to="/"
                className="block px-4 py-2 text-black hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Home
              </Link>
              <Link
                to={SIGNIN_ROUTE}
                className="block px-4 py-2 text-black hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Log Out
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NavTopBar

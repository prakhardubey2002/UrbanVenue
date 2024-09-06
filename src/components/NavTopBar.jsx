import React, { useContext, useState } from 'react'
import Logo from '../assets/Logo.png'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Profile from '../assets/Profile.png'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Link, useNavigate } from 'react-router-dom'
import { CREATE_ROUTE, SIGNIN_ROUTE } from '../routes/Routes'
import AuthContext from '../context/context'
import { toast } from 'react-hot-toast'

const NavTopBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const navigate =useNavigate();
  const { logout,token } = useContext(AuthContext)
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
  const Logout=()=>{
    logout();
    toast.success("Logged out")
    navigate(SIGNIN_ROUTE);
  }

  return (
    <div className="w-full h-[67px] flex justify-between items-center border px-[20px] md:px-[40px] lg:px-[60px] xl:px-[100px] relative">
      <div>
        <Link to={SIGNIN_ROUTE}>
          <img src={Logo} alt="Logo" className="h-[30px] sm:h-[25px]" />
        </Link>
      </div>
      <div className="flex w-fit items-center">
        <button className="bg-Primary text-white h-[40px] flex justify-center items-center rounded-tl-[3px] border-t border-transparent px-4 sm:px-6 py-[1px] text-xs sm:text-sm">
          <Link className="flex justify-center items-center" to={CREATE_ROUTE}>
            <CalendarMonthIcon className="mr-1" />
            <p>Create Event</p>
          </Link>
        </button>
        <div className="flex w-fit items-center justify-center ml-[16px] sm:ml-[24px] cursor-pointer relative">
          <img
            src={Profile}
            className="rounded-full w-[30px] h-[30px] sm:w-[35px] sm:h-[35px]"
            alt="Profile"
          />
          {/* Conditionally render the arrow icon based on dropdown state */}
          {isDropdownOpen ? (
            <ArrowDropUpIcon onClick={toggleDropdown} />
          ) : (
            <ArrowDropDownIcon onClick={toggleDropdown} />
          )}

          {isDropdownOpen && (
            <div className="absolute top-[100%] right-0 mt-2 w-[100px] sm:w-[150px] bg-white border rounded shadow-lg z-10">
              <Link
                to="/"
                className="block px-4 py-2 text-black text-xs sm:text-sm hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Home
              </Link>
              <p
              
                className="block px-4 py-2 text-black text-xs sm:text-sm hover:bg-gray-100"
                onClick={() => Logout()}
              >
                Log Out 
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NavTopBar

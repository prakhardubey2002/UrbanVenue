import React, { useContext, useState } from 'react';
import Logo from '../assets/Logo.png';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Profile from '../assets/Profile.png';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Link, useNavigate } from 'react-router-dom';
import { CREATE_ROUTE, SIGNIN_ROUTE } from '../routes/Routes';
import AuthContext from '../context/context';
import { toast } from 'react-hot-toast';

const NavTopBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const Logout = () => {
    logout();
    toast.success("Logged out");
    navigate(SIGNIN_ROUTE);
  };

  return (
    <div className="w-full h-fit flex justify-between items-center border py-2 px-4 md:px-6 lg:px-8 xl:px-12 relative">
      <div>
        <Link to={SIGNIN_ROUTE}>
          <img src={Logo} alt="Logo" className="h-[30px] sm:h-[25px] md:h-[30px] lg:h-[35px]" />
        </Link>
      </div>
      <div className="flex items-center space-x-4 md:space-x-6">
        <button className="bg-Primary text-white h-[40px] flex items-center rounded-tl-[3px] border-t border-transparent px-4 py-[1px] text-xs sm:text-sm md:px-6 md:py-2">
          <Link className="flex items-center" to={CREATE_ROUTE}>
            <CalendarMonthIcon className="mr-1" />
            <p>Create Event</p>
          </Link>
        </button>
        <div className="relative flex items-center">
          <img
            src={Profile}
            className="rounded-full w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px]"
            alt="Profile"
          />
          {isDropdownOpen ? (
            <ArrowDropUpIcon onClick={toggleDropdown} className="ml-2 cursor-pointer" />
          ) : (
            <ArrowDropDownIcon onClick={toggleDropdown} className="ml-2 cursor-pointer" />
          )}

          {isDropdownOpen && (
            <div className="absolute top-[100%] right-0 mt-2 w-[120px] md:w-[150px] bg-white border rounded shadow-lg z-10">
              <Link
                to="/"
                className="block px-4 py-2 text-black text-xs sm:text-sm hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Home
              </Link>
              <p
                className="block px-4 py-2 text-black text-xs sm:text-sm hover:bg-gray-100 cursor-pointer"
                onClick={() => Logout()}
              >
                Log Out
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavTopBar;

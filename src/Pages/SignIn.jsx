import React, { useState } from 'react'
import Logo from '../assets/Logo.png'
import { Link } from 'react-router-dom'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid' 
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState)
  }

  return (
    <>
      <div className="w-screen h-screen flex">
        <div className="w-[34.72%] bg-[#ed7e7e] relative flex justify-center items-center">
          <img src={Logo} alt="" className="absolute top-[50px] left-[50px]" />
          <h2 className="w-[80%] font-roboto text-[30px] font-semibold leading-[38px] text-left text-white">
            The Easiest Way to Create Events
          </h2>
        </div>
        <div className="right flex justify-center items-center w-[65.28%]">
          <div className="main flex flex-col justify-between h-[67.11%] w-[39.36%]">
            <div className="form flex flex-col">
              <h2 className="font-roboto text-[24px] font-semibold leading-[28.8px] text-left mt-[35px] mb-[41.8px]">
                Sign in to Urban Venue
              </h2>
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-1 text-sm font-semibold">
                  Your Email*
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter Your email"
                  className=" outline-none w-[370.66px] h-[48px] p-[16px] pr-[15px] pb-[16px] pl-[15px] gap-0 rounded-tl-[3px] rounded-tr-none rounded-br-none rounded-bl-none border-t border-[1px] bg-[#F9F9F9]  "
                />
              </div>
              <div className="flex flex-col mt-[21px] relative">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="text-sm font-semibold">
                    Password*
                  </label>
                  <Link to="/" className="transition-all duration-400 ease text-[#ed7e7e] hover:underline ">
                    Forget Password?
                  </Link>
                </div>
                <div className="relative bg-[#F9F9F9]">
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    className='w-[370.66px] h-[48px]  rounded-tl-[3px] rounded-tr-none rounded-br-none rounded-bl-none border-t border-[1px] bg-[#F9F9F9]' 
                  >
                    <Grid item xs >
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter Your password"
                        className="outline-none w-full h-[48px] px-[15px] py-[16px] border border-transparent rounded-tl-[3px] bg-[#F9F9F9] pr-[3rem]"
                      />
                    </Grid>
                    <Grid item  >
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="start"
                        className="pr-2 " // Adjust padding as needed
                        size="small"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </Grid>
                  </Grid>
                </div>
              </div>
              <button className="mt-5 w-full bg-[#ed7e7e] text-white h-[50px] flex justify-center items-center rounded-tl-[3px] border-t border-transparent px-[147.69px] py-[1px]">
                Sign In
                <ExitToAppIcon className='ml-1' />
              </button>
            </div>
            <p className="text-[14px] font-normal leading-[21px] text-center mt-4">
              © 2024, Barren. All rights reserved. Powered by Gambolthemes
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn

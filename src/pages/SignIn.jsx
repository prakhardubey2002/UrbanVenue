import React, { useState, useContext } from 'react'
import Logo from '../assets/Logo.png'
import { Link, useNavigate } from 'react-router-dom'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import axios from 'axios'
import AuthContext from '../context/context' // Import AuthContext
import { DASHBOARD_ROUTE, ADMIN_DASHBOARD } from '../routes/Routes'
import { toast } from 'react-hot-toast'

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('Executive') // Default userType
  const [error, setError] = useState('')
  const { setToken } = useContext(AuthContext) // Use AuthContext for token management
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:3000/login', {
        username: email, // Assuming username is email
        password,
        userType, // Include userType
      })

      toast.success('Login Successful')
      setToken(response.data.token) 
      setError('')

      if (response.data.userType === 'Admin') {
        navigate(ADMIN_DASHBOARD) 
      } else {
        navigate(DASHBOARD_ROUTE) 
      }
    } catch (err) {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="w-screen h-screen flex lg:flex-col">
      <div className="w-[35%] bg-Primary relative flex justify-center items-center lg:w-full lg:h-[15%]">
        <img
          src={Logo}
          alt="Logo"
          className="absolute top-[50px] left-[50px] lg:top-[15%] lg:left-[5%]"
        />
        <h2 className="w-[80%] font-roboto text-[30px] font-semibold leading-[38px] text-left text-white lg:hidden">
          The Easiest Way to Create Events
        </h2>
      </div>
      <div className="right flex justify-center items-center w-[65%] lg:w-full lg:h-[85%]">
        <div className="main flex flex-col justify-between h-[67%] w-[40%] lg:w-[60%] lg:h-[80%] sm:w-[80%]">
          <div className="form flex flex-col">
            <h2 className="font-roboto text-[24px] font-semibold leading-[28.8px] text-left mt-[35px] mb-[41.8px]">
              Sign in to Urban Venue
            </h2>
            {error && <div className="text-red-600 mb-4">{error}</div>}
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 text-sm font-semibold">
                Your Email*
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your email"
                className="outline-none h-[48px] px-4 border-[1px] bg-[#F9F9F9] rounded-tl-[3px]"
              />
            </div>
            <div className="flex flex-col mt-5 relative">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="text-sm font-semibold">
                  Password*
                </label>
                <Link
                  to="/"
                  className="transition-all duration-400 ease text-Primary hover:underline"
                >
                  Forget Password?
                </Link>
              </div>
              <div className="relative bg-[#F9F9F9]">
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  className="w-[370.66px] h-[48px] rounded-tl-[3px] border-[1px] bg-[#F9F9F9]"
                >
                  <Grid item xs>
                    <input
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter Your password"
                      className="outline-none w-full h-[48px] px-4 border border-transparent rounded-tl-[3px] bg-[#F9F9F9] pr-[3rem]"
                    />
                  </Grid>
                  <Grid item>
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="start"
                      className="pr-2"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
            </div>
            {/* User Type Select */}
            <div className="flex flex-col mt-5">
              <label htmlFor="userType" className="text-sm font-semibold">
                User Type*
              </label>
              <select
                id="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="outline-none h-[48px] px-4 border-[1px] bg-[#F9F9F9] rounded-tl-[3px]"
              >
                <option value="Executive">Executive</option>
                <option value="Admin">Admin</option>
                <option value="SuperAdmin">SuperAdmin</option>
              </select>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full mt-5 bg-Primary text-white h-[50px] flex justify-center items-center rounded-tl-[3px] border-t border-transparent px-6 py-1"
            >
              <p>Sign In</p>
              <ExitToAppIcon className="ml-1" />
            </button>
          </div>
          <p className="text-[14px] font-normal leading-[21px] text-center mt-4 sm:text-xs">
            © 2024, Barren. All rights reserved. Powered by Gambolthemes
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn

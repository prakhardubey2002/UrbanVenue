import React from 'react'
import { useLocation } from 'react-router-dom'
import Logo from '../assets/Logo.png'
const Invoice = () => {
  const location = useLocation()
  const formData = location.state

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-start">
      <div className="flex flex-col w-[80%]">
        <div className="px-4 bg-Primary h-[14vh] flex justify-between items-center ">
          <img src={Logo} alt="" />
          <p className="text-white" >Dwonload</p>
        </div>
        <div>
          
        </div>
      </div>
    </div>
  )
}

export default Invoice

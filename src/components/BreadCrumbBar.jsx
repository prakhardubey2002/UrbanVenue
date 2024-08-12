import React from 'react'
import { Link, useLocation } from 'react-router-dom'
const BreadCrumbBar = () => {
  const location = useLocation()
  const path = location.pathname
  return (
    <div className="bg-gradient-to-r from-startgradient to-endgradient h-[20vh] w-full flex justify-start items-center px-8 ">
      <Link className='font-semibold' to="/" >Home</Link>
      {path}
    </div>
  )
}

export default BreadCrumbBar

import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Cover from '../assets/cover.png'

const BreadCrumbBar = () => {
  const location = useLocation()
  const path = location.pathname

  return (
    <div 
      className="h-[20vh] w-full flex justify-start items-center px-8 relative bg-cover bg-center" 
      style={{ backgroundImage: `url(${Cover})` }}
    >
      <div className="relative z-10 text-black flex">
        <Link className="font-semibold" to="/">Home</Link>
        <p>
        {path}
        </p>
      </div>
      {/* <div className="absolute inset-0 bg-black opacity-30"></div> */}
    </div>
  )
}

export default BreadCrumbBar

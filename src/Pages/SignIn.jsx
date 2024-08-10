import React from 'react'
import Logo from '../assets/Logo.png'
import { Link } from 'react-router-dom'
const SignIn = () => {
  return (
    <>
      <div className="main">
        <div className="left">
          <img src={Logo} alt="" />
          <h2>The Easiest Way to Create Events</h2>
        </div>
        <div className="right">
          <div className="main">
            <h2>Sign in to Urban Venue</h2>
            <div className="form">
              <div>
                <label htmlFor="">Your Email*</label>
                <input type="email" placeholder="Enter Your email" />
              </div>
              <div>
                <div>
                  <label htmlFor="">Password*</label>
                  <Link to="/">Forget Password?</Link>
                </div>
                <input type="password" placeholder="Enter Your email" />
              </div>
              <button>Sign In </button>
            </div>
          </div>
          <p>© 2024, Barren. All rights reserved. Powered by Gambolthemes</p>
        </div>
      </div>
    </>
  )
}

export default SignIn

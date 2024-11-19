import React, { useContext, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import CreateEvent from './pages/CreateEvent'
import {
  ADMIN_CALCULATE,
  ADMIN_DASHBOARD,
  ADMIN_INVOICE,
  ALL_EXECUTIVE,
  ALL_FARMS,
  ALL_OCCASION,
  All_ADMIN,
  CREATE_ADMIN,
  CREATE_EXECUTIVE,
  CREATE_FARMS,
  CREATE_FORM,
  CREATE_OCCASION,
  CREATE_ROUTE,
  DASHBOARD_ROUTE,
  INVOICE_ROUTE,
  PREBOOK,
  PREBOOK_BY_DATERANGE,
  PREBOOK_PROPERTY,
  REPORT,
  SIGNIN_ROUTE,
  SUPER_ADMIN_DASHBOARD,
  SUPER_ADMIN_INVOICE,
} from './routes/Routes'
import CreateVenueEvent from './pages/CreateVenueEvent'
import Invoice from './pages/Invoice'
import AuthContext, { AuthProvider } from './context/context'
import { Toaster } from 'react-hot-toast'
import Admin from './pages/Admin'
import AllFarms from './pages/AllFarms'
import CreateFarm from './pages/CreateFarm'
import AllExecutive from './pages/AllExecutive'
import CreateExecutive from './pages/CreateExecutive'
import OccasionList from './pages/OccasionList'
import CreateOccasion from './pages/CreateOccasion'
import SuperAdmin from './pages/SuperAdmin'
import AllAdmin from './pages/AllAdmin'
import CreateAdmin from './pages/CreateAdmin'
import Report from './pages/Report'
import AdminCalculate from './pages/AdminCalculate'
import PreBook from './pages/PreBook'
import { toast } from 'react-hot-toast'
import Prebook_Property from './pages/Prebook_Property'
import PrebookbyDateRange from './pages/Prebook_Daterange'
import AdminInvoice from './pages/Admin_Invoice'
import Superadmininvoice from './pages/Superadmininvoice'

const App = () => {
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    // Skip the redirect if the current route is the SIGNIN_ROUTE
    if (!token && location.pathname !== SIGNIN_ROUTE) {
      toast.error('Please login first')
      navigate(SIGNIN_ROUTE)
    }
  }, [token, navigate, location.pathname])

  return (
    <div>
      <Routes>
        <Route path={SIGNIN_ROUTE} element={<SignIn />} />
        <Route path={ADMIN_DASHBOARD} element={<Admin />} />
        <Route path={PREBOOK} element={<PreBook />} />
        <Route path={ALL_FARMS} element={<AllFarms />} />
        <Route path={ALL_EXECUTIVE} element={<AllExecutive />} />
        <Route path={SUPER_ADMIN_DASHBOARD} element={<SuperAdmin />} />
        <Route path={All_ADMIN} element={<AllAdmin />} />
        <Route path={CREATE_ADMIN} element={<CreateAdmin />} />
        <Route path={ADMIN_CALCULATE} element={<AdminCalculate />} />
        <Route path={REPORT} element={<Report />} />
        <Route path={CREATE_FARMS} element={<CreateFarm />} />
        <Route path={ALL_OCCASION} element={<OccasionList />} />
        <Route path={CREATE_OCCASION} element={<CreateOccasion />} />
        <Route path={CREATE_EXECUTIVE} element={<CreateExecutive />} />
        <Route path={DASHBOARD_ROUTE} element={<Dashboard />} />
        <Route path={CREATE_ROUTE} element={<CreateEvent />} />
        <Route path={CREATE_FORM} element={<CreateVenueEvent />} />
        <Route path={INVOICE_ROUTE} element={<Invoice />} />
        <Route path={PREBOOK_PROPERTY} element={<Prebook_Property />} />
        <Route path={PREBOOK_BY_DATERANGE} element={<PrebookbyDateRange />} />
        <Route path={ADMIN_INVOICE} element={<AdminInvoice />} />
        <Route path={SUPER_ADMIN_INVOICE} element={<Superadmininvoice />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}

export default App

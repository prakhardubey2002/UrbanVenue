import { Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import CreateEvent from './pages/CreateEvent'
import {
  ADMIN_CALCULATE,
  ADMIN_DASHBOARD,
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
  REPORT,
  SIGNIN_ROUTE,
  SUPER_ADMIN_DASHBOARD,
} from './routes/Routes'
import CreateVenueEvent from './pages/CreateVenueEvent'
import Invoice from './pages/Invoice'
import { AuthProvider } from './context/context'
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
const App = () => {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path={SIGNIN_ROUTE} element={<SignIn />} />
          <Route path={ADMIN_DASHBOARD} element={<Admin />} />
          <Route path={ALL_FARMS} element={<AllFarms />} />
          <Route path={ALL_EXECUTIVE} element={<AllExecutive />} />
          <Route path={SUPER_ADMIN_DASHBOARD} element={<SuperAdmin />} />
          <Route path={All_ADMIN} element={<AllAdmin />} />
          <Route path={CREATE_ADMIN} element={<CreateAdmin />} />
          <Route path={ADMIN_CALCULATE} element ={<AdminCalculate/>}/>
          <Route path={REPORT} element={<Report />} />
          <Route path={CREATE_FARMS} element={<CreateFarm />} />
          <Route path={ALL_OCCASION} element={<OccasionList />} />
          <Route path={CREATE_OCCASION} element={<CreateOccasion />} />
          <Route path={CREATE_EXECUTIVE} element={<CreateExecutive />} />
          <Route path={DASHBOARD_ROUTE} element={<Dashboard />} />
          <Route path={CREATE_ROUTE} element={<CreateEvent />} />
          <Route path={CREATE_FORM} element={<CreateVenueEvent />} />
          <Route path={INVOICE_ROUTE} element={<Invoice />} />
        </Routes>
        <Toaster position="top-right" reverseOrder={false} />
      </AuthProvider>
    </div>
  )
}

export default App

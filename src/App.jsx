import { Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import CreateEvent from './pages/CreateEvent'
import {
  ADMIN_DASHBOARD,
  ALL_FARMS,
  CREATE_FORM,
  CREATE_ROUTE,
  DASHBOARD_ROUTE,
  INVOICE_ROUTE,
  SIGNIN_ROUTE,
} from './routes/Routes'
import CreateVenueEvent from './pages/CreateVenueEvent'
import Invoice from './pages/Invoice'
import { AuthProvider } from './context/context'
import { Toaster } from 'react-hot-toast'
import Admin from './pages/Admin'
import AllFarms from './pages/AllFarms'
const App = () => {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path={SIGNIN_ROUTE} element={<SignIn />} />
          <Route path={ADMIN_DASHBOARD} element={<Admin/>}/>
          <Route path={ALL_FARMS} element={<AllFarms/>}/>
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

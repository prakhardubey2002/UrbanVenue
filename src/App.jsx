import { Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import CreateEvent from './pages/CreateEvent'
import {
  CREATE_FORM,
  CREATE_ROUTE,
  DASHBOARD_ROUTE,
  INVOICE_ROUTE,
  SIGNIN_ROUTE,
} from './routes/Routes'
import CreateVenueEvent from './pages/CreateVenueEvent'
import Invoice from './pages/Invoice'
import { AuthProvider } from './context/context'
const App = () => {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path={SIGNIN_ROUTE} element={<SignIn />} />
          <Route path={DASHBOARD_ROUTE} element={<Dashboard />} />
          <Route path={CREATE_ROUTE} element={<CreateEvent />} />
          <Route path={CREATE_FORM} element={<CreateVenueEvent />} />
          <Route path={INVOICE_ROUTE} element={<Invoice />} />
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App

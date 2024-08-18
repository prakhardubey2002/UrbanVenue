import { Routes, Route } from 'react-router-dom'
import SignIn from './Pages/SignIn'
import Dashboard from './Pages/Dashboard'
import CreateEvent from './Pages/CreateEvent'
import {
  CREATE_FORM,
  CREATE_ROUTE,
  DASHBOARD_ROUTE,
  SIGNIN_ROUTE,
} from './routes/Routes'
import CreateVenueEvent from './pages/CreateVenueEvent'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path={SIGNIN_ROUTE} element={<SignIn />} />
        <Route path={DASHBOARD_ROUTE} element={<Dashboard />} />
        <Route path={CREATE_ROUTE} element={<CreateEvent />} />
        <Route path={CREATE_FORM} element={<CreateVenueEvent />} />
      </Routes>
    </div>
  )
}

export default App

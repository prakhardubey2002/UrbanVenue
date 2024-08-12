import { Routes, Route } from 'react-router-dom'
import SignIn from './Pages/SignIn'
import Dashboard from './Pages/Dashboard'
import CreateEvent from './Pages/CreateEvent'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Create" element={<CreateEvent />} />
      </Routes>
    </div>
  )
}

export default App

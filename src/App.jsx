import { Routes, Route } from "react-router-dom"
import SignIn from './Pages/SignIn';
import Dashboard from './Pages/Dashboard';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </div>

  );
}

export default App

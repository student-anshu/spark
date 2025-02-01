import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from './pages/Signin'
import Signup from './pages/Signup';
import Home from './pages/Home';
import ProtectedRoute from "./components/ProtectedRoute";
import Calcender from './pages/calcender';


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/calender" element={<Calcender />} />
          </Route>

          {/* Redirect any unknown routes */}
          <Route path="*" element={<Signin />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

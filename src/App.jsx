import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from './pages/Signin'
import Signup from './pages/Signup';
import Today from './pages/Today';
import ProtectedRoute from "./components/ProtectedRoute";
import Calcender from './pages/calcender';
import NewTask from './pages/NewTask';


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Today />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/calender" element={<Calcender />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/today" element={<Today />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/create" element={<NewTask />} />
          </Route>

          {/* Redirect any unknown routes */}
          <Route path="*" element={<Signin />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

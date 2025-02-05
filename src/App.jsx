import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from './pages/Signin'
import Signup from './pages/Signup';
import Today from './pages/Today';
import ProtectedRoute from "./components/ProtectedRoute";
import Calender from './pages/calender';
import NewTask from './pages/NewTask';
import { AuthProvider } from './context/AuthContext';
import Task from './pages/Task';
import Up from './pages/Up';
import StickyWall from './pages/StickyWall';



const App = () => {
  return (
    <>

      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Today />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/calender" element={<Calender />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/upcoming" element={<Up />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/sticky" element={<StickyWall />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/today" element={<Today />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/tasks/:listId" element={<Task />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/create" element={<NewTask />} />
            </Route>

            {/* Redirect any unknown routes */}
            <Route path="*" element={<Signin />} />
          </Routes>
        </AuthProvider>
      </Router>

    </>
  )
}

export default App

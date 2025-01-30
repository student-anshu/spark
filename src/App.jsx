import React from 'react'
import Singin from './components/Singin'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './components/Signup';


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Singin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

import React from 'react'
import Login from './components/Login'
import RegisterPage from './components/RegisterPage'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './components/HomePage'
import AddBook from './components/AddBook'
const App = () => {
  return (
    <div >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/add-book" element={<AddBook />} />
      </Routes>
    </div>
  )
}

export default App

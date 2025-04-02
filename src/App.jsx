import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from "./pages/Signup";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Budget from "./components/Budget";
import NotFound from "./pages/NotFound";
import './App.css';
import "./styles/globals.css";
import FinancialReport from "./components/FinancialReport";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(()=> !!!localStorage.getItem("token"));
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set isLoggedIn based on token presence
  }, [location]);

  return (
    <>
      {/* Hide Navbar on Home, Login, and Signup pages */}
      {location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/' && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/transactions" element={isLoggedIn ? <Transactions /> : <Navigate to="/login" />} />
        <Route path="/budget" element={isLoggedIn ? <Budget /> : <Navigate to="/login" />} />
        <Route path="/financial-report" element={isLoggedIn ? <FinancialReport /> : <Navigate to="/login" />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
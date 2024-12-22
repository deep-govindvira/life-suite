import './App.css';
import Navbar from './Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Home from './home/Home';
import Todo from './todo/Todo';
import Note from './note/Note';
import NoteAdd from './note/NoteAdd';
import NoteUpdate from './note/NoteUpdate';
import Expense from './expense/Expense';
import Login from './login/Login'; // Import Login component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);  // New state to track if we are checking the login status

  useEffect(() => {
    // Check if the user is logged in by checking localStorage
    const user = localStorage.getItem('username');
    if (user) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);  // Once the check is complete, stop loading
  }, []); // The empty dependency array ensures this runs only once when the component mounts

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      setIsLoggedIn(false);
    }
  };

  // Prevent rendering until the login check is complete
  if (isLoading) {
    return (
      <div class="text-center text-primary">
      Loading...
    </div>
    

    )
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Navbar isLoggedIn={isLoggedIn} onLoginLogout={handleLoginLogout} />
        </div>
        <Routes>
          {/* Redirect to login if not logged in */}
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login onLogin={setIsLoggedIn} />} />
          
          {/* Protected Routes - Redirect to login if not logged in */}
          <Route path='/Todo' element={isLoggedIn ? <Todo /> : <Navigate to="/login" />} />
          <Route path='/Note' element={isLoggedIn ? <Note /> : <Navigate to="/login" />} />
          <Route path='/Note/Add' element={isLoggedIn ? <NoteAdd /> : <Navigate to="/login" />} />
          <Route path='/Note/:id' element={isLoggedIn ? <NoteUpdate /> : <Navigate to="/login" />} />
          <Route path='/Expense' element={isLoggedIn ? <Expense /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
      <div className="fixed-bottom bg-dark text-light">Deep Govindvira © 2024</div>
    </div>
  );
}

export default App;

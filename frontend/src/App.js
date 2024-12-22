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

  useEffect(() => {
    // Check if user is logged in by checking localStorage
    const user = localStorage.getItem('username');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Navbar isLoggedIn={isLoggedIn} onLoginLogout={handleLoginLogout} />
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login onLogin={setIsLoggedIn} />} />
          
          {/* Only allow access to routes if logged in */}
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

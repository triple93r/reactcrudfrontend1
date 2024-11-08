import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
//import AddUser from './AddUser'; // Correct import for AddUser
import PrivateRoute from './PrivateRoute';
import React, { useEffect } from 'react';
import api, { setAuthToken } from './api';
import UserList from './components/UserList';

function App() {
  useEffect(() => {
    // Check if a token exists in local storage on app load
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public route for login */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected route for dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

{/*         <Route
          path="/AddUser" // Define route for AddUser
          element={
            <PrivateRoute>
              <AddUser />
            </PrivateRoute>
          }
        /> */}

 {/* Protected route for UserList */}
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UserList />
            </PrivateRoute>
          }
        />
{/* Redirect to dashboard if no route matches */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
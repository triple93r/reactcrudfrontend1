import React, { useEffect, useState } from 'react';
import { logout, verifyAuth } from './api';

const Dashboard: React.FC = () => {

  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      <p>This is a protected page that only authenticated users can see.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';

const Dashboard = () => {
  const navigate = useNavigate();
  const inactivityTimeLimit = 5 * 60 * 1000; // Set inactivity limit to 5 minutes

  const handleLogout = () => {
    // Clear all session storage data
    sessionStorage.clear();

    // Redirect to login page
    navigate('/login');
  };

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(handleLogout, inactivityTimeLimit); // Auto-logout after inactivity time limit
    };

    const handleUserActivity = () => {
      resetTimer();
    };

    // Reset timer on user activity
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keypress', handleUserActivity);
    window.addEventListener('click', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);
    window.addEventListener('touchstart', handleUserActivity);

    // Initialize the timer
    resetTimer();

    // Cleanup event listeners on component unmount
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keypress', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
      window.removeEventListener('touchstart', handleUserActivity);
    };
  }, []);

  return (
    <div>
        <Header 
         handleLogout={handleLogout}
        />
    </div>
  );
}

export default Dashboard;
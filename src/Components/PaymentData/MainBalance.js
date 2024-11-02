// MainBalance.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MainBalance = ({ userId }) => {
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch user's main balance
    const fetchBalance = async () => {
      try {
        const response = await axios.get(`https://tapbrust-backend.onrender.com/api/users/${userId}/balance`);
        if (response.data.success) {
          setBalance(response.data.mainBalance);
        } else {
          setMessage('Failed to fetch balance.');
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
        setMessage('An error occurred while fetching the balance.');
      }
    };

    fetchBalance();
  }, [userId]);

  return (
    <div>
      <h3>Main Balance: {balance} Taka</h3>
      {message && <p>{message}</p>}
    </div>
  );
};

export default MainBalance;

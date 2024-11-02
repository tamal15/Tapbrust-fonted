import React, { useState } from 'react';
import axios from 'axios';

const PaymentData = () => {
  const [bkashNumber, setBkashNumber] = useState('');
  const [refCode, setRefCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the data to the backend
      const response = await axios.post('https://tapbrust-backend.onrender.com/api/payments', {
        bkashNumber,
        refCode,
      });

      if (response.data.success) {
        setMessage('Payment submitted for verification.');
      } else {
        setMessage('Failed to submit payment.');
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            bKash Number:
            <input
              type="text"
              value={bkashNumber}
              onChange={(e) => setBkashNumber(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Reference Code:
            <input
              type="text"
              value={refCode}
              onChange={(e) => setRefCode(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PaymentData;

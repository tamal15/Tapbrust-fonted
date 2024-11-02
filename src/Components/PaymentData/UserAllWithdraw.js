import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';

const UserAllWithdraw = () => {
    const [withdrawalHistory, setWithdrawalHistory] = useState([]);
    const {user}=useAuth()



    useEffect(() => {
        const fetchWithdrawalHistory = async () => {
          try {
            const response = await fetch(`https://tapbrust-backend.onrender.com/all/withdraw-history`);
            const data = await response.json();
            if (data) {
              setWithdrawalHistory(data);
            }
          } catch (error) {
            console.error('Error fetching withdrawal history:', error);
          }
        };
    
        if (user.email) {
          fetchWithdrawalHistory();
        }
      }, [user.email]);
    return (
        <div>

<TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>email</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Account Number</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {withdrawalHistory.map((history, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(history?.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'Asia/Dhaka'  // Specify Dhaka time zone
            })}</TableCell>
                  <TableCell>{history.email}</TableCell>
                  <TableCell>{history.amount}</TableCell>
                  <TableCell>{history.mobileNumber}</TableCell>
                  <TableCell>{history.paymentMethod}</TableCell>
                  <TableCell>{history.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
            
        </div>
    );
};

export default UserAllWithdraw;
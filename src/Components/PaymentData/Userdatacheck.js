import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';

const Userdatacheck = () => {
    const [withdrawalHistory, setWithdrawalHistory] = useState([]);
    const [questions, setQuestions] = useState([]);
    const {user}=useAuth()



    useEffect(() => {
        fetch(`https://tapbrust-backend.onrender.com/adminConfarm`)
            .then((res) => res.json())
            .then((data) => setQuestions(data));
            // console.log(data)
    }, []);
    return (
        <div>

<TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>email</TableCell>
                <TableCell>Total Balance</TableCell>
                <TableCell>Telegram</TableCell>
                <TableCell> Reference</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questions.map((history, index) => (
                <TableRow key={index}>
                 
                  <TableCell>{history.displayName}</TableCell>
                  <TableCell>{history.email}</TableCell>
                  <TableCell>{history.balance}</TableCell>
                  <TableCell>{history.wallet}</TableCell>
                  <TableCell>{history.reference}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
            
        </div>
    );
};

export default Userdatacheck;
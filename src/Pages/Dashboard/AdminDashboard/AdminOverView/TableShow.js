import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useState } from 'react';
import TableOrderRow from './TableOrderRow';
const TableShow = () => {
    const [model, setModel] = useState([]);
    const fetchData = () => {
        fetch('https://tapbrust-backend.onrender.com/feedback')
          .then(res => res.json())
          // .then(data => setWork(data))
          .then(data => {
          //   const sliceData = data.slice(0, 8);
    
            setModel(data)
    
          })
      }
      useEffect(() => {
        fetchData()
      }, [])
  
    return (
        < >
        <TableContainer sx={{ width: { xs: "90vw", md: '98%' }, height: '100%', overflow: '' }} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Comment</TableCell>
                            <TableCell>Number</TableCell>
                            <TableCell>Rating</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            model.map(data => <TableOrderRow key={data._id} data={data}></TableOrderRow>) 

                        }
                    </TableBody>
                </Table>
            </TableContainer>
    </>
    );
};

export default TableShow;
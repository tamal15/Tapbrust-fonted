import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';

const AdminSeeSuport = () => {
  const [tickets, setTickets] = useState([]);
  const { user } = useAuth();

  // useEffect(() => {
  //   const fetchTickets = async () => {
  //     try {
  //       const response = await fetch('https://tapbrust-backend.onrender.com/api/support-tickets');
  //       const data = await response.json();
  //       setTickets(data);
  //     } catch (error) {
  //       console.error('Error fetching tickets:', error);
  //     }
  //   };

  //   fetchTickets();
  // }, []);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`https://tapbrust-backend.onrender.com/api/support-tickets`); // Use correct URL format
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };
  
    fetchTickets();
  }, [user?.email]); // Dependency on the email state or prop
  console.log(tickets)

  
  const handleActionClick = (ticketId) => {
    Swal.fire({
      title: 'Action',
      text: `Perform action for ticket ID: ${ticketId}`,
      icon: 'info',
      confirmButtonText: 'OK',
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://tapbrust-backend.onrender.com/ticketdelete/${id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                'Your ticket has been deleted.',
                'success'
              );
  
              // Filter out the deleted ticket from the state
              const remaining = tickets.filter(ticket => ticket._id !== id);
              setTickets(remaining);  // Update the state with the remaining tickets
            } else {
              Swal.fire(
                'Error!',
                'Failed to delete the ticket. Please try again.',
                'error'
              );
            }
          })
          .catch(error => {
            console.error('Error deleting ticket:', error);
            Swal.fire(
              'Error!',
              'An error occurred while deleting the ticket. Please try again later.',
              'error'
            );
          });
      }
    });
  };
  
  

  return (
    <Box sx={{ maxWidth: '95%', mx: 'auto', mt: 4, textAlign: 'left' }}>
      <Typography variant="h5" mb={2}>Support Tickets</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket._id}>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell>{ticket.date}</TableCell>
                <TableCell>{ticket.type}</TableCell>
                <TableCell>{ticket.email}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={()=>handleDelete(ticket?._id)}
                  >
                    Action
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminSeeSuport;

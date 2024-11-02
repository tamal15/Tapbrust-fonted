import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, CircularProgress, IconButton } from '@mui/material';
import Swal from 'sweetalert2';
import { CopyAll as CopyIcon } from '@mui/icons-material';

const AdminApprovalPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pending withdrawal requests from the backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('https://tapbrust-backend.onrender.com/api/withdraw-requests');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Handle approval of a withdrawal request
  const handleApprove = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to approve this withdrawal request?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      });

      if (result.isConfirmed) {
        const response = await fetch(`https://tapbrust-backend.onrender.com/api/approve-withdraw/${id}`, {
          method: 'PATCH',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const data = await response.json();
        Swal.fire('Success!', data.message, 'success');
        setRequests(requests.filter(request => request._id !== id)); // Remove the approved request from the list
      }
    } catch (error) {
      Swal.fire('Error!', error.message, 'error');
    }
  };

  // Handle rejection of a withdrawal request
  const handleReject = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to reject this withdrawal request?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      });

      if (result.isConfirmed) {
        // You can implement rejection logic here if needed, such as updating the request status to 'rejected'
        Swal.fire('Rejected!', 'The request has been rejected.', 'info');
        setRequests(requests.filter(request => request._id !== id)); // Remove the rejected request from the list
      }
    } catch (error) {
      Swal.fire('Error!', error.message, 'error');
    }
  };
  const handleCopy = (address) => {
    navigator.clipboard.writeText(address).then(() => {
        // Optionally, show a success message using SweetAlert2 or Snackbar
        Swal.fire({
            title: 'Copied!',
            text: 'Payment address copied to clipboard.',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    }).catch((err) => {
        console.error('Failed to copy: ', err);
        // You can show an error alert here if needed
    });
};

  return (
    <div className="admin-approval-page text-white">
      <Typography variant="h4" gutterBottom>
        Withdrawal Requests
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <List className='text-white'>
          {requests.map(request => (
            <ListItem key={request._id} divider>
             <ListItemText
 primary={`Amount: ${request.amount} Taka`}
 secondary={`Payment Method: ${request.paymentMethod}, Payment Address: ${request.mobileNumber}, email: ${request.email}`}
 primaryTypographyProps={{ style: { color: 'white' } }}
 secondaryTypographyProps={{ style: { color: 'white' } }}
/>
<IconButton onClick={() => handleCopy(request.mobileNumber)} color="inherit">
 <CopyIcon />
</IconButton>

              <Button
                variant="contained"
                color="success"
                onClick={() => handleApprove(request._id)}
                sx={{ marginRight: 1 }}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleReject(request._id)}
              >
                Reject
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default AdminApprovalPage;

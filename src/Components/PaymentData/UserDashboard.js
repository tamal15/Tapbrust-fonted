import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from '@mui/material';
import Swal from 'sweetalert2';

const NewUserDashboard = () => {
  const { user } = useAuth(); // Get the current logged-in user
  const [balance, setBalance] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [unpaidAmount, setUnpaidAmount] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [open, setOpen] = useState(false); // State for the withdrawal modal
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [referenceIncome, setReferenceIncome] = useState(0);
  const [alltotalwalletdata, setAlltotalwalletdata] = useState(0);
    const [showHistory, setShowHistory] = useState(false); // State for showing/hiding withdrawal history
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch the user's balance from the backend
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(`https://tapbrust-backend.onrender.com/users/${user.email}`);
        const data = await response.json();
        if (data) {
          setBalance(data.balance || 0);
          setPaidAmount(data.paidAmount || 0);
          setUnpaidAmount(data.unpaidAmount || 0);
          setReferenceIncome(data.reference || 0);
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    if (user.email) {
      fetchBalance();
    }
  }, [user.email]);

  // Fetch the total income for the user
  useEffect(() => {
    const fetchTotalIncome = async () => {
      try {
        const response = await fetch(`https://tapbrust-backend.onrender.com/myincome/${user.email}`);
        const data = await response.json();
        if (data && data.totalIncome) {
          setTotalIncome(data.totalIncome); // Set the total income to state
        }
      } catch (error) {
        console.error('Error fetching total income:', error);
      }
    };

    if (user.email) {
      fetchTotalIncome();
    }
  }, [user.email]);

  // Fetch withdrawal history
  useEffect(() => {
    const fetchWithdrawalHistory = async () => {
      try {
        const response = await fetch(`https://tapbrust-backend.onrender.com/api/withdraw-history/${user.email}`);
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

  // Handle pulling income to balance
  const handlePullIncome = async () => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to add your total income to your balance and reset the income to zero?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      });

      if (result.isConfirmed) {
        const response = await fetch(`https://tapbrust-backend.onrender.com/api/pull-income/${user.email}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBalance((prevBalance) => prevBalance + totalIncome); // Update balance
          setTotalIncome(0); // Reset total income in the state
          Swal.fire('Success!', data.message, 'success');
        } else {
          const errorData = await response.json();
          Swal.fire('Error!', errorData.message, 'error');
        }
      }
    } catch (error) {
      console.error('Error pulling income:', error);
      Swal.fire('Error!', 'An error occurred while processing your request.', 'error');
    }
  };


  const handlePullIncomes = async () => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to add your total income to your balance and reset the income to zero?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      });

      if (result.isConfirmed) {
        const response = await fetch(`https://tapbrust-backend.onrender.com/api/reference-pull-income/${user.email}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBalance((prevBalance) => prevBalance + referenceIncome); // Update balance
          setReferenceIncome(0); // Reset total income in the state
          Swal.fire('Success!', data.message, 'success');
        } else {
          const errorData = await response.json();
          Swal.fire('Error!', errorData.message, 'error');
        }
      }
    } catch (error) {
      console.error('Error pulling income:', error);
      Swal.fire('Error!', 'An error occurred while processing your request.', 'error');
    }
  };
  // Handle opening and closing the withdrawal modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


   // Fetch and sum wallet_amount from payment collection
   const fetchBalanceData = async () => {
    setLoading(true); // Display a loading indicator
    setError(null);   // Clear any previous errors
  
    try {
      const response = await fetch(`https://tapbrust-backend.onrender.com/payment-collection/${user.email}`);
      const data = await response.json();
  
      if (response.ok) {
        // Update the balance and wallet data from the server
        setBalance(data.currentBalance);  // Set the initial balance
        setAlltotalwalletdata(data.alltotalwalletdata);  // Store total wallet data
  
        // Display balance with wallet deductions
        // Swal.fire({
        //   title: 'Success!',
        //   text: `Balance updated. Current Balance: ${data.currentBalance}, After Wallet Deduction: ${data.updatedBalance}`,
        //   icon: 'success',
        //   confirmButtonText: 'OK',
        // });
  
        // Optionally update the balance in the UI after processing
        setTimeout(() => {
          setBalance(data.updatedBalance);  // Update the UI with the processed balance
        }, 2000);  // Simulate a slight delay for smooth UI transition
  
      } 
      else {
        // Handle error responses from the server
        // setError(data.message || 'Something went wrong');
        // Swal.fire({
        //   title: 'Error!',
        //   text: data.message || 'Something went wrong',
        //   icon: 'error',
        //   confirmButtonText: 'OK',
        // });
      }
    } 
    catch (error) {
      // setError('Error fetching data');
      // Swal.fire({
      //   title: 'Error!',
      //   text: 'Error fetching data from server.',
      //   icon: 'error',
      //   confirmButtonText: 'OK',
      // });
    } finally {
      setLoading(false);  // Stop the loading indicator
    }
  };
  
  // Fetch balance and wallet data when the component mounts
  useEffect(() => {
    if (user.email) {
      fetchBalanceData();  // Trigger the fetch on component mount
    }
  }, [user.email]);  // Only re-fetch if the user email changes
  
  
  



  






  


  // Update the balance by deducting the total wallet_amount
  useEffect(() => {
    setBalance((prevBalance) => prevBalance - alltotalwalletdata);
  }, [alltotalwalletdata]);

  // Handle withdrawal request submission
  const handleWithdrawSubmit = async () => {
    if (!withdrawalAmount || !paymentMethod || !mobileNumber) {
      Swal.fire('Error!', 'All fields are required.', 'error');
      return;
    }

    try {
      const response = await fetch('https://tapbrust-backend.onrender.com/api/withdraw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          amount: withdrawalAmount,
          paymentMethod,
          mobileNumber,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUnpaidAmount((prev) => prev + parseFloat(withdrawalAmount)); // Update unpaid amount
        setBalance((prev) => prev - parseFloat(withdrawalAmount)); // Deduct the withdrawn amount from balance
        handleClose(); // Close the modal
        Swal.fire('Success!', data.message, 'success');
        // Refresh withdrawal history after successful withdrawal
        const updatedHistoryResponse = await fetch(`https://tapbrust-backend.onrender.com/api/withdraw-history/${user.email}`);
        const updatedHistory = await updatedHistoryResponse.json();
        setWithdrawalHistory(updatedHistory);
      } else {
        const errorData = await response.json();
        Swal.fire('Error!', errorData.message, 'error');
      }
    } catch (error) {
      console.error('Error submitting withdrawal request:', error);
      Swal.fire('Error!', 'An error occurred while submitting your request.', 'error');
    }
  };

  // Toggle withdrawal history visibility
  const toggleHistory = () => setShowHistory((prev) => !prev);

  return (
    <div className="dashboard">
      <Typography variant="h4" style={{fontWeight:"600" ,marginBottom:"20px"}}>My Wallet</Typography>

<Box
  sx={{
    p: 3, // Padding for the outer box
    border: '1px solid #ddd', // Light border
    borderRadius: '8px', // Rounded corners
    backgroundColor: 'white', // Light gray background
    boxShadow: "0px 10px 22px rgb(42 135 158 / 50%)",
    marginLeft:"15px",marginRight:"15px"
  }}
>
  <Grid container spacing={2}>
    {/* Column 1: Paid Amount */}
    <Grid item xs={12} sm={4}>
      <Box
        sx={{
          p: 2,
          border: '1px solid #eee',
          borderRadius: '8px',
          backgroundColor: '#113350',
          color:"white",
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" >
          Paid Amount: <strong>{paidAmount} Taka</strong>
        </Typography>
      </Box>
    </Grid>

    {/* Column 2: Unpaid Amount */}
    <Grid item xs={12} sm={4}>
      <Box
        sx={{
          p: 2,
          border: '1px solid #eee',
          borderRadius: '8px',
          backgroundColor: '#427bb1',
          color:"white",
          textAlign: 'center',
        }}
      >
        <Typography variant="h6">
          Processing: <strong> 00 Taka</strong>
        </Typography>
      </Box>
    </Grid>

    <Grid item xs={12} sm={4}>
      <Box
        sx={{
          p: 2,
          border: '1px solid #eee',
          borderRadius: '8px',
          backgroundColor: '#113350',
          color:"white",
          textAlign: 'center',
        }}
      >
        <Typography variant="h6">
          Unpaid : <strong>{unpaidAmount} Taka</strong>
        </Typography>
      </Box>
    </Grid>
    
  </Grid>
</Box>

      <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: '8px', backgroundColor: 'white',      boxShadow: "0px 10px 22px rgb(42 135 158 / 50%)", mt: 3 , mb:3,marginLeft:"15px",marginRight:"15px"}}>
        {/* Grid layout for 3 columns */}
        <Grid container spacing={2}>
          {/* Row 1: Balance and Withdraw */}
          <Grid style={{textAlign:"left"}} item xs={6} sm={6} md={6}>
            <Typography variant="h6">Total Balance: BDT {balance} Taka</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" style={{background:"#173760"}} onClick={handleOpen}>
              Withdraw
            </Button>
          </Grid>
        

          {/* Row 2: Total Income and Pull Income */}
          <Grid style={{textAlign:"left"}} item xs={6} sm={6} md={6}>
            <Typography variant="h6">Reselling Commission: BDT {totalIncome} Taka</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" onClick={handlePullIncome}>
              Pull Income to Balance
            </Button>
          </Grid>

          {/* Row 3: reference code */}
          <Grid style={{textAlign:"left"}} item xs={6} sm={6} md={6}>
            <Typography variant="h6">reference: BDT {referenceIncome} Taka</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" onClick={handlePullIncomes}>
              Pull Income to Balance
            </Button>
          </Grid>

           
         

          {/* Row 4: Show Withdrawal History */}
          <Grid style={{textAlign:"left"}} item xs={6} sm={6} md={6}>
            <Typography variant="h6">Withdrawal History</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" style={{background:"#173760"}} onClick={toggleHistory}>
              {showHistory ? 'Hide Withdrawal History' : 'Show Withdrawal History'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Withdrawal Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
          }}
        >
  
  <TextField
  label="Amount"
  type="number"
  value={withdrawalAmount}
  onChange={(e) => {
    setWithdrawalAmount(e.target.value); // Immediate update for typing
  }}
  onBlur={() => {
    // Convert the input to a number for validation on blur (when focus leaves the field)
    const numericValue = Number(withdrawalAmount);

    // Ensure no withdrawal is made below 200 Taka unless balance is 0
    if (numericValue < 200 && numericValue !== 0) {
      alert("Withdrawal amount must be at least 200 Taka unless your balance is 0.");
      setWithdrawalAmount("");
    }
  }}
  fullWidth
  margin="normal"
/>






          <TextField
            select
            label="Payment Method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Bkash">Bkash</MenuItem>
            <MenuItem value="Rocket">Rocket</MenuItem>
            <MenuItem value="Nagad">Nagad</MenuItem>
          </TextField>
          <TextField
            label="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleWithdrawSubmit}>
            Submit
          </Button>
        </Box>
      </Modal>

      {/* Withdrawal History Table */}
      {showHistory && (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
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
                  <TableCell>{history.amount}</TableCell>
                  <TableCell>{history.mobileNumber}</TableCell>
                  <TableCell>{history.paymentMethod}</TableCell>
                  <TableCell>{history.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default NewUserDashboard;

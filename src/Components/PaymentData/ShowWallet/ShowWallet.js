import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import useAuth from '../../../Hooks/useAuth';
import DiamondIcon from '@mui/icons-material/Diamond'; 
import { AiOutlineExclamationCircle } from "react-icons/ai";

import {
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

const ShowWallet = () => {
    const { user } = useAuth(); // Get the current logged-in user
    const [balance, setBalance] = useState(0);
    const [paidAmount, setPaidAmount] = useState(0);
    const [dataWallet, setdataWallet] = useState(0);
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
            setdataWallet(data.wallet || 0);
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
            const response = await fetch(`https://tapbrust-backend.onrender.com/api/datawallet-pull-income/${user.email}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            if (response.ok) {
              const data = await response.json();
              setBalance((prevBalance) => prevBalance + dataWallet); // Update balance
              setdataWallet(0); // Reset total income in the state
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
    
        
    
          // Optionally update the balance in the UI after processing
          setTimeout(() => {
            setBalance(data.updatedBalance);  // Update the UI with the processed balance
          }, 2000);  // Simulate a slight delay for smooth UI transition
    
        } 
        else {
         
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
    <Box
    sx={{
      height: '100vh',
      backgroundImage: 'url("https://i.ibb.co.com/fQHbxSs/IMG-20241019-025435.jpg")', // Set the background image here
      backgroundSize: 'cover', // Ensures the image covers the entire page
      backgroundPosition: 'center', // Centers the image
      backgroundRepeat: 'no-repeat', // Prevents the image from repeating
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
    className="background-theme"
    >
      {/* Top section with user data */}
      <Box
        sx={{
          p: 3,
          mt: 4,
          borderRadius: '8px',
          mx: '20px',
          textAlign: 'center',
          backgroundImage: `
          linear-gradient(
            rgba(255, 0, 150, 0.5), /* First color - pinkish */
           rgb(22, 41, 56),
          rgba(255, 0, 150, 0.5)
           
          )`,flex: 1,overflowY: 'auto', flexGrow: 1 , marginBottom:"85px"
        }}
      >
       
       <div className="dashboard">
      <Typography variant="h4" style={{fontWeight:"600" ,marginBottom:"20px"}}>My Wallet</Typography>

      <h2>Comming Soon !!!!!!!</h2>

{/* <Box
  sx={{
    p: 3, 
    border: '1px solid #ddd', 
    borderRadius: '8px', 
    backgroundImage: `
            linear-gradient(
              rgba(255, 0, 150, 0.5), 
             rgb(22, 41, 56),
             rgb(16, 19, 26)
             
            )`,
    boxShadow: "0px 10px 22px rgb(42 135 158 / 50%)",
    marginLeft:"15px",marginRight:"15px",
  }}
>
  <Grid container spacing={2}>
  
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
          Paid Amount: <strong>{paidAmount} <DiamondIcon/></strong>
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
        Processing : <strong>{unpaidAmount} <DiamondIcon/></strong>
        </Typography>
      </Box>
    </Grid>
    
  </Grid>
</Box> */}

      {/* <Box sx={{flex: 1,overflowY: 'auto', flexGrow: 1 , p: 3, border: '1px solid #ddd', borderRadius: '8px', backgroundImage: `
            linear-gradient(
              rgba(255, 0, 150, 0.5), 
             rgb(22, 41, 56),
             rgb(16, 19, 26)
             
            )`,color:"white",     boxShadow: "0px 10px 22px rgb(42 135 158 / 50%)", mt: 3 , marginLeft:"15px",marginRight:"15px"}}>
      
        <Grid container spacing={2}>
        
          <Grid style={{textAlign:"left"}} item xs={6} sm={6} md={6}>
            <Typography variant="h6">Total Balance:  {balance} <DiamondIcon/></Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" style={{background:"#173760"}} onClick={handleOpen}>
              Withdraw
            </Button>
          </Grid>
        

       
         
         

       
          <Grid style={{textAlign:"left"}} item xs={6} sm={6} md={6}>
            <Typography variant="h6">Reference:  {referenceIncome} <DiamondIcon/></Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" onClick={handlePullIncomes}>
              Pull Income to Balance
            </Button>
          </Grid>
          <Grid style={{textAlign:"left"}} item xs={6} sm={6} md={6}>
            <Typography variant="h6">Telegram:  {dataWallet} <DiamondIcon/></Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" onClick={handlePullIncome}>
              Pull Income to Balance
            </Button>
          </Grid>

           
         

         
          <Grid style={{textAlign:"left"}} item xs={6} sm={6} md={6}>
            <Typography variant="h6">Withdrawal History</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" style={{background:"#173760"}} onClick={toggleHistory}>
              {showHistory ? 'Hide Withdrawal History' : 'Show Withdrawal History'}
            </Button>
          </Grid>
        </Grid>
      </Box> */}

     
      {/* <Modal open={open} onClose={handleClose}>
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
  <h5><AiOutlineExclamationCircle style={{color:"red"}}/> Address must be in  USDT. USDT address must be on BSC(BEP20)</h5>
  <TextField
  label="Dimond"
  type="number"
  value={withdrawalAmount}
  onChange={(e) => {
    setWithdrawalAmount(e.target.value); 
  }}
  onBlur={() => {
   
    const numericValue = Number(withdrawalAmount);

    
    if (numericValue < 20 && numericValue !== 0) {
      alert("Withdrawal amount must be at least 20 Dimond unless your balance is 0.");
      setWithdrawalAmount("");
    }
  }}
  fullWidth
  margin="normal"
/>






          <TextField
            select
            label="Address Origin"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Binance">Binance</MenuItem>
            <MenuItem value="Bitget">Bitget</MenuItem>
            <MenuItem value="Bybit">Bybit</MenuItem>
          </TextField>
          <TextField
            label="Enter Your Wallet address"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleWithdrawSubmit}>
            Submit
          </Button>
        </Box>
      </Modal> */}

     
      {/* {showHistory && (
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
                timeZone: 'Asia/Dhaka'  
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
      )} */}
    </div>
      </Box>

      {/* Bottom Navbar */}
      <Box  sx={{
          position: 'fixed',  // Fix the navbar at the bottom
          bottom: 0,
          left: 0,
          right: 0,
          backgroundImage: `
            linear-gradient(
              rgba(255, 0, 150, 0.5), 
              rgb(22, 41, 56),
              rgb(16, 19, 26)
            )`,
          padding: '10px',
          display: 'flex',
          justifyContent: 'space-around',
          borderTop: '1px solid #444',
        }}>
      <Box>
  <NavLink style={{ color: 'white', textDecoration: 'none' }} to="/showNotice">
    <Button 
      startIcon={
        <NotificationsIcon sx={{ color: '#ff7e5f', fontSize: '50px', fontWeight: 'bold' }} />
      }
    />
    <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>Notice</Typography>
  </NavLink>
</Box>
       <Box>
       <NavLink style={{ color: 'white', textDecoration: 'none' }} to="/firstProfile">
          <Button startIcon={<GroupAddIcon sx={{ color: '#43cea2',fontSize: '50px' }} />}></Button>
          <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>Invite</Typography>
        </NavLink>
       </Box>
        <Box>
        <NavLink style={{ color: 'white', textDecoration: 'none' }} to="/">
          <Button startIcon={<HomeIcon sx={{ color: '#4ac7e6',fontSize: '50px' }} />}></Button>
          <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>Home</Typography>
        </NavLink>
        </Box>
       <Box>
       <NavLink style={{ color: 'white', textDecoration: 'none' }} to="/showEarn">
          <Button startIcon={<ListAltIcon sx={{ color: '#0f0',fontSize: '50px' }} />}></Button>
          <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>Earn</Typography>
        </NavLink>
       </Box>
       <Box>
       <NavLink style={{ color: 'white', textDecoration: 'none' }} to="/showWallet">
          <Button startIcon={<AccountBalanceWalletIcon sx={{ color: '#ffb600',fontSize: '50px' }} />}></Button>
          <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>Wallet</Typography>
        </NavLink>
       </Box>
      </Box>
    </Box>
  );
};

export default ShowWallet;

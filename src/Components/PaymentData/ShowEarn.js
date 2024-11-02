import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import useAuth from '../../Hooks/useAuth';
import { FaTelegram } from 'react-icons/fa';
import DiamondIcon from '@mui/icons-material/Diamond'; 


const ShowEarn = () => {
  const [questions, setQuestions] = useState([]);
  const { user } = useAuth(); // Get the current logged-in user
  const [userData, setUserData] = useState({ name: '', email: '', referralCode: '', tran_id: '' });
  
  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://tapbrust-backend.onrender.com/api/user-details?email=${user.email}`);
        const data = await response.json();
        if (data) {
          setUserData({
            name: data.name,
            email: data.email,
            referralCode: data.referralCode,
            tran_id: data.tran_id,
          });
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (user.email) {
      fetchUserDetails();
    }
  }, [user.email]);

  // Fetch notices
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch('https://tapbrust-backend.onrender.com/shownotice');
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices();
  }, []);

  // Function to handle wallet update when Telegram channel is joined
  const handleJoinConfirmation = async () => {
    try {
      const response = await fetch('https://tapbrust-backend.onrender.com/update-wallet', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email, amount: 2 }),  // Use user.email here
      });
  
      const message = await response.text();
      if (response.ok) {
        alert(message);  // Alert user with the response message
      } else {
        console.error('Failed to update wallet:', message);
        alert(message);  // Show error message to the user
      }
    } catch (error) {
      console.error('Error updating wallet:', error);
    }
  };

  return (
    <Box
      sx={{
        height: '95vh',
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
             rgb(16, 19, 26)
             
            )`,
          
        }}
      >
      
        {/* Notice Section */}
        {/* {questions?.map((question, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="h6">{question?.date}</Typography>
            <Typography variant="h5">{question?.tittle}</Typography>
            <Typography variant="body1">{question?.description}</Typography>
          </Box>
        ))} */}
        {/* Telegram link */}
        <h2>
       Task
        </h2>
      </Box>


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
             rgb(16, 19, 26)
             
            )`,
          
        }}
      >
      
        {/* Notice Section */}
        {/* {questions?.map((question, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="h6">{question?.date}</Typography>
            <Typography variant="h5">{question?.tittle}</Typography>
            <Typography variant="body1">{question?.description}</Typography>
          </Box>
        ))} */}
        {/* Telegram link */}
        <h2>
        <FaTelegram style={{color:"#ffb600",marginRight:"10px"}}/>

          Telegram link:{' '}
          <a style={{color:"#ffb600"}}
            href="https://t.me/tap_burst"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleJoinConfirmation}  // Wallet update logic here
          >
            Join Telegram
          </a>
        </h2>
      </Box>


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
             rgb(16, 19, 26)
             
            )`,
          marginBottom: '300px',
        }}
      >
          <DiamondIcon sx={{ color: '#4ac7e6', fontSize: '50px' }} />
        <h1> Coming Soon: <span style={{color:"#ffb600"}}>Watch Video</span></h1>
       
       
      </Box>


     
      {/* Bottom Navbar */}
      <Box
        sx={{
          backgroundImage: `
          linear-gradient(
            rgba(255, 0, 150, 0.5), /* First color - pinkish */
           rgb(22, 41, 56),
           rgb(16, 19, 26)
           
          )`, 
          padding: '10px',
          display: 'flex',
          justifyContent: 'space-around',
          position: 'fixed',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #444',
          zIndex: 1000,
        }}
      >
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

export default ShowEarn;

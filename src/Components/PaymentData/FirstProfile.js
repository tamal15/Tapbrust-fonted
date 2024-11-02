import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import { Box, Typography, Grid, Button, Badge } from '@mui/material';
import { Link, NavLink, useLocation } from 'react-router-dom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import RefferPage from './RefferPage';
import Swal from 'sweetalert2';

const FirstProfile = () => {
  const { user } = useAuth(); // Get the current logged-in user
  const [userData, setUserData] = useState({ name: '', email: '', referralCode: '', tran_id: '' });

  // Fetch user details from the backend
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

  const copyToClipboard = () => {
    const link = `${userData.tran_id}`;
    navigator.clipboard.writeText(link)
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Link copied to clipboard!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      })
      .catch(err => {
        console.error('Error copying link: ', err);
      });
  };


  const [questions, setQuestions] = useState([]);
  const [newNoticeCount, setNewNoticeCount] = useState(0);
  const location = useLocation();  // Used to track the current route

  // Fetch notices from the backend
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch('https://tapbrust-backend.onrender.com/shownotice');
        const data = await response.json();
        setQuestions(data);

        // Get the number of viewed notices from localStorage
        const viewedNoticesCount = parseInt(localStorage.getItem('viewedNoticesCount')) || 0;

        // New notices = current notice count minus the viewed notices count from localStorage
        const newNotices = data.length - viewedNoticesCount;

        // Update the notification count if new notices are available
        if (newNotices > 0) {
          setNewNoticeCount(newNotices);
        }
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices();
  }, []);

  // Reset notification count when the user navigates to the notice page
  useEffect(() => {
    if (location.pathname === '/showNotice') {
      // Save the current notice count as viewed in localStorage
      localStorage.setItem('viewedNoticesCount', questions.length);
      setNewNoticeCount(0);  // Reset the notification count
    }
  }, [location, questions.length]);


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
          // border: '1px solid #ddd',
          borderRadius: '8px',
          mx: "20px",
          textAlign: "center",
          backgroundImage: `
          linear-gradient(
            rgba(255, 0, 150, 0.5), /* First color - pinkish */
           rgb(22, 41, 56),
           rgb(16, 19, 26)
           
          )`,
        }}
      >
        <Typography variant="h4" sx={{ color: "white", fontWeight: 700 }} gutterBottom>
          Welcome, {userData.name}
        </Typography>
        <Typography variant="h6" sx={{ color: "white", fontWeight: 600 }}>
          {userData.email}
        </Typography>
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: '8px', backgroundColor: 'rgba(255, 0, 150, 0.5)' }}>
            <h5
              // to={`/newregister?tran_id=${userData.tran_id}`}
              // to={`/newregister?tran_id=${userData.tran_id}`}
              style={{ color: "white", textDecoration: "none" }}
            >
             {userData.tran_id?.slice(0, 8)}
            </h5>
          </Box>
          <Button
            variant="contained"
            onClick={copyToClipboard}
            startIcon={<ContentCopyIcon />}
            sx={{ ml: 3,mt:1, backgroundColor: 'rgba(255, 0, 150, 0.5)', color: 'white' }}
          >
            Copy Referral Code
          </Button>
        </Grid>
      </Box>

      {/* Middle content */}
      <Box sx={{ p: 3, textAlign: "center",  backgroundImage: `
            linear-gradient(
              rgba(255, 0, 150, 0.5), /* First color - pinkish */
             rgb(22, 41, 56),
             rgb(16, 19, 26)
             
            )`,  flex: 1,  
            overflowY: 'auto', flexGrow: 1 ,marginBottom:"90px",marginTop:"20px",mx: "20px",borderRadius: '8px'}}> {/* Added flexGrow */}
       
        
        <RefferPage/>
        
      </Box>

      {/* Bottom Navbar */}
      <Box sx={{
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
            <Badge
              badgeContent={newNoticeCount} 
              color="error"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              sx={{
                '& .MuiBadge-badge': {
                  transform: 'scale(1.1)',
                  zIndex:2
                },
              }}
            >
              <Button
                startIcon={
                  <NotificationsIcon sx={{ color: '#ff7e5f', fontSize: '45px', fontWeight: 'bold' }} />  // Adjust icon size
                }
              />
            </Badge>
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

export default FirstProfile;

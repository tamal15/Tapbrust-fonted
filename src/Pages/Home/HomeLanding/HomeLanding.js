import React, { useCallback, useEffect, useState } from 'react';
import { Box, Typography, Button, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Profile icon placeholder
import DiamondIcon from '@mui/icons-material/Diamond'; 
import './HomeLanding.css'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import DashboardIcon from '@mui/icons-material/Dashboard';


const HomeLanding = () => {

  const navigate = useNavigate();
  const { admin } = useAuth();
  const [balance, setBalance] = useState(0);



  const handleDashboardClick = () => {
    navigate('/dashboard'); // Route to the dashboard
  };
const {user}=useAuth()
  const [count, setCount] = useState(0); // Local count state
  const [timestamp, setTimestamp] = useState(''); // Local timestamp state

  // Fetch current count and timestamp on component mount
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };
  
  useEffect(() => {
    const fetchCount = async () => {
      try {
        if (!user || !user.email) {
          console.error('User not logged in or email not available');
          return;
        }

        const response = await fetch(`https://tapbrust-backend.onrender.com/get-count/${user.email}`);
        const data = await response.json();

        if (response.ok) {
          setCount(data.count); // Set the count from the backend
          setTimestamp(data.timestamp); // Set the timestamp from the backend
        } else {
          console.error('Failed to fetch count:', data.message);
        }
      } catch (error) {
        console.error('Error fetching count:', error);
      }
    };

    fetchCount();
  }, [user?.email]);

  // Handle image click with debounce to prevent multiple rapid clicks
  const handleImageClick = useCallback(
    debounce(async () => {
      try {
        if (!user || !user.email) {
          console.error('User not logged in or email not available');
          return;
        }

        const response = await fetch('https://tapbrust-backend.onrender.com/update-count', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email }),
        });

        if (response.ok) {
          const updatedData = await response.json();
          console.log(`Count updated: ${updatedData.count}, Timestamp: ${updatedData.timestamp}`);

          // Update the local state with the new count and timestamp
          setCount(updatedData.count);
          setTimestamp(updatedData.timestamp);
        } else {
          const message = await response.text();
          console.error('Failed to update count:', message);
        }
      } catch (error) {
        console.error('Error updating count:', error);
      }
    }, 500), // 500ms debounce to avoid rapid updates
    [user?.email]
  );
  

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(`https://tapbrust-backend.onrender.com/users/${user.email}`);
        const data = await response.json();
        if (data) {
          setBalance(data.balance || 0);
          
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    if (user.email) {
      fetchBalance();
    }
  }, [user.email]);


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


  React.useEffect(() => {
    const disableRightClick = (e) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', disableRightClick);

    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
    };
  }, []);

  
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
      {/* Top Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px', backgroundColor: '' }} className="content">
        {/* Coins Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundImage: `
            linear-gradient(
              rgba(255, 0, 150, 0.5), /* First color - pinkish */
             rgb(22, 41, 56),
             rgb(16, 19, 26)
             
            )`,
            borderRadius: '20px',
            height: '70px',
            padding: '10px 20px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
          }}
        >
          <AccountBalanceWalletIcon sx={{ color: '#ffb600', fontSize: '50px' }} />
          <Typography variant="h6" sx={{ marginLeft: '10px', color: '#ffb600', fontSize: '1.2rem' }}>{count}</Typography>
        </Box>

        {/* User Profile Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <AccountCircleIcon sx={{ color: '#ffb600', fontSize: '50px', borderRadius: '50%' }} /> {/* User icon */}
          <Typography 
      variant="h6" 
      sx={{ marginTop: '5px', color: '#ffb600', fontWeight: 'bold' }}
    >
      {user?.displayName || 'Guest'} {/* Display user displayName or 'Guest' */}
    </Typography>
        </Box>

        {/* Gems Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundImage: `
          linear-gradient(
            rgba(255, 0, 150, 0.5), /* First color - pinkish */
           rgb(22, 41, 56),
           rgb(16, 19, 26)
           
          )`,
            borderRadius: '20px',
            padding: '10px 20px',
            height: '70px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Typography variant="h6" sx={{ marginRight: '10px', color: '#4ac7e6', fontSize: '1.2rem' }}>{balance || 0}</Typography>
          <DiamondIcon sx={{ color: '#4ac7e6', fontSize: '50px' }} />
        </Box>

        {/* Dashboard Section - Only visible to Admin */}
        {admin && (
          <Box sx={{alignItems: 'center',
            backgroundImage: `
          linear-gradient(
            rgba(255, 0, 150, 0.5), /* First color - pinkish */
           rgb(22, 41, 56),
           rgb(16, 19, 26)
           
          )`,
            borderRadius: '20px',
            padding: '10px 20px',
            height: '70px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',}} onClick={handleDashboardClick}>
            <DashboardIcon sx={{ color: '#ffb600', fontSize: '50px' }} />
          </Box>
        )}
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '-45px',
        }}
        onClick={handleImageClick} // Add click handler to the Box
      >
        <img
          src="https://i.ibb.co/qjkFFfL/Photoleap-18-10-2024-15-20-53-AUWr-W-removebg-preview.png"
          alt="Robot"
          width="300"
          className="robot-image"
         
          style={{
            userSelect: 'none', 
            WebkitUserDrag: 'none', 
            // pointerEvents: 'none', 
          }}
        />
      </Box>

      {/* Bottom Navigation */}
      <Box sx={{ backgroundImage: `
          linear-gradient(
            rgba(255, 0, 150, 0.5), /* First color - pinkish */
           rgb(22, 41, 56),
           rgb(16, 19, 26)
           
          )`, padding: '10px', display: 'flex', justifyContent: 'space-around', borderTop: '1px solid #444' }}>
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
                  transform: 'scale(1.1)', // Increase badge size slightly
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

export default HomeLanding;

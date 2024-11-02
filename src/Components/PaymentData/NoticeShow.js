import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Badge } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const NoticeShow = () => {
  const [questions, setQuestions] = useState([]);
  const [newNoticeCount, setNewNoticeCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch('https://tapbrust-backend.onrender.com/shownotice');
        const data = await response.json();
        setQuestions(data);

        const viewedNoticesCount = parseInt(localStorage.getItem('viewedNoticesCount')) || 0;
        const newNotices = data.length - viewedNoticesCount;

        if (newNotices > 0) {
          setNewNoticeCount(newNotices);
        }
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices();
  }, []);

  useEffect(() => {
    if (location.pathname === '/showNotice') {
      localStorage.setItem('viewedNoticesCount', questions.length);
      setNewNoticeCount(0);
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
      {/* Scrollable content area */}
      <Box
        sx={{
          flex: 1,  
          overflowY: 'auto',  // Enable vertical scrolling
          p: 3,
          mt: 4,
          borderRadius: '8px',
          mx: '20px',
          textAlign: 'center',
          backgroundImage: `
            linear-gradient(
              rgba(255, 0, 150, 0.5), 
              rgb(22, 41, 56),
              rgb(16, 19, 26)
            )`,
          marginBottom: '120px',
        }}
      >
        {questions?.map((question, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="h6">{question?.date}</Typography>
            <Typography variant="h5">{question?.tittle}</Typography>
            <Typography style={{ textAlign: 'left' }} variant="body1">
              {question?.description}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Fixed Bottom Navbar */}
      <Box
        sx={{
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
        }}
      >
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
                  <NotificationsIcon sx={{ color: '#ff7e5f', fontSize: '45px', fontWeight: 'bold' }} />
                }
              />
            </Badge>
            <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>Notice</Typography>
          </NavLink>
        </Box>

        <Box>
          <NavLink style={{ color: 'white', textDecoration: 'none' }} to="/firstProfile">
            <Button startIcon={<GroupAddIcon sx={{ color: '#43cea2', fontSize: '50px' }} />}></Button>
            <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>Invite</Typography>
          </NavLink>
        </Box>

        <Box>
          <NavLink style={{ color: 'white', textDecoration: 'none' }} to="/">
            <Button startIcon={<HomeIcon sx={{ color: '#4ac7e6', fontSize: '50px' }} />}></Button>
            <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>Home</Typography>
          </NavLink>
        </Box>

        <Box>
          <NavLink style={{ color: 'white', textDecoration: 'none' }} to="/showEarn">
            <Button startIcon={<ListAltIcon sx={{ color: '#0f0', fontSize: '50px' }} />}></Button>
            <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>Earn</Typography>
          </NavLink>
        </Box>

        <Box>
          <NavLink style={{ color: 'white', textDecoration: 'none' }} to="/showWallet">
            <Button startIcon={<AccountBalanceWalletIcon sx={{ color: '#ffb600', fontSize: '50px' }} />}></Button>
            <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>Wallet</Typography>
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
};

export default NoticeShow;

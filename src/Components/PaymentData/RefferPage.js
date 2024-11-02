import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import useAuth from '../../Hooks/useAuth';

const RefferPage = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userData, setUserData] = useState({ name: '', email: '', referralCode: '', tran_id: '' });
  const { user } = useAuth(); // Make sure this provides `user` with `email`
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user details
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

    if (user?.email) {
      fetchUserDetails(); // Fetch user details if the user's email exists
    }
  }, [user?.email]); // Depend on `user.email`

  useEffect(() => {
    // Fetch filtered users
    const fetchFilteredUsers = async () => {
      try {
        setLoading(true); // Start loading state
        const response = await fetch('https://tapbrust-backend.onrender.com/api/users'); // Fetch all users
        const data = await response.json();

        // Filter users whose `refCode` matches the logged-in user's `tran_id`
        const matchedUsers = data.filter(user => user.refCode === userData.tran_id);

        setFilteredUsers(matchedUsers); // Set only the matched users
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false); // End loading state
      }
    };

    if (userData?.tran_id) {
      fetchFilteredUsers(); // Fetch data only if `tran_id` exists
    }
  }, [userData?.tran_id]); // Depend on `userData.tran_id`

  return (
    <div style={{ marginLeft: '15px', marginRight: '15px' }}>
      <Typography variant="h4" gutterBottom>
        Referral Page
      </Typography>

      {userData?.tran_id ? (
        <>
          <Typography variant="h6" gutterBottom>
            Transaction ID: {userData.tran_id}
          </Typography>

          {loading ? ( // Show loading message while data is being fetched
            <Typography variant="body1">Loading...</Typography>
          ) : (
            filteredUsers.length > 0 ? (
              <TableContainer
                style={{
                  backgroundImage: `
                  linear-gradient(
                    rgba(255, 0, 150, 0.5),
                    rgb(22, 41, 56),
                    rgb(16, 19, 26)
                  )`,
                  color: 'white',
                }}
                component={Paper}
              >
                <Table style={{ color: 'white' }}>
                  <TableHead style={{ color: 'white' }}>
                    <TableRow style={{ color: 'white' }}>
                      <TableCell style={{ color: 'white' }}>Email</TableCell>
                      <TableCell style={{ color: 'white' }}>Display Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody
                    style={{
                      backgroundImage: `
                      linear-gradient(
                        rgba(255, 0, 150, 0.5),
                        rgb(22, 41, 56),
                        rgb(16, 19, 26)
                      )`,
                      color: 'white',
                    }}
                  >
                    {filteredUsers.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell style={{ color: 'white' }}>{user.email}</TableCell>
                        <TableCell style={{ color: 'white' }}>{user.displayName}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body1">No users found with matching refCode.</Typography>
            )
          )}
        </>
      ) : (
        <Typography variant="h6" gutterBottom>
          No Transaction ID found
        </Typography>
      )}
    </div>
  );
};

export default RefferPage;

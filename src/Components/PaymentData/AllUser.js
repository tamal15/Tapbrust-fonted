import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import useAuth from '../../Hooks/useAuth'; // Custom hook for authentication
import SearchBar from './SearchBar';

const AllUser = () => {
  const { user } = useAuth(); // Admin's info
  const [pendingUsers, setPendingUsers] = useState([]);
  const [model, setModel] = useState([]);

  useEffect(() => {
    // Fetch users awaiting verification
    const fetchPendingUsers = async () => {
      try {
        const response = await fetch('https://tapbrust-backend.onrender.com/allusersdata');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setPendingUsers(data);
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching pending users:', error);
      }
    };

    fetchPendingUsers();
  }, []);

  

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://tapbrust-backend.onrender.com/delete-user/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        // Remove the deleted user from the state to update the UI
        setPendingUsers(pendingUsers.filter(user => user._id !== id));
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  const  handleOnChange=(e)=>{
    e.preventDefault()
    const values = e.target.value;
    const newValue = pendingUsers?.filter(ques => ques?.email?.toLowerCase()?.includes(values.toLowerCase()))
    // console.log(values)
    newValue.length === 0 && alert("warning", "Warning...", "Not Found Your Result")
    setPendingUsers(newValue)
}

const placeholder = 'Search by Email ';

  return (
    <Container>
      <h2 className="my-4 text-white">Admin Verification Page</h2>

      <SearchBar handleOnChange={handleOnChange} placeholder={placeholder} />
      <Table striped bordered hover>
        <thead className='text-white'>
          <tr className='text-white'>
            <th>Name</th>
            <th>Email</th>
            <th>Payment Details</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {pendingUsers?.length > 0 ? (
            pendingUsers?.map(user => (
              <tr key={user._id}>
                <td className='text-white'>{user.displayName}</td>
                <td className='text-white'>{user.email}</td>
                <td className='text-white'>{user.bkashNumber}</td>
              
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No pending users</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AllUser;

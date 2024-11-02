import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Fab,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TableFooter,
  TablePagination,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../../../../Hooks/useAuth';
import CustomerAddress from './Address';
import CartOrder from './MyBooking';

const MyOrder = () => {
  const [ordering, setOrder] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [orderCounts, setOrderCounts] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null); // Stores the selected order for details

  useEffect(() => {
    if (user?.email) {
      fetchOrders();
    }
  }, [user?.email]);

  const fetchOrders = async (status = '', date = '') => {
    try {
      const response = await fetch(
        `https://tapbrust-backend.onrender.com/myOrder/${user?.email}?status=${status}&date=${date}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      setOrder(data);
      setFilteredOrders(data);
      countOrdersByStatus(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      Swal.fire('Error!', 'Failed to fetch orders. Please try again.', 'error');
    }
  };

  const countOrdersByStatus = (orders) => {
    const counts = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});
    setOrderCounts(counts);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`https://tapbrust-backend.onrender.com/manageAllOrderDelete/${id}`);
          if (response.status === 200) {
            // Update state after deletion
            setOrder((prevOrdering) => prevOrdering.filter((order) => order._id !== id));
            setFilteredOrders((prevFilteredOrders) => prevFilteredOrders.filter((order) => order._id !== id));
            countOrdersByStatus(filteredOrders.filter((order) => order._id !== id)); // Update counts with the filtered list
            Swal.fire('Deleted!', 'Your order has been deleted.', 'success');
          } else {
            Swal.fire('Error!', 'Failed to delete the order. Please try again.', 'error');
          }
        } catch (err) {
          Swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
        }
      }
    });
  };

  const handleFilter = () => {
    fetchOrders(statusFilter, dateFilter);
    setPage(0);
  };

  const handleStatusClick = (status) => {
    setStatusFilter(status);
    fetchOrders(status, dateFilter);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDetailsClick = (orderId) => {
    if (selectedOrder && selectedOrder._id === orderId) {
      // If the currently selected order is clicked again, hide the details
      setSelectedOrder(null);
    } else {
      // Show the details of the newly clicked order
      const order = ordering.find((o) => o._id === orderId);
      setSelectedOrder(order);
    }
  };

  return (
    <Container>
      <Divider>
        <Fab
          variant="extended"
          size="small"
          sx={{ backgroundColor: '#3a84c5', color: 'white', '&:hover': { backgroundColor: '#0a243f' } }}
          aria-label="add"
        >
          <AddShoppingCartIcon />
          {ordering.length === 0 ? 'My Order Not Found' : 'MY Order'}
        </Fab>
      </Divider>

      {/* Status Filter Boxes */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        {['completed', 'Pending', 'Processing', 'approved', 'Received from Supplier', 'Return', 'cancelled'].map(
          (status, index) => (
            <Box
              key={status}
              sx={{
                width: '30%',
                cursor: 'pointer',
                mb: 2,
                textAlign: 'center',
                border: '1px solid grey',
                borderRadius: '10px',
                padding: '10px',
                background: index % 2 === 0 ? '#113350' : '#427bb1',
                color: 'white',
                marginTop: '40px',
              }}
              onClick={() => handleStatusClick(status)}
            >
              <Typography variant="h6">{status}</Typography>
              <Typography variant="body1">Count: {orderCounts[status] || 0}</Typography>
            </Box>
          )
        )}
      </Box>

      {/* Filter Controls */}
      <Box sx={{ mb: 2, textAlign: 'left' }}>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          displayEmpty
          sx={{ mr: 2, width: '300px' }}
        >
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="approved">approved</MenuItem>
          <MenuItem value="cancelled">cancelled</MenuItem>
          <MenuItem value="completed">completed</MenuItem>
          <MenuItem value="Processing">Processing</MenuItem>
          <MenuItem value="Return">Return</MenuItem>
          <MenuItem value="Received from Supplier">Received from Supplier</MenuItem>
        </Select>

        <TextField
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          sx={{ mr: 2, width: '300px' }}
        />

        <Button variant="contained" onClick={handleFilter}>
          Filter
        </Button>
      </Box>

      {/* Orders Table */}
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell> Name</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.cus_name}</TableCell>
                <TableCell>{order.payment_number}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleDetailsClick(order._id)}>
                    {selectedOrder && selectedOrder._id === order._id ? 'Hide Details' : 'Details'}
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(order._id)} sx={{ ml: 1, mt: { xs: 2, sm: 0 }}}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <TablePagination
            rowsPerPageOptions={[2, 4, 8]}
            component="div"
            count={filteredOrders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableFooter>
      </TableContainer>

      {/* Full Order Details */}
      {selectedOrder && (
        <Box>
          <h2>Order Details</h2>
          <Grid container spacing={2} sx={{ mt: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={12} md={6}>
              <CustomerAddress order={selectedOrder} />
            </Grid>
            <Grid item xs={12} md={6}>
              <CartOrder cart={selectedOrder.cartProducts || []} />
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default MyOrder;

import React, { useEffect, useState } from 'react';
import { Box, Chip, Container, Divider, Fab, Grid, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Toolbar, IconButton, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuth from '../../../../Hooks/useAuth';
import CustomerAddress from './UserAddress';
import CartOrder from './UserBooking';
import UpdateIcon from '@mui/icons-material/Update'; 
import VisibilityIcon from '@mui/icons-material/Visibility';

const UpdateOrder = () => {
    const [ordering, setOrder] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null); // For showing details
    const { user } = useAuth();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [status, setStatus] = useState('');
    const [courierIds, setCourierIds] = useState({}); // Store courier IDs for each order

    useEffect(() => {
        fetch(`https://tapbrust-backend.onrender.com/userMy`)
            .then(res => res.json())
            .then(data => {
                setOrder(data);
            });
    }, [user?.email]);

    const handleUpdate = (id) => {
        fetch(`https://tapbrust-backend.onrender.com/updateStatus/${id}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ status }),
        })
            .then((res) => res.json())
            .then((result) => console.log(result));
        alert('Status updated');
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://tapbrust-backend.onrender.com/manageAllOrderDelete/${id}`)
                    .then((response) => {
                        if (response.status === 200 || response.status === 204) {
                            Swal.fire(
                                'Deleted!',
                                'Order has been deleted.',
                                'success'
                            );

                            // Update the state to immediately reflect the deletion
                            const updatedOrders = ordering.filter((d) => d._id !== id);
                            setOrder(updatedOrders);
                        } else {
                            Swal.fire(
                                'Failed!',
                                'Failed to delete the order. Please try again.',
                                'error'
                            );
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        Swal.fire(
                            'Error!',
                            'An error occurred while deleting the order.',
                            'error'
                        );
                    });
            }
        });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleShowDetails = (order) => {
        setSelectedOrder(order);
    };

    const handleSelectValue = (e) => {
        const statusData = e.target.value.toLowerCase();
        setStatus(statusData);
    };

    const handleCourierChange = (e, orderId) => {
        setCourierIds({
            ...courierIds,
            [orderId]: e.target.value,
        });
    };

    const handleUpdates = (id) => {
        const courierId = courierIds[id];
        fetch(`https://tapbrust-backend.onrender.com/updateCourier/${id}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ courier_id: courierId }),
        })
            .then((res) => res.json())
            .then((result) => console.log(result));
        alert('Courier ID updated');
    };

    return (
        <Container>
            <Toolbar />
            <Divider>
                <Fab variant="extended" size="small" color={ordering.length === 0 ? "error" : "success"} aria-label="add">
                    <AddShoppingCartIcon />{ordering.length === 0 ? "My Order Not Found" : "Customer Orders"}
                </Fab>
            </Divider>

            <Box mt={3}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Customer</TableCell>
                                <TableCell>TotalPrice</TableCell>
                                <TableCell>Payment</TableCell>
                                <TableCell>wallet</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Courier ID</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ordering.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
                                <TableRow key={order._id}>
                                    <TableCell>{order.cus_name}</TableCell>
                                    <TableCell>{order.total_amount}</TableCell>
                                    <TableCell>{order.payment_number}</TableCell>
                                    <TableCell>{order.wallet_amount}</TableCell>
                                    <TableCell>
    <Box display="flex" alignItems="center" justifyContent="space-between">
        <select onChange={handleSelectValue} className="pending p-2" style={{border:"2px solid #113350",borderRadius:"5px"}}>
            <option value={order.status}>{order.status}</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
            <option value="Given-To-Delivery">Given-To-Delivery</option>
        </select>
        <IconButton onClick={() => handleUpdate(order._id)} color="primary">
            <InfoIcon  /> {/* You can replace InfoIcon with an appropriate update icon if necessary */}
        </IconButton>
    </Box>
</TableCell>
<TableCell>
    <Box display="flex" alignItems="center" justifyContent="space-between">
        <input
            type="text"
            style={{ textAlign: "left", flexGrow: 1 ,width:"120px",border:"2px solid #113350",borderRadius:"5px"}} // Adjust input field size
            value={courierIds[order._id] || ''} // Remove fallback to order.courier_id
            onChange={(e) => handleCourierChange(e, order._id)}
            placeholder={order.courier_id || "Enter Courier ID"}
        />
        <IconButton onClick={() => handleUpdates(order._id)} color="primary">
            <InfoIcon /> {/* You can replace InfoIcon with an appropriate update icon */}
        </IconButton>
    </Box>
</TableCell>

                                    <TableCell>
                                        <IconButton onClick={() => handleShowDetails(order)} color="primary">
                                            <VisibilityIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(order._id)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TableFooter>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15, 20, 25, 30, 40]}
                        component="div"
                        count={ordering.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableFooter>
            </Box>

            {/* Display Order Details */}
            {selectedOrder && (
                <Box mt={3}>
                    <Divider>
                        <Chip label="Order Details" />
                    </Divider>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <CustomerAddress order={selectedOrder} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CartOrder cart={selectedOrder.cartProducts} />
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Container>
    );
};

export default UpdateOrder;

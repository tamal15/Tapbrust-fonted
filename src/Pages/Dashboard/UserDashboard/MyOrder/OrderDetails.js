import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Grid, Divider, Chip } from '@mui/material';
import CustomerAddress from './Address';
import CartOrder from './MyBooking';

const OrderDetails = () => {
    const { status } = useParams();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch orders by status
        fetch(`https://tapbrust-backend.onrender.com/orders?status=${status}`)
            .then(res => res.json())
            .then(data => setOrders(data));
    }, [status]);

    return (
        <Container>
            <Typography variant="h4" sx={{ mb: 2 }}>{status} Orders</Typography>
            <Box>
                {orders.map(order => (
                    <Box key={order._id}>
                        <Grid
                            container
                            spacing={2}
                            sx={{ mt: 6 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                            <Grid item xs={4} sm={8} md={7}>
                                <CustomerAddress order={order} />
                            </Grid>
                            <Grid sx={{ py: 3 }} item xs={4} sm={8} md={5}>
                                <CartOrder cart={order.cartProducts} />
                            </Grid>
                        </Grid>

                        <Divider>
                            {/* <Chip label={<AddShoppingCartIcon />} /> */}
                        </Divider>
                    </Box>
                ))}
            </Box>
        </Container>
    );
};

export default OrderDetails;

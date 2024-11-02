import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ListItem, Step, StepConnector, StepLabel, Stepper, Tooltip, Typography, Fab } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Cancel from '@mui/icons-material/Cancel';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { HourglassEmpty } from '@mui/icons-material';

// Main component to track order status
const CustomerAddress = ({ order, handleDelete }) => {
    const addressStyle = { display: 'flex', justifyContent: 'space-between' };

    const getIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return <HourglassEmpty color="warning" />;
            case 'approved':
                return <CheckCircle color="success" />;
            case 'cancelled':
                return <Cancel color="error" />;
            default:
                return null;
        }
    };

    // Define the status steps
    const statusSteps = [];
    const previousStatuses = order?.trackOrder ? order.trackOrder.split('|').map(status => status.trim()) : [];

    // Add previous statuses to the steps array
    previousStatuses.forEach(status => {
        statusSteps.push({ label: status, date: new Date().toLocaleString() });
    });

    // Add the current status as the last step
    if (order?.status) {
        statusSteps.push({ label: order.status, date: new Date().toLocaleString() });
    }

    return (
        <Box>
            <ListItem button divider>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography style={addressStyle}><span>My Name</span><span>:</span></Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography>{order?.cus_name}</Typography>
                    </Grid>
                </Grid>
            </ListItem>

            <ListItem button divider>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography style={addressStyle}><span>Address</span><span>:</span></Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography>{order?.address}</Typography>
                    </Grid>
                </Grid>
            </ListItem>

            <ListItem button divider>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography style={addressStyle}><span>Post Code</span><span>:</span></Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography>{order?.cus_postcode}</Typography>
                    </Grid>
                </Grid>
            </ListItem>

            <ListItem button divider>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography style={addressStyle}><span>Payment Number</span><span>:</span></Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography>{order?.payment_number}</Typography>
                    </Grid>
                </Grid>
            </ListItem>

            <ListItem button divider>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography style={addressStyle}><span>Email</span><span>:</span></Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography>{order?.cus_email}</Typography>
                    </Grid>
                </Grid>
            </ListItem>

            <ListItem button divider>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography style={addressStyle}><span>Total Amount</span><span>:</span></Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography>BDT {order?.total_amount} Taka</Typography>
                    </Grid>
                </Grid>
            </ListItem>
            <ListItem button divider>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography style={addressStyle}><span>Courier_id</span><span>:</span></Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography> {order?.courier_id}</Typography>
                    </Grid>
                </Grid>
            </ListItem>

            <ListItem button divider>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography style={addressStyle}><span>Tran_id</span><span>:</span></Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography>{order?.tran_id}</Typography>
                    </Grid>
                </Grid>
            </ListItem>

            <ListItem button divider>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography style={addressStyle}><span>Date</span><span>:</span></Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography>{order?.date}</Typography>
                    </Grid>
                </Grid>
            </ListItem>

            {order?.status && (
                <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Tooltip title={order?.status} arrow placement="top">
                        <Fab
                            variant="extended"
                            size="small"
                            sx={{
                                background: order?.status === 'Pending' ? '#3a84c5' : 
                                           order?.status === 'Approved' ? 'success.main' : 
                                           'default',
                                color: 'white',
                            }}
                            aria-label="status"
                        >
                            <PendingActionsOutlinedIcon sx={{ mr: 1 }} />
                            {order?.status}
                        </Fab>
                    </Tooltip>
                    <Tooltip title='Delete' arrow placement="top">
                        <Fab 
                            onClick={() => handleDelete(order._id)} 
                            variant="extended" 
                            size="small" 
                            sx={{ 
                                backgroundColor: '#113350',
                                color: 'white',
                                '&:hover': { backgroundColor: '#0a243f' }
                            }} 
                            aria-label="delete"
                        >
                            <DeleteIcon sx={{ mr: 1 }} />
                            Delete
                        </Fab>
                    </Tooltip>
                </ListItem>
            )}

            <h2 className='mt-5'>Track Order</h2>
            <Box>
               
                <Stepper activeStep={statusSteps.length - 1} orientation="vertical" connector={<StepConnector sx={{ height: 50 }} />}>
                    {statusSteps.map((step, index) => (
                        <Step key={index}>
                            <StepLabel>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    {getIcon(step.label)}
                                    <span style={{ marginLeft: '8px' }}>{step.label}</span>
                                </Box>
                                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                    {step.date}
                                </Typography>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </Box>
    );
};

export default CustomerAddress;

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Fab, ListItem, Tooltip, Typography,MenuItem ,Select} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";


const CustomerAddress = ({ order, handleDelete }) => {

    const addressStyle = { display: 'flex', justifyContent: 'space-between' };

    const [status, setStatus] = useState('')
    const [courierId, setCourierId] = useState(order?.courier_id || '');

    const handleUpdate = (id) => {
        fetch(`https://tapbrust-backend.onrender.com/updateStatus/${id}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ status }),
        })
            .then((res) => res.json())
            .then((result) => console.log(result));
        alert('update')
    }

    const handleUpdates = (id) => {
        fetch(`https://tapbrust-backend.onrender.com/updateCourier/${id}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ courier_id: courierId }),
        })
            .then((res) => res.json())
            .then((result) => console.log(result));
        alert('Courier ID updated');
    };

    const handleSelectValue = (e) => {
        const statusData = (e.target.value).toLowerCase()
        setStatus(statusData)
    }

    const handleCourierChange = (e) => {
        setCourierId(e.target.value);
    };

    return (
        <Box>

            <ListItem button divider></ListItem>
            <ListItem button divider>
                <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>

                    <Grid item xs={4} sm={4} md={4} >
                        <Typography style={addressStyle}><span>My Name</span><span>:</span></Typography>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} >
                        <Typography >{order?.cus_name}</Typography>
                    </Grid>

                </Grid>
            </ListItem>
            <ListItem button divider>
                <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>

                    <Grid item xs={4} sm={4} md={4} >
                        <Typography style={addressStyle}><span>Address</span><span>:</span></Typography>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} >
                        <Typography >{order?.address}</Typography>
                    </Grid>

                </Grid>
            </ListItem>
            {/* <ListItem button divider>
                <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>

                    <Grid item xs={4} sm={4} md={4} >
                        <Typography style={addressStyle}><span>Thana</span><span>:</span></Typography>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} >
                        <Typography >{order?.Thana}</Typography>
                    </Grid>

                </Grid>
            </ListItem> */}
            {/* <ListItem button divider>
                <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>

                    <Grid item xs={4} sm={4} md={4} >
                        <Typography style={addressStyle}><span>select_courier</span><span>:</span></Typography>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} >
                        <Typography >{order?.select_courier}</Typography>
                    </Grid>

                </Grid>
            </ListItem> */}
            {/* <ListItem button divider>
                <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>

                    <Grid item xs={4} sm={4} md={4} >
                        <Typography style={addressStyle}><span>Area_Bazar</span><span>:</span></Typography>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} >
                        <Typography >{order?.Area_Bazar}</Typography>
                    </Grid>

                </Grid>
            </ListItem> */}
            {/* <ListItem button divider>
                <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>

                    <Grid item xs={4} sm={4} md={4} >
                        <Typography style={addressStyle}><span>District</span><span>:</span></Typography>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} >
                        <Typography >{order?.District}</Typography>
                    </Grid>

                </Grid>
            </ListItem> */}
            <ListItem button divider>
                <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>

                    <Grid item xs={4} sm={4} md={4} >
                        <Typography style={addressStyle}><span>Post Code</span><span>:</span></Typography>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} >
                        <Typography >{order?.cus_postcode}</Typography>
                    </Grid>

                </Grid>
            </ListItem>

            <ListItem button divider>
                <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>

                    <Grid item xs={4} sm={4} md={4} >
                        <Typography style={addressStyle}><span>Payment Number</span><span>:</span></Typography>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} >
                        <Typography >{order?.payment_number}</Typography>
                    </Grid>

                </Grid>
            </ListItem>
            <ListItem button divider>
                <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>

                    <Grid item xs={4} sm={4} md={4} >
                        <Typography style={addressStyle}><span>Email</span><span>:</span></Typography>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} >
                        <Typography >{order?.cus_email}</Typography>
                    </Grid>

                </Grid>
            </ListItem>
            <ListItem button divider>
                <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>

                    <Grid item xs={4} sm={4} md={4} >
                        <Typography style={addressStyle}><span>Total Amount</span><span>:</span></Typography>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} >
                        <Typography >BDT  {order?.total_amount}  Taka</Typography>
                    </Grid>

                </Grid>
            </ListItem>
            <ListItem button divider>
                <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>

                    <Grid item xs={4} sm={4} md={4} >
                        <Typography style={addressStyle}><span>Tran_id</span><span>:</span></Typography>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} >
                        <Typography >{order?.tran_id}</Typography>
                    </Grid>

                </Grid>
            </ListItem>
            <ListItem button divider>
                <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>

                    <Grid item xs={4} sm={4} md={4} >
                        <Typography style={addressStyle}><span>wallet_amount</span><span>:</span></Typography>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} >
                        <Typography >{order?.wallet_amount}</Typography>
                    </Grid>

                </Grid>
            </ListItem>
            <ListItem button divider>
                <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>

                    <Grid item xs={4} sm={4} md={4} >
                        <Typography style={addressStyle}><span>Date</span><span>:</span></Typography>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} >
                        <Typography  >{order?.date}</Typography>
                    </Grid>

                </Grid>
            </ListItem>




            {/* <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
            <select onChange={handleSelectValue} className="pending p-2 ">
                                        <option defaultValue={order.status}>{order.status}</option>
                                        <option defaultValue="Approved">Approved</option>
                                        <option defaultValue="Pending">Pending</option>
                                        <option defaultValue="Cancelled">Cancelled</option>
                                        <option defaultValue="Completed">Completed</option>
                                    </select>


                                    <button className="btn-style" onClick={() => handleUpdate(order._id)}>update</button>
                                    <br/>
                                    

        <Tooltip title={order?.status} arrow placement="top">

          <Fab
            onClick={() => handleDelete(order._id)}
            variant="extended"
            size="small"
            color="error"
            aria-label="add"
          >
            <DeleteIcon sx={{ mr: 1 }} />
            Delete
          </Fab>
        </Tooltip>
      </ListItem> */}
      {/* <div style={{textAlign:"left"}}>
                   
                    <input 
                        type="text" 
                        style={{textAlign:"left"}}
                        value={courierId} 
                        onChange={handleCourierChange} 
                    />
                    <button className="btn-style ms-3" onClick={() => handleUpdates(order._id)}> Courier ID</button>
                </div> */}
        </Box>
    );
};

export default CustomerAddress;
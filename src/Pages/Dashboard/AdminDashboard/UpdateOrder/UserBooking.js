import React from 'react';
import { Button, CardMedia, Grid, Paper, Rating, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { NavLink } from 'react-router-dom';
// import { ButtonStyle } from '../../../../Hooks/useStyle';


const CartOrder = ({ cart }) => {

    return (
        <Box>
            {cart?.map((single) => (
                <Box sx={{ pb: 3 }} key={single._id} >
                    <Paper
                        sx={{
                            p: 1,
                            margin: "auto",
                            maxWidth: 500,
                            flexGrow: 1,
                            boxShadow: "0px 14px 22px rgb(42 135 158 / 10%)",
                        }}
                    >
                        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <Grid item xs={2} sm={4} md={4}>
                                <CardMedia
                                    component="img"
                                    sx={{ objectFit: "cover", height: 200, width:160 }}
                                    alt="complex"
                                    src={single?.img}
                                />
                            </Grid>
                            <Grid item xs={2} sm={4} md={8} pl={2} my={3}>
                                <Box>
                                    <Typography variant="h6"
                                        sx={{  fontWeight: 700 }}
                                    >Types: {single?.types}</Typography>

                                   

                                    <Typography style={{ fontWeight: 700 }} variant="body">
                                        <span > Price : </span>
                                        {single?.ProductPrice}
                                    </Typography>
                                    <br />
                                    <Typography style={{ fontWeight: 700 }} variant="body">
                                        <span style={{ fontWeight: 700 }}> Quantity:</span>
                                        {single?.quantity}
                                    </Typography>
                                    <br />
                                    <Typography style={{ fontWeight: 700 }} variant="body">
                                        <span style={{ fontWeight: 700 }}> Size:</span>
                                        {single?.selectedSize}
                                    </Typography>
                                    <br />
                                   
                                </Box>

                               

                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            ))}
        </Box>
    );
};

export default CartOrder;
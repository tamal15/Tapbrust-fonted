import React, { useEffect, useState } from 'react';
import { Grid, IconButton, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
// import CountUp from 'react-countup';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import WeekBarChart from './WeekBarChart';
import BarChart from './BarChart';
import ProductChart from './ProductChart';
import TableShow from '../../../Dashboard/AdminDashboard/AdminOverView/TableShow';
import useAuth from '../../../../Hooks/useAuth';
import ProductChartShow from './ProductChartShow';
const OverView = () => {
    const [ordering, setOrder] = useState([]);
    const [stores, setStores] = useState([]);
    const [myorder, setMyorder] = useState([]);
    const { user } = useAuth();
    const [questions, setQuestions] = useState([])
    useEffect(()=>{
        fetch(`https://tapbrust-backend.onrender.com/userMy/${user?.email}`)
        .then(res=>res.json())
        .then(data=>{
            setOrder(data)
        })
    },[user?.email])

    useEffect(()=>{
        fetch(`https://tapbrust-backend.onrender.com/myOrder/${user?.email}`)
        .then(res=>res.json())
        .then(data=>{
            setMyorder(data)
        })
    },[user?.email])

    useEffect(()=>{
        fetch(`https://tapbrust-backend.onrender.com/my/${user?.email}`)
        .then(res=>res.json())
        .then(data=>{
            setStores(data)
        })
    },[user?.email])
    useEffect(() => {
        fetch(`https://tapbrust-backend.onrender.com/adminConfarm`)
            .then((res) => res.json())
            .then((data) => setQuestions(data));
            // console.log(data)
    }, []);

    const managePost = ordering?.filter(question => question?.status === 'Pending');
    return (
        <>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <BarChart />
            </Grid>
            <Grid style={{marginRight:""}} item xs={12} md={6}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5.8}>
                        <Paper elevation={3} sx={{ p: 2,marginLeft:"3px" }}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: "space-between",
                                marginLeft:"2px"
                            }}>
                                <Typography variant='body1' >User Order</Typography>
                                <IconButton
                                    sx={{
                                        background: 'hsl(215deg 69% 90%)',
                                        color: 'hsl(215deg 70% 71%)'
                                    }}>
                                    <AttachMoneyIcon></AttachMoneyIcon>
                                </IconButton>
                            </Box>
                            <h5 style={{textAlign:"left",marginTop:"8px"}}>{stores.length}</h5>
                                {/* <Typography variant='h5' gutterBottom>$<CountUp end={allData.earning} /></Typography> */}
                                <h5 className='mt-3' style={{textAlign:"left"}} variant='body1' component={'span'}>Order <span style={{color:"red"}}> Pending</span></h5>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={5.8}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: "space-between"
                            }}>
                                <Typography variant='body1' >Today's Users</Typography>
                                <IconButton
                                    sx={{
                                        background: 'hsl(215deg 69% 90%)',
                                        color: 'hsl(215deg 70% 71%)'
                                    }}
                                > <AttachMoneyIcon></AttachMoneyIcon></IconButton>
                            </Box>
                            <h5 style={{textAlign:"left",marginTop:"8px"}}>{questions.length}</h5>
                                {/* <Typography variant='h5' gutterBottom>
                                
                                    <CountUp end={allData.sales} /></Typography> */}
                                <h5 className='mt-3' style={{textAlign:"left"}} variant='body1' component={'span'}>Total <span style={{color:"red"}}> User</span></h5>

                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={5.8}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: "space-between"
                            }}>
                                <Typography variant='body1' >Product Order</Typography>
                                <IconButton
                                    sx={{
                                        background: 'hsl(215deg 69% 90%)',
                                        color: 'hsl(215deg 70% 71%)'
                                    }}
                                > <HomeRepairServiceIcon></HomeRepairServiceIcon></IconButton>
                            </Box>

                            <h5 style={{textAlign:"left",marginTop:"8px"}}>{myorder.length}</h5>
                                {/* <Typography variant='h5' gutterBottom>
                                
                                    <CountUp end={allData.sales} /></Typography> */}
                                <h5 className='mt-3' style={{textAlign:"left"}} variant='body1' component={'span'}>My <span style={{color:"red"}}> Orders</span></h5>
                          
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={5.8}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: "space-between"
                            }}>
                                <Typography variant='body1' >Total Product</Typography>
                                <IconButton
                                    sx={{
                                        background: 'hsl(215deg 69% 90%)',
                                        color: 'hsl(215deg 70% 71%)'
                                    }}
                                > <LocalGroceryStoreIcon></LocalGroceryStoreIcon></IconButton>
                            </Box>
                            <h5 style={{textAlign:"left",marginTop:"8px"}}>{questions.length}</h5>
                                {/* <Typography variant='h5' gutterBottom>
                                
                                    <CountUp end={allData.sales} /></Typography> */}
                                <h5 className='mt-3' style={{textAlign:"left"}} variant='body1' component={'span'}>Total <span style={{color:"red"}}> Product</span></h5>
                        </Paper>
                    </Grid>

                </Grid>
            </Grid>


            <Grid item xs={12} md={6}>
                {/* <ProviderOrderTable data={approve} /> */}
                {/* <ProductChart></ProductChart> */}
                {/* <TableShow></TableShow> */}
                <ProductChartShow></ProductChartShow>
               
                
            </Grid>
            <Grid item xs={12} md={6}>
                <TableShow></TableShow>
                {/* <ProductChartShow></ProductChartShow> */}
                {/* <ProviderOrderTable data={approve} /> */}
                
            </Grid>

        </Grid>


    </>
    );
};

export default OverView;
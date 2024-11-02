import React from 'react';
import { Box, Container, Stack, Grid, Paper, Typography, IconButton, CircularProgress } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
// import {  Container, Stack, Grid, Paper, Typography, IconButton } from '@mui/material';
import './AdminOverView.css'
import { Area, AreaChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import RoundedServiceCart from './RounndedServiceCart';
import TableShow from './TableShow';
import GraphShow from './GraphShow';
import RoundData from './RoundData';
import { useState } from 'react';
import { useEffect } from 'react';
import useAuth from '../../../../Hooks/useAuth';
const AdminOverView = () => {
    const [questions, setQuestions] = useState([])
    const [ordering, setOrder] = useState([]);
    const [model, setModel] = useState([]);
    // const [work, setWork] = useState([]);
    const { user } = useAuth();


    useEffect(() => {
        fetch(`https://tapbrust-backend.onrender.com/adminConfarm`)
            .then((res) => res.json())
            .then((data) => setQuestions(data));
            // console.log(data)
    }, []);
    useEffect(()=>{
        fetch(`https://tapbrust-backend.onrender.com/userMy/${user?.email}`)
        .then(res=>res.json())
        .then(data=>{
            setOrder(data)
        })
    },[user?.email])

    useEffect(()=>{
        fetch('https://tapbrust-backend.onrender.com/adminShowproduct')
        .then(res=>res.json())
        .then(data=>setModel(data.allQuestions))
    },[])

    
  
    const managePost = questions?.filter(question => question?.status === 'pending');
     console.log(managePost)
    const approved = questions?.filter(question => question?.status === 'verified');
     console.log(approved)
    return (
        <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: "space-between"
                                }}>
                                    <Typography variant='body1' >Users</Typography>
                                    <IconButton
                                        sx={{
                                            background: 'hsl(215deg 69% 90%)',
                                            color: 'hsl(215deg 70% 71%)'
                                        }}
                                    > <DirectionsCarIcon></DirectionsCarIcon></IconButton>
                                </Box>
                                <h5 style={{textAlign:"left",marginTop:"8px"}}>{questions.length}</h5>
                                {/* <Typography variant='h5' gutterBottom>
                                
                                    <CountUp end={allData.sales} /></Typography> */}
                                <h5 className='mt-3' style={{textAlign:"left"}} variant='body1' component={'span'}>Total <span style={{color:"red"}}> User</span></h5>
                                
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: "space-between"
                                }}>
                                    <Typography variant='body1' >Pending</Typography>
                                    <IconButton
                                        sx={{
                                            background: 'hsl(215deg 69% 90%)',
                                            color: 'hsl(215deg 70% 71%)'
                                        }}
                                    > <AttachMoneyIcon></AttachMoneyIcon></IconButton>
                                </Box>
                                <h5 style={{textAlign:"left",marginTop:"8px"}}>{managePost.length}</h5>
                                {/* <Typography variant='h5' gutterBottom>$<CountUp end={allData.earning} /></Typography> */}
                                <h5 className='mt-3' style={{textAlign:"left"}} variant='body1' component={'span'}>User <span style={{color:"red"}}> Pending</span></h5>

                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: "space-between"
                                }}>
                                    <Typography variant='body1' >Approved</Typography>
                                    <IconButton
                                        sx={{
                                            background: 'hsl(215deg 69% 90%)',
                                            color: 'hsl(215deg 70% 71%)'
                                        }}
                                    > <HomeRepairServiceIcon></HomeRepairServiceIcon></IconButton>
                                </Box>
                                <h5 style={{textAlign:"left",marginTop:"8px"}}>{approved.length}</h5>
                                {/* <Typography variant='h5' gutterBottom><CountUp end={allData.providers} /></Typography> */}
                                <h5 className='mt-3' style={{textAlign:"left"}} variant='body1' component={'span'}>User <span style={{color:"red"}}>  Approved</span></h5>
                               
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: "space-between"
                                }}>
                                    <Typography variant='body1' >Product</Typography>
                                    <IconButton
                                        sx={{
                                            background: 'hsl(215deg 69% 90%)',
                                            color: 'hsl(215deg 70% 71%)'
                                        }}
                                    > <LocalGroceryStoreIcon></LocalGroceryStoreIcon></IconButton>
                                </Box>
                                <h5 style={{textAlign:"left",marginTop:"8px"}}>0</h5>
                                {/* <Typography variant='h5' gutterBottom><CountUp end={allData.orders} /></Typography> */}
                                <h5 className='mt-3' style={{textAlign:"left"}} variant='body1' component={'span'}>Total <span style={{color:"red"}}> Data </span></h5>
                                
                               
                            </Paper>
                        </Grid>

                    </Grid>
                </Grid>
                <Grid item xs={12} md={7}>
                    {/* <h1>sgg</h1> */}
                    {/* <Paper  elevation={3} sx={{ p: 2,width:"98%" }} >
            <Typography gutterBottom variant='h6'>Recent Moment</Typography>
            <ResponsiveContainer width="100%" height={220}>
                <AreaChart width={730} height={250} 
                // data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="price" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
            </ResponsiveContainer>
        </Paper> */}
        
        <GraphShow></GraphShow>
                    {/* <RecentMomentChart data={allData.recentMoment}></RecentMomentChart> */}
                </Grid>
                <Grid item xs={12} md={3}>
                    {/* <RoundedServiceCart allData={allData}></RoundedServiceCart> */}
                    <RoundData></RoundData>
                </Grid>
                <Grid item xs={12} md={9}>
                    <TableShow></TableShow>
                    {/* <OrdersTable allOrders={allOrders}></OrdersTable> */}
                </Grid>
            </Grid>
    );
};

export default AdminOverView;
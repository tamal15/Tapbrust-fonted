import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Swal from 'sweetalert2';
// import BuyerProductShow from './BuyerProductShow';
import {
    Box,
    Button,
    CardMedia,
    Container,
    Grid,
    Pagination,
    Paper,
    Rating,
    Stack,
    Typography,
  } from "@mui/material";
// import './PotterServiceShow.css'
// import OrderReviewPage from '../../OrderReviewPage/OrderReviewPage';
const PotterServiceShow = () => {
    const [model, setModel] = useState([])

    

    



    //     useEffect(()=>{
    //         Aos.init({duration:2000});
    //   },[])

   
        useEffect(()=>{
            fetch('https://tapbrust-backend.onrender.com/potterservice')
            .then(res=>res.json())
            .then(data=>setModel(data))
        },[])

console.log(model)


    return (
      <Container>
       
      <Grid
      // data-aos="fade-right"
      // data-aos-offset="300"
      // data-aos-easing="ease-in-sine"
        container
        spacing={2}
        sx={{ mt: 6 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {model?.map((single) => (
          <Grid  sx={{ py: 3 }} key={single._id} item xs={4} sm={4} md={3}>
            <Paper
            // data-aos="fade-right"
            // data-aos-offset="300"
            // data-aos-easing="ease-in-sine"
              sx={{
                p: 1,
                margin: "auto",
                maxWidth: 400,
                flexGrow: 1,
                boxShadow: "0px 10px 22px rgb(42 135 158 / 50%)"
              }}
            >
              <Grid   container spacing={2} columns={{ xs: 4, sm: 8, md: 4 }}>
                <Grid  item xs={12} sm={12} md={12}>
                 <div className='photo'>
                  <div className='photoShops'>
                    <img height="230" width="250" style={{borderRadius:"15px"}} src={single?.img}></img>
                 
                  </div>
                 </div>
                 
                 
                </Grid>

                <Grid item xs={2} sm={4} md={8} pl={2} my={3}>
                  <Box style={{textAlign:"left"}}>
                    <h5 style={{fontWeight:"700"}}>Name : {single?.productName}</h5>

                   

                    {/* <ThumbUpIcon></ThumbUpIcon> */}
                     {/* <br></br> */}
                     {/* <h4>{single?.length}</h4> */}
                    <Typography variant="body">
                      <h5 style={{ fontWeight: 700 }}> Price : TK.{single?.ProductPrice}</h5>
                      
                    </Typography>
                  
                    {/* <Rating
                      name="half-rating-read"
                      style={{color:"#D0425C"}}
                      defaultValue={single?.rating}
                      precision={0.5}
                      readOnly
                    /> */}

                    <br></br>

                     {/* like handler ================== */}
                   


                  {/* <Typography>LikeCount: {single?.likes?.length}</Typography> */}
                  {/* Unlike handler ================== */}
                  </Box>
                </Grid>
              </Grid>
              {/* <Box sx={{ display: 'flex', justifyContent: '', marginBottom:"" }}> */}
                <NavLink
                  to={`/design`}
                  style={{ textDecoration: "none",textAlign:"left" }}
                >
                  <Button
                   className='btn-style download-btn '
                   style={{textAlign:"left"}}
                  size="small">
                    upload Product
                  </Button>
                </NavLink>
              
               
              {/* </Box> */}
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2}>

        
      </Stack>

      {/* <a href='/allPotter' className='viewmore mt-5'>View more</a> */}

      {/* <Box>
      {
work.map(booking=> <OrderReviewPage
  key={booking.id}
  booking={booking}>

</OrderReviewPage>)
}
      </Box> */}
    </Container>
    


    );
};

export default PotterServiceShow;
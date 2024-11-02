import React, { useEffect, useState } from 'react';
import { Grid, IconButton, Typography } from "@mui/material";
import { Container,Box } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
 import{ NavHashLink } from "react-router-hash-link";
import ServiceCardWrap from './ServiceCardWrap';
// import { makeStyles } from "@mui/styles";
import './Service.css'
import Header from '../../../../../Shared/Header/Header';
import Footer from '../../../../../Shared/Footer/Footer';
const Services = () => {

    const useStyles = 
    ({
        drawerPaper: {
          marginTop: "100px",
          zIndex: 0,
        },
        root: {
          display: "flex",
        },
        gridMargin: {
          marginBottom: "50px",
          marginTop: "50px",
          boxShadow: "none",
        },
        subServices: {
          px: 2,
        },
        listBottomPadding: {
          marginBottom: "20px",
        },
        linkClass: {
          textDecoration: "none",
          color: "#000",
        },
      });

      
    const [book,setBook]=useState([])
    const location=useLocation()
    // const classes=useStyles()

   

      console.log(book)

      useEffect(()=>{
        fetch('https://tapbrust-backend.onrender.com/potterservice')
        .then(res=>res.json())
        .then(data=>setBook(data))
    },[])
    return (
        <div>
          <Header></Header>

<Container sx={{ mt: 15 }}>
        <Grid container spacing={3}>
          <Grid item xs={4} md={3} lg={3}>
            <Box
              className="sidebar-wrap"
              sx={{ position: { xs: "fixed", md: "fixed" } }}
            >
              <h4
                // variant="h4"
                className='servicedesign me-5'
                sx={{
                  fontWeight: 600,
                  color: "#323334",
                  mb: 3,
                  ml: 1.5,
                  fontSize: "17px",
                  display: { xs: "none", md: "block",textAlign:"left" },
                }}
              >
                All Services
              </h4>

              <Box
                className="sidebar"
                sx={{ height: { xs: "80vh", md: "75vh" } }}
              >
                {book.map((item) => {
                  const ID = item?.categories?.split(" ").join("").toLowerCase();
                  return (
                    <ListItem sx={{ p: 0 , fontSize:"30px",
                    fontWeight:"700"}} key={item._id} className="styledesign">
                      <ListItemButton
                      
                        component={NavHashLink}
                        smooth
                        className={
                          location.hash === "#" + ID ? "select-service" : ""
                        }
                        to={`/services/#${ID}`}
                      >
                      
                      <ListItemText
                         className="styledesign"
                         style={{ fontSize:"30px",
                         fontWeight:"700"}}
                          sx={{
                            display: { xs: "none", md: "block" , fontSize:"30px",
                            fontWeight:"700"},
                            px: { xs: 0, md: 1, fontSize:"30px",
                            fontWeight:"700"},
                            fontSize:"30px",
                            fontWeight:"700"
                          }}
                        >
                          {item?.categories?.length >= 25
                            ? item?.categories.slice(0, 16) + "..."
                            : item?.categories}
                        </ListItemText>
                      
                        <ListItemText
                         className='styledesign'
                         style={{ fontSize:"30px",
                         fontWeight:"700"}}
                          sx={{
                            display: { xs: "block", md: "none ", fontSize:"30px",
                            fontWeight:"700"},
                            px: { xs: 0, md: 1, fontSize:"30px",
                            fontWeight:"700"},
                            fontSize:"30px",
                            fontWeight:"700"
                          }}
                        >
                          {item?.categories?.split(" ")[0]?.length >= 10
                            ? item?.categories.slice(0, 7) + "..."
                            : item?.categories?.split(" ")[0]}
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={8} md={9} lg={9}>
            <Box className="content">
              {book.map((potterservice) => (
                <ServiceCardWrap
                potterservice={potterservice}
                  
                //   classes={classes}
                ></ServiceCardWrap>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* <Footer></Footer> */}
            
        </div>
    );
};

export default Services;
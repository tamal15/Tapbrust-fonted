import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link, NavLink, Outlet } from 'react-router-dom';
// import useFirebase from '../../../hooks/useFirebase';
import './Dashboard.css';
import { FaThLarge, FaUser, FaBookmark, FaCommentDots, FaSignOutAlt, FaTasks, FaUserShield, FaSchool } from 'react-icons/fa'


import HomeIcon from '@mui/icons-material/Home';
import useAuth from '../../Hooks/useAuth';
import Header from '../../Shared/Header/Header';
import Footer from '../../Shared/Footer/Footer';

const Dashboard = () => {
    const { admin, userLogOut ,buyers} = useAuth()
    return (
        <div  className='dashboard' style={{
            height: 'calc(100vh)',backgroundImage: 'url("https://i.ibb.co.com/fQHbxSs/IMG-20241019-025435.jpg")',
          }}>
          
            <Row>
                <Col md={3}>
                    <div  style={{ 
                    height: { xs: 'calc(20vh)', sm: 'calc(30vh)', md: 'calc(100vh)' },
            overflowY: 'auto'}}>
                        <div className="logo  " >
                            {/* <h4 style={{textAlign:"left"}}><span style={{color:"#CCCCCC"}}>SARONG</span> <span style={{color:"white"}}> HELP</span></h4> */}
                        </div>
                       <div className="dashboard-menu ms-3 mt-3 me-3 px-5 py-4 "style={{height: { xs: 'calc(30vh)', sm: 'calc(40vh)', md: 'calc(95vh)' },backgroundImage: `
            linear-gradient(
              rgba(255, 0, 150, 0.5), /* First color - pinkish */
             rgb(22, 41, 56),
             rgb(16, 19, 26)
             
            )`,boxShadow: "0px 10px 22px  #222", overflowY: 'scroll',scrollbarWidth: 'none',}}>
                       <ul className='' style={{marginLeft:"-10px"}} >
                            <li className=''>
                                <NavLink className="des fw-bold "  to={'/'} style={({ isActive }) => ({
                                    color: isActive ? "white" : "white",
                                })}><HomeIcon className='me-1' />Home</NavLink>
                            </li>
                            <li className=''>
                                <NavLink className="des fw-bold" to={`welcome`} style={({ isActive }) => ({
                                    color: isActive ? "white" : "white",
                                })}><FaThLarge className='me-1' /> Dashboard</NavLink>
                            </li>
                           
                          


                           


                         {
                            admin && 
                           <div style={{textAlign:"left"}}>

    
                            
                              {/* <li>
                                  <NavLink className="des" to={`useraddQuestion`} style={({ isActive }) => ({
                                      color: isActive ? "#CCCCCC" : "#CCCCCC",
                                  })}><FaBookmark className='me-1' /> Add Questions</NavLink>
                              </li> */}

                              <li>
                                <NavLink className="des fw-bold" to={`makeadmin`} style={({ isActive }) => ({
                                    color: isActive ? "white" : "white",
                                })}><FaBookmark className='me-1' /> Make Admin</NavLink>
                            </li>
                              <li>
                                <NavLink className="des fw-bold" to={`overview`} style={({ isActive }) => ({
                                    color: isActive ? "white" : "white",
                                })}><FaBookmark className='me-1' /> OverView</NavLink>
                            </li>
                             
                             
                              
                             
                              
                              
                            
                              <li>
                                  <NavLink className="des fw-bold" to={`addnotice`} style={({ isActive }) => ({
                                      color: isActive ? "white" : "white",
                                  })}><FaBookmark className='me-1' /> Notice</NavLink>
                              </li>
                             
                              <li>
                                  <NavLink className="des fw-bold " to={`adminpage`} style={({ isActive }) => ({
                                      color: isActive ? "white" : "white",
                                  })}><FaBookmark className='me-1' /> User Check</NavLink>
                              </li>
                              <li>
                                  <NavLink className="des fw-bold " to={`userdatacheck`} style={({ isActive }) => ({
                                      color: isActive ? "white" : "white",
                                  })}><FaBookmark className='me-1' /> User Data</NavLink>
                              </li>
                              <li>
                                  <NavLink className="des fw-bold " to={`newshowNotice`} style={({ isActive }) => ({
                                      color: isActive ? "white" : "white",
                                  })}><FaBookmark className='me-1' /> Show Notice</NavLink>
                              </li>
                              <li>
                                  <NavLink className="des fw-bold " to={`alluser`} style={({ isActive }) => ({
                                      color: isActive ? "white" : "white",
                                  })}><FaBookmark className='me-1' /> All User</NavLink>
                              </li>
                             
                              
                              <li>
                                  <NavLink className="des fw-bold" to={`adminapproval`} style={({ isActive }) => ({
                                      color: isActive ? "white" : "white",
                                  })}><FaBookmark className='me-1' /> Withdraw Req</NavLink>
                              </li>
                              <li>
                                  <NavLink className="des fw-bold" to={`userallwithdraw`} style={({ isActive }) => ({
                                      color: isActive ? "white" : "white",
                                  })}><FaBookmark className='me-1' /> Withdraw His</NavLink>
                              </li>
                             

                           </div>
                           
                       
                            
                            
                        }

                     

                                <li className=''>
                                  <NavLink className="des fw-bold" to={'/'} style={({ isActive }) => ({
                                      color: isActive ? "white" : "white",
                                  })}><li onClick={userLogOut} className='mt-5' style={{fontSize:"20px"}}>
                                  <FaSignOutAlt className='me-1' /> Log Out
                              </li></NavLink>
                              </li>

                           

                           
                          
                           {/* <NavLink className="des" to={'/'}><li onClick={userLogOut} className='dashboard-logOut'>
                                <FaSignOutAlt className='me-1' /> Log in
                            </li></NavLink> */}
                           
                            
                            

                           
                            {/* </div>} */}

                           
                        </ul>
                       </div>
                    </div>
                </Col>
                <Col md={9} className='py-3 ' style={{
          height: 'calc(85vh)', 
          overflowY: 'auto', marginBottom:"50px",backgroundImage: `
          linear-gradient(
            rgba(255, 0, 150, 0.5), /* First color - pinkish */
           rgb(22, 41, 56),
           rgb(16, 19, 26)
           
          )`,boxShadow: "0px 10px 22px #222",marginTop:"17px"
        }}>
          <Outlet style={{marginBottom:"10px"}} />
        </Col>
            </Row>
            {/* <Footer></Footer> */}
        </div >
    );
};

export default Dashboard;
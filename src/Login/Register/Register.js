import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { Alert, Box } from "@mui/material";
import './Register.css';
import useAuth from '../../Hooks/useAuth';
import Header from '../../Shared/Header/Header';
import Footer from '../../Shared/Footer/Footer';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { registerUser, loginWithGoogle, authError } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // Google Login Handler
  const handleGoogleLogin = () => {
    loginWithGoogle(location, navigate);  // Call the loginWithGoogle function
  };

  // Form handling with react-hook-form
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    registerUser(
      data.email,
      data.password,
      data.name,
      data.bkashNumber,
      data.refCode,
      location,
      "pending",
      navigate
    );
  };

  return (
    <div>
      <Box sx={{
        height: '200vh',
        backgroundImage: 'url("https://i.ibb.co.com/fQHbxSs/IMG-20241019-025435.jpg")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      className="background-theme">
        <div className='py-5'>
          <Container>
            <Row>
              <div className='row'>
                {/* Robot Image Section */}
                <div className='col-lg-4'>
                  <div className='image-change'>
                    <img
                      src="https://i.ibb.co/qjkFFfL/Photoleap-18-10-2024-15-20-53-AUWr-W-removebg-preview.png"
                      alt="Robot"
                      width="400"
                      className="robot-image"
                    />
                  </div>
                </div>

                {/* Registration Form Section */}
                <div className='col-lg-8'>
                  <Col md={{ span: 8, offset: 2 }}>
                    <div className="login-form text-center" style={{backgroundImage: `
            linear-gradient(
              rgba(255, 0, 150, 0.5), 
             rgb(22, 41, 56),
             rgb(16, 19, 26)
            )`,}}>
                      <h2 className='text-white'>Sign Up to TapBurst</h2>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                          className='w-75 mb-3'
                          {...register("name", { required: true })}
                          placeholder='Enter Full Name'
                        />
                        <br />
                        <input
                          className='w-75 mb-3'
                          {...register("email", { required: true })}
                          placeholder='Enter Email'
                        />
                        <br />
                        <div className="position-relative w-75 mb-3" style={{ marginLeft: "50px" }}>
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            {...register("password", { required: true })}
                            placeholder="Enter Password"
                            style={{ fontWeight: "500" }}
                          />
                          <span
                            className="position-absolute top-50 end-0 translate-middle-y pe-3"
                            style={{ cursor: "pointer" }}
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </span>
                        </div>
                        <input
                          className='w-75 mb-3'
                          {...register("refCode")}
                          placeholder='Reference Code'
                        />
                        <br />
                        <button className='submit-all' type='submit'>Sign Up</button>
                      </form>

                      {/* Login and Google Sign-in Section */}
                      <div className='login-meta mt-4 mb-2'>
                        <p className='text-white'>
                          Already have an account? 
                          <Link to={'/login'}>
                            <span className='login-links' style={{ color: "#46AADC" }}>Login here</span>
                          </Link>
                        </p>
                        <span
                          style={{ cursor: "pointer" }}
                          className='fs-4 text-white'
                          onClick={handleGoogleLogin} // Trigger Google login
                        >
                          Continue with <FcGoogle className='fs-2 google' />
                        </span>
                      </div>

                      {/* Error Handling */}
                      {authError && <Alert severity="error">{authError}</Alert>}
                    </div>
                  </Col>
                </div>
              </div>
            </Row>
          </Container>
        </div>
      </Box>
    </div>
  );
};

export default Register;

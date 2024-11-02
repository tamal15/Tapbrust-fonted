import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../Hooks/useAuth';
import { Alert, Box } from "@mui/material";
import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const { loginWithGoogle, loginWithOwnEmailAndPass, authError, sendPasswordReset } = useAuth();
    
    // Location & navigate
    const location = useLocation();
    const navigate = useNavigate();
    
    // Handle Google login
    const handleGoogleLogin = () => {
        loginWithGoogle(location, navigate);
    };
    
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        loginWithOwnEmailAndPass(data.email, data.password, location, navigate);
    };
    
    const [showPassword, setShowPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [resetMessage, setResetMessage] = useState("");
    const [showResetForm, setShowResetForm] = useState(false);

    // Function to handle the visibility toggle
    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const handleResetPassword = async (e) => {
      e.preventDefault();
      if (resetEmail) {
          const response = await sendPasswordReset(resetEmail);
          if (response.success) {
              setResetMessage(response.message);
              setResetEmail(""); // Clear the email input
          } else {
              setResetMessage(response.message);
          }
      } else {
          setResetMessage("Please enter your email.");
      }
  };

    return (
        <div style={{ overflowX: 'hidden' }}>
            <Box sx={{
                height: '180vh',
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
                <div className='py-5 overflow-x-hidden'>
                    <Container>
                        <Row>
                            <div className='row'>
                                <div className='col-lg-4'>
                                    <div className=''>
                                        <img
                                            src="https://i.ibb.co/qjkFFfL/Photoleap-18-10-2024-15-20-53-AUWr-W-removebg-preview.png"
                                            alt="Robot"
                                            width="400"
                                            className="robot-image"
                                        />
                                    </div>
                                </div>
                                <div className='col-lg-8 overflow-x-hidden'>
                                    <Col md={{ span: 8, offset: 2 }}>
                                        <div className="login-form text-center" style={{
                                            backgroundImage: `
                                                linear-gradient(
                                                  rgba(255, 0, 150, 0.5),
                                                  rgb(22, 41, 56),
                                                  rgb(16, 19, 26)
                                                )`
                                        }}>
                                            <h2 className='text-white'>Login to TapBurst</h2>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div>
                                                    <input
                                                        style={{ fontWeight: "500" }}
                                                        className='w-75 mb-3'
                                                        {...register("email", { required: true })}
                                                        placeholder='Enter Email' />
                                                    <br />
                                                </div>

                                                <div className="position-relative w-75 mb-3" style={{ marginLeft: "55px" }}>
                                                    <input
                                                        style={{ fontWeight: "500" }}
                                                        type={showPassword ? "text" : "password"}
                                                        className="form-control"
                                                        {...register("password", { required: true })}
                                                        placeholder="Enter Password"
                                                    />
                                                    <span
                                                        className="position-absolute top-50 end-0 translate-middle-y pe-3"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={togglePasswordVisibility}
                                                    >
                                                        {showPassword ? (
                                                            <FaEyeSlash />
                                                        ) : (
                                                            <FaEye />
                                                        )}
                                                    </span>
                                                </div>

                                                <button className='submit-all' type='submit'>Login</button>
                                                <p className='text-white mt-3 mb-4'>New to TapBrust <Link to={'/register'}><span className='login-links' style={{ color: "#46AADC" }}>Create a free Account</span></Link></p>
                                                <p className='text-white cursor-pointer' onClick={() => setShowResetForm(!showResetForm)}>Forget Password?</p>
                                            </form>

                                            <div className='login-meta mt-4 mb-5'>
                                                <span style={{ cursor: "pointer" }} className='fs-4 text-white'>Continue with <FcGoogle onClick={handleGoogleLogin} className='fs-2 google' /></span>
                                            </div>

                                            {authError && 
                                                <Alert severity="error">{authError}</Alert>
                                            }

                                            {/* Password Reset Section */}
                                            {showResetForm && (
                                <div className="reset-password-form">
                                    <h4>Reset Password</h4>
                                    <input
                                        type="email"
                                        value={resetEmail}
                                        onChange={(e) => setResetEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        style={{marginBottom:"5px"}}
                                        required
                                    />
                                    <br/>
                                    <button onClick={handleResetPassword}> Reset Email</button>
                                    {resetMessage && <Alert severity={resetMessage.includes("success") ? "success" : "error"}>{resetMessage}</Alert>}
                                    <br/>
                                    <button style={{marginTop:"7px"}} onClick={() => setShowResetForm(false)}>Cancel</button>
                                </div>
                            )}

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

export default Login;

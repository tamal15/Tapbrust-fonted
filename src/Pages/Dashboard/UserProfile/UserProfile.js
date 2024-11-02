import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';

import './UserProfile.css';

const UserProfile = () => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false); // State to control form visibility

  useEffect(() => {
    fetch(`https://tapbrust-backend.onrender.com/updateUser/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
        console.log(data);
      });
  }, [user.email]);

  return (
    <div
      className="user-profile"
      style={{ background: '#113350', borderRadius: '20px', margin: '9px',marginLeft:"30px",marginRight:"30px" }}
    >
      <div>
        <div className="profile-title d-flex justify-content-between align-items-center">
          <h3 style={{ color: 'white' }}>My Profile</h3>
          <span
            onClick={() => setEditMode(!editMode)} // Toggle form visibility on click
            style={{ textDecoration: 'none', cursor: 'pointer' }}
          >
            <FaEdit className="edit-icon" /> Edit
          </span>
        </div>
        <Container>
          <Row>
            <Col md={3}>
              <div className="user-verify py-4">
                <img
                  src={
                    user.photoURL
                      ? user.photoURL
                      : 'https://i.ibb.co/Xsnkx3L/user.png'
                  }
                  alt=""
                />
                <p style={{ color: 'white', textDecoration: 'left' }}>
                  {userInfo?.address
                    ? 'Profile Completed (100%)'
                    : 'Profile Completed (40%)'}
                </p>
              </div>
            </Col>
            <Col md={9}>
              <div
                className="profile-information py-4"
                style={{
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div className="single-box">
                  <h6 className="text-white mt-3">
                    Full Name : {user.displayName}
                  </h6>

                  <h6 className="text-white mt-2">Email : {user.email}</h6>

                  <h6 className="text-white mt-2">
                    Address : {userInfo?.address ? userInfo?.address : 'null'}
                  </h6>

                  <p className="text-capitalize text-white mt-2">
                    Mobile : {userInfo?.mobile ? userInfo?.mobile : 'null'}
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Conditionally render the UserUpdateProfile form below */}
    
    </div>
  );
};

export default UserProfile;

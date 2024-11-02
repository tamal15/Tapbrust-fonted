import React from 'react';
import useAuth from '../../../../Hooks/useAuth';
import { Col, Row } from 'react-bootstrap';

const BuyerWelcome = () => {
    const {  user } = useAuth();

    return (
        <div>
             <Row>
                <Col md={6}>
                    <h2 style={{color:"white"}}>Hello, <span style={{ color: "#46AADC" }} className='fs-1'>{user.displayName}</span></h2>
                    <p style={{color:"white"}} className='fs-4 '>Welcome to <span style={{ color: "#46AADC", fontWeight: "700" }}>TAPBURST</span></p>
                </Col>
                <Col md={6}>
                    <div className="dashboard-image">
                        <img src='https://i.ibb.co/Xsnkx3L/user.png' alt="user" />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default BuyerWelcome;

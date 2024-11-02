import React from 'react';
import { Col, Row, Container,Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import useAuth from '../../../../Hooks/useAuth';
// import Header from '../../../Shared/Header/Header';
// import {  Form,Col} from "react-bootstrap";
// import useAuth from '../../hooks/useAuth';

// import useFirebase from '../../../hooks/useFirebase';
// import Swal from 'sweetalert/sweetalert';

const UserDesignOrder = () => {
    const { user } = useAuth()
    // const {admin}=useAuth()
    const { register, handleSubmit, reset } = useForm()
    const onSubmit = data => {
        // data.userName = user.displayName
        
        // const useing=user.email
        data.buyerEmail = user.email
        data.likes = []
        // data.status = 'Pending'
     

        fetch("https://tapbrust-backend.onrender.com/userDesign", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
                if(result.insertedId){
                    alert('added successfully');
                    reset()
                }
                
            });
    };

   
    return (
        <div className='py-5'>
            
            <Container>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        <div className="login-form text-center shadow" style={{background:"#7E2231",borderRadius:"20px"}}>
                            <h2 className='mb-5 text-white'>Add Your Design</h2>
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <input
                                style={{fontWeight:"600",color:" #0E1621"}}
                                className='w-75 mb-3'  {...register("Sharee", { required: true })} placeholder='Sharee' /> <br />

                                <input
                                // type="number"
                                style={{fontWeight:"600",color:" #0E1621"}}
                                className='w-75 mb-3'  {...register("material", { required: true })} placeholder='material' /> <br />
                                 
                                 <input
                                 style={{fontWeight:"600",color:" #0E1621"}}
                                 className='w-75 mb-3' {...register("img", { required: true })} placeholder="img url"/>
                                 
                                {/* <input
                                style={{fontWeight:"600",color:" #0E1621"}}
                                className='w-75 mb-3'  {...register("sizing", { required: true })} placeholder='Size example : M' /> <br /> */}
                              
                               
                               
                               
                              

                               
                                    <br></br>
                                
                                

                               
                               <div className='paterns'>
                               <button className='submit-all' type='submit'>Submit</button>
                               </div>
                                
                            </form>

                        </div>
                    </Col>
                </Row>
            </Container>

        </div >
    );
};

export default UserDesignOrder;
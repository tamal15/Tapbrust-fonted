import React from 'react';
import { Col, Row, Container,Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";



const Notice = () => {
    
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        // data.userName = user.displayName
        // data.email = user.email
        // data.status = 'Pending'
        data.date= new Date().toLocaleDateString()

     

        fetch("https://tapbrust-backend.onrender.com/addnotice", {
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
                        <div className="login-form text-center shadow" style={{backgroundImage: `
            linear-gradient(
              rgba(255, 0, 150, 0.5), /* First color - pinkish */
             rgb(22, 41, 56),
             rgb(16, 19, 26)
             
            )`,borderRadius:"20px"}}>
                            <h2 className='mb-5 text-white'>Add Your Notice</h2>
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <input
                                style={{fontWeight:"600",color:" #0E1621"}}
                                className='w-75 mb-3'  {...register("tittle", { required: true })} placeholder='tittle' /> <br />
                                <input
                                style={{fontWeight:"600",color:" #0E1621"}}
                                className='w-75 mb-3'  {...register("description", { required: true })} placeholder='Description' /> <br />

                              
                               
                                    <br></br>
                                
                                

                               

                                <button className='submit-all' type='submit'>Submit</button>
                            </form>

                        </div>
                    </Col>
                </Row>
            </Container>

        </div >
    );
};

export default Notice;
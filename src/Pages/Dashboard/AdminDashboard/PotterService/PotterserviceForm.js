import { setPersistence } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Col, Row, Container,Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';

import useAuth from '../../../../Hooks/useAuth';
import ProductBuyer from '../../BuyerDashboard/ProductBuyer';
// import useAuth from '../../../Hooks/useAuth';


const PotterserviceForm = () => {
    const { user } = useAuth()
    // const {admin}=useAuth()
    const {id}=useParams()
    const [work, setWork] = useState({});
    const [book, setBook] = useState({});
    const [design, setDesign] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = (data,id) => {
        // data.userName = user.displayName
        console.log(data)
        // let keys= data;
        setDesign(data);
      
    


        
            
            
              
       
    


    };

   

     const handleLike = (id,data) => {
        fetch(`https://tapbrust-backend.onrender.com/service/${id}`, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(design)
        }) .then((res) => res.json())
        .then((result) => {
            if(result.insertedId){
                alert('added successfully');
                reset()
            }
            
        });
    
    
      }
      

    useEffect(() => {
        fetch(`https://tapbrust-backend.onrender.com/potterservicedetails/${id}`)
          .then((res) => res.json())
          .then((data) => setBook(data));
      }, [id]);
  
    const fetchData = () => {
        fetch(`https://tapbrust-backend.onrender.com/potterservicedetails/${id}`)
          .then(res => res.json())
          // .then(data => setWork(data))
          .then(data => {
            // const sliceData = data.slice(0, 8);
    
            setWork(data)
    
          })
      }
      useEffect(() => {
        fetchData()
      }, [id])


    return (
        <div className='py-5'>
            
            <Container>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        <div className="login-form text-center shadow" style={{background:"#7E2231",borderRadius:"20px"}}>
                            <h2 className='mb-5 text-white'>Add Your Sharee</h2>
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <input
                                style={{fontWeight:"600",color:" #0E1621"}}
                                className='w-75 mb-3'  {...register("productName", { required: true })} placeholder='Product Name' /> <br />

                                <input
                                type="number"
                                min="1"
                                onkeyup="if(this.value<0)this.value=1"
                                step="1"
                                style={{fontWeight:"600",color:" #0E1621"}}
                                className='w-75 mb-3'  {...register("ProductPrice", { required: true })} placeholder='Product Price' /> <br />
                                 
                                 <input
                                 style={{fontWeight:"600",color:" #0E1621"}}
                                 className='w-75 mb-3' {...register("img", { required: true })} placeholder="img url"/>
                                 
                                <input
                                value={user.email}
                                style={{fontWeight:"600",color:" #0E1621"}}
                                className='w-75 mb-3'  {...register("email", { required: true })} placeholder='email' /> <br />

                            
                               
                                <input
                                style={{fontWeight:"600",color:" #0E1621"}}
                                className='w-75 mb-3'  {...register("description", { required: true })} placeholder='Description' /> 

<Form.Group as={Col} controlId="formGridRating"        style={{marginLeft:"104px",marginRight:"104px", borderRadius:"15px",color:"black"}}>
                                        
                                        <select
                                        style={{borderRadius:"30px"}}
                                            required
                                            className="form-control shadow-none"
                                            placeholder='select'
                                            {...register("warrenty")}
                                        >
                                            <option>Select Warrenty</option>
                                            <option value="1 month">1 month</option>
                                            <option value="6 month">6 month</option>
                                            <option value="9 month">9 month</option>
                                            <option value="1 Year">1 Year</option>
                                            <option value="7 Days">7 Days</option>
                                           
                                          
                                        </select>
                                    </Form.Group>
                                {/* <input
                                style={{fontWeight:"600",color:" #0E1621"}}
                                className='w-75 mb-3'  {...register("material", { required: true })} placeholder='Main Material example : silk/Cotton/Half Silk/Katan/Tissure' /> */}
                                {/* <input
                                style={{fontWeight:"600",color:" #0E1621"}}
                                className='w-75 mb-3'  {...register("likes")} placeholder='likes' /> */}

                                {/* <input> */}
                                <br></br>
                                <Form.Group as={Col} controlId="formGridRating"        style={{marginLeft:"104px",marginRight:"104px", borderRadius:"15px",color:"white"}}>
                                        <Form.Label>
                                            Give Us A Rating (1 is the wrost , 5 is the best)
                                        </Form.Label>
                                        <select
                                        style={{borderRadius:"30px"}}
                                            required
                                            className="form-control shadow-none"
                                            {...register("rating")}
                                        >
                                            <option>Select Rating</option>
                                            <option value="1">1</option>
                                            <option value="1.5">1.5</option>
                                            <option value="2">2</option>
                                            <option value="2.5">2.5</option>
                                            <option value="3">3</option>
                                            <option value="3.5">3.5</option>
                                            <option value="4">4</option>
                                            <option value="4.5">4.5</option>
                                            <option value="5">5</option>
                                        </select>
                                    </Form.Group>
                                {/* </input> */}
                                    <br></br>
                                
                                

                               
                                <div className='paterns'>
                                <button onClick={() => handleLike(book?._id)}  className='submit-all' type='submit'>Submit</button>

                                </div>
                                
                            </form>

                        </div>
                    </Col>
                </Row>
            </Container>

        </div >
    );
};

export default PotterserviceForm;
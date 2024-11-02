import React from 'react';
import { Col, Row, Container,Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import useAuth from '../../../../Hooks/useAuth';
// import useAuth from '../../../Hooks/useAuth';


const PotterService = () => {
    const { user } = useAuth()
    // const {admin}=useAuth()
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        // data.userName = user.displayName

        data.buyerEmail = user.email
        // data.schedules=''
        data.services = []
        // data.status = 'Pending'
     

        fetch("https://tapbrust-backend.onrender.com/potterservice", {
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
                            <h2 className='mb-5 text-white'>Add Your Potter</h2>
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

                                <Form.Group as={Col} controlId="formGridRating"        style={{marginLeft:"104px",marginRight:"104px", borderRadius:"15px",color:"black"}}>
                                        
                                        <select
                                        style={{borderRadius:"30px"}}
                                            required
                                            className="form-control shadow-none"
                                            placeholder='select'
                                            {...register("categories")}
                                        >
                                           <option>Select categories</option>
                                            <option value="nakshi-katha">nakshi-katha</option>
                                            <option value="nakshi-pakha">nakshi-pakha</option>
                                            <option value="shital-pati">shital-pati</option>
                                            <option value="pottery">pottery</option>
                                            <option value="dhatob-shilpo">dhatob-shilpo</option>
                                            <option value="daru-shilpo">daru-shilpo</option>
                                            <option value="jhinuk-shilpo">jhinuk-shilpo</option>
                                            <option value="putul-shilpo">putul-shilpo</option>
                                            <option value="pitol-Kasha">pitol-Kasha</option>
                                            <option value="bate-shilpo">bate-shilpo</option>
                                            <option value="shankho-shilpo">shankho-shilpo</option>
                                          
                                        </select>
                                    </Form.Group><br />
                               
                               

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

export default PotterService;
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";
// import useAuth from '../../../Hooks/useAuth';
import { Form } from 'react-bootstrap';
import useAuth from '../../../../../Hooks/useAuth';
import Header from '../../../../../Shared/Header/Header';
import Footer from '../../../../../Shared/Footer/Footer';

const DesignPotter = () => {
    const { user } = useAuth()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        data.complete = true
        fetch(`https://tapbrust-backend.onrender.com/service`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
               
                if(result.modifiedCount){
                    console.log(result)
                   alert("Confarom Profile Update")
                        reset()
                }
                // 
            }); 
    }
    return (
        
       <div>
          <Header></Header>
         <div className='py-5 edit-profile'>
          
            <Container>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        <div className="login-form text-center shadow" style={{background:"#7E2231",borderRadius:"20px"}}>
                            <h2 className='mb-5 text-white'>Upload product</h2>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input
                                style={{fontWeight:"600",color:" #0E1621"}}
                                    className='w-75 mb-3' 
                                    {...register("ProductName", { required: true })}
                                    placeholder='ProductName' />
                                <br />

                                <input
                                  style={{fontWeight:"600",color:" #0E1621"}}
                                    className='w-75 mb-3' defaultValue={user.email}
                                    {...register("email", { required: true })} placeholder='Enter Email' />

                                <input
                                type="number"
                                min="1"
                                onkeyup="if(this.value<0)this.value=1"
                                step="1"
                                style={{fontWeight:"600",color:" #0E1621"}}
                                className='w-75 mb-3'  {...register("ProductPrice", { required: true })} placeholder='Product Price' />
                                <br></br>

                                <input
                                 style={{fontWeight:"600",color:" #0E1621"}}
                                 className='w-75 mb-3' {...register("img", { required: true })} placeholder="img url"/>
                                <br />
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
                               
                                <input
                                style={{fontWeight:"600",color:" #0E1621"}}
                                className='w-75 mb-3'  {...register("description", { required: true })} placeholder='Description' /> 
                                <br />
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
                                <br />
                               
                                <button className='submit-all' type='submit'>Submit Product</button>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
            
        </div>
        <Footer></Footer>
       </div>
    );
};

export default DesignPotter;
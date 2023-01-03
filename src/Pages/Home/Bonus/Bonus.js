import React, { useEffect } from 'react';
// import image1 from '../../../../images/developer.jpg'
// import image2 from '../../../../images/mern.png'
// import image3 from '../../../../images/designer.jpg'
import './Bonus.css'
import Aos from 'aos';
import 'aos/dist/aos.css';
const Bonus = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);
    return (
        <div>
            <div className="container mb-5 p-3 mt-5">
                  {/* <h1  className="text-info mb-5 mt-5">Services</h1> */}
            <div data-aos="fade-up" className="row row-cols-1 row-cols-md-3 g-4">

            <div data-aos="fade-up" class="col">
              <div className="card  project" style={{border:"2px solid white"}}>
                
            
                {/* <h1>{id}</h1> */}
                            <img style={{border:"2px solid white"}} className="image-design" src="https://i.ibb.co/fxsYqrN/1.png" class="card-img-top" alt="..." />


                          </div>
            </div>

            {/* 2nd  */}
            <div data-aos="fade-up" class="col">
              <div className="card  project">
                
            
                {/* <h1>{id}</h1> */}
                            <img className="image-design" src="https://i.ibb.co/68mfRk0/2.png" class="card-img-top" alt="..." />


                          </div>
            </div>


            {/* 3rd  */}
            <div data-aos="fade-up" class="col">
              <div className="card  project">
                
            
                {/* <h1>{id}</h1> */}
                            <img className="image-design" src="https://i.ibb.co/xhvMrp6/3.png" class="card-img-top" alt="..." />


                          </div>
            </div>



            {/* 4rd  */}
            <div data-aos="fade-up" class="col">
              <div className="card  project">
                
            
                {/* <h1>{id}</h1> */}
                            <img className="image-design" src="https://i.ibb.co/pxqHz85/4.png" class="card-img-top" alt="..." />


                          </div>
            </div>



            {/* 5th  */}
            <div data-aos="fade-up" class="col">
              <div className="card  project">
                
            
                {/* <h1>{id}</h1> */}
                            <img className="image-design" src="https://i.ibb.co/t4cqm81/5.png" class="card-img-top" alt="..." />


                          </div>
            </div>



            {/* 6th  */}
            <div data-aos="fade-up" class="col">
              <div className="card  project">
                
            
                {/* <h1>{id}</h1> */}
                            <img className="image-design" src="https://i.ibb.co/fxsYqrN/1.png" class="card-img-top" alt="..." />


                          </div>
            </div>
            </div>
                
            </div>
        </div>
    );
};

export default Bonus;
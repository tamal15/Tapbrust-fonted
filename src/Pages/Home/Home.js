import React, { useEffect, useState } from 'react';
import CartCalculation from '../../Hooks/UseCartCalculation';


import ScrollBar from './Scrollbar';
import HomeLanding from './HomeLanding/HomeLanding';
import './Home'



const Home = () => {
    const { shipping, tax, totalQuantity, total, grandtotal, cartProducts } = CartCalculation();
   
  
    return (

        
        <div style={{overflowX:"hidden"}}>

           

                {/* <Header></Header> */}
                            {/* <Visit></Visit>  */}
                  <HomeLanding/>
                            
                            {/* <BuyerProduct></BuyerProduct> */}
                            {/* <HomeDataShow/> */}
                           
                            {/* <UpCommingSharee></UpCommingSharee> */}
                            
                            {/* <Partner></Partner> */}

                            {/* <Footer></Footer> */}
                            <ScrollBar></ScrollBar>
                             
             
                
                
             

             
           
          
           
            
           
        </div>
    );
};

export default Home;
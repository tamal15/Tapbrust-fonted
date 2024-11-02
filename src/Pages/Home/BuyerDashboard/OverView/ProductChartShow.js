import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
// import GraphChart from './GraphChart';
import ProductChart from './ProductChart';

const ProductChartShow = () => {
    const [model, setModel] = useState([]);
    useEffect(()=>{
        fetch('https://tapbrust-backend.onrender.com/adminShowproduct')
        .then(res=>res.json())
        .then(data => {
            const sliceData = data.allQuestions.slice(0, 1);
    
            setModel(sliceData)
    
          })
        // .then(data=>setModel(data.allQuestions))
    },[]);
    return (
        <div>
             {
                            model.map(datas => <ProductChart key={datas._id} datas={datas}></ProductChart>) 

                        }
            
        </div>
    );
};

export default ProductChartShow;
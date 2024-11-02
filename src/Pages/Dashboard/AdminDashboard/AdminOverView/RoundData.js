import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import RoundedServiceCart from './RounndedServiceCart';

const RoundData = () => {
    const [model, setModel] = useState([]);
    useEffect(() => {
        fetch('https://tapbrust-backend.onrender.com/adminConfarm')
          .then((res) => res.json())
          .then((data) => setModel(data.slice(0,1)));
      }, []);
    
    return (
        <div>
             {
                            model.map(round => <RoundedServiceCart key={round._id} round={round}></RoundedServiceCart>) 

                        }
            
        </div>
    );
};

export default RoundData;
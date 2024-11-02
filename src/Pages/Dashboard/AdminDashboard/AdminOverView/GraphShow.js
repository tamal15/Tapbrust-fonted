import React, { useEffect, useState } from 'react';
import GraphChart from './GraphChart';

const GraphShow = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('https://tapbrust-backend.onrender.com/adminConfarm')
      .then((res) => res.json())
      .then((data) => setQuestions(data.slice(0,1)));
  }, []);

  // Filtering questions with pending status
  

  return (
    <div>
      {
        questions.map((datas) => (
          // Pass 'datas' and 'managePost' as separate props
          <GraphChart key={datas._id} datas={datas}  />
        ))
      }
    </div>
  );
};

export default GraphShow;

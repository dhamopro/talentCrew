import React from 'react';
import { useParams } from 'react-router-dom';

const Component2 = () => {
  let { id } = useParams();

  return (
    <div>
      <h1>Component 2</h1>
      <p>Parameter ID: {id}</p>
    </div>
  );
};

export default Component2;

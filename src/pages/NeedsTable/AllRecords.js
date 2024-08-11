import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';
import Registration from '../Registration/Registration';
import CandidateTable from './CandidateTable';

const AggregateComponent = ({ collectionName }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('List');
  const [candidateId, setCandidateId] = useState('');



  useEffect(() => {
    const fetchRecords = async () => {
      const pb = new PocketBase('YOUR_POCKETBASE_URL');
      
      try {
        const resultList = await pb.collection(collectionName).getList(1, 50, {
          sort: '-created',
        });
        setRecords(resultList.items);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRecords();
  }, [collectionName]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleSelectedCand = (id) => {
    setCandidateId(id);
    setMode('Reg');
    console.log(id);

  };

  return (
    <div>
      {candidateId !=='' &&<Registration editId={candidateId}/>} 
      {mode ==='List' && <CandidateTable handleSelectedCand={handleSelectedCand}/>}
    </div>
  );
};

export default AggregateComponent;
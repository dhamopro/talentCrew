import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PocketBase from 'pocketbase';


const RecordsComponent = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pb = new PocketBase('http://139.59.90.114');


  useEffect(() => {
    const fetchRecords = async () => {
      try {
       /* const response = await axios.get(
          'http://139.59.90.114/_/?#/collections?collectionId=koz7kv9hvr9020k&filter=&sort=-created'
        );
        setRecords(response.data); // Assuming response.data is an array of records
        */
        // fetch a paginated records list
    const resultList = await pb.collection('Candidate').getList(1, 50, {
    filter: 'created >= "2022-01-01 00:00:00"',
    });

    setRecords(resultList);
        
    setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const handleUpdateRecord = async (id, newTitle) => {
    try {
      // Simulate update request (replace with actual API call)
      const updatedRecords = records.map(record =>
        record.id === id ? { ...record, title: newTitle } : record
      );
      setRecords(updatedRecords);
      
      // Simulate sending update to the server (replace with actual API call if applicable)
      await axios.put(
        `http://139.59.90.114/_/?#/collections/${id}`, // Replace with actual update endpoint if available
        { id, title: newTitle }
      );
    } catch (error) {
      console.error('Error updating record:', error);
      // Handle error
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Records</h2>
      <ul>
        {records.map(record => (
          <li key={record.id}>
            {record.title}
            <button onClick={() => handleUpdateRecord(record.id, prompt('Enter new title:', record.title))}>
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecordsComponent;

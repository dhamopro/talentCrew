import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';

const RecordsList1 = ({ collectionName }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div>
      <h2>{collectionName} Records</h2>
      <ul>
        {records.map((record) => (
          <li key={record.id}>{JSON.stringify(record)}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecordsList1;
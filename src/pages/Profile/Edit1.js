import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PocketBase from 'pocketbase';

const EditRecord = () => {
  const { collectionName, id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pb = new PocketBase('http://139.59.90.114');

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const fetchedRecord = await pb.collection(collectionName).getOne(id, {
            requestKey: 'editRecord',
            timeout: 10000 // 10 seconds
          });
        setRecord(fetchedRecord);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRecord();
  }, [collectionName, id]);

  const handleChange = (field, value) => {
    setRecord({ ...record, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await pb.collection(collectionName).update(id, record);
      navigate(-1); // Go back to the previous page
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!record) return <div>No record found</div>;

  return (
    <div>
      <h2>Edit Record</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(record).map(([key, value]) => (
          <div key={key}>
            <label>
              {key}:
              <input
                type="text"
                value={value}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            </label>
          </div>
        ))}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditRecord;
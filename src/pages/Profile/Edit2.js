import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PocketBase from 'pocketbase';

const EditRecord2 = () => {
  const { collectionName, id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pb = new PocketBase('http://139.59.90.114');
  
  const fetchRecord = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedRecord = await pb.collection(collectionName).getOne(id);
      setRecord(fetchedRecord);
    } catch (err) {
      if (err.isAbort) {
        setError("The request was cancelled. Please try again.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [collectionName, id]);

  useEffect(() => {
    fetchRecord();
  }, [fetchRecord]);

  const handleChange = (field, value) => {
    setRecord({ ...record, [field]: value });
  };

  const handleFileChange = async (field, e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append(field, file);
        const updatedRecord = await pb.collection(collectionName).update(id, formData);
        setRecord(updatedRecord);
      } catch (err) {
        setError(`Failed to upload image: ${err.message}`);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const updatedRecord = await pb.collection(collectionName).update(id, record);
      setRecord(updatedRecord);
      navigate(-1); // Go back to the previous page
    } catch (err) {
      if (err.isAbort) {
        setError("The update request was cancelled. Please try again.");
      } else {
        setError(err.message);
      }
    }
  };

  const renderField = (key, value) => {
   // if (typeof value === 'object' && value !== null && 'url' in value) {
    if ( key === 'candidate_picture') {    
      // This is likely an image field
      return (
        <div key={key}>
          <label>{key}:</label>
          <img src={pb.getFileUrl(record, key)} alt={key} style={{ maxWidth: '200px', maxHeight: '200px' }} />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(key, e)}
          />
        </div>
      );
    } else {
      // For other fields, render a text input
      return (
        <div key={key}>
          <label>
            {key}: {typeof value}
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          </label>
        </div>
      );
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return (
    <div>
      <p>Error: {error}</p>
      <button onClick={fetchRecord}>Retry</button>
    </div>
  );
  if (!record) return <div>No record found</div>;

  return (
    <div>
      <h2>Edit Record</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(record).map(([key, value]) => renderField(key, value))}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditRecord2;
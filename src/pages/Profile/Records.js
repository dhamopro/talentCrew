import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';
import { Link } from 'react-router-dom';


const RecordsList = ({ collectionName, onSelectedId }) => {
  
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      const pb = new PocketBase('http://139.59.90.114');
      
      try {
        const resultList = await pb.collection('Candidate').getList(1, 50, {
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

  const  handleSelectId= (id) => {
    console.log(id);
    onSelectedId(id);
  };


  return (
    <div>
      <h2> Records</h2>
     {/*} <ul>
        {records.map((record) => (
          <li key={record.id}>{JSON.stringify(record)}</li>
        ))}
      </ul>*/}


      <h2> Records</h2>
      <table style={{  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
        <tr>
            <td>First</td>
            <td>Middle</td>
            <td>Last</td>
            <td>Organization</td>
            <td>Email</td>
        </tr>
        {records.map((record) => (
           <tr> 
                <td key={record.id} style={{ border: '1px solid #ccc', padding: '1rem' }}>
               {record.first_name} 

                </td>
                <td key={record.id} style={{ border: '1px solid #ccc', padding: '1rem' }}>
               {record.middle_name} 

                </td>
                <td key={record.id} style={{ border: '1px solid #ccc', padding: '1rem' }}>
               {record.last_name} 

                </td>
                <td  style={{ border: '1px solid #ccc', padding: '1rem' }}>
               {record.current_organisation} 

                </td>

                <td style={{ border: '1px solid #ccc', padding: '1rem' }}>

                {/*<button  onClick={() => handleSelectId(record.id)}>Edit</button>
                <Link to={`/edit/candidate/${record.id}`}>
                    <button>Edit</button>
                    </Link>   */}
                    <a href='#' onClick={() => handleSelectId(record.id)}>{record.email}</a>
                </td>
                </tr>
        ))}
      </table>





    </div>
  );
};

export default RecordsList;
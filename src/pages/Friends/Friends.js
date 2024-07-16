//const Friends = () => {
  import React, { useState, useEffect } from 'react';
  import DynamicForm from './DynamicForm';
  import fieldData from './formData.json';
import DynamicFormm from './DynamicFormm';
import ListToTable from './ListToTable';
import JobRequirementForm from './JobRequirementForm';
  function Friends() {
    const [formData1, setFormData1] = useState([]);
  
   {/*} const getData=()=>{
      fetch('http://localhost:3000/0'
      ,{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      }
      )
        .then(function(response){
          console.log(response)
          return response.json();
        })
        .then(function(myJson) {
          console.log(myJson);
        });
    }
    useEffect(()=>{
      //getData()
      setFormData(getData())
    },[])*/}


    useEffect(() => {
      fetch('http://localhost:3000/fields')
        .then(response => response.json())
        .then(data => setFormData1(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    //console.log(fieldData);
    //setFormData(getData())
    console.log('formData');
    console.log(formData1);

    const testData = ["test1", "test2", "test3", "test4", "test5", "test6", "test7"];
    const numColumns = 3;

  return (
    <div>
      <h1>Requirement Form</h1>
      {/*<DynamicFormm data={formData1} numColumns={2}/>
      <ListToTable data={formData1} numColumns={4}/>*/}
      <JobRequirementForm/>
    </div>
  );
};



export default Friends

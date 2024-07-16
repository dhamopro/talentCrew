import React, { useState, useEffect } from 'react';

function DynamicForm({ formData }) {
  const [formValues, setFormValues] = useState([]);
  //const [formData, setFormData] = useState([]);
   console.log(formData);
   console.log(typeof(formData));

   const handleChange = (fieldName, value) => {
    setFormValues({ ...formValues, [fieldName]: value });
  };

  //setFormData(formData1)
  if (Array.isArray(formData) && formData.length > 0) {
  return (
    <div>
      {formData.length === 10 &&
            (<p>Value is equal to 10</p>)}  
      {formData.map((field, index) => (

        //index % 3 === 0 && ( <div><h1>Welcome, User!</h1></div>)

        <div key={field.iFeildId}>
          <label htmlFor={field.sFeildName}>{field.sFeildDisplayName}</label>
          {field.iFeildDataType === 1 ? (
            <input
              type="text"
              id={field.sFeildName}
              name={field.sFeildName}
              value={formValues[field.sFeildName] || ''}
              onChange={e => handleChange(field.sFeildName, e.target.value)}
            />
          ) : field.iFeildDataType === 2 ? (
            <textarea
              id={field.sFeildName}
              name={field.sFeildName}
              value={formValues[field.sFeildName] || ''}
              onChange={e => handleChange(field.sFeildName, e.target.value)}
            />
          ) : null}
        </div>
      ))}
    </div>
  );}
};

export default DynamicForm

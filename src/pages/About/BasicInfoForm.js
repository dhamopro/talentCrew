import React, { useState } from 'react';


const BasicInfoForm = () => {
    const [basicInfo, setBasicInfo] = useState({
      firstName: '',
      lastName: '',
      email: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setBasicInfo({ ...basicInfo, [name]: value });
    };
  
    return (
      <div>
        <h2>Basic Information</h2>
        <form>
          <label>
            First Name:
            <input type="text" name="firstName" value={basicInfo.firstName} onChange={handleChange} />
          </label>
          <br />
          <label>
            Last Name:
            <input type="text" name="lastName" value={basicInfo.lastName} onChange={handleChange} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" value={basicInfo.email} onChange={handleChange} />
          </label>
        </form>
      </div>
    );
  };

  export default BasicInfoForm;
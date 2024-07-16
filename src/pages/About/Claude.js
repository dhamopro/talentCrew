import React, { useState } from 'react';
import './Form.css';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    startDate: '',
    school: '',
    percentage: '',
  });
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div className="react-tabs">
       <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
      <div className="react-tabs__tab-list">
        <div
          className={`react-tabs__tab ${activeTab === 0 ? 'react-tabs__tab--selected' : ''}`}
          onClick={() => handleTabChange(0)}
        >
          Personal Info
        </div>
        <div
          className={`react-tabs__tab ${activeTab === 1 ? 'react-tabs__tab--selected' : ''}`}
          onClick={() => handleTabChange(1)}
        >
          Experience
        </div>
        <div
          className={`react-tabs__tab ${activeTab === 2 ? 'react-tabs__tab--selected' : ''}`}
          onClick={() => handleTabChange(2)}
        >
          Education
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={`react-tabs__tab-panel ${activeTab === 0 ? 'react-tabs__tab-panel--selected' : ''}`}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
        </div>

        <div className={`react-tabs__tab-panel ${activeTab === 1 ? 'react-tabs__tab-panel--selected' : ''}`}>
          <label>
            Experience:
            <textarea name="experience" value={formData.experience} onChange={handleChange} />
          </label>
          <br />
          <label>
            Start Date:
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
          </label>
        </div>

        <div className={`react-tabs__tab-panel ${activeTab === 2 ? 'react-tabs__tab-panel--selected' : ''}`}>
          <label>
            School:
            <input type="text" name="school" value={formData.school} onChange={handleChange} />
          </label>
          <br />
          <label>
            Percentage:
            <input type="number" name="percentage" value={formData.percentage} onChange={handleChange} />
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
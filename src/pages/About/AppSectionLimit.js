import React, { useState } from 'react';

const DynamicForm = ({ schema }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data
    const newErrors = {};
    Object.keys(schema).forEach((section) => {
      schema[section].forEach((field) => {
        const { name, isRequired, pattern, validationMessage } = field;
        if (isRequired && !formData[name]) {
          newErrors[name] = validationMessage || `${name} is required`;
        } else if (pattern && !RegExp(pattern).test(formData[name])) {
          newErrors[name] = field.patternMismatchMessage || validationMessage || `Invalid ${name}`;
        }
      });
    });
    setErrors(newErrors);

    // If no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      // Submit form data
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(schema).map((section) => (
        <div key={section}>
          <h2>{section}</h2>
          <div className="row">
            {schema[section].map((field) => (
              <div className="col" key={field.name}>
                <label htmlFor={field.name}>{field.name}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                />
                {errors[field.name] && <span style={{ color: 'red' }}>{errors[field.name]}</span>}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

// Updated JSON schema with patternMismatchMessage included
const schema = {
  Basic: [
    {
      name: 'name',
      type: 'text',
      isRequired: true,
      validationMessage: 'Please enter your name',
    },
    {
      name: 'gender',
      type: 'text',
      validationMessage: 'Please enter your gender',
    },
    {
      name: 'email',
      type: 'email',
      isRequired: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      patternMismatchMessage: 'Please enter a valid email address',
    },
  ],
  Education: [
    {
      name: 'school',
      type: 'text',
      validationMessage: 'Please enter your school name',
    },
    {
      name: 'college',
      type: 'text',
      validationMessage: 'Please enter your college name',
    },
  ],
  Experience: [
    {
      name: 'companyName',
      type: 'text',
      validationMessage: 'Please enter your company name',
    },
    {
      name: 'years',
      type: 'number',
      validationMessage: 'Please enter number of years',
    },
    {
      name: 'designation',
      type: 'text',
      validationMessage: 'Please enter your designation',
    },
  ],
};

const AppSectionLimit = () => {
  return (
    <div>
      <h1>Dynamic Registration Form</h1>
      <DynamicForm schema={schema} />
    </div>
  );
};

export default AppSectionLimit;

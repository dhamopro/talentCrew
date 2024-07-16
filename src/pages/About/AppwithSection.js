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
        const { name, isRequired, pattern } = field;
        if (isRequired && !formData[name]) {
          newErrors[name] = `${name} is required`;
        } else if (pattern && !RegExp(pattern).test(formData[name])) {
          newErrors[name] = `Invalid ${name}`;
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
          {schema[section].map((field) => (
            <div key={field.name}>
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
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

// Modified JSON schema
const schema = {
  Basic: [
    {
      name: 'name',
      type: 'text',
      isRequired: true,
    },
    {
      name: 'gender',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
      isRequired: true,
    },
  ],
  Education: [
    {
      name: 'school',
      type: 'text',
    },
    {
      name: 'college',
      type: 'text',
    },
  ],
  Experience: [
    {
      name: 'companyName',
      type: 'text',
    },
    {
      name: 'years',
      type: 'number',
    },
    {
      name: 'designation',
      type: 'text',
    },
  ],
};

const AppSection = () => {
  return (
    <div>
      <h1>Dynamic Registration Form</h1>
      <DynamicForm schema={schema} />
    </div>
  );
};

export default AppSection;

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
        const { name, type, isRequired, pattern, validationMessage } = field;
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
          {schema[section].map((field, index) => (
            <div key={index}>
              <label htmlFor={field.name}>{field.name}</label>
              {field.type === 'text' && (
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                />
              )}
              {field.type === 'dropdown' && (
                <select
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                >
                  {field.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>{option}</option>
                  ))}
                </select>
              )}
              {field.type === 'dropdownMultiSelect' && (
                <select
                  name={field.name}
                  value={formData[field.name] || []}
                  onChange={handleChange}
                  multiple
                >
                  {field.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>{option}</option>
                  ))}
                </select>
              )}
              {field.type === 'textarea' && (
                <textarea
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                />
              )}
              {field.type === 'radio' && (
                <div>
                  {field.options.map((option, optionIndex) => (
                    <label key={optionIndex}>
                      <input
                        type="radio"
                        name={field.name}
                        value={option}
                        checked={formData[field.name] === option}
                        onChange={handleChange}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}
              {errors[field.name] && <span style={{ color: 'red' }}>{errors[field.name]}</span>}
            </div>
          ))}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

// Updated JSON schema with different field types
const schema = {
  Basic: [
    {
      name: 'name',
      type: 'text',
      isRequired: true,
      validationMessage: 'Only cahracter is allowed your name',
    },
    {
      name: 'gender',
      type: 'dropdown',
      options: ['Male', 'Female', 'Other'],
      validationMessage: 'Please select your gender',
    },
    {
      name: 'email',
      type: 'text',
      isRequired: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      validationMessage: 'Please enter a valid email address',
    },
    {
      name: 'comments',
      type: 'textarea',
      validationMessage: 'comments should not exceed',
    },
    {
      name: 'subscription',
      type: 'radio',
      options: ['Yes', 'No'],
      validationMessage: 'Please select your subscription preference',
    },
  ],
};

const MultipleType = () => {
  return (
    <div>
      <h1>Dynamic Form</h1>
      <DynamicForm schema={schema} />
    </div>
  );
};

export default MultipleType;

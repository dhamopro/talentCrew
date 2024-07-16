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
    Object.keys(schema).forEach((fieldName) => {
      const field = schema[fieldName];
      if (field.isRequired && !formData[fieldName]) {
        newErrors[fieldName] = `${fieldName} is required`;
      } else if (field.pattern && !RegExp(field.pattern).test(formData[fieldName])) {
        newErrors[fieldName] = `Invalid ${fieldName}`;
      }
    });
    setErrors(newErrors);

    // If no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      // Submit form data
    }
  };

  const fieldsArray = Object.entries(schema);
  const rows = [];
  for (let i = 0; i < fieldsArray.length; i += 4) {
    const rowFields = fieldsArray.slice(i, i + 4);
    rows.push(
      <tr key={i}>
        {rowFields.map(([fieldName, field]) => (
          <React.Fragment key={fieldName}>
            <td>{fieldName}</td>
            <td>
              <input
                type={field.type}
                name={fieldName}
                value={formData[fieldName] || ''}
                onChange={handleChange}
              />
            </td>
            <td>{errors[fieldName]}</td>
          </React.Fragment>
        ))}
      </tr>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>{rows}</tbody>
      </table>
      <button type="submit">Submit</button>
    </form>
  );
};

// Example JSON schema
const schema = {
  username: {
    type: 'text',
    isRequired: true,
    pattern: /^[a-zA-Z0-9_]{3,20}$/,
  },
  email: {
    type: 'email',
    isRequired: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: 'password',
    isRequired: true,
  },
  firstName: {
    type: 'text',
    isRequired: true,
  },
  lastName: {
    type: 'text',
    isRequired: true,
  },
  // Add more fields as needed
};

const App1 = () => {
  return (
    <div>
      <h1>Dynamic Registration Form</h1>
      <DynamicForm schema={schema} />
    </div>
  );
};

export default App1;

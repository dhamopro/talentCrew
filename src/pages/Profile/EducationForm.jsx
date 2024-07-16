import { Checkbox } from '@mui/material';
import React, { useContext, useState } from 'react';

const EducationForm = ({onEducationChange}) => {
  const [educationDetails, setEducationDetails] = useState([{
    degree: 'B.E',
    institution: 'ITT',
    score: '8',
    yearOfPassing: '2010-01-02',
    university: 'Anna'
  }]);
  //const { theme, toggleTheme } = useContext(ThemeContext);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    onEducationChange(educationDetails);

  };

  const updateEducationDetails = (e) => {
    onEducationChange(educationDetails);
  };

  const handleAddEducation = (event) => {
    event.preventDefault();
    const newEducation = {
      degree: 'BEd',
      institution: 'Ins',
      score: '4',
      yearOfPassing: '2010-01',
      university: 'Anna'
    };
    setEducationDetails([...educationDetails, newEducation]);

    onEducationChange(educationDetails);

  };

  const handleRemoveEducation = (index,event) => {
    event.preventDefault();
    setEducationDetails(educationDetails.filter((_, i) => i !== index));
  };

  const handleEducation = (index,event) => {
    event.preventDefault();
    setEducationDetails(educationDetails.filter((_, i) => i !== index));
  };
  

  return (
    <div className="form-group row">
            {/*<div>Current Theme: {theme}</div>
      <button onClick={toggleTheme}>Toggle Theme</button>*/}
      {educationDetails.map((education, index) => (
        <tr key={index}>
          <td>
        {/*<div className='form-group column' key={index}>*/}
          <input
            type="text"
            placeholder="Course"
            value={education.degree}
            onChange={(e) =>
              setEducationDetails((prevState) => {
                const updatedDetails = [...prevState];
                updatedDetails[index].degree = e.target.value;
                return updatedDetails;
              })
            }
          />
          </td>
          <td>
          <input
            type="text"
            placeholder="Institution"
            value={education.institution}
            onChange={(e) =>
              setEducationDetails((prevState) => {
                const updatedDetails = [...prevState];
                updatedDetails[index].institution = e.target.value;
                return updatedDetails;
              })
            }
          />
          </td>
          <td>
          <input
            type="text"
            placeholder="Score"
            value={education.score}
            onChange={(e) =>
              setEducationDetails((prevState) => {
                const updatedDetails = [...prevState];
                updatedDetails[index].score = e.target.value;
                return updatedDetails;
              })
            }
          /></td>
          <td>
          <input
            type="month" pattern="\d{2}/\d{4}"
            placeholder="Year of Passing"
            value={education.yearOfPassing}
            onChange={(e) =>
              setEducationDetails((prevState) => {
                const updatedDetails = [...prevState];
                updatedDetails[index].yearOfPassing = e.target.value;
                return updatedDetails;
              })
            }
          /></td>
          <td>
          <input
            type="text"
            placeholder="University"
            onBlur={updateEducationDetails}
            value={education.university}
            onChange={(e) =>
              setEducationDetails((prevState) => {
                const updatedDetails = [...prevState];
                updatedDetails[index].university = e.target.value;
                return updatedDetails;
              })
            }
          /></td><td  style={{padding: 10}}>
          <button onClick={(e) => handleRemoveEducation(index, e)}>Remove</button>
          </td><td>
          <button onClick={handleAddEducation}>Add</button>
          </td>
          </tr>
      ))}
      
       
      <div className='form-group column'>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className='form-group column'>Furnished All Education Details</div>
    </div>
  );
};

export default EducationForm;

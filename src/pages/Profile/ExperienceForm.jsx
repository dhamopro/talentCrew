import React, { useContext, useState } from 'react';
import GridExample from './GridEx';
import GridDy from './GridDy';
import DynamicJobGrid from './GridDy';
import MultipleSelectCheckmarks from './checkBoxSelect';

const ExperienceForm = ({ onCompaniesChange}) => {
  const [experienceDetails, setExperienceDetails] = useState([{
    companyName: 'CTS',
    jobType: '',
    payroll:'',
    location:'',
    designation: 'Eng',
    startDate: '2014-03-01',
    endDate: '2014-04-04'
  }]);
  //const { theme, toggleTheme } = useContext(ThemeContext);

  const handleAddExperience = (event) => {
    event.preventDefault();

    const newExperience = {
    companyName: '',
    jobType: 'CTS',
    payroll:'',
    location:'',
    designation: 'Engineering',
    startDate: '2010-01-02',
    endDate: '2010-01-02'
    };
    setExperienceDetails([...experienceDetails, newExperience]);

    onCompaniesChange(experienceDetails);

  };

  const handleRemoveExperience = (index,event) => {
    event.preventDefault();
    setExperienceDetails(experienceDetails.filter((_, i) => i !== index));
  };

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    onCompaniesChange(experienceDetails);
  };

  const handleFromDateChange = (e) => {
    const value = e.target.value;
    setFromDate(value);
    validateDates(value, toDate);
  };

  const handleToDateChange = (e) => {
    const value = e.target.value;
    setToDate(value);
    validateDates(fromDate, value);
  };


  const validateDates = (from, to) => {
    if (from && to && new Date(from) >= new Date(to)) {
      //setError('The "to" date must be greater than the "from" date.');
    } else {
      //setError('');
    }
  };

  return (
    <div className="form-group row">
      {/*<MultipleSelectCheckmarks/>*/}
      <tr>
              <td style={{paddingLeft: 20}}><label>Company</label></td>
              <td style={{paddingLeft: 20}}><label>Job Type</label></td>
              <td style={{paddingLeft: 20}}><label>Payroll</label></td>
              <td style={{paddingLeft: 20}}><label>Designation</label></td>
              <td style={{paddingLeft: 20}}><label>From</label></td>
              <td style={{paddingLeft: 20}}><label>To</label></td>
      </tr>
   {/*<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}><DynamicJobGrid/></div> */}
            {/*<div>Current Theme: {theme}</div>
      <button onClick={toggleTheme}>Toggle Theme</button>*/}
      {experienceDetails.map((education, index) => (
    <tr key={index}>
       
        <td style={{paddingLeft: 20, marginBottom: 2 }} >
          
          <input
            type="text"
            placeholder="CompanyName"
            value={education.companyName}
            onChange={(e) =>
              setExperienceDetails((prevState) => {
                const updatedDetails = [...prevState];
                updatedDetails[index].companyName = e.target.value;
                return updatedDetails;
              }) 
            }

            required
          />
        </td>
        <td style={{paddingLeft: 20}}>
          <input
            type="text"
            placeholder="JobType"
            value={education.jobType}
            onChange={(e) =>
              setExperienceDetails((prevState) => {
                const updatedDetails = [...prevState];
                updatedDetails[index].jobType = e.target.value;
                return updatedDetails;
              })
            }
            required
          />
          </td>
          <td style={{paddingLeft: 20}}>
          <input
            type="text"
            placeholder="Payroll"
            value={education.payroll}
            onChange={(e) =>
              setExperienceDetails((prevState) => {
                const updatedDetails = [...prevState];
                updatedDetails[index].payroll = e.target.value;
                return updatedDetails;
              })
            }
            required
          />
          </td>
        <td style={{paddingLeft: 20}}>
          <input
            type="text"
            placeholder="Designation"
            value={education.designation}
            onChange={(e) =>
              setExperienceDetails((prevState) => {
                const updatedDetails = [...prevState];
                updatedDetails[index].designation = e.target.value;
                return updatedDetails;
              })
            }
            required
          />
          </td>
          <td style={{paddingLeft: 20}}>
          <input
            type="date"
            placeholder="StartDate"
            value={education.startDate}
            onChange={(e) =>
              setExperienceDetails((prevState) => {
                const updatedDetails = [...prevState];
                updatedDetails[index].startDate = e.target.value;
                return updatedDetails;
              })
            } required 
          /></td>
          <td style={{paddingLeft: 20}}>
          <input
            type="date"
            placeholder="EndDate"
            onBlur={onCompaniesChange}
            value={education.endDate}
            onChange={(e) =>
              setExperienceDetails((prevState) => {
                const updatedDetails = [...prevState];
                updatedDetails[index].endDate = e.target.value;
                return updatedDetails;
              })
            } required
          />
          </td><td style={{paddingLeft: 20}}>
          <button onClick={(e) => handleRemoveExperience(index, e)}>Remove</button>
          </td>
          <td style={{paddingLeft: 20}}>
          <button onClick={handleAddExperience}>Add</button>
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
      <div className='form-group column'>Furnished Experience Details</div>
    </div>
    
  );
};

export default ExperienceForm;

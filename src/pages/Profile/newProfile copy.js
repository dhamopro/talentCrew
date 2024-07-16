import { Link } from "react-router-dom";
import { useState } from "react";
import skillsData from './countries.json';
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import CityComboBox1 from "./MaterialDropdown";
import ComboBoxGeneric from "./MaterialDropGdown";
import PocketBase from 'pocketbase';


const NewProfile = () => {
  
  const pb = new PocketBase('http://139.59.90.114');

  const [lavendar, setLavender] = useState('lavendar');
  const [gender, setGender] = useState('');
  const [primarySkillSets, setPrimarySkillSets] = useState('');
  const [secondarySkillSets, setSecondarySkillSets] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [companies, setCompanies] = useState([]);
  const [education, setEducation] = useState([]);
  const [sourceType, setSourceType] = useState('');
  

  const handleCompaniesChange = (newCompanies) => {
    setCompanies(newCompanies);
    console.log('test');
  };

  const handleEducationChange = (newCompanies) => {
    setEducation(newCompanies);
    console.log('test');
  };



  

  const [formData, setFormData] = useState({
    candidateId: '',
    createdDate: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    display_name: '',
    phone: '',
    alt_phone: '',
    email: '',
    alt_email: '',
    gender: '',
    primarySkillSets: '',
    secondarySkillSets: '',
    current_ctc: '',
    expected_ctc: '',
    notice_period: '',
    total_exp: '',
    relevant_exp: '',
    currentLocation: '',
    prefLocation: '',
    dob: '',
    current_organization: '',
    highestEducationDegree: '',
    linkedIn_id: '',
    resumeUpload: '',
    documentType: '',
    docNo: '',
    issueDate: '',
    expiryDate: '',
    documentUpload: '',
    sourceType: '',
    sourceName: '',
    preferredJob: '',
    candidatePicture: ''
  });

  const [errors, setErrors] = useState({});
  const [dob, setDob] = useState({});
  const [location, setLocation] = useState('');
  const [prefLoc, setPrefLoc] = useState('');
  const [date_of_birth, setDate_of_birth] = useState('');
  const [preffered_location, setPreffered_location] = useState('');

  

  const handlePrimarySkillS = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setPrimarySkillSets(value);
  };

  const handleSecondarySkillS = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSecondarySkillSets(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Submit form data
      
      formData.companies=companies;
      formData.education=education;
      console.log(formData);
      //console.log(companies);
      //console.log(education);
      const record = pb.collection('Candidate').create(formData);
      console.log(record);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleInputChange = (e) => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Submit form data
      console.log(formData);
    } else {
      setErrors(validationErrors);
    }

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  
  const handleDobChange = (e) => {
    setDob(e.target.value);
    setDate_of_birth(e.target.value);
    const validationErrors = validateForm();
    const age = calculateAge(e.target.value);
    if (age < 14) {
      console.log('sdsds');
     // setError('Age must be at least 14 years.');
      errors.dob = 'Should be greater than 14 years';
      //setErrors(validationErrors);
      console.log(errors);
    } else {
      //setError('');
      console.log('Allowed')
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const calculateAge = (dobString) => {
    const today = new Date();
    const birthDate = new Date(dobString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };


  const validateForm = () => {
    const errors = {};

    // First Name validation
    if (!formData.first_name.trim()) {
      errors.firstName = 'First name is required';
    } else if (!/^[A-Z]/.test(formData.first_name)) {
      errors.firstName = 'First name should start with a capital letter';
    }

    // Middle Name validation
    if (!formData.middle_name.trim()) {
      errors.middleName = 'Middle name is required';
    } else if (!/^[A-Z]/.test(formData.middle_name)) {
      errors.middleName = 'Middle name should start with a capital letter';
    }

    // Last Name validation
    if (!formData.last_name.trim()) {
     // errors.lastName = 'Last name is required';
    } else if (!/^[A-Z]/.test(formData.last_name)) {
      errors.lastName = 'Last name should start with a capital letter';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'Phone number should be 10 digits';
    } 

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format';
    } 


    // currentLocation validation
    /*if (!formData.currentLocation.trim()) {
      errors.currentLocation = 'currentLocation is required';
    } else {
      errors.currentLocation = '';
    }

    // currentLocation validation
    if (!formData.prefLocation.trim()) {
      errors.prefLocation = 'prefLocation is required';
    } else {
      errors.prefLocation = '';
    }*/

      if (!location.trim()) {
        errors.location = 'prefLocation is required';
      }

      if (!prefLoc.trim()) {
        errors.prefLocation = 'prefLocation is required';
      } 

        // currentLocation validation
        if (!formData.current_organization.trim()) {
          errors.currentOrganization = 'currentOrganization is required';
        } 

        

        if (!formData.current_ctc.trim()) {
          errors.currentCtc = 'currentCtc is required';
        } 
        

        if (!formData.notice_period.trim()) {
          errors.noticePeriod = 'noticePeriod is required';
        }

        

        if (!formData.total_exp.trim()) {
          errors.totExp = 'totExp is required';
        } 
        

        if (!formData.issueDate.trim()) {
          errors.issueDate = 'issueDate is required';
        } 

        

        if (!formData.expiryDate.trim()) {
          errors.expiryDate = 'expiryDate is required';
        } 

        
       /* if (!formData.sourceType.trim()) {
          errors.sourceType = 'sourceType is required';
        } */

        
        if (!formData.sourceName.trim()) {
          errors.sourceName = 'sourceName is required';
        } 
    /*if (!formData.dob.trim()) {
      //errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format';
    } else if (/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = '';
    }


    if (!formData.email.trim()) {
      //errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }*/
    // Add more validation rules for other fields

    return errors;
  };

  const handleChild1ValueChange = (value) => {
    console.log('hey');
    console.log(value);
    setLocation(value);
  };

  const handleChild2ValueChange = (value) => {
    console.log('hey');
    //setLoc(value);
    setPrefLoc(value);
    setPreffered_location(value);
  };

  return (
   
    <div className="registration-container">
   
    <form onSubmit={handleSubmit}>
      
      <div className="row">
      <div className="form-group column">
        <label htmlFor="candidateId">Candidate ID:</label>
        <input
          type="text"
          id="candidateId"
          name="candidateId"
          value={formData.candidateId}
          placeholder="Auto Generated"
          readOnly
        />
      </div>
      
      <div className="form-group column">
      <label htmlFor="linkedInId">LinkedIn ID:</label>
        <input
          type="text"
          id="linkedInId"
          name="linkedInId"
          value={formData.linkedIn_id}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group column">
        <label htmlFor="createdDate">Created Date:</label>
        <input
          type="date"
          id="createdDate"
          name="createdDate"
          value={formData.createdDate}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group column">
        <label htmlFor="documentUpload">Picture Upload:</label>
        <input
          type="file"
          id="documentUpload"
          name="documentUpload"
          onChange={handleInputChange}
        />
      </div>
      </div>
      <div className="row heading">
        <label htmlFor="candidateId" className='heading'>Basic Info</label>
      </div>
      <div className="row">
      <div className="form-group column">
        <label htmlFor="firstName">First Name*:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.first_name}
          onChange={handleInputChange}
          placeholder="FirstName"
          required
          style={{ borderColor: errors.firstName ? 'red' : '' }}
        />
         {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName}</span>}
      </div>
      <div className="form-group column">
        <label htmlFor="middleName">Middle Name*:</label>
        <input
          type="text"
          id="middleName"
          name="middleName"
          value={formData.middle_name}
          onChange={handleInputChange}
          required
          style={{ borderColor: errors.middleName ? 'red' : '' }}
          />
           {errors.middleName && <span style={{ color: 'red' }}>{errors.middleName}</span>}
      </div>
      <div className="form-group column">
        <label htmlFor="lastName">Last Name*:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.last_name}
          onChange={handleInputChange}
          required
          style={{ borderColor: errors.lastName ? 'red' : '' }}
          />
           {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName}</span>}
      </div>
      <div className="form-group column">
        <label htmlFor="displayName">Display Name:</label>
        <input
          type="text"
          id="displayName"
          name="displayName"
          value={formData.display_name}
          onChange={handleInputChange}
        />
      </div>
      </div>
      <div className="row">
      <div className="form-group column">
        <label htmlFor="phone">Phone*:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
          style={{ borderColor: errors.phone ? 'red' : '' }}
          />
           {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
      </div>
      <div className="form-group column">
        <label htmlFor="altPhone">Alt Phone:</label>
        <input
          type="tel"
          id="altPhone"
          name="altPhone"
          value={formData.alt_phone}
          onChange={handleInputChange}
          style={{ borderColor: errors.altPhone ? 'red' : '' }}
          />
           {errors.altPhone && <span style={{ color: 'red' }}>{errors.altPhone}</span>}
      </div>
      <div className="form-group column">
        <label htmlFor="email">Email*:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
         {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      </div>
      <div className="form-group column">
        <label htmlFor="altEmail">Alt Email:</label>
        <input
          type="email"
          id="altEmail"
          name="altEmail"
          value={formData.alt_email}
          onChange={handleInputChange}
        />
      </div>
      </div>
      <div className="row">

      <div className="form-group column">
        <label htmlFor="dob">DOB*:</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleDobChange}
          required
          style={{ borderColor: errors.dob ? 'red' : '' }}
        />
         {errors.dob && <span style={{ color: 'red' }}>{errors.dob}</span>}
      </div>
      <div className="form-group column">
        <label htmlFor="gender">Gender*:</label>
        <select size='3'
          id="gender"
          value={gender}
          onChange={(event) => setGender(event.target.value)}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>   
      </div>
      <div className="form-group column">
        <label htmlFor="primarySkillSets">Primary Skill Sets*:</label>
       
        {/*<select multiple size={3}
          id="primarySkillSets"
          value={primarySkillSets}
          onChange={handlePrimarySkillS}
        >
          <option value="">Select Skill</option>
          <option value="java">java</option>
          <option value="python">python</option>
          <option value="javascript">javascript</option>
  </select>*/}
        <select
          id="primarySkillSets"
          value={primarySkillSets}
          onChange={handlePrimarySkillS}
          multiple
        >
          {skillsData.map((skill) => (
            <option key={skill.code} value={skill.code}>
              {skill.name}
            </option>
          ))}
        </select>

      </div>
      <div className="form-group column">
        <label htmlFor="secondarySkillSets">Secondary Skill Sets*:</label>

       {/* <select multiple size={3}
          id="secondarySkillSets"
          value={secondarySkillSets}
          onChange={handleSecondarySkillS}
        >
          <option value="">Select Skill</option>
          <option value="java">java</option>
          <option value="python">python</option>
          <option value="javascript">javascript</option>
  </select>*/}

        <select
          id="secondarySkillSets"
          value={secondarySkillSets}
          onChange={handleSecondarySkillS}
          multiple
        >
          {skillsData.map((skill) => (
            <option key={skill.code} value={skill.code}>
              {skill.name}
            </option>
          ))}
        </select>
      </div>
      </div>
      <div className="row heading">
        <label htmlFor="candidateId">Experience Info</label>
      </div>
      <div className="row">
      <div className="form-group column">
        <label htmlFor="relExp">Rel Exp*:</label>
        <input
          type="text"
          id="relExp"
          name="relExp"
          value={formData.relevant_exp}
          onChange={handleInputChange}
          required
          style={{ borderColor: errors.middleName ? 'red' : '' }}
          />
           {errors.relExp && <span style={{ color: 'red' }}>{errors.relExp}</span>}
      </div>
      <div className="form-group column">
        <label htmlFor="currentLocation">Current Location*:</label>
        {/*<input
          type="text"
          id="currentLocation"
          name="currentLocation"
          value={formData.currentLocation}
          onChange={handleInputChange}
          required
        />*/}
        <CityComboBox1 id="1" onChildValueChange={handleChild1ValueChange}/>
      </div>
      <div className="form-group column">
        <label htmlFor="prefLocation">Pref Location*:</label>
        {/*<input
          type="text"
          id="prefLocation"
          name="prefLocation"
          value={formData.prefLocation}
          onChange={handleInputChange}
          required
        />*/}
        <CityComboBox1 id="2" onChildValueChange={handleChild2ValueChange}/>

      </div>
      <div className="form-group column">
      <label htmlFor="currentOrganization">Current Organization*:</label>
        <input
          type="text"
          id="currentOrganization"
          name="currentOrganization"
          value={formData.current_organization}
          onChange={handleInputChange}
          required
          style={{ borderColor: errors.currentOrganization ? 'red' : '' }}
          />
           {errors.currentOrganization && <span style={{ color: 'red' }}>{errors.currentOrganization}</span>}
      
      </div>
      </div>
      <div className="row">
      <div className="form-group column">
        <label htmlFor="currentCtc">Current CTC*:</label>
        <input
          type="text"
          id="currentCtc"
          name="currentCtc"
          value={formData.current_ctc}
          onChange={handleInputChange}
          required
          style={{ borderColor: errors.currentCtc ? 'red' : '' }}
          />
           {errors.currentCtc && <span style={{ color: 'red' }}>{errors.currentCtc}</span>}
      </div>
      <div className="form-group column">
        <label htmlFor="expectedCtc">Expected CTC*:</label>
        <input
          type="text"
          id="expectedCtc"
          name="expectedCtc"
          value={formData.expected_ctc}
          onChange={handleInputChange}
          required
          style={{ borderColor: errors.expectedCtc ? 'red' : '' }}
          />
           {errors.expectedCtc && <span style={{ color: 'red' }}>{errors.expectedCtc}</span>}
      </div>
      <div className="form-group column">
        <label htmlFor="noticePeriod">Notice Period*:</label>
        <input
          type="text"
          id="noticePeriod"
          name="noticePeriod"
          value={formData.notice_period}
          onChange={handleInputChange}
          required
          style={{ borderColor: errors.noticePeriod ? 'red' : '' }}
          />
          
           {errors.noticePeriod && <span style={{ color: 'red' }}>{errors.noticePeriod}</span>}
      </div>
      <div className="form-group column">
        <label htmlFor="totExp">Tot Exp*:</label>
        <input
          type="text"
          id="totExp"
          name="totExp"
          value={formData.total_exp}
          onChange={handleInputChange}
          required
          style={{ borderColor: errors.totExp ? 'red' : '' }}
          />
           {errors.totExp && <span style={{ color: 'red' }}>{errors.totExp}</span>}
      </div>
      </div>
      
      <div className="row">
      <div className="form-group column">
        <label htmlFor="documentType">Document Type:</label>

        <select
          id="documentType"
          value={documentType}
          onChange={(event) => setDocumentType(event.target.value)}
        >
          <option value="">Select</option>
          <option value="pan">PAN</option>
          <option value="passport">Passport</option>
          <option value="visa">visa</option>
          <option value="other">other</option>
        </select>
      </div>
      <div className="form-group column">
        <label htmlFor="docNo">Doc No:</label>
        <input
          type="text"
          id="docNo"
          name="docNo"
          value={formData.docNo}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group column">
        <label htmlFor="issueDate">Issue Date:</label>
        <input
          type="date"
          id="issueDate"
          name="issueDate"
          value={formData.issueDate}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group column">
        <label htmlFor="expiryDate">Expiry Date:</label>
        <input
          type="date"
          id="expiryDate"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleInputChange}
        />
      </div>
      
      
      <div className="form-group column">
        <label htmlFor="documentUpload">Document Upload:</label>
        <input
          type="file"
          id="documentUpload"
          name="documentUpload"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group column">
      <label htmlFor="resumeUpload">Resume Upload*:</label>
        <input
          type="file"
          id="resumeUpload"
          name="resumeUpload"
          onChange={handleInputChange}
          required
        />
      </div>
      </div>
      <div className="row">
      <div className="form-group column">
        <label htmlFor="sourceType">Source Type*:</label>
        

      <select
          id="sourceType"
          value={formData.sourceType}
          onChange={(event) => setSourceType(event.target.value)}
        >
          <option value="">Select</option>
          <option value="jobBoard">Job Board</option>
          <option value="supplier">Supplier</option>
          <option value="organization">Organization</option>
          <option value="other">other</option>
        </select>
        <ComboBoxGeneric id="1" ifield="77" rfield="154"/>
      </div>
      <div className="form-group column">
        <label htmlFor="sourceName">Source Name*:</label>
        <input
          type="text"
          id="sourceName"
          name="sourceName"
          value={formData.sourceName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group column">
        <label htmlFor="preferredJob">Preferred Job:</label>
        <input
          type="text"
          id="preferredJob"
          name="preferredJob"
          value={formData.preferredJob}
          onChange={handleInputChange}
        />
      </div>
      {/*<div className="form-group column">
        <label htmlFor="preferredJob">Preferred Job:</label>
        <CityComboBox1/>
      </div>*/}
      <div className="form-group column">
        
       {/*<StyleComboBox/>*/}
        </div>
      </div>

      <div className="row heading heading">
        <label>Employment History</label>
      </div>
      <div className="row" style={{borderWidth: 2,backgroundColor:'lavendar'}}>
       <ExperienceForm companies={companies} onCompaniesChange={handleCompaniesChange}/>
       
      </div> 
     
      <div className="row heading heading">
        <label>Education Info</label>
      </div>
      <div className="row" style={{borderWidth: 2,backgroundColor:'lavendar'}}>
       <EducationForm  education= {education} onEducationChange={handleEducationChange} />
      </div> 
      <div className="row" style={{padding: 10}}>
       
      </div>  
      <div className="form-group" style={{backgroundColor:'lavendar', textAlign: 'center'}}>
        <button type="submit" >Submit</button>
       </div>  
     
    </form>
    {/*<CityDropdown/>
    <ComboBox/>
    <CityComboBox></CityComboBox>
   */}
    
    </div>

  );
  
};

export default NewProfile;
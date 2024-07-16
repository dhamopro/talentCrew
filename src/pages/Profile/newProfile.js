import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import skillsData from './countries.json';
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import CityComboBox1 from "./MaterialDropdown";
import ComboBoxGeneric from "./MaterialDropGdown";
import PocketBase from 'pocketbase';
import skillsetPocketBase from "./MaterialDropdownPocketBase";
import ComboBoxPB from "./comboBox copy";
import RecordsComponent from "./RecordsManagement";
import RecordsList from "./Records";
import RecordsList1 from "./AllRecords";
import { useHistory } from 'react-router-dom';
import EditRecord3 from "./Edit3";
import moment from 'moment';



const NewProfile = () => {
  
  const pb = new PocketBase('http://139.59.90.114');

  const [lavendar, setLavender] = useState('lavendar');
  const [gender, setGender] = useState('');
  const [primarySkillSets, setPrimarySkillSets] = useState([]);
  const [secondarySkillSets, setSecondarySkillSets] = useState([]);
  const [documentType, setDocumentType] = useState('');
  const [companies, setCompanies] = useState([]);
  const [education, setEducation] = useState([]);
  const [sourceType, setSourceType] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [mode, setMode] = useState('List');
  const [skillSet, setSkillSet] = useState([]);
  const [sourceNames, setSourceNames] = useState([]);
  const [prefJobs, setPrefJobs] = useState([]);
  const [preferredJobs, setPreferredJobs] = useState([]);
  

  const [formData, setFormData] = useState({
    candidateId: '',
    createdDate: '2024-01-15',
    firstName: 'First',
    middleName: 'Middle',
    lastName: 'Last',
    displayName: 'DName',
    phone: '1234567890',
    altPhone: '',
    email: 'email@gmail.com',
    altEmail: '',
    gender: '',
    primarySkillSets: [],
    secondarySkillSets: [],
    currentCtc: '12',
    expectedCtc: '14',
    noticePeriod: '15 days',
    totExp: '15',
    relExp: '10',
    currentLocation: '',
    prefLocation: '',
    dob: '2004-01-15',
    currentOrganization: 'Wipro',
    highestEducationDegree: '',
    linkedInId: 'https://gg.com',
    resumeUpload: '',
    documentType: 'passport',
    docNo: '12345',
    issueDate: '2013-01-15',
    expiryDate: '2014-01-18',
    documentUpload: '',
    sourceType: '',
    sourceName: '',
    preferredJob: '72q88tva6us0sys',
    candidatePicture: ''
  });


  const handleCompaniesChange = (newCompanies) => {
    setCompanies(newCompanies);
    console.log('test');
  };

  const handleEducationChange = (newCompanies) => {
    setEducation(newCompanies);
    console.log('test');
  };

  const handleSelectedId = async (selectedId) => {
   // setEducation(newCompanies);
    console.log(selectedId);
    const record = await pb.collection('Candidate').getOne(selectedId, {
      expand: 'skill_set,location, preffered_location, source_type, source_name, preffered_job, current_organisation',
    });
    console.log(record.expand);
    record.id='123';

    const formatteDOBdDate = moment(record.date_of_birth).format("YYYY-MM-DD");
    record.date_of_birth = formatteDOBdDate;

    const formatteCreatedDate = moment(record.created).format("YYYY-MM-DD");
    record.created = formatteCreatedDate;

    const formatteIssuedDate = moment(record.issue_date).format("YYYY-MM-DD");
    record.issue_date = formatteIssuedDate;

    const formatteExpiryDate = moment(record.expiry_date).format("YYYY-MM-DD");
    record.expiry_date = formatteExpiryDate;

    setSelectedCandidate(record);
    setMode('Edit');

    //formData.firstName = selectedCandidate.first_name;

    console.log('Allowed')
      //const { name, value } = e.target;
      setFormData({
        ...formData,
        [formData.firstName]: record.first_name
      });
      console.log(selectedCandidate.first_name);
      console.log(formData.firstName);

    setFormData({firstName: selectedCandidate.first_name,
      middleName: selectedCandidate.middle_name,
      lastName: selectedCandidate.last_name,
      displayName: selectedCandidate.display_name,
      phone: selectedCandidate.phone,
      altPhone: selectedCandidate.alt_phone,
      email: selectedCandidate.email,
      altEmail: selectedCandidate.alt_email,
      gender: selectedCandidate.gender,
      currentCtc: selectedCandidate.current_ctc,
      expectedCtc: selectedCandidate.expected_ctc,
      noticePeriod: selectedCandidate.notice_period,
      totExp: selectedCandidate.total_exp,
      relExp: selectedCandidate.relavant_exp,
      issueDate: selectedCandidate.issue_date,
      expiryDate: selectedCandidate.expiry_date,
      sourceType: selectedCandidate.source_type,
      image: selectedCandidate.candidate_picture,
    
      ...formData,
    });
    
    console.log(formData.email);
  
  };

  useEffect(() => {

    setFormData({firstName: selectedCandidate.first_name,
  middleName: selectedCandidate.middle_name,
  lastName: selectedCandidate.last_name,
  displayName: selectedCandidate.display_name,
  phone: selectedCandidate.phone,
  altPhone: selectedCandidate.alt_phone,
  email: selectedCandidate.email,
  altEmail: selectedCandidate.alt_email,
  gender: selectedCandidate.gender,
  currentCtc: selectedCandidate.current_ctc,
  expectedCtc: selectedCandidate.expected_ctc,
  noticePeriod: selectedCandidate.notice_period,
  totExp: selectedCandidate.total_exp,
  relExp: selectedCandidate.relavant_exp,
  issueDate: selectedCandidate.issue_date,
  expiryDate: selectedCandidate.expiry_date,
  sourceType: selectedCandidate.source_type,
  image: selectedCandidate.candidate_picture,

  ...formData,
});
}, [selectedCandidate]);    


useEffect(() => {

  const fetchSkillSet = async () => {
    try {
      console.log('skillSet');
      // you can also fetch all records at once via getFullList
    const records = await pb.collection('SkillSets').getFullList({
      sort: '-created',
    });
     
    setSkillSet(records);
    console.log(skillSet);
    console.log(records);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchSourceName = async () => {
    try {
      console.log('skillSet');
      // you can also fetch all records at once via getFullList
    const records = await pb.collection('Source_name').getFullList({
      sort: '-created',
    });
     
    setSourceNames(records);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchPrefJobs = async () => {
    try {
      console.log('skillSet');
      // you can also fetch all records at once via getFullList
    const records = await pb.collection('preffered_job').getFullList({
      sort: '-created',
    });
     
    setPrefJobs(records);
    console.log(skillSet);
    console.log(records);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchSkillSet();
  fetchPrefJobs();
  fetchSourceName();

}, []); 

    // Map response data to formData keys
   /* setFormData({
      firstName: selectedCandidate.first_name,
      lastName: selectedCandidate.last_name,
      displayName: responseData.display_name,
      phone: responseData.phone,
      altPhone: responseData.alt_phone,
      email: responseData.email,
      altEmail: responseData.alt_email,
      gender: responseData.gender,
      // Ensure to keep other fields not present in response unchanged
      ...formData,
    });
  }, [responseData]);*/

  
 
  const [errors, setErrors] = useState({});
  const [dob, setDob] = useState({});
  const [loc, setLoc] = useState('');
  const [prefLoc, setPrefLoc] = useState('');
  const [image, setImage] = useState(null);
  const [resume, setResume] = useState(null);


  const handlePrimarySkillS = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setPrimarySkillSets(value);
  };
  
  const handleSecondarySkillS = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSecondarySkillSets(value);
  };

  const handlePreferredJob = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setPreferredJobs(value);
  };

  const onChildDpValueChange = (newCompanies) => {
    // setEducation(newCompanies);
     console.log('onChildDpValueChange');
   };

   const handlePrefLocChange = (location, e) => {
     setPrefLoc(location);
     console.log('PrefLocationchange');
     console.log(location);
   };

   const handleSourceTypeChange = (sourceType, e) => {
    console.log('sourcetypechange');
    console.log(sourceType);
    //const { name, value } = e.target;
    setFormData({
      ...formData,
      ['sourceType']: sourceType
    });

    formData.sourceType = sourceType;
    console.log(formData);
  };
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    //if (Object.keys(validationErrors).length === 0) {
      // Submit form data
      
      //formData.companies=companies;
      //formData.education=education;
      console.log(formData);
      //console.log(companies);
      //console.log(education);

      const data = {
        "first_name": formData.firstName,
        "middle_name": formData.middleName,
        "last_name": formData.lastName,
        "display_name": formData.displayName,
        "phone": formData.phone,
        "alt_phone": formData.altPhone,
        "email": formData.email,
        "alt_email": formData.altEmail,
        "gender": formData.gender,
        "skill_set": primarySkillSets,
        "secondary_skill_set": secondarySkillSets,
        "current_ctc": formData.currentCtc,
        "expected_ctc": formData.expectedCtc,
        "notice_period": formData.noticePeriod,
        "total_exp": formData.totExp,
        "relavant_exp": formData.relExp,
        "location": loc,
        "preffered_location": prefLoc,
        "date_of_birth": formData.dob,
        "current_organisation": "asxz9uqbvi5g6oi",
        "highest_education_degree": "",
        "college_studied": "",
        "university_studied": "",
        "year_of_passing": 123,
        //"sourceName":
        //"linkedin_id": formData.linkedInId,
        "document_type": [
           
        ],
        "document_number": "test",
        "issue_date": formData.issueDate,
        "expiry_date": formData.expiryDate,
        "source_type": formData.sourceType,
        "source_name": formData.sourceName,
        "candidate_picture":image,
        "preffered_job": preferredJobs,
        "resume":resume
    };

      const record = await pb.collection('Candidate').create(data);
      console.log(record.id)

      const experiencePromises = companies.map(exp => 
        pb.collection('experience').create({
          candidate: record.id,
          company: exp.companyName,
          designation: exp.designation,
          //position: exp.position,
          //startDate: exp.startDate,
          //endDate: exp.endDate,
          //description: exp.description,
        })
      );

      const experienceRecords = await Promise.all(experiencePromises);  
      
      const educationPromises = education.map(education => 
        pb.collection('education').create({
          candidate: record.id,
          course: education.degree,
          grade: education.score,
          //position: exp.position,
          //startDate: exp.startDate,
          //endDate: exp.endDate,
          //description: exp.description,
        })
      );
      
      const educationRecords = await Promise.all(educationPromises);  


    /*} else {
      setErrors(validationErrors);
    }*/
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
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (!/^[A-Z]/.test(formData.firstName)) {
      errors.firstName = 'First name should start with a capital letter';
    }

    // Middle Name validation
    if (!formData.middleName.trim()) {
      errors.middleName = 'Middle name is required';
    } else if (!/^[A-Z]/.test(formData.middleName)) {
      errors.middleName = 'Middle name should start with a capital letter';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
     // errors.lastName = 'Last name is required';
    } else if (!/^[A-Z]/.test(formData.lastName)) {
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

      if (!loc.trim()) {
        errors.prefLocation = 'prefLocation is required';
      }

      if (!prefLoc.trim()) {
        errors.prefLocation = 'prefLocation is required';
      } 

        // currentLocation validation
        if (!formData.currentOrganization.trim()) {
          errors.currentOrganization = 'currentOrganization is required';
        } 

        

        if (!formData.currentCtc.trim()) {
          errors.currentCtc = 'currentCtc is required';
        } 
        

        if (!formData.noticePeriod.trim()) {
          errors.noticePeriod = 'noticePeriod is required';
        }

        

        if (!formData.totExp.trim()) {
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
    setLoc(value);
  };

  const handleChild2ValueChange = (value) => {
    console.log('hey');
    //setLoc(value);
    setPrefLoc(value);
  };

  const handleChildLocationChange = (value, e) => {
    console.log('Location change');
    console.log(value);
    //setLoc(value);
    setLoc(value);
  };

  const handleCancel = () => {
    console.log('Cancelled');
    //setSelectedCandidate(null);
    setMode('List')
  };

  const showCreate = () => {
    console.log('Create');
    setMode('Create')
  };
  

  return (
   
    <div className="registration-container">
    <button onClick={showCreate} >Create</button>
    {mode === 'Edit' &&  <EditRecord3 candidate = {selectedCandidate} handleCancel={handleCancel} />}
    {mode === 'Create' &&  

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
          value={formData.linkedInId}
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
          //onChange={handleInputChange}
          onChange={(e) => setImage(e.target.files[0])}
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
          value={formData.firstName}
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
          value={formData.middleName}
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
          value={formData.lastName}
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
          value={formData.displayName}
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
          value={formData.altPhone}
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
          value={formData.altEmail}
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
          name="gender"
          onChange={(event) => setGender(event.target.value)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
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
          {/*{skillsData.map((skill) => (
            <option key={skill.code} value={skill.code}>
              {skill.name}
            </option>
          ))}*/}

          {skillSet && skillSet.map((skill) => (
            <option key={skill.id} value={skill.id}>
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
          {/*{skillsData.map((skill) => (
            <option key={skill.code} value={skill.code}>
              {skill.name}
            </option>
          ))}*/}
          {skillSet && skillSet.map((skill) => (
            <option key={skill.id} value={skill.id}>
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
          value={formData.relExp}
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
        />*
        <CityComboBox1 id="1" onChildValueChange={handleChild1ValueChange}/>*/}
        <ComboBoxPB id="1" collection={'location'} onChildDpValueChange={handleChildLocationChange} />
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
        />
        <CityComboBox1 id="2" onChildValueChange={handleChild2ValueChange}/>*/}
        <ComboBoxPB id="2" collection={'location'} onChildDpValueChange={handlePrefLocChange} />

      </div>
      <div className="form-group column">
      <label htmlFor="currentOrganization">Current Organization*:</label>
        <input
          type="text"
          id="currentOrganization"
          name="currentOrganization"
          value={formData.currentOrganization}
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
          value={formData.currentCtc}
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
          value={formData.expectedCtc}
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
          value={formData.noticePeriod}
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
          value={formData.totExp}
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
          onChange={(e) => setResume(e.target.files[0])}
          required
        />
      </div>
      </div>
      <div className="row">
      <div className="form-group column">
        <label htmlFor="sourceType">Source Type*:</label>
        

     {/* <select
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
        <ComboBoxGeneric id="1" ifield="77" rfield="154"/>*/}
        <ComboBoxPB id="2" collection={'Source_Type'} onChildDpValueChange={handleSourceTypeChange} />

      </div>
      <div className="form-group column">
        <label htmlFor="sourceName">Source Name*:</label>
        {/*<input
          type="text"
          id="sourceName"
          name="sourceName"
          value={formData.sourceName}
          onChange={handleInputChange}
          required
        />*/}

        <select
          id="sourceName"
          name="sourceName"
          value={formData.sourceName}
          onChange={handleInputChange}
          
        >
          {/*{skillsData.map((skill) => (
            <option key={skill.code} value={skill.code}>
              {skill.name}
            </option>
          ))}*/}
          {sourceNames && sourceNames.map((source) => (
            <option key={source.id} value={source.id}>
              {source.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group column">
        <label htmlFor="preferredJob">Preferred Job:</label>
        {/*<input
          type="text"
          id="preferredJob"
          name="preferredJob"
          value={formData.preferredJob}
          onChange={handleInputChange}
        />*/}
        <select
          id="preferredJob"
          name="preferredJob"
          value={preferredJobs}
          onChange={handlePreferredJob}
          multiple
        >
          {/*{skillsData.map((skill) => (
            <option key={skill.code} value={skill.code}>
              {skill.name}
            </option>
          ))}*/}
          {prefJobs && prefJobs.map((job) => (
            <option key={job.id} value={job.id}>
              {job.name}
            </option>
          ))}
        </select>



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
        <button type="submit" >Save</button>
        <button onClick={handleCancel}>Cancel</button>

       </div>  
     
    </form>
    }

{mode === 'List' &&  <RecordsList onSelectedId={handleSelectedId}/>}
    </div>
  );
  
};

export default NewProfile;
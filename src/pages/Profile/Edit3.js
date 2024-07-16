import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PocketBase from 'pocketbase';
import ComboBoxPB from './comboBox copy';

const EditRecord3 = ({candidate, handleCancel}) => {
  const { collectionName, id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(candidate);
  const [firstName, setFirstName] = useState();
  const [errors, setErrors] = useState({});
  const [primarySkillSets, setPrimarySkillSets] = useState(selectedCandidate.skill_set);
  const [skillSet, setSkillSet] = useState([]);
  const [secondarySkillSets, setSecondarySkillSets] = useState(selectedCandidate.secondary_skill_set);
  const [preferredJobs, setPreferredJobs] = useState([]);

  const [sourceNames, setSourceNames] = useState([]);
  const [prefJobs, setPrefJobs] = useState([]);
  const [loc, setLoc] = useState('');
  const [prefLoc, setPrefLoc] = useState('');
  
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

  const handlePrefLocChange = (location, e) => {
    setPrefLoc(location);
    console.log('PrefLocationchange');
    console.log(location);
  };

  const handleChildLocationChange = (value, e) => {
    console.log('Location change');
    console.log(value);
    //setLoc(value);
    setLoc(value);
  };
  
  const [formData, setFormData] = useState({
    candidateId: selectedCandidate.id,
    createdDate:  selectedCandidate.created,
    firstName: selectedCandidate.first_name,
    middleName: selectedCandidate.middle_name,
    lastName: selectedCandidate.last_name,
    displayName: selectedCandidate.display_name,
    phone: selectedCandidate.phone,
    altPhone: selectedCandidate.alt_phone,
    email: selectedCandidate.email,
    altEmail: selectedCandidate.alt_email,
    gender:  selectedCandidate.gender,
    primarySkillSets: selectedCandidate.skill_set,
    secondarySkillSets: selectedCandidate.secondary_skill_set,
    currentCtc: selectedCandidate.current_ctc,
    expectedCtc: selectedCandidate.expected_ctc,
    noticePeriod: selectedCandidate.notice_period,
    totExp:  selectedCandidate.total_exp,
    relExp:  selectedCandidate.relavant_exp,
    currentLocation: '',
    prefLocation: '',
    dob:  selectedCandidate.date_of_birth,
    currentOrganization: '',
    highestEducationDegree: '',
    linkedInId: selectedCandidate.linkedin_id,
    resumeUpload: '',
    documentType:  selectedCandidate.document_type,
    docNo:  selectedCandidate.document_number,
    issueDate:  selectedCandidate.issue_date,
    expiryDate:  selectedCandidate.expiry_date,
    documentUpload: '',
    sourceType: '',
    sourceName: selectedCandidate.source_name,
    preferredJob: selectedCandidate.preffered_job,
    candidatePicture: ''
  });

  const pb = new PocketBase('http://139.59.90.114');

  
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

    if(selectedCandidate.location){
    handleChildLocationChange(selectedCandidate.location, null)
    handlePrefLocChange(selectedCandidate.location, null)}
  
  }, []); 
 /*
  useEffect(() => {
    console.log(candidate);
    setSelectedCandidate(candidate)
  }, []);*/



  
  const handleInputChange = async (e) => {
       /* const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
          // Submit form data
          console.log(formData);
        } else {
          setErrors(validationErrors);
        }*/
    
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
      

      const onCancel =  () => {
        handleCancel();
       };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //const validationErrors = validateForm();
        //if (Object.keys(validationErrors).length === 0) {
          // Submit form data
          
          //formData.companies=companies;
          //formData.education=education;
          //console.log(formData);
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
            "skill_set": [
              "5eaxsnma1bbvk1a"
            ],
            "current_ctc": formData.currentCtc,
            "expected_ctc": formData.expectedCtc,
            "notice_period": formData.noticePeriod,
            "total_exp": formData.totExp,
            "relavant_exp": formData.relExp,
            //"location": loc,
            //"preffered_location": prefLoc,
            "date_of_birth": formData.dob,
            "current_organisation": "asxz9uqbvi5g6oi",
            "highest_education_degree": "",
            "college_studied": "",
            "university_studied": "",
            "year_of_passing": 123,
            //"sourceName":
           // "linkedin_id": formData.linkedInId,
            "document_type": [
               
            ],
            "document_number": "test",
            "issue_date": formData.issueDate,
            "expiry_date": formData.expiryDate,
            "source_type": formData.sourceType,
            "source_name": "r0mfqm0doi9oot2",
           // "candidate_picture":image,
            "preffered_job": [
              "grcbnamei5mp7nz"
            ]
        };
    
          const record = await pb.collection('Candidate').update(candidate.id, data);

          console.log(record.id)
    
         /* const experiencePromises = companies.map(exp => 
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
          
         /* const educationPromises = education.map(education => 
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
            */
    
        /*} else {
          setErrors(validationErrors);
        }*/
      
    
    };

  const renderField = (key, value) => {
   // if (typeof value === 'object' && value !== null && 'url' in value) {
 
      // For other fields, render a text input
      return (
        <div key={key}>
          <label>
            {key}: {typeof value}
            <input
              type="text"
              value={value}
             
            />
          </label>
        </div>
      );
    
  };

 

  return (
    <div>
      <h2>Edit Record</h2>

        <form onSubmit={handleSubmit}>
        {/*{Object.entries(record).map(([key, value]) => renderField(key, value))}
        {selectedCandidate &&  selectedCandidate.candidate.id}
        {selectedCandidate &&  selectedCandidate.candidate.first_name}*/}


        {/*<input type='text' name='last_name' value={candidate.candidate.last_name}/>
        <input type='text'  name='display_name'value={candidate.candidate.display_name}/>
        <input type='text' name='phone' value={candidate.candidate.phone}/>
        <input type='text' name='alt_phone' value={candidate.candidate.alt_phone}/>
        <input type='text' name='email' value={candidate.candidate.email}/>
        <input type='text' name='alt_email' value={candidate.candidate.alt_email}/>
        <input type='text' name='current_ctc' value={candidate.candidate.current_ctc}/>
        <input type='text' name='expected_ctc' value={candidate.candidate.expected_ctc}/>
        <input type='text' name='notice_period' value={candidate.candidate.notice_period}/>
        <input type='text' name='total_exp' value={candidate.candidate.total_exp}/>
        <input type='text' name='issue_date' value={candidate.candidate.issue_date}/>
        <input type='text' name='expiry_date' value={candidate.candidate.expiry_date}/>
        <input type='text' name='source_type' value={candidate.candidate.source_type}/>
        <input type='text' name='expiry_date' value={candidate.candidate.expiry_date}/>*/}
             
      <div className="row">
      <div className="form-group column">
        <label htmlFor="candidateId">Candidate ID:</label>
        <input
          type="text"
          id="candidateId"
          name="candidateId"
          value= {candidate.id}
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
          //onChange={(e) => setImage(e.target.files[0])}
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
         // onChange={handleDobChange}
          //required
          style={{ borderColor: errors.dob ? 'red' : '' }}
        />
         {errors.dob && <span style={{ color: 'red' }}>{errors.dob}</span>}
      </div>
      <div className="form-group column">
        <label htmlFor="gender">Gender*:</label>
        <select size='3'
          id="gender"
         // value={gender}
         // onChange={(event) => setGender(event.target.value)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>   
      </div>
      <div className="form-group column">
        <label htmlFor="primarySkillSets">Primary Skill Sets*:</label>
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
        <ComboBoxPB id="1" collection={'location'} onChildDpValueChange={handleChildLocationChange} defaultV={selectedCandidate.location} />

   </div>
      <div className="form-group column">
        <label htmlFor="prefLocation">Pref Location*:</label>
        <ComboBoxPB id="2" collection={'location'} onChildDpValueChange={handlePrefLocChange} defaultV={selectedCandidate.preferred_location} />

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
         // value={documentType}
         // onChange={(event) => setDocumentType(event.target.value)}
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
      <div className="form-group column">
        
       {/*<StyleComboBox/>*/}
        </div>
      </div>

      <div className="row heading heading">
        <label>Employment History</label>
      </div>
      <div className="row" style={{borderWidth: 2,backgroundColor:'lavendar'}}>
       
      </div> 
     
      <div className="row heading heading">
        <label>Education Info</label>
      </div>
      <div className="row" style={{borderWidth: 2,backgroundColor:'lavendar'}}>
      </div> 
      <div className="row" style={{padding: 10}}>
       
      </div>  
      <div className="form-group" style={{backgroundColor:'lavendar', textAlign: 'center'}}>
        <button type="submit" >Update</button>
 
       </div>  
        </form>

        <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditRecord3;
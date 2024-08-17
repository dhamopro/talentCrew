import React, { useCallback, useEffect, useState } from "react";
import "./Registration.css";
import {
  Autocomplete,
  Checkbox,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import axios from 'axios'
import RegFormSuccess from "../RegFormSuccess/RegFormSuccess.js";
import RegFormFailure from "../RegFormFailure/RegFormFailure.js";
import PocketBase from 'pocketbase';

const configData = require('../../configure.js');
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const RegistrationEditNew = (selectedCandidate) => {
  //constants
  const genderOptions = ["Male", "Female", "Transgender", "Others"];
  
  const skillLevel = [
    "Beginner",
    "Intermediate",
    "Average",
    "Expert",
    "Advanced",
  ];

  const chipStyle = {
    fontSize: "12px",
    height: "24px",
    padding: "0 8px",
  };

   const initFormData = {
    skills: [{ skillName: "", skillLevel: "", skillRating:"" }],
    employs: [{ company: "", jobType: "", payRoll: "", designation: "", empFrom: "01/01/2024", empTo: "01/01/2024" }],
    education: [{ degree: "", subject: "", institution: "", university: "", cpga: "", passOut:"" }],
    certs: [{ certificationName: "", certificationNo: "", certDate: "" }],
    candidateID:"",
    firstName: "",
    middleName: "",
    lastName: "",
    displayName: "",
    phone:"",
    altPhone:"",
    email:"",
    altEmail:"",
    dob: "",
    gender: "",
    panNo:"",
    uanNo:"",
    totExp:"",
    relExp:"",
    currCTC:"",
    expCTC:"",
    currLoc:"",
    prefLoc:[],
    noticePeriod:"",
    nationality: "",
    mobileNumber: "",
    email: "",
    address: "",
    city: "",
    district: "",
    state: "",
    landmark: "",
    pincode: "",
    languages: [],
    prefDays: [],
    prefTime: [],
    interests: [],
    prefJob:[{'name':'QA','id':'QA'}],
    qualification: "",
    affiliation: "",
    empStatus: "",
    yoe: "",
    reference: "",
    consent: false,
    skillSet:[],
    validate:"",
  };

  const initialFormState = {
    skills: [
      { skillName: "Node", skillLevel: "Intermediate", skillRating: "4/5" },
      { skillName: "Node", skillLevel: "Advanced", skillRating: "5/5" }
    ],
    employs: [
      {
        company: "CTS",
        jobType: "FullTime",
        payRoll: "Tek",
        designation: "QA Lead",
        empFrom: "2023-01-01",
        empTo: "2023-01-01"
      }
    ],
    education: [
      {
        degree: "M.E",
        subject: "Physics",
        institution: "College1 Engineering",
        university: "Anna",
        cpga: "3.8",
        passOut: "2022-01-01"
      }
    ],
    certs: [
      {
        certificationName: "Certified React Developer",
        certificationNo: "REACT-123456",
        certDate: "2023-01-03"
      }
    ],
    candidateID: "CANDIDATE-001",
    firstName: "Dummy",
    middleName: "Doe",
    lastName: "Smith",
    displayName: "John Smith",
    phone: "2345678901",
    altPhone: "0987654321",
    email: "john.smith@example.com",
    altEmail: "john.doe@example.com",
    dob: "1990-04-05",
    gender: "Male",
    panNo: "ABCDE1234F",
    uanNo: "123456789012",
    totExp: "3 years",
    relExp: "2.5 years",
    currCTC: "70,000 USD",
    expCTC: "80,000 USD",
    //currLoc: "Chennai",
    prefLoc: ["San Francisco", "Seattle"],
    //noticePeriod: "30 days",
    prefJob: [{'id':3,'name':'FullTime'}],
    consent: true,
    resumeDoc:'',
    imageDoc:'',
    uanDoc:'',
    panDoc:''
  };



  useEffect(() => {
    console.log(selectedCandidate.selectedCandidate.first_name);
    
    console.log(selectedCandidate);

    console.log(selectedCandidate.selectedCandidate.firstName);

    // Optional: If you need to update formState with formData again
    //setFormData(selectedCandidate);

    setFormData({firstName: selectedCandidate.selectedCandidate.firstName,
      middleName: selectedCandidate.selectedCandidate.middleName,
      lastName: selectedCandidate.selectedCandidate.lastName,
      displayName: selectedCandidate.selectedCandidate.displayName,
      phone: selectedCandidate.selectedCandidate.phone,
      altPhone: selectedCandidate.selectedCandidate.altPhone,
      email: selectedCandidate.selectedCandidate.email,
      altEmail: selectedCandidate.selectedCandidate.altEmail,
      gender: selectedCandidate.selectedCandidate.gender,
      currCTC: selectedCandidate.selectedCandidate.currCTC,
      expCTC: selectedCandidate.selectedCandidate.expCTC,
      noticePeriod: selectedCandidate.selectedCandidate.notice_period,
      totExp: selectedCandidate.selectedCandidate.totExp,
      relExp: selectedCandidate.selectedCandidate.relExp,
      education:selectedCandidate.selectedCandidate.education,
      certs:selectedCandidate.selectedCandidate.certs,
      employs:selectedCandidate.selectedCandidate.employs,
      skills:selectedCandidate.selectedCandidate.skills,
      panNo:selectedCandidate.selectedCandidate.panNo,
      uanNo: selectedCandidate.selectedCandidate.uanNo,          
      candidateID: selectedCandidate.selectedCandidate.candidateID,  
      createdDate: selectedCandidate.selectedCandidate.createdDate, 
      //prefJob: PrefJob.find(option => option.name === 'IN/KL/KC') || "",        
      prefJob: PrefJob.find(option => option.name === selectedCandidate.selectedCandidate.prefJob) || "[]",
      noticePeriod: noticePeriod.find(option => option.name === selectedCandidate.selectedCandidate.noticePeriod) || "[]",   
      currLoc:  selectedCandidate.selectedCandidate.currLoc,
    });

    console.log(selectedCandidate.selectedCandidate.prefJob);
    console.log(selectedCandidate.selectedCandidate.noticePeriod);
    console.log(PrefJob);
    console.log('prefJob' in formData);
    console.log(formData.prefJob); 
    console.log(formData.noticePeriod); 
    //console.log(PrefJob.find(option => option.name === selectedCandidate.selectedCandidate.prefJob));
   // console.log(PrefJob.find(option => option.name === selectedCandidate.selectedCandidate.noticePeriod));
   // console.log(location.find(option => option.name === selectedCandidate.selectedCandidate.currLoc));
   // console.log(location.filter(option => ['IN/KL/KC', 'IN/TN/CH'].includes(option.name)));

    console.log(formData); 

    const fetchSkillSet = async () => {
      try {
        console.log('skillSet');
        // you can also fetch all records at once via getFullList
      const records = await pb.collection('SkillSets').getFullList({
        sort: '-created',
      });
       
      setSkillSet(records);
      //console.log(skillSet);
      console.log(records);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    
    const fetchDesignation = async () => {
      try {
        console.log('Designation');
        // you can also fetch all records at once via getFullList
      const records = await pb.collection('Designation').getFullList({
        sort: '-created',
      });
       
      setDesignation(records);
      console.log(records);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchOrganisation = async () => {
      try {
        console.log('Designation');
        // you can also fetch all records at once via getFullList
      const records = await pb.collection('Organisation').getFullList({
        sort: '-created',
      });
       
      setOrganisation(records);
      console.log(records);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    const fetchPayroll = async () => {
      try {
        console.log('fetchPayroll');
        // you can also fetch all records at once via getFullList
      const records = await pb.collection('Payroll').getFullList({
        sort: '-created',
      });
       
      setPayroll(records);
      console.log(records);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    const fetchJobType = async () => {
      try {
        console.log('fetchPayroll');
        // you can also fetch all records at once via getFullList
      const records = await pb.collection('Job_Type').getFullList({
        sort: '-created',
      });
       
      setJobType(records);
      console.log(records);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchDegree = async () => {
      try {
        console.log('fetchDegree');
        // you can also fetch all records at once via getFullList
      const records = await pb.collection('Degree').getFullList({
        sort: '-created',
      });
       
      setDegree(records);
      console.log(records);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchSubject = async () => {
      try {
        console.log('fetchPayroll');
        // you can also fetch all records at once via getFullList
      const records = await pb.collection('subject').getFullList({
        sort: '-created',
      });
       
      setSubject(records);
      console.log(records);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchInstitution = async () => {
      try {
        console.log('fetchPayroll');
        // you can also fetch all records at once via getFullList
      const records = await pb.collection('Institution').getFullList({
        sort: '-created',
      });
       
      setInstitution(records);
      console.log(records);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchUniversity = async () => {
      try {
        console.log('fetchPayroll');
        // you can also fetch all records at once via getFullList
      const records = await pb.collection('University').getFullList({
        sort: '-created',
      });
       
      setUniversity(records);
      console.log(records);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchLocation = async () => {
      try {
        console.log('fetchPayroll');
        // you can also fetch all records at once via getFullList
      const records = await pb.collection('Location').getFullList({
        sort: '-created',
      });

        /*  const filteredData = records.items.map(record => ({
        name: record.name,
        email: record.email,
    }));
    
    return filteredData;*/

       
      setLocation(records);
      console.log(records);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchNoticePeriod = async () => {
      try {
        console.log('fetchPayroll');
        // you can also fetch all records at once via getFullList
      const records = await pb.collection('NoticePeriod').getFullList({
        sort: '-created',
      });
       
      setNoticePeriod(records);
      console.log(records);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchPrefJob = async () => {
      try {
        console.log('fetchPayroll');
        // you can also fetch all records at once via getFullList
      const records = await pb.collection('preffered_job').getFullList({
        sort: '-created',
      });
       
      setPrefJob(records);
      console.log(records);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPrefJob();

    fetchSkillSet();
    fetchDesignation();
    fetchOrganisation();
    fetchPayroll();
    fetchJobType();
    fetchDegree();
    fetchSubject();
    fetchUniversity();
    fetchInstitution();
    fetchLocation();
    fetchNoticePeriod();

  }, [selectedCandidate]);
  
  const [formData, setFormData] = useState({});
  const [candidateId, setCandidateId] = useState('');
  
  const [errors, setErrors] = useState({});

  const [skillSet, setSkillSet] = useState([]);

  const [designation, setDesignation] = useState([]);

  const [organisation, setOrganisation] = useState([]);

  const [payroll, setPayroll] = useState([]);

  const [jobType, setJobType] = useState([]);

  const [degree, setDegree] = useState([]);

  const [subject, setSubject] = useState([]);

  const [institution, setInstitution] = useState([]);

  const [university, setUniversity] = useState([]);

  const [location, setLocation] = useState([]);

  const [noticePeriod, setNoticePeriod] = useState([]);

  const [PrefJob, setPrefJob] = useState([]);

  
  const pb = new PocketBase('https://pb.talentcrew.tekishub.com');

  
  const addCert = () => {
    const updatedCerts = [...formData.certs];
    updatedCerts.push({ certificationName: "", certificationNo: "", certDate: "" });
    setFormData({
      ...formData,
      certs: updatedCerts,
    });
  };

  const removeCerts = (index) => {
    const updatedCerts = [...formData.certs];
    updatedCerts.splice(index, 1);
    setFormData({
      ...formData,
      certs: updatedCerts,
    });
  };
  
  
  const handleChange = (event, count = 0) => {
    // console.log(event, "check this");
    const { name, value, placeholder } = event.target;
    if (name === "skillName" || name === "skillLevel") {
      const updatedSkills = [...formData.skills];
      updatedSkills[count][name] = value;
      console.log("updated skills", updatedSkills);
      setFormData({
        ...formData,
        skills: updatedSkills,
      });
      return;
    }

  

    if (name === "certificationName" || name === "certificationNo" || name === "certDate" ) {
      const updatedCerts = [...formData.certs];
      updatedCerts[count][name] = value;
      console.log("updated company", updatedCerts);
      setFormData({
        ...formData,
        certs: updatedCerts,
      });

      const updatedErrors = { ...errors };
  
    updatedErrors['employs'] = updatedErrors['employs'] || [];

    updatedErrors['employs'][count] = { ...updatedErrors['employs'][count],  [name]: 'error' };

      return;
    }
    

    setFormData({
      ...formData,
      [name]: value,
    });

  };

  const addSkill = () => {
    const updatedSkills = [...formData.skills];
    updatedSkills.push({ skillName: "", skillLevel: "" });
    setFormData({
      ...formData,
      skills: updatedSkills,
    });
  };

  const addCompany = () => {
    const updatedEmploys = [...formData.employs];
    updatedEmploys.push({ company: "", jobType: "", payRoll: "", designation: "", from: "", to: "" });
    setFormData({
      ...formData,
      employs: updatedEmploys,
    });
  };

  const addEducation = () => {
    const updatedEdus = [...formData.education];
    updatedEdus.push({ degree: "", subject: "", institution: "", university: "", cpga: "", passOut:"" });
    setFormData({
      ...formData,
      education: updatedEdus,
    });
  };

  const removeCompany = (index) => {
    const updatedCompany = [...formData.employs];
    updatedCompany.splice(index, 1);
    setFormData({
      ...formData,
      employs: updatedCompany,
    });
  };

  const removeEducation = (index) => {
    const updatedEdus = [...formData.education];
    updatedEdus.splice(index, 1);
    setFormData({
      ...formData,
      education: updatedEdus,
    });
  };  

  const handleAutoCompleteChange = (name, value) => {
    handleChange({ target: { name: name, value: value } });
  };



  return (
    <div className="reg-main">
      
      <div className="button-container">
        <span style={{ float: "left" }}>
        </span>
        <div style={{ textAlign: "right" }}>
          <button
            type="button"
            className="clear-btn"
            onClick={() => setFormData(initialFormState)}
          >
            Clear All
          </button>
          <button
            type="button"
            className="clear-btn register-btn"
            onClick={() => onsubmit()}
          >
            Register
          </button>
          
        </div>
      </div>
      <div className="regContainer">
        
        <div className="formContainer">
          <div className="form-section" id={0} >
            <span className="formCat">Personal Details</span>
            <hr className="form-line" />
            <div className="formEntries">
            <div className="formElement">
                <label>Candidate ID</label>
                <br />
                <input
                  className="form-input"
                  placeholder="Disabled"
                  value={formData.candidateID ? formData.candidateID : ""}
                  disabled
                ></input>
              </div>
              <div className="formElement">
                
              </div>
              <div className="formElement">
                
                </div>
              <div className="formElement">
                <label>Created Date</label>
                <br />
                <input
                  className="form-input"
                  name="createdDate"
                  value={formData.createdDate ? formData.createdDate : ""}
                  readOnly
                ></input>
              </div>
              
             
              <div className="formElement">
                <label>First Name</label>
                <br />
                <input
                  className="form-input"
                  placeholder="Enter your first name"
                  name="firstName"
                  value={formData.firstName ? formData.firstName : ""}
                  onChange={handleChange}
                  style={{ borderColor: errors.firstName ? 'red' : '' }}
                ></input>
               {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName}</span>}
              </div>
              <div className="formElement">
                <label>Middle Name</label>
                <br />
                <input
                  className="form-input"
                  placeholder="Enter your Middle name"
                  name="lastName"
                  value={formData.middleName ? formData.middleName : ""}
                  onChange={handleChange}
                  style={{ borderColor: errors.middleName ? 'red' : '' }}
                ></input>
                {errors.middleName && <span style={{ color: 'red' }}>{errors.middleName}</span>}

              </div>
              <div className="formElement">
                <label>Last Name</label>
                <br />
                <input
                  className="form-input"
                  placeholder="Enter your last name"
                  name="lastName"
                  value={formData.lastName ? formData.lastName : ""}
                  onChange={handleChange}
                  style={{ borderColor: errors.lastName ? 'red' : '' }}
                ></input>
                {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName}</span>}

              </div>
              
              <div className="formElement">
                <label>Display Name</label>
                <br />
                <input
                  className="form-input"
                  label=""
                  disabled
                  name="displayname"
                  value={formData.firstName +' '+ formData.middleName +' '+ formData.lastName}
                ></input>

              </div>
              <div className="formElement">
                <label>Phone No</label>
                <br />
                <input
                  className="form-input"
                  placeholder="Enter your phone"
                  name="phone"
                  value={formData.phone ? formData.phone : ""}
                  onChange={handleChange}
                  style={{ borderColor: errors.phone ? 'red' : '' }}
                ></input>
                {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}

              </div>
              <div className="formElement">
                <label>Alt Phone</label>
                <br />
                <input
                  className="form-input"
                  placeholder="Enter your alt phone"
                  name="altPhone"
                  value={formData.altPhone ? formData.altPhone : ""}
                  onChange={handleChange}
                  style={{ borderColor: errors.altPhone ? 'red' : '' }}
                ></input>
                {errors.altPhone && <span style={{ color: 'red' }}>{errors.altPhone}</span>}

              </div>
              <div className="formElement">
                <label>E Mail</label>
                <br />
                <input
                  className="form-input"
                  placeholder="Enter your E Mail"
                  name="email"
                  value={formData.email ? formData.email : ""}
                  onChange={handleChange}
                  style={{ borderColor: errors.email ? 'red' : '' }}
                ></input>
                {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}

              </div>
              
              <div className="formElement">
                <label>Alt Email</label>
                <br />
                <input
                  className="form-input"
                  label=""
                  name="altEmail"
                  value={formData.altEmail ? formData.altEmail : ""}
                  onChange={handleChange}
                  style={{ borderColor: errors.altEmail ? 'red' : '' }}
                ></input>
                {errors.altEmail && <span style={{ color: 'red' }}>{errors.altEmail}</span>}

              </div>
              <div className="formElement">
                <label>Date of Birth</label>
                <br />
                <input
                  className="form-input"
                  label="DD/MM/YYYY"
                  type="Date"
                  name="dob"
                  value={formData.dob ? formData.dob : ""}
                  onChange={handleChange}
                  style={{ borderColor: errors.dob ? 'red' : '' }}
                ></input>

              {errors.dob && <span style={{ color: 'red' }}>{errors.dob}</span>}

              </div>
              <div className="formElement">
                <label>Gender</label>
                <br />
                <Select
                  displayEmpty
                  renderValue={
                    formData.gender !== "" ? undefined : () => "Select"
                  }
                  style={{ height: "4vh", width: "100%", textAlign: "left", borderColor: errors.dob ? 'red' : '' }}
                  name="gender"
                  value={formData.gender ? formData.gender : ""}
                  onChange={handleChange}
                >
                  {genderOptions.map((gender, index) => (
                    <MenuItem key={index + gender} value={gender}>
                      {gender}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="formElement">
                <label>PAN</label>
                <br />
                <input
                  className="form-input"
                  placeholder="Add your PAN number"
                  name="panNo"
                  value={formData.panNo ? formData.panNo : ""}
                  onChange={handleChange}
                  style={{ borderColor: errors.panNo ? 'red' : '' }}
                ></input>
                {errors.panNo && <span style={{ color: 'red' }}>{errors.panNo}</span>}

              </div>
              <div className="formElement">
                <label>UAN</label>
                <br />
                <input
                  className="form-input"
                  placeholder="Add your UAN number"
                  name="uanNo"
                  value={formData.uanNo ? formData.uanNo : ""}
                  onChange={handleChange}
                  style={{ borderColor: errors.uanNo ? 'red' : '' }}
                ></input>
                {errors.uanNo && <span style={{ color: 'red' }}>{errors.uanNo}</span>}

              </div>
            </div>
          </div>
          </div>
         
            <span className="formCat">Professional Details</span>
            <hr className="form-line" />
            <div className="formEntries">
              <div className="formElement">
                <label>Total Exp</label>
                <br />
                <input
                  className="form-input"
                  placeholder="Enter your Experience"
                  name="totExp" 
                  type="number" 
                  value={formData.totExp ? formData.totExp : ""}
                  onChange={handleChange}
                  style={{ borderColor: errors.totExp ? 'red' : '' }}
                ></input>
                {errors.totExp && <span style={{ color: 'red' }}>{errors.totExp}</span>}

              </div>
              <div className="formElement">
                <label>Rel Exp</label>
                <br />
                <input
                  className="form-input"
                  placeholder="Enter your Experience"
                  name="relExp" 
                  type="number" 
                  value={formData.relExp ? formData.relExp : ""}
                  onChange={handleChange}
                ></input>
                {errors.relExp && <span style={{ color: 'red' }}>{errors.relExp}</span>}

              </div>
              <div className="formElement">
                <label>Current CTC</label>
                <br />
                <input 
                  type="number" 
                  className="form-input"
                  placeholder="Enter CTC"
                  name="currCTC"
                  value={formData.currCTC ? formData.currCTC : ""}
                  onChange={handleChange}
                ></input>
                {errors.currCTC && <span style={{ color: 'red' }}>{errors.currCTC}</span>}

              </div>
              <div className="formElement">
                <label>Excpected CTC</label>
                <br />
                <input 
                  type="number" 
                  className="form-input"
                  placeholder="Exp CTC"
                  name="expCTC"
                  value={formData.expCTC ? formData.expCTC : ""}
                  onChange={handleChange}
                ></input>
                {errors.expCTC && <span style={{ color: 'red' }}>{errors.expCTC}</span>}
              </div>
            <div className="formElement">
                <label>Current Location</label>
                <br />
                <Autocomplete
                  id="checkboxes-tags"
                  options={location}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.name}
                  ChipProps={{ style: chipStyle }}
                  value={formData.currLoc ? formData.currLoc : []}
                  onChange={(event, value) =>
                    handleAutoCompleteChange("currLoc", value)
                  }
                  size={"small"}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected.name}
                      />
                      {option.name}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Choose your preferred Location"
                    />
                  )}
                />
                {errors.currLoc && <span style={{ color: 'red' }}>{errors.currLoc}</span>}
              </div>
              <div className="formElement">
                <label>Preferred Location</label>
                <br />
                <Autocomplete
                  multiple
                  id="checkboxes-tags"
                  options={location}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.name}
                  ChipProps={{ style: chipStyle }}
                 // value={formData.prefLoc ? formData.prefLoc : ""}
                  onChange={(event, value) =>
                    handleAutoCompleteChange("prefLoc", value)
                  }
                  size={"small"}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Choose your preferred Location"
                    />
                  )}
                />
                {errors.prefLoc && <span style={{ color: 'red' }}>{errors.prefLoc}</span>}
              </div>
              <div className="formElement">
                <label>Notice Period</label>
                <br />
                <Autocomplete
                  id="checkboxes-tags"
                  options={noticePeriod}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.name}
                  ChipProps={{ style: chipStyle }}
                  value={formData.noticePeriod ? formData.noticePeriod : ""}
                  onChange={(event, value) =>
                    handleAutoCompleteChange("noticePeriod", value)
                  }
                  size={"small"}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Choose your preferred Location"
                    />
                  )}
                />
                {errors.noticePeriod && <span style={{ color: 'red' }}>{errors.noticePeriod}</span>}
              </div>
              <div className="formElement">
                <label>Preferred Job</label>
                <br />
                <Autocomplete
                  id="checkboxes-tags"
                  options={PrefJob}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.name}
                  ChipProps={{ style: chipStyle }}
                  value={formData.prefJob ? formData.prefJob : ""}
                  onChange={(event, value) =>
                    handleAutoCompleteChange("prefJob", value)
                  }
                  size={"small"}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Choose your preferred Job"
                    />
                  )}
                />
                {errors.prefJob && <span style={{ color: 'red' }}>{errors.prefJob}</span>}
              </div>
              </div>
              <div className="form-section1" id={4} >
            <span className="formCat">Education</span>
            <hr className="form-line" />
            {'education' in formData && formData.education && formData.education.map((eduData, index) => (
              <div className="formEntries1">
                <div className="formElement">
                  <label>Degree</label>
                  <br />
                      <Select
                      displayEmpty
                      style={{
                        height: "4vh",
                        width: "100%",
                        textAlign: "left",
                      }}
                      name="degree"
                      value={eduData.degree}
                      onChange={(event) => handleChange(event, index)}
                      renderValue={
                        eduData.degree !== ""
                          ? undefined
                          : () => "Choose your degree"
                      }
                      
                    >
                      {degree.map((name, index) => (
                        <MenuItem
                          key={index + name.name}
                          value={name.name}
                        >
                          {name.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.education && errors.education[index] && errors.education[index].degree && (
            <span  style={{ color: 'red' }}>{errors.education[index].degree}</span>
          )}
                </div>
                <div className="formElement">
                  <label>Subject</label>
                  <br />
                  <div className="form-skill">
                    <Select
                      displayEmpty
                      style={{
                        height: "4vh",
                        width: "100%",
                        textAlign: "left",
                      }}
                      name="subject"
                      value={eduData.subject}
                      onChange={(event) => handleChange(event, index)}
                      renderValue={
                        eduData.subject !== ""
                          ? undefined
                          : () => "Choose your Subject"
                      }
                    >
                      {subject.map((name, index) => (
                        <MenuItem
                          key={index + name.name}
                          value={name.name}
                        >
                          {name.name}
                        </MenuItem>
                      ))}
                    </Select>

                    {errors.education && errors.education[index] && errors.education[index].subject && (
            <span  style={{ color: 'red' }}>{errors.education[index].subject}</span>
          )}

                </div></div>
                <div className="formElement">
                  <label>Institution</label>
                  <br />
                  <div className="form-skill">
                    <Select
                      displayEmpty
                      style={{
                        height: "4vh",
                        width: "100%",
                        textAlign: "left",
                      }}
                      name="institution"
                      value={eduData.institution}
                      onChange={(event) => handleChange(event, index)}
                      renderValue={
                        eduData.institution !== ""
                          ? undefined
                          : () => "Choose your institution"
                      }
                    >
                      {institution.map((name, index) => (
                        <MenuItem
                          key={index + name.name}
                          value={name.name}
                        >
                          {name.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.education && errors.education[index] && errors.education[index].institution && (
            <span  style={{ color: 'red' }}>{errors.education[index].institution}</span>
          )}
                </div></div>
                <div className="formElement">
                  <label>University</label>
                  <br />
                  <div className="form-skill">
                    <Select
                      displayEmpty
                      style={{
                        height: "4vh",
                        width: "100%",
                        textAlign: "left",
                      }}
                      name="university"
                      value={eduData.university}
                      onChange={(event) => handleChange(event, index)}
                      renderValue={
                        eduData.university !== ""
                          ? undefined
                          : () => "University"
                      }
                    >
                      {university.map((name, index) => (
                        <MenuItem
                          key={index + name.name}
                          value={name.name}
                        >
                          {name.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.education && errors.education[index] && errors.education[index].university && (
            <span  style={{ color: 'red' }}>{errors.education[index].university}</span>
          )}
                </div></div>
                <div className="formElement">
                  <label>CPGA</label>
                  <br />
                  <div className="form-skill">
                    
                    <input 
                    className="form-input"
                    label="Eg. Teaching"
                    name="cpga"
                    value={eduData.cpga}
                    onChange={(event) => {
                      handleChange(event, index);
                    }}
                  ></input>
                  {errors.education && errors.education[index] && errors.education[index].cpga && (
            <span  style={{ color: 'red' }}>{errors.education[index].cpga}</span>
          )}
                </div></div>
                <div className="formElement">
                  <label>PassOut</label>
                  <br />
                  <div className="form-skill">
                    
                    <input type="date"
                    className="form-input"
                    label="Eg. Teaching"
                    name="passOut"
                    value={eduData.passOut}
                    onChange={(event) => {
                      handleChange(event, index);
                    }}
                  ></input>
                  {errors.education && errors.education[index] && errors.education[index].passOut && (
            <span  style={{ color: 'red' }}>{errors.education[index].passOut}</span>
          )}
                    {formData.education.length > 1 && (
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeEducation(index)}
                      >
                        x
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <button className='addSkillButton' type="button" onClick={() => addEducation()}>
              + Add Education
            </button>
          </div> 
         <div className="form-section1" id={3} >
            <span className="formCat">Employment</span>
            <hr className="form-line" />
            {'employs' in formData && formData.employs && formData.employs.map((empData, index) => (
              <div className="formEntries1">
                <div className="formElement">
                  <label>Company</label>
                  <br />
                  {/*<input
                    className="form-input"
                    label="Eg. Teaching"
                    name="skillName"
                    value={empData.company}
                    onChange={(event) => {
                      handleChange(event, index);
                    }}
                  ></input>*/}

                      <Select
                      displayEmpty
                      style={{
                        height: "4vh",
                        width: "100%",
                        textAlign: "left",
                      }}
                      name="company"
                      value={empData.company}
                      onChange={(event) => handleChange(event, index)}
                      renderValue={
                        empData.company !== ""
                          ? undefined
                          : () => "Choose your Company"
                      }
                    >
                      {organisation.map((name, index) => (
                        <MenuItem
                          key={index + name.name}
                          value={name.name}
                        >
                          {name.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.employs && errors.employs[index] && errors.employs[index].passOut && (
            <span  style={{ color: 'red' }}>{errors.employs[index].company}</span>
          )}
                </div>
                <div className="formElement">
                  <label>JobType</label>
                  <br />
                  <div className="form-skill">
                    <Select
                      displayEmpty
                      style={{
                        height: "4vh",
                        width: "100%",
                        textAlign: "left",
                      }}
                      name="jobType"
                      value={empData.jobType}
                      onChange={(event) => handleChange(event, index)}
                      renderValue={
                        empData.jobType !== ""
                          ? undefined
                          : () => "Choose your JobType"
                      }
                    >
                      {jobType.map((name, index) => (
                        <MenuItem
                          key={index + name.name}
                          value={name.name}
                        >
                          {name.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.employs && errors.employs[index] && errors.employs[index].jobType && (
            <span  style={{ color: 'red' }}>{errors.employs[index].jobType}</span>
          )}
                </div></div>
                
                <div className="formElement">
                  <label>Designation</label>
                  <br />
                  <div className="form-skill">
                    <Select
                      displayEmpty
                      style={{
                        height: "4vh",
                        width: "100%",
                        textAlign: "left",
                      }}
                      name="designation"
                      value={empData.designation}
                      onChange={(event) => handleChange(event, index)}
                      renderValue={
                        empData.designation !== ""
                          ? undefined
                          : () => "Choose your Designation"
                      }
                    >
                      {designation.map((name, index) => (
                        <MenuItem
                          key={index + name.name}
                          value={name.name}
                        >
                          {name.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.employs && errors.employs[index] && errors.employs[index].designation && (
            <span  style={{ color: 'red' }}>{errors.employs[index].designation}</span>
          )}
                </div></div>
                <div className="formElement">
                  <label>Payroll</label>
                  <br />
                  <div className="form-skill">
                    <Select
                      displayEmpty
                      style={{
                        height: "4vh",
                        width: "100%",
                        textAlign: "left",
                      }}
                      name="payRoll"
                      value={empData.payRoll}
                      onChange={(event) => handleChange(event, index)}
                      renderValue={
                        empData.payRoll !== ""
                          ? undefined
                          : () => "Payroll"
                      }
                    >
                      {payroll.map((name, index) => (
                        <MenuItem
                          key={index + name.name}
                          value={name.name}
                        >
                          {name.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.employs && errors.employs[index] && errors.employs[index].payRoll && (
            <span  style={{ color: 'red' }}>{errors.employs[index].payRoll}</span>
          )}
                </div></div>
                <div className="formElement">
                  <label>From</label>
                  <br />
                  <div className="form-skill">
                    
                    <input type="date"
                    className="form-input"
                    label="Eg. Teaching"
                    name="empFrom"
                    value={empData.empFrom}
                    onChange={(event) => {
                      handleChange(event, index);
                    }}
                  ></input>
                  {errors.employs && errors.employs[index] && errors.employs[index].empFrom && (
            <span  style={{ color: 'red' }}>{errors.employs[index].empFrom}</span>
          )}
                </div></div>
                <div className="formElement">
                  <label>To</label>
                  <br />
                  <div className="form-skill">
                    
                    <input type="date"
                    className="form-input"
                    label="Eg. Teaching"
                    name="empTo"
                    value={empData.empTo}
                    onChange={(event) => {
                      handleChange(event, index);
                    }}
                  ></input>
                  {errors.employs && errors.employs[index] && errors.employs[index].empTo && (
            <span  style={{ color: 'red' }}>{errors.employs[index].empTo}</span>
          )}
                    {formData.employs.length > 1 && (
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeCompany(index)}
                      >
                        x
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <button className='addSkillButton' type="button" onClick={() => addCompany()}>
              + Add Company
            </button>
          </div>
              <div className="form-section" id={4} >
            <span className="formCat">Skills</span>
            <hr className="form-line" />
            {formData.skills && formData.skills.map((skillData, index) => (
              <div className="formEntries">
                {/*<div className="formElement">
                  <label>Skill</label>
                  <br />
                  <input
                    className="form-input"
                    label="Eg. Teaching"
                    name="skillName"
                    value={skillData.skillName}
                    onChange={(event) => {
                      handleChange(event, index);
                    }}
                  ></input>
                </div>*/}
                <div className="formElement">
                  <label>Skill</label>
                  <br />
                  <div className="form-skill">
                    <Select
                      displayEmpty
                      style={{
                        height: "4vh",
                        width: "100%",
                        textAlign: "left",
                      }}
                      name="skillName"
                      value={skillData.skillName}
                      onChange={(event) => handleChange(event, index)}
                      renderValue={
                        skillData.skillName !== ""
                          ? undefined
                          : () => "Choose your skill Name"
                      }
                    >
                      {skillSet.map((name, index) => (
                        <MenuItem
                          key={index + name.name}
                          value={name.name}
                        >
                          {name.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.skills && errors.skills[index] && errors.skills[index].skillName && (
            <span  style={{ color: 'red' }}>{errors.skills[index].skillName}</span>
          )}
                </div></div>
                <div className="formElement">
                  <label>Skill Level</label>
                  <br />
                  <div className="form-skill">
                    <Select
                      displayEmpty
                      style={{
                        height: "4vh",
                        width: "100%",
                        textAlign: "left",
                      }}
                      name="skillLevel"
                      value={skillData.skillLevel}
                      onChange={(event) => handleChange(event, index)}
                      renderValue={
                        skillData.skillLevel !== ""
                          ? undefined
                          : () => "Choose your skill level"
                      }
                    >
                      {skillLevel.map((qualification, index) => (
                        <MenuItem
                          key={index + qualification}
                          value={qualification}
                        >
                          {qualification}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.skills && errors.skills[index] && errors.skills[index].skillLevel && (
            <span  style={{ color: 'red' }}>{errors.skills[index].skillLevel}</span>
          )}
                    {formData.skills.length > 1 && (
                      <button
                        type="button"
                        className="remove-btn"
                        //onClick={() => removeSkill(index)}
                      >
                        x
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <button className='addSkillButton' type="button" onClick={() => addSkill()}>
              + Add skill
            </button>
          </div>

            <div className="form-section" id={5} >
            <span className="formCat">Certification</span>
            <hr className="form-line" />
            {formData.certs && formData.certs.length>0 && formData.certs.map((certData, index) => (
              <div className="formEntries">
                <div className="formElement">
                  <label>CertificationName</label>
                  <br />
                  <input
                    className="form-input"
                    label="Eg. Teaching"
                    name="certificationName"
                    value={certData.certificationName}
                    onChange={(event) => {
                      handleChange(event, index);
                    }}
                  ></input>
                  {errors.certs && errors.certs[index] && errors.certs[index].certificationName && (
            <span  style={{ color: 'red' }}>{errors.certs[index].certificationName}</span>
          )}
                </div>
                <div className="formElement">
                  <label>CertificationNo</label>
                  <br />
                  <div className="form-skill">
                  <input
                    className="form-input"
                    label="Eg. Teaching"
                    name="certificationNo"
                    value={certData.certificationNo}
                    onChange={(event) => {
                      handleChange(event, index);
                    }}
                  ></input>
                  {errors.certs && errors.certs[index] && errors.certs[index].certificationNo && (
            <span  style={{ color: 'red' }}>{errors.certs[index].certificationNo}</span>
          )}
                </div></div>
                <div className="formElement">
                  <label>Date</label>
                  <br />
                  <div className="form-skill">
                  <input
                    className="form-input"
                    label="Eg. Teaching"
                    name="certDate"
                    type="date"
                    value={certData.certDate}
                    onChange={(event) => {
                      handleChange(event, index);
                    }}
                  ></input>
                     {formData.certs.length > 1 && (
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeCerts(index)}
                      >
                        x
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <button className='addSkillButton' type="button" onClick={() => addCert()}>
              + Add Certification
            </button>
          </div>

          
        </div>
      </div>
      
    )
};

export default RegistrationEditNew;

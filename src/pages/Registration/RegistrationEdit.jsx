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
import RegFormSuccess from "../RegFormSuccess/RegFormSuccess";
import RegFormFailure from "../RegFormFailure/RegFormFailure";
import PocketBase from 'pocketbase';

const configData = require('../../configure.js');
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const RegistrationEdit = (selectedCandidate1) => {
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
    certs: [{ certName: "", certNo: "", certDate: "" }],
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
    prefJob:[],
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
        certName: "Certified React Developer",
        certNo: "REACT-123456",
        certDate: "2023-01-03"
      }
    ],
    candidateID: "CANDIDATE-001",
    firstName: "John",
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
    //prefJob: ["Software Developer", "Front-end Developer"],
    consent: true,
    resumeDoc:'',
    imageDoc:'',
    uanDoc:'',
    panDoc:''
  };

  

  const [candidateId, setCandidateId] = useState('');


  //const [formData, setFormData] = useState(initialFormState);
  //const [formData, setFormData] = useState();

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

  const [sourceType, setSourceType] = useState([]);

  const [sourceName, setSourceName] = useState([]);

  
  const [errors, setErrors] = useState({});

  const  [selectedCandidate, setSelectedCandidate] = useState({}); 

  
  const pb = new PocketBase('https://pb.talentcrew.tekishub.com');


  useEffect(() => {

    console.info(selectedCandidate1);


    const fetchCandidate = async () => {
      try {
        console.info(selectedCandidate1);
      
        setSelectedCandidate(selectedCandidate1);

        
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
          //education:[],selectedCandidate.education,
          certs:[],//selectedCandidate.certs,
          employs:[],//selectedCandidate.,
          skills:[],//selectedCandidate.skills,   */              
        });
        
       
        console.log(selectedCandidate);
        console.log(typeof(selectedCandidate));

        console.log(selectedCandidate.firstName);
       console.info(formData);

      /* setFormData(prevState => ({
        ...prevState,
        firstName: 'ddd'
      }));*/

      console.info(formData);

      } catch (err) {
        if (err.isAbort) {
          //setError("The request was cancelled. Please try again.");
        } else {
          //setError(err.message);
        }
      } finally {
        //setLoading(false);
      }
    };
  
    

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

    const fetchSourceName = async () => {
      try {
        console.log('fetchPayroll');
        // you can also fetch all records at once via getFullList
      const records = await pb.collection('Source_name').getFullList({
        sort: '-created',
      });
       
      setSourceName(records);
      console.log(records);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchSourceType = async () => {
      try {
        console.log('fetchPayroll');
        // you can also fetch all records at once via getFullList
      const records = await pb.collection('Source_Type').getFullList({
        sort: '-created',
      });
       
      setSourceType(records);
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

    /*fetchPrefJob();
    fetchSkillSet();
    fetchDesignation();
    fetchOrganisation();
    fetchPayroll();
    fetchJobType();
    fetchDegree();
    fetchSubject();
    fetchUniversity();
    fetchInstitution();
    //fetchLocation();
   fetchNoticePeriod();*/
    fetchSourceName();
    fetchSourceType();
    fetchCandidate();
  }, [selectedCandidate1]); 

  const [nav, setNav] = useState(0);

  const refArray = Array.from({ length: 6 }, () => React.createRef());

  const handleAutoCompleteChange = (name, value) => {
    handleChange({ target: { name: name, value: value } });
  };

  const isValidInput = (key, value) => {
    console.info(key);
    console.info(value);
    if (!value.trim()){
      return false;
    }

    return true;
  };

  const validateAllRows = (section) => {
    let allValid = true;
    const updatedErrors = { ...errors };

    formData[section].forEach((item, index) => {
      console.info(section);
      Object.keys(item).forEach((key) => {
        if (!isValidInput(key, item[key])) {
          allValid = false;
          updatedErrors[section] = updatedErrors[section] || [];
          updatedErrors[section][index] = { ...updatedErrors[section][index], [key]: `Invalid value for ${key}` };
        }
      });
    });

    setErrors(updatedErrors);
    console.info(updatedErrors);
    return allValid;
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

   // { company: "", jobType: "", payRoll: "", : "", : "", : "" }

    if (name === "company" || name === "jobType" || name === "payRoll"  || name ===  "designation"  || name ===  "empFrom"  || name ===  "empTo") {
      const updatedCompany = [...formData.employs];
      updatedCompany[count][name] = value;
      console.log("updated company", updatedCompany);
      setFormData({
        ...formData,
        employs: updatedCompany,
      });

      const updatedErrors = { ...errors };
  
      updatedErrors['employs'] = updatedErrors['employs'] || [];
  
      updatedErrors['employs'][count] = { ...updatedErrors['employs'][count],  [name]: 'error' };

      return;
    }

    if (name === "degree" || name === "subject" || name === "institution"  || name ===  "university"  || name ===  "cpga"  || name ===  "passOut") {
      const updatedEdus = [...formData.education];
      updatedEdus[count][name] = value;
      console.log("updated company", updatedEdus);
      setFormData({
        ...formData,
        education: updatedEdus,
      });

      const error1 = [];
      error1['degree'] = 'Degree is required';
      error1['cpga'] = 'Degree is required';

      let error = '';
      if (name === 'cpga' && (isNaN(value) || value < 0 || value > 4)) {
        error = 'CPGA must be a number between 0 and 4';
        console.info('Inside error');
      } 
      /*
      if (updatedEdus[count]['degree'] === "") {

        error = 'Degree is required';
        console.info('Inside error');
      } */

   /* if (error) {
      updatedErrors[count] = { ...updatedErrors[count], [name]: error };
    } else if (updatedErrors[count]) {
      delete updatedErrors[count][name];
      if (Object.keys(updatedErrors[count]).length === 0) {
        delete updatedErrors[count];
      }
    }*/

    const updatedErrors = { ...errors };
  
    updatedErrors['education'] = updatedErrors['education'] || [];
    updatedErrors['employs'] = updatedErrors['employs'] || [];
    //updatedErrors['employment1'] = updatedErrors['employment1'] || [];

    //updatedErrors['employment1'][count] = { ...updatedErrors['employment1'][count],  error1 };

    //updatedErrors['education'][count] = { ...updatedErrors['education'][count], [name]: error };

    //updatedErrors['employment'][count] = { ...updatedErrors['employment'][count], [name]: error1 };

    updatedErrors['employs'][count] = { ...updatedErrors['employs'][count],  [name]: error };

    updatedErrors['education'][count] = { ...updatedErrors['education'][count],  [name]: error };
    //updatedErrors['education'][count] = { ...updatedErrors['education'][count],  ['degree']: error };
    updatedErrors['education'][count] = { ...updatedErrors['education'][count],  [name]: error };
    updatedErrors['education'][count] = { ...updatedErrors['education'][count],  [name]: error };


    console.info(updatedErrors);
    setErrors(updatedErrors);
    console.info(errors);

      return;
    }

    if (name === "certName" || name === "certNo" || name === "certDate" ) {
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


  const handleFileChange = (e) => {

    const { name, value } = e.target;


    const selectedFile = e.target.files[0];
    const maxSizeInBytes = 1 * 1024 * 1024; // 1 MB in bytes

    if (selectedFile && selectedFile.size > maxSizeInBytes) {
     // const errors = {};
      errors[name] = 'File size should not be greater than 1 MB';
      setErrors(errors);
      return;
    } else {
      setFormData({
        ...formData,
        [name]: selectedFile,
      });

      errors.file = null;
    }
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

  const addCert = () => {
    const updatedCerts = [...formData.certs];
    updatedCerts.push({ certName: "", certNo: "", certDate: "" });
    setFormData({
      ...formData,
      certs: updatedCerts,
    });
  };

  const removeSkill = (index) => {
    const updatedSkills = [...formData.skills];
    updatedSkills.splice(index, 1);
    setFormData({
      ...formData,
      skills: updatedSkills,
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

  const removeCerts = (index) => {
    const updatedCerts = [...formData.certs];
    updatedCerts.splice(index, 1);
    setFormData({
      ...formData,
      certs: updatedCerts,
    });
  };
  
  const validateFields = () => {
        
    console.log(formData);
    for (const key in formData) {
      if (formData[key] === "" || formData[key] == []) {
        return false;
      }
    }

    for (const skill in formData.skills) {
      if (skill.skillLevel === "" || skill.skillName === "") {
        return false;
      }
    }

    //return true;
    

  };

  // useEffect(() => {
  //   console.log(formData, "inside useEffect");
  // }, [formData]);

  /*const dataToPost = {
      "identityDetails": {
        "fullname": formData.firstName,
        "name": formData.lastName,
        "gender": formData.gender,
        "dob": formData.dob,
        "Nationality": formData.nationality
      },
      "contactDetails": {
        "email": formData.email,
        "mobile": formData.mobileNumber,
        "address": {
          "city": formData.city,
          "state": formData.state,
          "country": 'India'
        }
      },
      "agencyId": "123",
      "status": "Active",
      "role": [
        "Volunteer"
      ]
    }*/

  const dataToPost = {
   /* "first_name": formData.firstName,
    "middle_name": formData.middleName,
    "last_name": formData.lastName,
    "display_name": formData.displayName,
    "phone": formData.phone,
    "alt_phone": formData.altPhone,
    "email": formData.email,
    "alt_email": formData.altEmail,
    "gender": formData.gender,
    "current_ctc": formData.currCTC,
    "expected_ctc": formData.expCTC,
    "notice_period": formData.noticePeriod,
    "total_exp": formData.totExp,
    "relavant_exp": formData.relExp,
    "date_of_birth": formData.dob,
    "location": formData.currLoc,
    "preffered_location": formData.prefLoc,
    "source_type": formData.sourceType,
    "source_name": formData.sourceName,
    "linkedin_id": formData.linkedInId,
    "preffered_job": formData.prefJob,
    "uan_number":formData.uanNo,
    "pan_number":formData.panNo,
    "comments":formData.comments*/
  }

  
      
  const [ regStatus, setRegStatus ] = useState('')

  
  const validate = (event) => {

    event.preventDefault();

    /*handleUANChange(event);
    handlePANChange(event);
    handleNameChange(event);
    handlePhoneChange(event);
    handleAltPhoneChange(event);
    handleEmailChange(event);
    handleAltEmailChange(event);*/
    handleTotExpChange(event);
    handleRelExpChange(event);
    handleCurrCTCChange(event);
    handleExpCTCChange(event);
    handleCurrLocChange(event);
    handlePrefLocChange(event);
    handleNoticePeriodChange(event);
    handlePrefJobChange(event);
    
    validateAllRows('education');
    validateAllRows('employs');
    validateAllRows('certs');
    validateAllRows('skills');


    console.log(errors);
    console.info(formData);

    console.info(formData.education);
    console.info(formData.employs);
    console.info(formData.skills);
    console.info(formData.certs);

    if (!formData.gender.trim()){
      errors.gender = 'Gender is required'; 
    }
  }

  const onsubmit = async () => {
    if(validateFields()) {
    //   window.alert("Form submitted");
    //   return;
    }
    // window.alert("Please enter all the details");

    console.log(dataToPost);
    console.info(dataToPost);
    console.info(formData.education);
    console.info(formData.employs);
    console.info(formData.skills);
    console.info(formData.certs);

    /*axios.post(`${configData.USER_GET}/`, dataToPost)
      .then(function(response){
        console.log('user created sucessfully',response);
        setRegStatus('success');
      })
      .catch(function (error) {
        console.log(error); 
        setRegStatus('failure');
    }) */

      console.log(formData);
      const record = await pb.collection('Candidate').create(dataToPost);
      console.log(record.id)


     const experiencePromises = formData.employs.map(exp => 
        pb.collection('experience').create({
          candidate: record.id,
          company: exp.companyName,
          designation: exp.designation,
          jobType:exp.jobType,
          payroll:exp.payroll,
          location:exp.location,
          //position: exp.position,
          startDate: exp.startDate,
          endDate: exp.endDate,
          //description: exp.description,         
        })
      );

      const experienceRecords = await Promise.all(experiencePromises); 
      
      const educationPromises = formData.education.map(education => 
        pb.collection('education').create({
          candidate: record.id,
          course: education.degree,
          grade: education.score,
          collegeName: education.institution,
         // from: education.ye,
          to : education.yearOfPassing,
        })
      );
      
      const educationRecords = await Promise.all(educationPromises);  

      const skillPromises = formData.education.map(skill => 
        pb.collection('CandidateSkilsets').create({
          candidate: record.id,
          name: skill.name,
          level: skill.skillLevel
        })
      );
      
      const skillRecords = await Promise.all(skillPromises);  

      const certificationPromises = formData.education.map(certi => 
        pb.collection('CandidateCertification').create({
          candidate: record.id,
          course: certi.certificationName,
          grade: certi.certificationNo,
          collegeName: certi.institution,
          date : certi.date,
        })
      );
      
      const certificationRecords = await Promise.all(certificationPromises);  
  };

  const onNavClick = (key) => {
    const currentRef = refArray[key];
    currentRef.current.scrollIntoView({
      behaviour: "smooth",
      block: "end",
      inline: "nearest",
    });
    setNav(key);
  };

  const handleUANChange = (event) => {
    if (!formData.uanNo.trim()) {
      errors.uanNo = 'uanNo is required';
    } else
      if(!/^[0-9]{12}$/.test(formData.uanNo)){
        errors.uanNo = 'Invalid UAN';
      
    } else {
      errors['uanNo']=null;
    }

    const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value
      });
    
  };

  const handlePANChange = (event) => {
    if (!formData.panNo.trim()) {
      errors.panNo = 'PAN is required';
    } else if(!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNo)){
        errors.panNo = 'Invalid PAN';
    } else {
      errors['panNo']=null;
    }

    const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value
      });
  };

  const handleNameChange = (event) => {
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (!/^[A-Z]/.test(formData.firstName)) {
      errors.firstName = 'First name should start with a capital letter';  
    }
    const newValue = event.target.value;
    const capitalizedValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);

    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: capitalizedValue
    });
  
      errors[name]=null;
    };


    const handlePhoneChange = (event) => {
      if (!formData.phone.trim()) {
        errors.phone = 'Phone number is required';
  
      } else if (!/^\d{10}$/.test(formData.phone)) {
        errors.phone = 'Phone number should be 10 digits';  
      }  else{
        errors['phone']=null;
      }
  
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value
      });

      };

      const handleAltPhoneChange = (event) => {

        if (formData.altPhone.trim() && !/^\d{10}$/.test(formData.altPhone)) {
          errors.altPhone = 'Phone number should be 10 digits';
          } else {
            errors['altPhone']=null;
          }
    
        const { name, value } = event.target;

        setFormData({
          ...formData,
          [name]: value
        });
    };
    
      
    const handleEmailChange = (event) => {
      /*if (formData.altEmail.trim() && !/\S+@\S+\.\S+/.test(formData.altEmail)) {
        errors.altEmail = 'Invalid email format';  
      } */
      
      if (!formData.email.trim()) {
        errors.email = 'Email is required';  
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Invalid email format';
      } else {
        errors['email']=null;
      }

      const { name, value } = event.target;

      setFormData({
        ...formData,
        [name]: value
      });
    
    };

    const handleAltEmailChange = (event) => {
      if (formData.altEmail.trim() && !/\S+@\S+\.\S+/.test(formData.altEmail)) {
        errors.altEmail = 'Invalid email format';  
      } else {
        errors['altEmail']=null;
      }
      
      const { name, value } = event.target;

      setFormData({
        ...formData,
        [name]: value
      });
    
    };

    const handleGenderChange = (event) => {

      if (!formData.gender.trim()){
        errors.gender = 'Gender is required'; 
      } else {
        errors['gender']=null;
      }

      const { name, value } = event.target;

      setFormData({
        ...formData,
        [name]: value
      });
    
    };

    const handleDOBChange = (event) => {

      if (!formData.dob.trim()){
        errors.dob = 'DOB is required'; 
      } else {
        errors['dob']=null;
      }

      const { name, value } = event.target;

      setFormData({
        ...formData,
        [name]: value
      });

    };

    const handleTotExpChange = (event) => {

      if (!formData.totExp.trim()){
        errors.totExp = 'Experience is required'; 
      } else {
        if(formData.relExp.trim() && formData.totExp.trim() < formData.relExp.trim()){
          errors['totExp']='Rel Exp should be greater';
          return;
        }
        
        errors['totExp']=null;
      }

      const { name, value } = event.target;

      setFormData({
        ...formData,
        [name]: value
      });
    }

    const handleRelExpChange = (event) => {

      if (!formData.relExp.trim()){
        errors.relExp = 'Experience is required'; 
      } else {
        if(formData.relExp.trim() && formData.totExp.trim() < formData.relExp.trim()){
          errors['relExp']='Total Exp should be Lesser';
          return;
        }
        errors['relExp']=null;
      }

      const { name, value } = event.target;

      setFormData({
        ...formData,
        [name]: value
      });

    }

    const handleCurrCTCChange = (event) => {

      if (!formData.currCTC.trim()){
        errors.currCTC = 'CTC is required'; 
      } else {
        errors['currCTC']=null;
      }

      const { name, value } = event.target;

      setFormData({
        ...formData,
        [name]: value
      });

};

const handleExpCTCChange = (event) => {

  if (!formData.expCTC.trim()){
    errors.expCTC = 'CTC is required'; 
  } else {
    errors['expCTC']=null;
  }

  const { name, value } = event.target;

  setFormData({
    ...formData,
    [name]: value
  });

};

const handleCurrLocChange = (event) => {

  if (formData.currLoc.length === 0){
    errors.currLoc = 'Location is required'; 
  } else {
    errors['currLoc']=null;
  }

  const { name, value } = event.target;

  setFormData({
    ...formData,
    [name]: value
  });

};


const handlePrefLocChange = (event) => {

  if (formData.prefLoc.length === 0){
    errors.prefLoc = 'Location is required'; 
  } else {
    errors['prefLoc']=null;
  }

  const { name, value } = event.target;

  setFormData({
    ...formData,
    [name]: value
  });

};

const handleNoticePeriodChange = (event) => {

  if (formData.noticePeriod.length === 0){
    errors.noticePeriod = 'NP is required'; 
  } else {
    errors['noticePeriod']=null;
  }

  const { name, value } = event.target;

  setFormData({
    ...formData,
    [name]: value
  });

};

const handlePrefJobChange = (event) => {

  if (formData.prefJob.length === 0){
    errors.prefJob = 'Job is required'; 
  } else {
    errors['prefJob']=null;
  }

  const { name, value } = event.target;

  setFormData({
    ...formData,
    [name]: value
  });

};

const [formData, setFormData] = useState({
  candidateId: selectedCandidate.id,
  createdDate:  selectedCandidate.created,
  firstName: "1261",
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
  candidatePicture: '',
 // employs: selectedCandidate
});



  return (
    <div className="reg-main">
      {selectedCandidate.candidateID}
      {formData.candidateID}---
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
          <button
            type="button"
            name="validate"
            className="clear-btn register-btn"
            onClick={validate}
          >
            Validate
          </button>
        </div>
      </div>
      <div className="regContainer">
        <div className="nav-container ">
          <span
            className={nav === 0 ? "nav-element active" : "nav-element"}
            onClick={() => onNavClick(0)}
          >
            Personal Details
          </span>
          <hr className="nav-line" />
          <span
            className={nav === 1 ? "nav-element active" : "nav-element"}
            onClick={() => onNavClick(1)}
          >
            Professional Details
          </span>
          <hr className="nav-line" />
          <span
            className={nav === 3 ? "nav-element active" : "nav-element"}
            onClick={() => onNavClick(2)}
          >
            Education 
          </span>
          <hr className="nav-line" />
          <span
            className={nav === 2 ? "nav-element active" : "nav-element"}
            onClick={() => onNavClick(3)}
          >
            Employment 
          </span>
          <hr className="nav-line" />
          <span
            className={nav === 3 ? "nav-element active" : "nav-element"}
            onClick={() => onNavClick(4)}
          >
            Skills
          </span>
          <hr className="nav-line" />
          <span
            className={nav === 4 ? "nav-element active" : "nav-element"}
            onClick={() => onNavClick(5)}
          >
            Certification
          </span>
          <hr className="nav-line" />
          <span
            className={nav === 5 ? "nav-element active" : "nav-element"}
            onClick={() => onNavClick(6)}
          >
            Reference & Consent
          </span>
        </div>
        <div className="formContainer">
          <div className="form-section" id={0} ref={refArray[0]}>
            <span className="formCat">Personal Details</span>
            <hr className="form-line" />
            <div className="formEntries">
            <div className="formElement">
                <label>Candidate ID</label>
                <br />
                <input
                  className="form-input"
                  placeholder="Disabled"
                  name="firstName"
                  value={formData.candidateID ? formData.candidateID : ""}
                  onChange={handleChange}
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
                  placeholder="Enter your last name"
                  name="lastName"
                  value={formData.landmark ? formData.lastName : ""}
                  onChange={handleChange}
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
                  onChange={handleNameChange}
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
                  onChange={handleNameChange}
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
                  onChange={handleNameChange}
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
                  onChange={handlePhoneChange}
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
                  onChange={handleAltPhoneChange}
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
                  onChange={handleEmailChange}
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
                  onChange={handleAltEmailChange}
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
                  onChange={handleDOBChange}
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
                  onChange={handleGenderChange}
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
                  onChange={handlePANChange}
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
                  onChange={handleUANChange}
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
                  onChange={handleTotExpChange}
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
                  onChange={handleRelExpChange}
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
                  onChange={handleCurrCTCChange}
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
                  onChange={handleExpCTCChange}
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
                  value={formData.prefLoc ? formData.prefLoc : ""}
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

          <div className="form-section" id={4} ref={refArray[4]}>
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
                        onClick={() => removeSkill(index)}
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
          <div className="form-section" id={5} ref={refArray[5]}>
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
                    name="certName"
                    value={certData.certName}
                    onChange={(event) => {
                      handleChange(event, index);
                    }}
                  ></input>
                  {errors.certs && errors.certs[index] && errors.certs[index].certName && (
            <span  style={{ color: 'red' }}>{errors.certs[index].certName}</span>
          )}
                </div>
                <div className="formElement">
                  <label>CertificationNo</label>
                  <br />
                  <div className="form-skill">
                  <input
                    className="form-input"
                    label="Eg. Teaching"
                    name="certNo"
                    value={certData.certNo}
                    onChange={(event) => {
                      handleChange(event, index);
                    }}
                  ></input>
                  {errors.certs && errors.certs[index] && errors.certs[index].certNo && (
            <span  style={{ color: 'red' }}>{errors.certs[index].certNo}</span>
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

export default RegistrationEdit;

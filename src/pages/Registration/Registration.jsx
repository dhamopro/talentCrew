import React, { useEffect, useState } from "react";
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

const Registration = (props) => {
  //constants
  const genderOptions = ["Male", "Female", "Transgender", "Others"];
  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Cote d'Ivoire",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, North",
    "Korea, South",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  const majorLanguages = [
    "Amharic",
    "Azerbaijani",
    "Bengali",
    "Burmese",
    "Dutch",
    "English",
    "French",
    "Fula",
    "German",
    "Gujarati",
    "Hausa",
    "Hindi",
    "Indonesian",
    "Italian",
    "Japanese",
    "Javanese",
    "Kannada",
    "Kazakh",
    "Korean",
    "Kurdish",
    "Maithili",
    "Malay",
    "Malayalam",
    "Mandarin Chinese",
    "Marathi",
    "Nepali",
    "Oriya (Odia)",
    "Pashto",
    "Persian (Farsi)",
    "Polish",
    "Portuguese",
    "Punjabi",
    "Romanian",
    "Russian",
    "Sindhi",
    "Serbo-Croatian",
    "Spanish",
    "Standard Arabic",
    "Swahili",
    "Tamil",
    "Telugu",
    "Thai",
    "Turkish",
    "Ukrainian",
    "Urdu",
    "Uzbek",
    "Vietnamese",
    "Wu Chinese",
    "Yoruba",
  ];

  const prefDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const prefTime = ["Morning", "Afternoon", "Evening", "Night"];

  const interests = [
    "Accounting",
    "Aerospace Engineering",
    "Animation",
    "Artificial Intelligence",
    "Biomedical Engineering",
    "Biotechnology Research",
    "Blockchain Development",
    "Brand Management",
    "Business Analysis",
    "Business Consulting",
    "Business Intelligence",
    "Chemical Engineering",
    "Civil Engineering",
    "Clinical Psychology",
    "Clinical Trials",
    "Content Writing",
    "Copywriting",
    "Corporate Training",
    "Criminal Justice",
    "Culinary Arts",
    "Data Analysis",
    "Data Engineering",
    "Data Science",
    "Dentistry",
    "Digital Advertising",
    "Digital Illustration",
    "Digital Marketing",
    "E-commerce Management",
    "Educational Technology",
    "Energy Management",
    "Environmental Engineering",
    "Environmental Law",
    "Environmental Policy",
    "Environmental Science",
    "Fashion Design",
    "Fashion Merchandising",
    "Financial Analysis",
    "Financial Planning",
    "Game Development",
    "Genetic Counseling",
    "Graphic Design",
    "Health Informatics",
    "Healthcare Administration",
    "Human Resources",
    "Humanitarian Aid",
    "Information Security",
    "International Relations",
    "Investment Banking",
    "Investor Relations",
    "IT Consulting",
    "Journalism",
    "Lawyer / Legal Services",
    "Logistics",
    "Market Analysis",
    "Market Research",
    "Marketing Research Analysis",
    "Mechanical Engineering",
    "Medical Research",
    "Mobile App Development",
    "Music Production",
    "Neuroscience",
    "Nursing",
    "Pharmaceutical Sales",
    "Physical Therapy",
    "Political Science",
    "Product Management",
    "Project Management",
    "Public Health",
    "Public Relations",
    "Public Speaking",
    "Real Estate",
    "Robotics Engineering",
    "Sales Management",
    "Social Media Management",
    "Social Work",
    "Software Development",
    "Speech Therapy",
    "Supply Chain Management",
    "Sustainable Design",
    "Technical Writing",
    "Telecommunications",
    "Teaching",
    "UX/UI Design",
    "Urban Planning",
    "Video Editing",
  ];

  const qualifications = [
    "No Formal Education",
    "Primary Education",
    "Secondary Education",
    "Vocational Qualification",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctorate or Higher",
  ];

  const employmentStatus = ["Full Time", "Part Time", "Unemployed"];

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
    skills: [{ skillName: "", skillLevel: "" }],
    employs: [{ company: "", jobType: "", payRoll: "", designation: "", empFrom: "01/01/2024", empTo: "01/01/2024" }],
    education: [{ degree: "", subject: "", institution: "", university: "", cpga: "", passOut:"" }],
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
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
    qualification: "",
    affiliation: "",
    empStatus: "",
    yoe: "",
    reference: "",
    consent: false,
    skillSet:[],
  };

  const [formData, setFormData] = useState(initFormData);

  const [skillSet, setSkillSet] = useState([]);

  const [designation, setDesignation] = useState([]);

  const [organisation, setOrganisation] = useState([]);

  const [payroll, setPayroll] = useState([]);

  const [jobType, setJobType] = useState([]);

  const [degree, setDegree] = useState([]);

  const [subject, setSubject] = useState([]);

  const [institution, setInstitution] = useState([]);

  const [university, setUniversity] = useState([]);

  
  const pb = new PocketBase('https://pb.talentcrew.tekishub.com');


  useEffect(() => {

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

    fetchSkillSet();
    fetchDesignation();
    fetchOrganisation();
    fetchPayroll();
    fetchJobType();
    fetchDegree();
    fetchSubject();
    fetchUniversity();
    fetchInstitution();
  }, []); 

  const [nav, setNav] = useState(0);

  const refArray = Array.from({ length: 6 }, () => React.createRef());

  const handleAutoCompleteChange = (name, value) => {
    handleChange({ target: { name: name, value: value } });
  };

  const handleChange = (event, count = 0) => {
    // console.log(event, "check this");
    const { name, value } = event.target;
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

    return true;
  };

  // useEffect(() => {
  //   console.log(formData, "inside useEffect");
  // }, [formData]);

  const dataToPost = {
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
    }

  const [ regStatus, setRegStatus ] = useState('')

  const onsubmit = () => {
    if(validateFields()) {
    //   window.alert("Form submitted");
    //   return;
    }
    // window.alert("Please enter all the details");

    console.log(dataToPost)
    axios.post(`${configData.USER_GET}/`, dataToPost)
      .then(function(response){
        console.log('user created sucessfully',response);
        setRegStatus('success');
      })
      .catch(function (error) {
        console.log(error); 
        setRegStatus('failure');
    }) 
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

  return (
    <div>
    { (!regStatus) &&
    (<div className="reg-main">
      {/*<div className="title-container">
        <span className="title">User Registration</span>
        <div className="info-card">
          <span>Online</span>
          <FiberManualRecordIcon
            style={{ fontSize: "1vh", color: "#5D5B5B", margin: "0 0.5vw" }}
          />
          <span>July 10 - July 24</span>
          <FiberManualRecordIcon
            style={{ fontSize: "1vh", color: "#5D5B5B", margin: "0 0.5vw" }}
          />
          <span>Starts @10 AM</span>
        </div>
      </div>
      <hr className="seperator" />
      <div className="button-container">
        <span style={{ float: "left" }}>
          Fill all the details below and be a Volunteer
        </span>
        <div style={{ textAlign: "right" }}>
          <button
            type="button"
            className="clear-btn"
            onClick={() => setFormData(initFormData)}
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
      </div>*/}
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
            Contact Details
          </span>
          <hr className="nav-line" />
          <span
            className={nav === 2 ? "nav-element active" : "nav-element"}
            onClick={() => onNavClick(2)}
          >
            Preferences
          </span>
          <hr className="nav-line" />
          <span
            className={nav === 3 ? "nav-element active" : "nav-element"}
            onClick={() => onNavClick(3)}
          >
            Additional Details
          </span>
          <hr className="nav-line" />
          <span
            className={nav === 4 ? "nav-element active" : "nav-element"}
            onClick={() => onNavClick(4)}
          >
            Skills
          </span>
          <hr className="nav-line" />
          <span
            className={nav === 5 ? "nav-element active" : "nav-element"}
            onClick={() => onNavClick(5)}
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
                <label>First Name</label>
                <br />
                <input
                  className="form-input"
                  placeholder="Enter your first name"
                  name="firstName"
                  value={formData.firstName ? formData.firstName : ""}
                  onChange={handleChange}
                ></input>
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
                ></input>
              </div>
              <div className="formElement">
                <label>Middle Name</label>
                <br />
                <input
                  className="form-input"
                  placeholder="Enter your last name"
                  name="lastName"
                  value={formData.lastName ? formData.lastName : ""}
                  onChange={handleChange}
                ></input>
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
                ></input>
              </div>
              <div className="formElement">
                <label>Nationality</label>
                <br />
                <Select
                  displayEmpty
                  renderValue={
                    formData.nationality !== "" ? undefined : () => "Select"
                  }
                  style={{ height: "4vh", width: "100%", textAlign: "left" }}
                  name="nationality"
                  value={formData.nationality ? formData.nationality : ""}
                  onChange={handleChange}
                >
                  {countries.map((country, index) => (
                    <MenuItem key={index + country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="formElement">
                <label>Gender</label>
                <br />
                <Select
                  displayEmpty
                  renderValue={
                    formData.gender !== "" ? undefined : () => "Select"
                  }
                  style={{ height: "4vh", width: "100%", textAlign: "left" }}
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
                <Select
                  displayEmpty
                  renderValue={
                    formData.gender !== "" ? undefined : () => "Select"
                  }
                  style={{ height: "4vh", width: "100%", textAlign: "left" }}
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
                <label>UAN</label>
                <br />
                <Select
                  displayEmpty
                  renderValue={
                    formData.gender !== "" ? undefined : () => "Select"
                  }
                  style={{ height: "4vh", width: "100%", textAlign: "left" }}
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
            </div>
          </div>
          <div className="form-section" id={1} ref={refArray[1]}>
            <span className="formCat">Contact Details</span>
            <hr className="form-line" />
            <div className="formEntries">
              <div className="formElement">
                <label>Mobile Number</label>
                <br />
                <input
                  className="form-input"
                  placeholder="Add your mobile number"
                  name="mobileNumber"
                  value={formData.mobileNumber ? formData.mobileNumber : ""}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="formElement">
                <label>E-mail ID</label>
                <br />
                <input
                  className="form-input"
                  placeholder="chandlerBing@gmail.com"
                  name="email"
                  value={formData.email ? formData.email : ""}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="formElement">
                <label>Alt email</label>
                <br />
                <input
                  className="form-input"
                  placeholder="Enter house no, floor, street"
                  name="address"
                  value={formData.address ? formData.address : ""}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="formElement">
                <label>Alt Phone</label>
                <br />
                <input
                  className="form-input"
                  placeholder="Eg Koramangala"
                  name="city"
                  value={formData.city ? formData.city : ""}
                  onChange={handleChange}
                ></input>
              </div>
              {/*<div className="formElement">
                <label>District</label>
                <br />
                <input
                  className="form-input"
                  placeholder="Eg Bangalore Urban"
                  name="district"
                  value={formData.district ? formData.district : ""}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="formElement">
                <label>State</label>
                <br />
                <input
                  className="form-input"
                  placeholder="Eg Karnataka"
                  name="state"
                  value={formData.state ? formData.state : ""}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="formElement">
                <label>Landmark</label>
                <br />
                <input
                  className="form-input"
                  placeholder="Enter nearest landmark"
                  name="landmark"
                  value={formData.landmark ? formData.landmark : ""}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="formElement">
                <label>Pincode</label>
                <br />
                <input
                  className="form-input"
                  placeholder="Enter your pincode"
                  name="pincode"
                  value={formData.pincode ? formData.pincode : ""}
                  onChange={handleChange}
                ></input>
              </div>*/}
            </div>
          </div>
          <div className="form-section" id={2} ref={refArray[2]}>
            <span className="formCat">Preferences</span>
            <hr className="form-line" />
            <div className="formEntries">
              <div className="formElement">
                <label>Prefered Location</label>
                <br />
                <Autocomplete
                  multiple
                  id="checkboxes-tags"
                  options={majorLanguages}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option}
                  ChipProps={{ style: chipStyle }}
                  value={formData.languages ? formData.languages : []}
                  onChange={(event, value) =>
                    handleAutoCompleteChange("languages", value)
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
                      {option}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Choose your preferred language"
                    />
                  )}
                />
              </div>
              <div className="formElement">
                <label>Preferred Day(s) to Join</label>
                <br />
                <Autocomplete
                  multiple
                  id="checkboxes-tags"
                  options={prefDays}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option}
                  ChipProps={{ style: chipStyle }}
                  value={formData.prefDays ? formData.prefDays : []}
                  onChange={(event, value) =>
                    handleAutoCompleteChange("prefDays", value)
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
                      {option}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Choose your preferred days"
                    />
                  )}
                />
              </div>
                            <div className="formElement">
                <label>Preferred CTC</label>
                <br />
                <Autocomplete
                  multiple
                  id="checkboxes-tags"
                  options={skillSet}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.name}
                  ChipProps={{ style: chipStyle }}
                  value={formData.skillSet ? formData.skillSet : []}
                  onChange={(event, value) =>
                    handleAutoCompleteChange("skillSet", value)
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
                      placeholder="Choose your preferred days"
                    />
                  )}
                />
              </div>
              <div className="formElement">
                <label>Preferred Shift</label>
                <br />
                <Autocomplete
                  multiple
                  id="checkboxes-tags"
                  options={prefTime}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option}
                  ChipProps={{ style: chipStyle }}
                  value={formData.prefTime ? formData.prefTime : []}
                  onChange={(event, value) =>
                    handleAutoCompleteChange("prefTime", value)
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
                      {option}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Choose your preferred time period"
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="form-section" id={2} ref={refArray[2]}>
            <span className="formCat">Preferences</span>
            <hr className="form-line" />
            <div className="formEntries">
              <div className="formElement">
                <label>Current Location</label>
                <br />
                <Autocomplete
                  multiple
                  id="checkboxes-tags"
                  options={majorLanguages}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option}
                  ChipProps={{ style: chipStyle }}
                  value={formData.languages ? formData.languages : []}
                  onChange={(event, value) =>
                    handleAutoCompleteChange("languages", value)
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
                      {option}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Choose your preferred language"
                    />
                  )}
                />
              </div>
              <div className="formElement">
                <label>Current CTC</label>
                <br />
                <Autocomplete
                  multiple
                  id="checkboxes-tags"
                  options={prefDays}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option}
                  ChipProps={{ style: chipStyle }}
                  value={formData.prefDays ? formData.prefDays : []}
                  onChange={(event, value) =>
                    handleAutoCompleteChange("prefDays", value)
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
                      {option}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Choose your preferred days"
                    />
                  )}
                />
              </div>
                            <div className="formElement">
                <label>Total Exp</label>
                <br />
                <Autocomplete
                  multiple
                  id="checkboxes-tags"
                  options={skillSet}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.name}
                  ChipProps={{ style: chipStyle }}
                  value={formData.skillSet ? formData.skillSet : []}
                  onChange={(event, value) =>
                    handleAutoCompleteChange("skillSet", value)
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
                      placeholder="Choose your preferred days"
                    />
                  )}
                />
              </div>
              <div className="formElement">
                <label>Relevant Exp</label>
                <br />
                <Autocomplete
                  multiple
                  id="checkboxes-tags"
                  options={prefTime}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option}
                  ChipProps={{ style: chipStyle }}
                  value={formData.prefTime ? formData.prefTime : []}
                  onChange={(event, value) =>
                    handleAutoCompleteChange("prefTime", value)
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
                      {option}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Choose your preferred time period"
                    />
                  )}
                />
              </div>
              <div className="formElement">
                <label>Intrested Areas</label>
                <br />
                <Autocomplete
                  multiple
                  id="checkboxes-tags"
                  options={interests}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option}
                  ChipProps={{ style: chipStyle }}
                  value={formData.interests ? formData.interests : []}
                  onChange={(event, value) =>
                    handleAutoCompleteChange("interests", value)
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
                      {option}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Choose your preferred area of interest"
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="form-section" id={3} ref={refArray[3]}>
          <span className="formCat">Uploads</span>
          <hr className="form-line" />
          <div className="formEntries">
              <div className="formElement">
                <label>Resume</label>
                <br />
                <input
          type="file"
          id="documentUpload"
          name="documentUpload"
          //onChange={handleInputChange}
          //onChange={(e) => setImage(e.target.files[0])}
        />
              </div>
              <div className="formElement">
                <label>Image</label>
                <br />
                <input
          type="file"
          id="documentUpload"
          name="documentUpload"
          //onChange={handleInputChange}
          //onChange={(e) => setImage(e.target.files[0])}
        />
              </div>
              <div className="formElement">
                <label>UAN File</label>
                <br />
                <input
          type="file"
          id="documentUpload"
          name="documentUpload"
          //onChange={handleInputChange}
          //onChange={(e) => setImage(e.target.files[0])}
        />
              </div>
              <div className="formElement">
                <label>Pan Card</label>
                <br />
                <input
          type="file"
          id="resumeUpload"
          name="resumeUpload"
          //onChange={handleFileChange}
          //{(e) => setResume(e.target.files[0])}
          required
        />
              </div>
              </div>
              </div>
        {/*
          <div className="form-section" id={3} ref={refArray[3]}>
            <span className="formCat">Additional Details</span>
            <hr className="form-line" />
            <div className="formEntries">
              <div className="formElement">
                <label>Qualification</label>
                <br />
                <Select
                  displayEmpty
                  renderValue={
                    formData.qualification !== ""
                      ? undefined
                      : () => "Choose your Qualification"
                  }
                  style={{ height: "4vh", width: "100%", textAlign: "left" }}
                  name="qualification"
                  value={formData.qualification ? formData.qualification : ""}
                  onChange={handleChange}
                >
                  {qualifications.map((qualification, index) => (
                    <MenuItem key={index + qualification} value={qualification}>
                      {qualification}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="formElement">
                <label>Affiliation</label>
                <br />
                <input
                  className="form-input"
                  placeholder="Eg. Xyz Company"
                  name="affiliation"
                  value={formData.affiliation ? formData.affiliation : ""}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="formElement">
                <label>Employment Status</label>
                <br />
                <Select
                  displayEmpty
                  renderValue={
                    formData.empStatus !== ""
                      ? undefined
                      : () => "Choose your employment status"
                  }
                  style={{ height: "4vh", width: "100%", textAlign: "left" }}
                  name="empStatus"
                  value={formData.empStatus ? formData.empStatus : ""}
                  onChange={handleChange}
                >
                  {employmentStatus.map((empStatus, index) => (
                    <MenuItem key={index + empStatus} value={empStatus}>
                      {empStatus}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="formElement">
                <label>Years of Experience</label>
                <br />
                <input
                  className="form-input"
                  label="Eg. 5"
                  type="number"
                  name="yoe"
                  value={formData.yoe ? formData.yoe : ""}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </div>*/}
          <div className="form-section" id={4} ref={refArray[4]}>
            <span className="formCat">Skills</span>
            <hr className="form-line" />
            {formData.skills.map((skillData, index) => (
              <div className="formEntries">
                <div className="formElement">
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
                </div>
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
                      {skillSet.map((name, index) => (
                        <MenuItem
                          key={index + name.name}
                          value={name.name}
                        >
                          {name.name}
                        </MenuItem>
                      ))}
                    </Select>

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
         <div className="form-section1" id={4} ref={refArray[4]}>
            <span className="formCat">Employment</span>
            <hr className="form-line" />
            {formData.employs.map((empData, index) => (
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
          <div className="form-section1" id={4} ref={refArray[4]}>
            <span className="formCat">Education</span>
            <hr className="form-line" />
            {formData.education.map((eduData, index) => (
              <div className="formEntries1">
                <div className="formElement">
                  <label>Company</label>
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
                          : () => "Payroll"
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
          <div className="form-section" id={5} ref={refArray[5]}>
            <span className="formCat">Reference & Consent</span>
            <hr className="form-line" />
            <div className="formEntries">
              <div className="formElement">
                <label>Reference Channel</label>
                <br />
                <input
                  className="form-input"
                  placeholder="Enter your Reference Channel"
                  name="reference"
                  value={formData.reference ? formData.reference : ""}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <div className="consent-container">
              <div>
                <input
                  name="consent"
                  checked={formData.consent}
                  onChange={() =>
                    setFormData({ ...formData, consent: !formData.consent })
                  }
                  type="checkbox"
                />
                <span>
                  Consent given for sharing preference to other volunteer agency
                  through secure network
                </span>
              </div>
              <span style={{padding: '3vh 0', display: 'block'}}>
                By submiting this form and registering yourself as a nominee,
                you will be agreeing to our{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.google.com"
                >
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.google.com"
                >
                  Privacy Policy
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>)}

    {(regStatus === 'success') && <RegFormSuccess />}
    {(regStatus === 'failure') && <RegFormFailure />}



    </div>
  );
};

export default Registration;

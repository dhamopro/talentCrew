import React, { useEffect, useState } from 'react';

const JobRequirementForm = () => {
    const [formData, setFormData] = useState({
        jobOpenType: '',
        clientName: '',
        clientSpocName: '',
        endClientName: '',
        lineOfBusiness: '',
        reqTitle: '',
        reqType: '',
        reqPriority: '',
        primarySkillSets: [],
        secondarySkillSets: [],
        noOfPositions: '',
        reqStatus: '',
        clientBillRate: '',
        clientBillPeriod: '',
        jobLocation: [],
        limitOfSubmissions: '',
        shifts: '',
        gender: '',
        employmentType: '',
        jobType: [],
    });

    const [errors, setErrors] = useState({});
    const [lob, setLob] = useState([]);


    useEffect(() => {
        const fetchLineOfBusiness = async () => {
          try {
            const response = await fetch('http://localhost:5000/lineofbusiness');
            const data = await response.json();
            setLob(data.lnofBusiness); // Assuming the API returns an array of cities
            console.log('lnofBusiness')
            console.log(data)
          } catch (error) {
            console.error('Error fetching cities:', error);
          }
        };
    
        
        fetchLineOfBusiness();
    
      }, []);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleMultiSelect = (e, name) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData({ ...formData, [name]: selectedOptions });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.jobOpenType) newErrors.jobOpenType = 'Job open type is required';
        if (!formData.clientName) newErrors.clientName = 'Client name is required';
        if (!formData.clientSpocName) newErrors.clientSpocName = 'Client SPOC name is required';
        if (!formData.endClientName) newErrors.endClientName = 'End client name is required';
        if (!formData.lineOfBusiness) newErrors.lineOfBusiness = 'Line of business is required';
        if (!formData.reqTitle) newErrors.reqTitle = 'Requirement title is required';
        if (!formData.reqType) newErrors.reqType = 'Requirement type is required';
        if (!formData.reqPriority) newErrors.reqPriority = 'Requirement priority is required';
        if (formData.primarySkillSets.length === 0) newErrors.primarySkillSets = 'Primary skill sets are required';
        if (formData.secondarySkillSets.length === 0) newErrors.secondarySkillSets = 'Secondary skill sets are required';
        if (!formData.noOfPositions) newErrors.noOfPositions = 'Number of positions is required';
        if (!formData.reqStatus) newErrors.reqStatus = 'Requirement status is required';
        if (!formData.clientBillRate) newErrors.clientBillRate = 'Client bill rate is required';
        if (!formData.clientBillPeriod) newErrors.clientBillPeriod = 'Client bill period is required';
        if (formData.jobLocation.length === 0) newErrors.jobLocation = 'Job location is required';
        if (!formData.limitOfSubmissions) newErrors.limitOfSubmissions = 'Limit of submissions is required';
        if (!formData.shifts) newErrors.shifts = 'Shifts are required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.employmentType) newErrors.employmentType = 'Employment type is required';
        if (formData.jobType.length === 0) newErrors.jobType = 'Job type is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const [fileError, setFileError] = useState('');

    const handleFileUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Check file size
            const fileSizeInMB = file.size / (1024 * 1024);
            if (fileSizeInMB > 2) {
                setFileError('File size should not exceed 2 MB');
                return;
            }

            // Check file type
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!allowedTypes.includes(file.type)) {
                setFileError('Only PDF and Word documents are allowed');
                return;
            }

            // File is valid, you can handle the file upload logic here
            console.log('File uploaded:', file);
            setFileError('');
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Submit form data
            console.log(formData);
        }
    };


    return (
        <div className="registration-container">
            <form onSubmit={handleSubmit}>
                {/* Job Open Type */}
                <div className="row">
                    <div className="form-group column">
                        <label htmlFor="clientName">Req ID</label>
                        <input
                            type="text"
                            id="clientName"
                            name="clientName"
                            value={formData.clientName}
                            onChange={handleChange}
                            required
                            style={{ borderColor: errors.clientName ? 'red' : 'inherit' }}
                            disabled={formData.jobOpenType === 'internal'}
                        />
                        {errors.clientName && <span style={{ color: 'red' }}>{errors.clientName}</span>}


                    </div>
                    <div className="form-group column">
                        <label htmlFor="jobOpenType">Job Open Type*</label>
                        <select
                            id="jobOpenType"
                            name="jobOpenType"
                            value={formData.jobOpenType}
                            onChange={handleChange}
                            required
                            style={{ borderColor: errors.jobOpenType ? 'red' : 'inherit' }}
                        >
                            <option value="">Select Job Open Type</option>
                            <option value="internal">Internal</option>
                            <option value="external">External</option>
                        </select>
                        {errors.jobOpenType && <span style={{ color: 'red' }}>{errors.jobOpenType}</span>}
                    </div>

                    {/* Client Name */}
                    <div className="form-group column">
                        <label htmlFor="clientName">Client Name*</label>
                        <input
                            type="text"
                            id="clientName"
                            name="clientName"
                            value={formData.clientName}
                            onChange={handleChange}
                            required
                            style={{ borderColor: errors.clientName ? 'red' : 'inherit' }}
                            disabled={formData.jobOpenType === 'internal'}
                        />
                        {errors.clientName && <span style={{ color: 'red' }}>{errors.clientName}</span>}
                    </div>
                    <div className="form-group column">
                        <label htmlFor="reqTitle">EmpanelledStatus</label>
                        <input
                            type="text"
                            id="reqTitle"
                            name="reqTitle"
                            value={formData.reqTitle}
                            onChange={handleChange}
                            required
                            style={{ borderColor: errors.reqTitle ? 'red' : 'inherit' }}
                        />
                        {errors.reqTitle && <span style={{ color: 'red' }}>{errors.reqTitle}</span>}
                    </div>
                    <div className="form-group column">
                        <label htmlFor="reqTitle">Requirement Title*</label>
                        <input
                            type="text"
                            id="reqTitle"
                            name="reqTitle"
                            value={formData.reqTitle}
                            onChange={handleChange}
                            required
                            style={{ borderColor: errors.reqTitle ? 'red' : 'inherit' }}
                        />
                        {errors.reqTitle && <span style={{ color: 'red' }}>{errors.reqTitle}</span>}
                    </div>

                    <div className="form-group column">
                        <label htmlFor="receivedDate">Received Date*</label>
                        <input
                            type="date"
                            id="receivedDate"
                            name="receivedDate"
                            value={formData.receivedDate}
                            onChange={handleChange}
                            required
                            style={{ borderColor: errors.receivedDate ? 'red' : 'inherit' }}
                        />
                        {errors.receivedDate && <span style={{ color: 'red' }}>{errors.receivedDate}</span>}
                    </div>

                    <div className="form-group column">
                        {/* Line of Business */}

                        <label htmlFor="lineOfBusiness">Line of Business*</label>
                        <select
                            id="lineOfBusiness"
                            name="lineOfBusiness"
                            value={formData.lineOfBusiness}
                            onChange={handleChange}
                            required
                            style={{ borderColor: errors.lineOfBusiness ? 'red' : 'inherit' }}
                        >
                            <option value="">Select Line of Business</option>
                            {lob.map((lob) => (
                            <option key={lob.sLineOfBusinessName} value={lob.iLineofBusinessId}>
                                {lob.sLineOfBusinessName}
                            </option>
                            ))}
    

                            {/* Add options for lines of business */}
                        </select>
                        {errors.lineOfBusiness && <span style={{ color: 'red' }}>{errors.lineOfBusiness}</span>}
                    </div>
                </div>
                {/* Client SPOC Name */}
                <div className="row">
                    <div className="form-group column">
                        <label htmlFor="clientSpocName">Client SPOC Name*</label>
                        <select
                            id="clientSpocName"
                            name="clientSpocName"
                            value={formData.clientSpocName}
                            onChange={handleChange}
                            required
                            style={{ borderColor: errors.clientSpocName ? 'red' : 'inherit' }}
                        >
                            <option value="">Select Client SPOC Name</option>
                            {/* Add options for client SPOC names */}
                        </select>
                        {errors.clientSpocName && <span style={{ color: 'red' }}>{errors.clientSpocName}</span>}
                    </div>

                    <div className="form-group column">
                        <label htmlFor="clientSpocName">SPOC Phone*</label>
                        <input
                            type="text"
                            id="clientName"
                            name="clientName"
                            value={formData.clientName}
                            onChange={handleChange}
                            required
                            style={{ borderColor: errors.clientName ? 'red' : 'inherit' }}
                            disabled={formData.jobOpenType === 'internal'}
                        />
                        {errors.clientName && <span style={{ color: 'red' }}>{errors.clientName}</span>}
                    </div>

                    <div className="form-group column">
                        <label htmlFor="clientSpocName">SPOC Email*</label>
                        <input
                            type="text"
                            id="clientName"
                            name="clientName"
                            value={formData.clientName}
                            onChange={handleChange}
                            required
                            style={{ borderColor: errors.clientName ? 'red' : 'inherit' }}
                            disabled={formData.jobOpenType === 'internal'}
                        />
                        {errors.clientName && <span style={{ color: 'red' }}>{errors.clientName}</span>}
                    </div>

                    {/* End Client Name */}
                    <div className="form-group column">
                        <label htmlFor="endClientName">End Client Name*</label>
                        <select
                            id="endClientName"
                            name="endClientName"
                            value={formData.endClientName}
                            onChange={handleChange}
                            required
                            style={{ borderColor: errors.endClientName ? 'red' : 'inherit' }}
                        >
                            <option value="">Select End Client Name</option>
                            {/* Add options for end client names */}
                        </select>
                        {errors.endClientName && <span style={{ color: 'red' }}>{errors.endClientName}</span>}
                    </div>

                </div>
                <div className="row">


                    {/* Requirement Title */}


                    <div className="form-group column">
                        {/* Requirement Type */}

                        <label htmlFor="reqType">Requirement Type*</label>
                        <select
                            id="reqType"
                            name="reqType"
                            value={formData.reqType}
                            onChange={handleChange}
                            required
                            style={{ borderColor: errors.reqType ? 'red' : 'inherit' }}
                        >
                            <option value="">Select Requirement Type</option>
                            {/* Add options for requirement types */}
                        </select>
                        {errors.reqType && <span style={{ color: 'red' }}>{errors.reqType}</span>}
                    </div>

                    {/* Requirement Priority */}
                    <div className="form-group column">
                        <label htmlFor="reqPriority">Requirement Priority*</label>
                        <select
                            id="reqPriority"
                            name="reqPriority"
                            value={formData.reqPriority}
                            onChange={handleChange}
                            required
                            style={{ borderColor: errors.reqPriority ? 'red' : 'inherit' }}
                        >
                            <option value="">Select Requirement Priority</option>
                            {/* Add options for requirement priorities */}
                        </select>
                        {errors.reqPriority && <span style={{ color: 'red' }}>{errors.reqPriority}</span>}
                    </div>
                    <div className="form-group column">
                        {/* Number of Positions */}
                        <label htmlFor="noOfPositions">Number of Positions*</label>
                        <select
                            id="noOfPositions"
                            name="noOfPositions"
                            value={formData.noOfPositions}
                            onChange={handleChange}
                            required
                            style={{ borderColor: errors.noOfPositions ? 'red' : 'inherit' }}
                        >
                            <option value="">Select Number of Positions</option>
                            {/* Add options for number of positions */}
                        </select>
                        {errors.noOfPositions && <span style={{ color: 'red' }}>{errors.noOfPositions}</span>}
                    </div>

                    {/* Requirement Status */}
                    <div className="form-group column">
                        <label htmlFor="reqStatus">Requirement Status*</label>
                        <select
                            id="reqStatus"
                            name="reqStatus"
                            value={formData.reqStatus}
                            onChange={handleChange}
                            required
                            style={{ borderColor: errors.reqStatus ? 'red' : 'inherit' }}
                        >
                            <option value="">Select Requirement Status</option>
                            {/* Add options for requirement statuses */}
                        </select>
                        {errors.reqStatus && <span style={{ color: 'red' }}>{errors.reqStatus}</span>}
                    </div>

                </div>
                <div className="row">
                    <div className="form-group column">
                        {/* Client Bill Rate */}
                        {/* Client Bill Rate */}
                        <label htmlFor="clientBillRate">Client Bill Rate*</label>
                        <select
                            id="clientBillRate"
                            name="clientBillRate"
                            value={formData.clientBillRate}
                            onChange={handleChange}
                            required
                            style={{ borderColor: errors.clientBillRate ? 'red' : 'inherit' }}
                        >
                            <option value="">Select Client Bill Rate</option>
                            <option value="perDay">Per Day</option>
                            <option value="perMonth">Per Month</option>
                            <option value="perHour">Per Hour</option>
                        </select>
                        {errors.clientBillRate && <span style={{ color: 'red' }}>{errors.clientBillRate}</span>}
                    </div>
                    {/* Client Bill Period */}
                    <div className="form-group column">
                        <label htmlFor="clientBillPeriod">Client Bill Period*</label>
                        <select
                            id="clientBillPeriod"
                            name="clientBillPeriod"
                            value={formData.clientBillPeriod}
                            onChange={handleChange}
                            required
                            style={{ borderColor: errors.clientBillPeriod ? 'red' : 'inherit' }}
                        >
                            <option value="">Select Client Bill Period</option>
                            <option value="perDay">Per Day</option>
                            <option value="perMonth">Per Month</option>
                            <option value="perHour">Per Hour</option>
                        </select>
                        {errors.clientBillPeriod && <span style={{ color: 'red' }}>{errors.clientBillPeriod}</span>}
                    </div>

                    {/* Job Location */}


                    {/* Limit of Submissions */}
                    <div className="form-group column">
                        <label htmlFor="limitOfSubmissions">Limit of Submissions*</label>
                        <select
                            id="limitOfSubmissions"
                            name="limitOfSubmissions"
                            value={formData.limitOfSubmissions}
                            onChange={handleChange}
                            required
                            style={{ borderColor: errors.limitOfSubmissions ? 'red' : 'inherit' }}
                        >
                            <option value="">Select Limit of Submissions</option>
                            {/* Add options for limit of submissions */}
                        </select>
                        {errors.limitOfSubmissions && <span style={{ color: 'red' }}>{errors.limitOfSubmissions}</span>}
                    </div>


                    <div className="form-group column">
                        <label htmlFor="lastDateForSubmissions">Last Date for Submissions</label>
                        <input
                            type="date"
                            id="lastDateForSubmissions"
                            name="lastDateForSubmissions"
                            value={formData.lastDateForSubmissions}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group column">
                        {/* Primary Skill Sets */}
                        <label htmlFor="primarySkillSets">Primary Skill Sets*</label>
                        <select
                            id="primarySkillSets"
                            name="primarySkillSets"
                            value={formData.primarySkillSets}
                            onChange={(e) => handleMultiSelect(e, 'primarySkillSets')}
                            required
                            multiple
                            style={{ borderColor: errors.primarySkillSets ? 'red' : 'inherit' }}
                        >
                            {/* Add options for primary skill sets */}
                            <option>Java</option>
                            <option>Database</option>
                        </select>
                        {errors.primarySkillSets && <span style={{ color: 'red' }}>{errors.primarySkillSets}</span>}
                    </div>

                    {/* Secondary Skill Sets */}
                    <div className="form-group column">
                        <label htmlFor="secondarySkillSets">Secondary Skill Sets*</label>
                        <select
                            id="secondarySkillSets"
                            name="secondarySkillSets"
                            value={formData.secondarySkillSets}
                            onChange={(e) => handleMultiSelect(e, 'secondarySkillSets')}
                            required
                            multiple
                            style={{ borderColor: errors.secondarySkillSets ? 'red' : 'inherit' }}
                        >
                            {/* Add options for secondary skill sets */}
                            <option>Java</option>
                            <option>Database</option>
                        </select>
                        {errors.secondarySkillSets && <span style={{ color: 'red' }}>{errors.secondarySkillSets}</span>}
                    </div>
                    <div className="form-group column">
                        <label htmlFor="jobLocation">Job Location*</label>
                        <select
                            id="jobLocation"
                            name="jobLocation"
                            value={formData.jobLocation}
                            onChange={(e) => handleMultiSelect(e, 'jobLocation')}
                            required
                            multiple
                            style={{ borderColor: errors.jobLocation ? 'red' : 'inherit' }}
                        >
                            {/* Add options for job locations */}
                            <option value="perDay">Chennai</option>
                            <option value="perMonth">Bangalore</option>
                            <option value="perHour">Hyderabad</option>
                        </select>
                        {errors.jobLocation && <span style={{ color: 'red' }}>{errors.jobLocation}</span>}
                    </div>


                    {/* Shifts */}
                    <div className="form-group column">
                        <label htmlFor="shifts">Shifts*</label>
                        <select
                            id="shifts"
                            name="shifts"
                            value={formData.shifts}
                            onChange={handleChange}
                            required size={3}
                            style={{ borderColor: errors.shifts ? 'red' : 'inherit' }}
                        >
                            <option value="">Select Shifts</option>
                            <option value="male">US</option>
                            <option value="female">Dubai</option>
                            <option value="other">Singapore</option>
                            <option value="other">India</option>
                            {/* Add options for shifts */}
                        </select>
                        {errors.shifts && <span style={{ color: 'red' }}>{errors.shifts}</span>}
                    </div>
                </div>

                {/* Last Date for Submissions */}
                <div className="row">

                    {/* Gender */}

                    <div className="form-group column">
                        <label htmlFor="gender">Gender*</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            size={3}
                            style={{ borderColor: errors.gender ? 'red' : 'inherit' }}
                        >

                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.gender && <span style={{ color: 'red' }}>{errors.gender}</span>}
                    </div>

                    {/* Employment Type */}
                    <div className="form-group column">
                        <label htmlFor="employmentType">Employment Type*</label>
                        <select
                            id="employmentType"
                            name="employmentType"
                            value={formData.employmentType}
                            onChange={handleChange}
                            required
                            style={{ borderColor: errors.employmentType ? 'red' : 'inherit' }}
                        >
                            <option value="">Select Employment Type</option>
                            {/* Add options for employment types */}
                        </select>
                        {errors.employmentType && <span style={{ color: 'red' }}>{errors.employmentType}</span>}
                    </div>
                    <div className="form-group column">
                        <label htmlFor="jobType">Job Type*</label>
                        <select
                            id="jobType"
                            name="jobType"
                            value={formData.jobType}
                            onChange={(e) => handleMultiSelect(e, 'jobType')}
                            required
                            multiple
                            style={{ borderColor: errors.jobType ? 'red' : 'inherit' }}
                        >
                            {/* Add options for job types */}
                        </select>
                        {errors.jobType && <span style={{ color: 'red' }}>{errors.jobType}</span>}
                    </div>
                </div>

                {/* Requirement Job Description */}
                <div className="row">
                    <div className="form-group">
                        <label htmlFor="reqJobDesc">Requirement Job Description*</label>
                        <textarea
                            id="reqJobDesc"
                            name="reqJobDesc"
                            value={formData.reqJobDesc}
                            onChange={handleChange}
                            required
                            maxLength={3000} rows={3}
                            style={{ borderColor: errors.reqJobDesc ? 'red' : 'inherit' }}
                        />
                        {errors.reqJobDesc && <span style={{ color: 'red' }}>{errors.reqJobDesc}</span>}
                    </div>

                    {/* Requirement Upload */}
                    <div className="form-group column">
                        <label htmlFor="reqUpload">Requirement Upload</label>
                        <input
                            type="file"
                            id="reqUpload"
                            name="reqUpload"
                            accept=".doc,.pdf"
                            onChange={handleFileUpload}
                        />
                        {errors.reqUpload && <span style={{ color: 'red' }}>{errors.reqUpload}</span>}
                    </div></div>

                {/* Comments */}
                <div className="row">
                    <div className="form-group column">
                        <label htmlFor="comments">Comments</label>
                        <textarea
                            id="comments"
                            name="comments"
                            value={formData.comments}
                            onChange={handleChange}
                            maxLength={3000}
                        />
                    </div>

                    {/* Job Type */}
                </div>

                {/* Received Date */}
                <div className="row">

                </div>
            </form>
        </div>
    )
};

export default JobRequirementForm;

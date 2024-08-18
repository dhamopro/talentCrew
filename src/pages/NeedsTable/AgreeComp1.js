import React, { useEffect, useRef, useState } from 'react';
import CandidateTable from './CandidateTable';
import CandidateTable1 from './AgreTable1';
import PocketBase from 'pocketbase';
import Registration from '../Registration/Registration';
import RegistrationEdit from '../Registration/RegistrationEdit';
import RegistrationEditNew from '../Registration/RegistrationEditNew';


const AggregateComp1 = ({handleMode}) => {
  const handleSelectedCand = (selectedCandidate) => {
    console.log('Selected Candidate in AggregateComp:', selectedCandidate);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const doNothingFor2Seconds = async () => {
  console.log("Pausing for 2 seconds...");

  // Pause execution for 2 seconds
  await delay(2000);

  console.log("Resumed after 2 seconds");
};

  // Method to be called from CandidateTable
  const handlePopupValue = async (valueFromPopup) => {

    if(valueFromPopup === 'Create'){
      setMode('Create');
      return;
    }
    console.log('Value from PopupExample in AggregateComp:', valueFromPopup);
    setEditId(valueFromPopup);
    //handleMode('Edit');

    const selectedCandidate = await pb.collection('Candidate').getOne(valueFromPopup,{
      expand: 'notice_period, skill_set,location, preffered_location, source_type, source_name, preffered_job, current_organisation',
    });
    console.info(selectedCandidate);
    console.info(selectedCandidate.expand.location);

   

    try{
    const certification = await pb.collection('CandidateCertification').getList(1, 50, {filter:`candidate.id="${valueFromPopup}"`,});
        let certData = certification.items;
        console.info(valueFromPopup);
        console.info(certification);
        console.info(certData);
        

        const experience = await pb.collection('Experience').getList(1, 50, {filter:`candidate.id="${valueFromPopup}"`,});
        let expData = experience.items;
        console.info(valueFromPopup);
        console.info(expData);

        
        const education = await pb.collection('Education').getList(1, 50, {filter:`candidate.id="${valueFromPopup}"`,});
        let eduData = education.items;
        console.info(valueFromPopup);
        console.info(eduData);


        const canSkillset = await pb.collection('CandidateSkilsets').getList(1, 50, {filter:`candidate.id="${valueFromPopup}"`,});
        let skillData = canSkillset.items;
        console.info(canSkillset);
        console.info(valueFromPopup);
        console.info(skillData);
        selectedCandidate.skills= canSkillset.items;

       // setFormData(selectedCandidate);

       setFormData({firstName: selectedCandidate.first_name,
        middleName: selectedCandidate.middle_name,
        lastName: selectedCandidate.last_name,
        displayName: selectedCandidate.display_name,
        phone: selectedCandidate.phone,
        altPhone: selectedCandidate.alt_phone,
        email: selectedCandidate.email,
        altEmail: selectedCandidate.alt_email,
        gender: selectedCandidate.gender,
        currCTC: selectedCandidate.current_ctc,
        expCTC: selectedCandidate.expected_ctc,
        noticePeriod: selectedCandidate.notice_period,
        totExp: selectedCandidate.total_exp,
        relExp: selectedCandidate.relavant_exp,
        panNo: selectedCandidate.pan_number,
        uanNo: selectedCandidate.uan_number,
        candidateID: selectedCandidate.id,
        createdDate: selectedCandidate.created,
        prefJob: selectedCandidate.PreferredJob,

        noticePeriod: selectedCandidate.notice_period,
        currLoc:selectedCandidate.expand.location,
        prefLoc: selectedCandidate.expand.preffered_location,
        education:eduData,
        certs:certData,
        employs:expData,
        skills:canSkillset.items,            
      }); 
       
      doNothingFor2Seconds();
      doNothingFor2Seconds();

        console.log(formData);
        setMode('Edit');
      } catch (err) {
          console.log(err.message);
      }finally {
        //setLoading(false);
      }

  };

  const [editId, setEditId] = useState([]);


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
    firstName: "Joaaaaahn",
    middleName: "Doe",
    lastName: "Smith",
    displayName: "John Smith"};

    const [formData, setFormData] = useState({});

    const [mode, setMode] = useState('List');

  const pb = new PocketBase('https://pb.talentcrew.tekishub.com');

  const popupExampleRef = useRef(null);

 /* useEffect(() => {
    // Call the child component's method after the parent has rendered
    if (popupExampleRef.current) {
      popupExampleRef.current.togglePopup();
      console.info(157);
    }
    
  }, []); */

  return (
    <div>
      
      {mode ==='List' && <CandidateTable1 
        handleSelectedCand={handleSelectedCand} 
        handlePopupValue={handlePopupValue} popUpRef={popupExampleRef}
      />}
       {/*} /{formData.firstName}
        /{formData.lastName}

        {mode}

        {mode ==='Edit' && formData.certs && <div>
        certs-{formData.certs.length} </div>}

      {mode ==='Edit' && formData.education && <div>
        education-{formData.education.length}
      </div>}

      {mode ==='Edit' && formData.skills && <div>
        skills-{formData.skills.length}
      </div>}*/}


      {mode ==='Edit' &&<RegistrationEditNew selectedCandidate = {formData}/>}

      {mode ==='Create' &&<Registration/>}

    </div>
  );
};

export default AggregateComp1;

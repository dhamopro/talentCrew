import React, { useState } from 'react';
import './PopupExample.css';
import { Link, useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { isFieldValuePresent } from '../Profile/Util';



const PopupExample = ({handleEditorCreate}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [exists, setExists] = useState(false);
    const [pan, setPan] = useState('ABCDE1234F');
    const [result, setResult] = useState();
    const [candidateId, setCandidateId] = useState();

    

    const [isEditMode, setIsEditMode] = useState(false); // Track whether the form is in edit mode

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const handleCreate = () => {
        alert(`Created Application with Email: ${email}, PAN: ${pan}`);
        togglePopup();
    };

    const handleEdit = (event) => {
        alert(`Edited Application with Email: ${email}, PAN: ${pan}`);
        setIsEditMode(false);

        const { id } = event.target;


        setCandidateId(id)
        console.info(id);
        handleEditorCreate(id);
        //const history = useNavigate();
        
    };

    const handlePANNotAvailable = () => {
        alert(`Edited Application with Email: ${email}, PAN: ${pan}`);
        setIsEditMode(false);
    };

    const handleSendApplication = () => {
        alert(`Application sent to User with Email: ${email}`);
    };

    const handleCheck = async () => {

        if (pan.trim() && pan!=='NotAvailable') {
            //setExists(await isFieldValuePresent('candidate','pan_number',pan));
            let res = await isFieldValuePresent('candidate', 'pan_number', pan, true, ['id', 'email', 'pan_number']);
            console.info(res);
            //await Promise.all(res);

            setResult(res);
            console.info(result);
        }
        else {
            let res = await isFieldValuePresent('candidate', 'email', email, true, ['id', 'email', 'pan_number']);
            console.info(res);
            setResult(res);

            // setExists(await isFieldValuePresent('candidate','email',email));
            //setResult(isFieldValuePresent('candidate', 'pan_number', pan, true, ['id', 'email', 'pan_number']));
        }


    };

    return (
        <div>
            <button onClick={togglePopup}>
                <i><PersonAddIcon /></i>
            </button>
            {isPopupOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <div className="popup-header">
                            <h2>Enter Details</h2>
                            <button className="close-button" onClick={togglePopup}>&times;</button>
                        </div>
                        <form onSubmit={(e) => e.preventDefault()} style={{ padding: 10 }}>


                            {pan !== 'NotAvailable' && <div>
                                <label>PAN:</label>
                                <input
                                    type="text"
                                    value={pan}
                                    onChange={(e) => setPan(e.target.value)}
                                    required
                                />
                            </div>}




                            {pan === 'NotAvailable' && <div>
                                <label>Email:</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            }

                            <div>
                                <span
                                    className={`check-icon ${exists ? 'valid' : ''}`}
                                    onClick={handleCheck}
                                >
                                    &#10003;
                                </span>
                            </div>


                            <Link
                                href="#"
                                onClick={() => {
                                    setPan("NotAvailable");
                                }}
                                style={{ color: 'red' }}
                            >
                                (Pan Not Available)
                            </Link>

                            
                            <div>
                                    {result && result.items.length > 0 ? (
                                        result.items.map((education, index) => (

                                            <tr key={index} style={{border:1, color:'black',background:'skyblue'}}>
                                                <td> <button id={education.id} onClick={handleEdit}>{education.id}</button></td>
                                                <td><label>->Email:</label> {education.email}</td>
                                                <td><label>->PAN Number</label>: {education.pan_number}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <div>No results found.</div>
                                    )}
                                </div>

                            <div className="button-group">
                                <button type="button" onClick={handleEdit}>Edit</button>
                                <button type="button" onClick={handleCreate}>Create</button>
                                <button type="button" onClick={handleSendApplication}>
                                    Send Application to User
                                </button>



                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PopupExample;

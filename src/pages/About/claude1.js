import React, { useState, useEffect } from 'react';
import './Form.css';

const Form1 = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        experience: '',
        startDate: '',
        school: '',
        percentage: '',
        shippingAddress: '',
        shippingStreet2: '',
        shippingCity: '',
        shippingState: '',
        shippingCountry: '',
        shippingCode: '',
        shippingPhone: '',
        shippingFax: '',
        billingAddress: '',
        billingStreet2: '',
        billingCity: '',
        billingState: '',
        billingCountry: '',
        billingCode: '',
        billingPhone: '',
        billingFax: '',
        entityId: '',
        displayName: '',
        companyName: '',
        salutation: '',
        firstName: '',
        lastName: '',
        phone: '',
        currencyCode: '',
        notes: '',
        website: '',
        status: '',
    });
    const [activeTab, setActiveTab] = useState(3);
    const [entityType, setEntityType] = useState('customer');
    const [currencyCodes, setCurrencyCodes] = useState([]);


  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('http://localhost:9000/0/');
        const data = await response.json();
        setCurrencyCodes(data.currency); // Assuming the API returns an array of cities
        console.log('currencies')
        console.log(data)
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    const fetchCountries = async () => {
      try {
        const response = await fetch('http://localhost:5000/countries');
        const data = await response.json();
        setActiveTab(data); // Assuming the API returns an array of countries
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };


    const fetchGender = async () => {
        try {
          const response = await fetch('http://localhost:5000/gender');
          const data = await response.json();
          console.log(process.env.REACT_APP_API_URL)
          setActiveTab(data); // Assuming the API returns an array of countries
        } catch (error) {
          console.error('Error fetching fetchGender:', error);
        }
      };
    //fetchCurrencies();
    fetchCountries();
    fetchGender();

  }, []);



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
    };

    const handleTabChange = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    const handleEntityTypeChange = (e) => {
        setEntityType(e.target.value);
    };

    return (
        <div>
            <div className="row">
                <div className="form-group column">
                    <label>
                        Entity Type:
                        <select value={entityType} onChange={handleEntityTypeChange}>
                            <option value="">Select Entity Type</option>
                            <option value="customer">Customer</option>
                            <option value="vendor">Vendor</option>
                        </select>
                    </label>
                </div>
                <div className="form-group column">
                    <label>
                        Entity ID:
                        <input
                            type="text"
                            name="entityId"
                            value={formData.entityId}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div className="form-group column">
                    <label>
                        Display Name:
                        <input
                            type="text"
                            name="displayName"
                            value={formData.displayName}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div className="form-group column">
                    <label>
                        Company Name:
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div className="form-group column">
                    <label>
                        Salutation:
                        <input
                            type="text"
                            name="salutation"
                            value={formData.salutation}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div className="form-group column">
                    <label>
                        First Name:
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div className="form-group column">
                    <label>
                        Last Name:
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div className="form-group column">
                    <label>
                        Phone:
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div className="form-group column">
                  <label>
                        Currency Code:
                        <select
                            name="currencyCode"
                            value={formData.currencyCode}
                            onChange={handleChange}
                        >   
                            <option value="">Select Country</option>
           {/* {currencyCodes.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}*/}
    
                        </select>
                        
                    </label>
                </div>

                <div className="form-group column">
                    <label>
                        Notes:
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div className="form-group column">
                    <label>
                        Website:
                        <input
                            type="text"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div className="form-group column">
                    <label>
                        Status:
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="">Select Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            {/* Add more status options as needed */}
                        </select>
                    </label>
                </div>
            </div>
            <div></div>
            <div className="react-tabs">
                <div className="react-tabs__tab-list">
                {entityType === 'customer1' && ( <>
                    <div
                        className={`react-tabs__tab ${activeTab === 0 ? 'react-tabs__tab--selected' : ''}`}
                        onClick={() => handleTabChange(0)}
                    >
                        Personal Info
                    </div>
                    <div
                        className={`react-tabs__tab ${activeTab === 1 ? 'react-tabs__tab--selected' : ''}`}
                        onClick={() => handleTabChange(1)}
                    >
                        Experience
                    </div>
                    <div
                        className={`react-tabs__tab ${activeTab === 2 ? 'react-tabs__tab--selected' : ''}`}
                        onClick={() => handleTabChange(2)}
                    >
                        Education
                    </div>
                    </>
                )}
                    {entityType === 'customer' && (
                        <>
                            <div
                                className={`react-tabs__tab ${activeTab === 3 ? 'react-tabs__tab--selected' : ''}`}
                                onClick={() => handleTabChange(3)}
                            >
                                Billing Attention
                            </div>
                            <div
                                className={`react-tabs__tab ${activeTab === 4 ? 'react-tabs__tab--selected' : ''}`}
                                onClick={() => handleTabChange(4)}
                            >
                                Shipping Attention
                            </div>
                        </>
                    )}
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={`react-tabs__tab-panel ${activeTab === 0 ? 'react-tabs__tab-panel--selected' : ''}`}>
                    <label>
                        Name:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </label>
                </div>

                <div className={`react-tabs__tab-panel ${activeTab === 1 ? 'react-tabs__tab-panel--selected' : ''}`}>
                    <label>
                        Experience:
                        <textarea name="experience" value={formData.experience} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Start Date:
                        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                    </label>
                </div>

                <div className={`react-tabs__tab-panel ${activeTab === 2 ? 'react-tabs__tab-panel--selected' : ''}`}>
                    <label>
                        School:
                        <input type="text" name="school" value={formData.school} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Percentage:
                        <input type="number" name="percentage" value={formData.percentage} onChange={handleChange} />
                    </label>
                </div>

                {entityType === 'customer' && (
                    <>
                        <div className={`react-tabs__tab-panel ${activeTab === 3 ? 'react-tabs__tab-panel--selected' : ''}`}>
                            <div className="form-group column">
                                <label>
                                    Billing Address:
                                    <input
                                        type="text"
                                        name="billingAddress"
                                        value={formData.billingAddress}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            <div className="form-group column">
                                <label>
                                    Billing Street 2:
                                    <input
                                        type="text"
                                        name="billingStreet2"
                                        value={formData.billingStreet2}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            <div className="form-group column">
                                <label>
                                    Billing City:
                                    <input
                                        type="text"
                                        name="billingCity"
                                        value={formData.billingCity}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            <div className="form-group column">
                                <label>
                                    Billing State:
                                    <input
                                        type="text"
                                        name="billingState"
                                        value={formData.billingState}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            <div className="form-group column">
                                <label>
                                    Billing Country:
                                    <input
                                        type="text"
                                        name="billingCountry"
                                        value={formData.billingCountry}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            <div className="form-group column">
                                <label>
                                    Billing Code:
                                    <input
                                        type="text"
                                        name="billingCode"
                                        value={formData.billingCode}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            <div className="form-group column">
                                <label>
                                    Billing Phone:
                                    <input
                                        type="text"
                                        name="billingPhone"
                                        value={formData.billingPhone}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            <div className="form-group column">
                                <label>
                                    Billing Fax:
                                    <input
                                        type="text"
                                        name="billingFax"
                                        value={formData.billingFax}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>


                        </div>
                        <div className={`react-tabs__tab-panel ${activeTab === 4 ? 'react-tabs__tab-panel--selected' : ''}`}>
                            <div className="form-group column">
                                <label>
                                    Shipping Address:
                                    <input
                                        type="text"
                                        name="shippingAddress"
                                        value={formData.shippingAddress}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            <div className="form-group column">
                                <label>
                                    Shipping Street 2:
                                    <input
                                        type="text"
                                        name="shippingStreet2"
                                        value={formData.shippingStreet2}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            <div className="form-group column">
                                <label>
                                    Shipping City:
                                    <input
                                        type="text"
                                        name="shippingCity"
                                        value={formData.shippingCity}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            <div className="form-group column">
                                <label>
                                    Shipping State:
                                    <input
                                        type="text"
                                        name="shippingState"
                                        value={formData.shippingState}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            <div className="form-group column">
                                <label>
                                    Shipping Country:
                                    <input
                                        type="text"
                                        name="shippingCountry"
                                        value={formData.shippingCountry}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            <div className="form-group column">
                                <label>
                                    Shipping Code:
                                    <input
                                        type="text"
                                        name="shippingCode"
                                        value={formData.shippingCode}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            <div className="form-group column">
                                <label>
                                    Shipping Phone:
                                    <input
                                        type="text"
                                        name="shippingPhone"
                                        value={formData.shippingPhone}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            <div className="form-group column">
                                <label>
                                    Shipping Fax:
                                    <input
                                        type="text"
                                        name="shippingFax"
                                        value={formData.shippingFax}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                        </div>
                    </>
                )}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Form1;
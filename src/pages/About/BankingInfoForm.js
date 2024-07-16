import React, { useState } from 'react';

const BankingInfoForm = () => {
    const [bankInfo, setBankInfo] = useState({
      accountNumber: '',
      routingNumber: '',
      bankName: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setBankInfo({ ...bankInfo, [name]: value });
    };
  
    return (
      <div>
        <h2>Banking Information</h2>
        <form>
          <label>
            Account Number:
            <input type="text" name="accountNumber" value={bankInfo.accountNumber} onChange={handleChange} />
          </label>
          <br />
          <label>
            Routing Number:
            <input type="text" name="routingNumber" value={bankInfo.routingNumber} onChange={handleChange} />
          </label>
          <br />
          <label>
            Bank Name:
            <input type="text" name="bankName" value={bankInfo.bankName} onChange={handleChange} />
          </label>
        </form>
      </div>
    );
  };

  export default BankingInfoForm;
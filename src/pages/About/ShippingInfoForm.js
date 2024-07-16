
import React, { useState } from 'react';

const ShippingInfoForm = () => {
    const [shippingInfo, setShippingInfo] = useState({
      address: '',
      city: '',
      country: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setShippingInfo({ ...shippingInfo, [name]: value });
    };
  
    return (
      <div>
        <h2>Shipping Information</h2>
        <form>
          <label>
            Address:
            <input type="text" name="address" value={shippingInfo.address} onChange={handleChange} />
          </label>
          <br />
          <label>
            City:
            <input type="text" name="city" value={shippingInfo.city} onChange={handleChange} />
          </label>
          <br />
          <label>
            Country:
            <input type="text" name="country" value={shippingInfo.country} onChange={handleChange} />
          </label>
        </form>
      </div>
    );
  };
  
  export default ShippingInfoForm
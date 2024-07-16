import React, { useState } from 'react';
import BasicInfoForm from './BasicInfoForm';
import ShippingInfoForm from './ShippingInfoForm';
import BankingInfoForm from './BankingInfoForm';



const DynamicFormWithTabs = () => {
  const [activeTab, setActiveTab] = useState('basic');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <ul>
        <li onClick={() => handleTabChange('basic')}>Basic Information</li>
        <li onClick={() => handleTabChange('shipping')}>Shipping Information</li>
        <li onClick={() => handleTabChange('banking')}>Banking Information</li>
      </ul>
      {activeTab === 'basic' && <BasicInfoForm />}
      {activeTab === 'shipping' && <ShippingInfoForm />}
      {activeTab === 'banking' && <BankingInfoForm />}
    </div>
  );
};

export default DynamicFormWithTabs;

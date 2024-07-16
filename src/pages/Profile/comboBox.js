import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ComboBox = () => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (inputValue.length >= 2) {
      fetchOptions(inputValue);
    } else {
      setOptions([]);
    }
  }, [inputValue]);

  const fetchOptions = async (search) => {
    try {
      const response = await axios.post('https://api.talentcrew.tekishub.com/getEntityOptions', {
        iFeildId: 73,
        rfeild: 176,
        rquery: "",
        sSearch: search
      });
      setOptions(response.data);
    } catch (err) {
      console.error('Error fetching options:', err);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setIsOpen(true);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setInputValue(option.value);
    setIsOpen(false);
  };

  return (
    <div className="combo-box">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder="Type to search cities..."npm install react-select
      />
      {isOpen && (
        <ul className="options-list">
          {options.map((option) => (
            <li key={option.id} onClick={() => handleOptionSelect(option)}>
              {option.value}
            </li>
          ))}
        </ul>
      )}
      {selectedOption && <p>Selected city ID: {selectedOption.id}</p>}
    </div>
  );
};

export default ComboBox;
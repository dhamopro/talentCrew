import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const CityComboBox = () => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
        loadOptions();
  }, );

  const loadOptions = async (inputValue) => {
    if (inputValue.length < 1) return [];

    try {
      const response = await axios.post('https://api.talentcrew.tekishub.com/getEntityOptions', {
        iFeildId: 73,
        rfeild: 176,
        rquery: "",
        sSearch: inputValue
      });

      return response.data.map(item => ({
        value: item.id,
        label: item.value
      }));
    } catch (error) {
      console.error('Error fetching options:', error);
      return [];
    }
  };

  const handleChange = (selected) => {
    setSelectedOption(selected);
  };

  return (
    <div>
      <Select
        isClearable
        isSearchable
        placeholder="Type to search cities..."
        value={selectedOption}
        onChange={handleChange}
        loadOptions={loadOptions}
        defaultOptions={options}
        async={true}
        cacheOptions
      />
      {selectedOption && (
        <p>Selected city: {selectedOption.label} (ID: {selectedOption.value})</p>
      )}
    </div>
  );
};

export default CityComboBox;
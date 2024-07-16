import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PocketBase from 'pocketbase';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';


const ComboBoxPB = ({id, collection, onChildDpValueChange, defaultV}) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  


  const pb = new PocketBase('http://139.59.90.114');

  useEffect(() => {
    if (inputValue.length >= 2) {
      fetchOptions(inputValue);
    } else {
      setOptions([]);
    }

    if(defaultV){
      setSelectedOption(defaultV);
    }
  }, [inputValue]);

  const fetchOptions = async (search) => {
    try {
     /*const response = await axios.post('https://api.talentcrew.tekishub.com/getEntityOptions', {
        iFeildId: 73,
        rfeild: 176,
        rquery: "",
        sSearch: search
      });
      */
      const records = await pb.collection(collection).getFullList({
        sort: '-created',
    });
      setOptions(records);
    } catch (err) {
      console.error('Error fetching options:', err);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log('BPdropdown');
    setIsOpen(true);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setInputValue(option.value);
    setIsOpen(false);
  };

  const handleChange = (e) => {
    //const value = e.target.value;
    setInputValue(e.target.value);
    console.log("Line 62");
    //console.log(e.target.value);
    onChildDpValueChange(e.target.value, e);
  };

  const handleOnChange = (event, newValue) => {
    setSelectedOption(newValue);
    onChildDpValueChange(newValue.id, event);

    console.log('Selected Option:', newValue);
  };

  const isOptionEqualToValue = (option, value) => {
    // Custom comparison logic based on specific conditions
    //(option, value) => option.id === value.id
    /*console.log('hi');
    console.log(option.id);
    console.log(value.id);
    console.log(value.name);*/

     // Example: Compare based on 'id'
  };


  return (
    <div className="combo-box">
      {/*<input
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
              {option.name}
            </li>
          ))}
        </ul>
      )}
      {selectedOption && <p>Selected city ID: {selectedOption.name}</p>}
       onClick={() => handleOptionSelect((option) => option.id)}
      */}

      <Autocomplete
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      isOptionEqualToValue={isOptionEqualToValue}
      getOptionLabel={(option) => option.name}
      getOptionKey={(option) => option.id}
      value1={(option) => option.id}
      options={options}
      loading={loading}
      onChange={handleOnChange}
      onInputChange={(event, newInputValue) => {

        setInputValue(newInputValue);
        handleChange(event);
      }}
      renderInput={(params) => (
        <TextField 
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )} 
    />
    </div>
  );
};

export default ComboBoxPB;
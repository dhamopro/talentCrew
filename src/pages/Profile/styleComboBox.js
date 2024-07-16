import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './cityComboBox.css';

const StyleComboBox = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const fetchOptions = async (search) => {
    setLoading(true);
    try {
      const response = await axios.post('https://api.talentcrew.tekishub.com/getEntityOptions', {
        iFeildId: 73,
        rfeild: 176,
        rquery: "",
        sSearch: search
      });
      setOptions(response.data);
    } catch (error) {
      console.error('Error fetching options:', error);
      setOptions([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (inputValue.length >= 2) {
      fetchOptions(inputValue);
    } else {
      setOptions([]);
    }
  }, [inputValue]);

  return (
    <div className={styles.container}>
      <Autocomplete
        id="city-combo-box"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option.value}
        options={options}
        loading={loading}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onChange={(event, newValue) => {
          setSelectedOption(newValue);
        }}
        className={styles.autocomplete}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for a city"
            className={styles.textField}
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
      {selectedOption && (
        <p className={styles.selectedCity}>
          Selected city: {selectedOption.value} (ID: {selectedOption.id})
        </p>
      )}
    </div>
  );
};

export default StyleComboBox;
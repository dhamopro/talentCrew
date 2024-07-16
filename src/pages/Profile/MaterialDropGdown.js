import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';



const ComboBoxGeneric = ({ id, onChildValueChange, rfield, ifield  }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const fetchOptions = async (search) => {
    setLoading(true);
    try {
      const response = await axios.post('https://api.talentcrew.tekishub.com/getEntityOptions', {
        iFeildId: ifield,
        rfeild: rfield,
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

  const handleChangeCity = (value) => {
    //const value = e.target.value;
    setInputValue(value);
    console.log(value);
    //onChildValueChange(value);
  };


  React.useEffect(() => {
    if (inputValue.length >= 2) {
      fetchOptions(inputValue);
    } else {
      setOptions([]);
    }
  }, [inputValue]);

  return (
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
        handleChangeCity(newInputValue);
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
  );
};

export default ComboBoxGeneric;
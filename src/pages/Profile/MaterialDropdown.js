import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import PocketBase from 'pocketbase';

const CityComboBox1 = ({ id, onChildValueChange }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const pb = new PocketBase('http://139.59.90.114');


  const fetchOptions = async (search) => {
    setLoading(true);
    try {
      const response = await axios.post('https://api.talentcrew.tekishub.com/getEntityOptions', {
        iFeildId: 73,
        rfeild: 176,
        rquery: "",
        sSearch: search
      });

      /*const authData = await pb.collection('users').authWithPassword('t.dhamodharan@gmail.com', '4ilzoAEzlPb1NjRoPClq7eH44Khigvle');
      console.log(pb.authStore.token);*/


      const records = await pb.collection('SkillSets').getFullList({
        sort: '-created',
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
    onChildValueChange(value);
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
          label="Search for a city"
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

export default CityComboBox1;
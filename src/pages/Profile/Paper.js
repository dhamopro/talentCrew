import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';

const SuggestionComponent = ({handleChange}) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (inputValue) {
      const baseNumber = parseInt(inputValue);
      const newSuggestions = Array.from({length: 10}, (_, index) => 
        baseNumber + '' + index
      ).sort();
      setSuggestions(newSuggestions);
      handleChange(inputValue)
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: 300 }}>
      <Autocomplete
        freeSolo
        options={suggestions}
        renderInput={(params) => (
          <TextField
            {...params}
            //label="Type a number"
            //variant="outlined"
            type="number"
            onChange={(e) => setInputValue(e.target.value)}
          />
        )}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        value={inputValue}
      />
    </Paper>
  );
}

export default SuggestionComponent;
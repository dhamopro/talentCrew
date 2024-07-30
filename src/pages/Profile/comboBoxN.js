import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';

function ComboBoxN() {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (inputValue) {
      const baseNumber = parseInt(inputValue);
      const newSuggestions = Array.from({length: 9}, () => 
        baseNumber + '' + Math.floor(Math.random() * 10)
      );
      setSuggestions(newSuggestions);
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
            label="Type a number"
            variant="outlined"
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

export default ComboBoxN;
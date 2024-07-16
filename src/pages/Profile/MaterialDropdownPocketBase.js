import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import PocketBase from 'pocketbase';

const skillsetPocketBase = () => {
  //const [open, setOpen] = useState(false)
  /*const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');*/
  const pb = new PocketBase('http://139.59.90.114');


  const fetchOptions = async (search) => {
   // setLoading(true);
   // setLoading(false);
  };

  const handleChangeCity = (value) => {
    //const value = e.target.value;
    //setInputValue(value);
    console.log(value);
  };


  return (
    <div></div>
       
  );
};

export default skillsetPocketBase;
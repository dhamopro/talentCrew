import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import PocketBase from 'pocketbase';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const [names] = [
  {'name':'Mumbai', 'id':'MB'},
  {'name':'Chennai', 'id':'CH'},
];

const fetchOptions = async (search) => {
    //setLoading(true);
    try {
        const pb = new PocketBase('https://pb.talentcrew.tekishub.com');

      const response = await pb.collection('Location').getFullList({
        sort: '-created',
    });
     // setNames(response);
    } catch (error) {
      console.error('Error fetching options:', error);
     // setOptions([]);
    }
    //setLoading(false);
  };


  



export default function MultipleSelectCheckmarks() {
  const [personName, setPersonName] = React.useState([]);

  React.useEffect(() => {
    
    fetchOptions();
  
}, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    // = event.name; 
  /*  setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );*/

    setPersonName(value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names && names.map((name) => (
            <MenuItem key={name.id} value={name.id}>
              <Checkbox checked={personName.indexOf(name.id) > -1} />
              <ListItemText primary={name.id+'/'+name.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

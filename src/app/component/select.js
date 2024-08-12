
import {useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



export default function SelectSmall(props) {
    const [action, setAction] = useState('');
  
    const handleChange = (event) => {
        setAction(event.target.value);
    };
  
    return (
      <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
        <InputLabel id={props.id}>Action</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id={props.id}
          value={action}
          label="Action"
          onChange={handleChange}
        >
           
          <MenuItem value={1}>Delivered</MenuItem>
          <MenuItem value={2}>Pending</MenuItem>
          <MenuItem value={3}>Processing</MenuItem>
          <MenuItem value={4}>Cancel</MenuItem>
        </Select>
      </FormControl>
    );
  }
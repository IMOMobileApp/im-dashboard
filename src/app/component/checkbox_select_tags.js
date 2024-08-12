 'use client'



 import {useState} from 'react'

import Checkbox from '@mui/material/Checkbox';

import TextField from '@mui/material/TextField';

import Autocomplete from '@mui/material/Autocomplete';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import CheckBoxIcon from '@mui/icons-material/CheckBox';

import Chip from '@mui/material/Chip';



export default function CheckboxesTags() {

  const [selectedPet, setSelectedPet] = useState([]);

 

  //console.log(selectedPet);

  return (

    <Autocomplete multiple id="checkboxes-tags-demo" options={top100Films} disableCloseOnSelect getOptionLabel={(option) => option.title}

    value={selectedPet} style={{width:'100%'}}

        onChange={(event, newPet) => { setSelectedPet(newPet) }}

        

      renderOption={(props, option, { selected }) => (

        <li {...props} key={option.id+2}>

          <Checkbox icon={<CheckBoxOutlineBlankIcon fontSize="small" />} checkedIcon={<CheckBoxIcon fontSize="small" />}  style={{ marginRight: 8 }} checked={selected} />

          {option.title} 

        </li>

      )}

       

      renderTags={(tagValue, getTagProps) => {

        return tagValue.map((option, index) => (

          <Chip {...getTagProps({ index })} key={option.id+1} label={option.title} color="primary"/>

        ))

      }}

      renderInput={(params) => ( <TextField {...params} label="Checkboxes" placeholder="" /> )}

    />

  );

}

 

const top100Films = [

  { id:1, title: 'The Shawshank Redemption', year: 1994 },

  { id:2, title: 'The Godfather', year: 1972 },

  { id:3, title: 'The Godfather: Part II', year: 1974 },

  { id:4, title: 'The Dark Knight', year: 2008 },

  { id:5, title: '12 Angry Men', year: 1957 },

  { id:6, title: "Schindler's List", year: 1993 },

  { id:7, title: 'Pulp Fiction', year: 1994 },

  { id:8, title: 'The Lord of the Rings: The Return of the King', year: 2003, },

  { id:9, title: 'The Good, the Bad and the Ugly', year: 1966 },

  { id:10, title: 'Fight Club', year: 1999 },

  { id:11, title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001, },

  { id:12, title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980, },

  { id:13, title: 'Forrest Gump', year: 1994 },

];
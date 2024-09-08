import React from 'react';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { IconButton } from '@mui/material';

function CreateGroup() {
  return (
    <div className='createGroup-container'>
      <input
        type='text'
        placeholder='Enter group name'
        className='search-box'
      />
      <IconButton>
        <DoneOutlineIcon />
      </IconButton>
    </div>
  );
}

export default CreateGroup;

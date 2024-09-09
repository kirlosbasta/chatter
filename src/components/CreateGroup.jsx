import React from 'react';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';

function CreateGroup() {
  const lightMode = useSelector((state) => state.themeKey);
  return (
    <div className={'createGroup-container' + (!lightMode ? ' dark' : '')}>
      <input
        type='text'
        placeholder='Enter group name'
        className={'search-box' + (!lightMode ? ' dark' : '')}
      />
      <IconButton className={(!lightMode ? ' pink' : '')}>
        <DoneOutlineIcon />
      </IconButton>
    </div>
  );
}

export default CreateGroup;

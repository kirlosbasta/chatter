import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import Axios from '../utils/axio.config';
import './styles.css';

function CreateGroup() {
  const lightMode = useSelector((state) => state.themeKey);
  const [groupName, setGroupName] = useState('');
  const navigate = useNavigate();
  const axios = new Axios();

  async function createGroupHandler() {
    try {
      const response = await axios.createGroupChat({ name: groupName });
      navigate(`/app/chat/${response.data._id}`);
      setGroupName('');
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
          ease: 'anticipate',
          duration: 0.3,
        }}
        className={'createGroup-container' + (!lightMode ? ' dark' : '')}
      >
        <input
          type="text"
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className={'search-box' + (!lightMode ? ' dark' : '')}
        />
        <IconButton
          className={!lightMode ? ' pink' : ''}
          onClick={createGroupHandler}
          onKeyDown={(e) => {
            if (e.key === 'Enter') createGroupHandler;
          }}
        >
          <DoneOutlineIcon />
        </IconButton>
      </motion.div>
    </AnimatePresence>
  );
}

export default CreateGroup;

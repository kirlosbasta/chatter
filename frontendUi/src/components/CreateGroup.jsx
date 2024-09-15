import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { IconButton } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import './styles.css';

function CreateGroup() {
  const lightMode = useSelector((state) => state.themeKey);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData) {
      navigate('/');
    }
  });
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
          type='text'
          placeholder='Enter group name'
          className={'search-box' + (!lightMode ? ' dark' : '')}
        />
        <IconButton className={!lightMode ? ' pink' : ''}>
          <DoneOutlineIcon />
        </IconButton>
      </motion.div>
    </AnimatePresence>
  );
}

export default CreateGroup;

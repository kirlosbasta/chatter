import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import logo from '../assets/logo-no-background.png';
import './styles.css';

function Users() {
  const lightMode = useSelector((state) => state.themeKey);
  return (
    <AnimatePresence>
      <motion.div
      initial = {{ opacity: 0, scale: 0 }}
      animate = {{ opacity: 1, scale: 1 }}
      exit = {{ opacity: 0, scale: 0 }}
      transition = {{
        ease: 'anticipate', 
        duration: 0.3 }}
      className='list-container'>
        <div className={'ug-header' + (!lightMode ? ' dark' : '')}>
          <img src={logo} alt='Logo' style={{ width: '3rem', height: '3rem' }} />
          <p className={'ug-title' + (!lightMode ? ' dark' : '')}>
            Online Users
          </p>
        </div>
        <div className={'sb-search' + (!lightMode ? ' dark' : '')}>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <input
            type='text'
            placeholder='Search'
            className={'search-box' + (!lightMode ? ' dark' : '')}
          />
        </div>
        <div className='ug-list'>
          <motion.div whileHover={{scale: 1.03}} whileTap={{scale: .97}} className={'list-item' + (!lightMode ? ' dark' : '')}>
            <p className='con-icon'>T</p>
            <p className={'con-name' + (!lightMode ? ' dark' : '')}>Test User</p>
          </motion.div>
          <motion.div whileHover={{scale: 1.03}} whileTap={{scale: .97}} className={'list-item' + (!lightMode ? ' dark' : '')}>
            <p className='con-icon'>T</p>
            <p className={'con-name' + (!lightMode ? ' dark' : '')}>Test User</p>
          </motion.div>
          <motion.div whileHover={{scale: 1.03}} whileTap={{scale: .97}} className={'list-item' + (!lightMode ? ' dark' : '')}>
            <p className='con-icon'>T</p>
            <p className={'con-name' + (!lightMode ? ' dark' : '')}>Test User</p>
          </motion.div>
          <motion.div whileHover={{scale: 1.03}} whileTap={{scale: .97}} className={'list-item' + (!lightMode ? ' dark' : '')}>
            <p className='con-icon'>T</p>
            <p className={'con-name' + (!lightMode ? ' dark' : '')}>Test User</p>
          </motion.div>
          <motion.div whileHover={{scale: 1.03}} whileTap={{scale: .97}} className={'list-item' + (!lightMode ? ' dark' : '')}>
            <p className='con-icon'>T</p>
            <p className={'con-name' + (!lightMode ? ' dark' : '')}>Test User</p>
          </motion.div>
          <motion.div whileHover={{scale: 1.03}} whileTap={{scale: .97}} className={'list-item' + (!lightMode ? ' dark' : '')}>
            <p className='con-icon'>T</p>
            <p className={'con-name' + (!lightMode ? ' dark' : '')}>Test User</p>
          </motion.div>
          <motion.div whileHover={{scale: 1.03}} whileTap={{scale: .97}} className={'list-item' + (!lightMode ? ' dark' : '')}>
            <p className='con-icon'>T</p>
            <p className={'con-name' + (!lightMode ? ' dark' : '')}>Test User</p>
          </motion.div>
          <motion.div whileHover={{scale: 1.03}} whileTap={{scale: .97}} className={'list-item' + (!lightMode ? ' dark' : '')}>
            <p className='con-icon'>T</p>
            <p className={'con-name' + (!lightMode ? ' dark' : '')}>Test User</p>
          </motion.div>
          <motion.div whileHover={{scale: 1.03}} whileTap={{scale: .97}} className={'list-item' + (!lightMode ? ' dark' : '')}>
            <p className='con-icon'>T</p>
            <p className={'con-name' + (!lightMode ? ' dark' : '')}>Test User</p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Users;

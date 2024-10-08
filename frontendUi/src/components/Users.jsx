import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import Axios from '../utils/axio.config';
import logo from '../assets/logo-no-background.png';
import { addConversation } from '../Features/conversations';
import './styles.css';

function Users() {
  const lightMode = useSelector((state) => state.themeKey);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [searchStatus, setSearchStatus] = useState(false);
  const axios = new Axios();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // search for users
  const searchHandler = async () => {
    try {
      setSearchStatus(true);
      const response = await axios.searchUsers(search);
      setUsers(response.data);
    } catch (error) {
      setSearchStatus(false);
      console.error(error);
    }
  };
  async function getUsers() {
    try {
      const res = await axios.getAvailableUsers();
      setUsers(res.data);
    } catch (e) {
      console.error(e);
    }
  }
  // get the chat or create one if doesn't exist
  async function getChatHandler(user) {
    try {
      const response = await axios.getOrCreateUserChat(user._id);
      dispatch(addConversation(response.data));
      navigate(`/app/chat/${response.data?._id}`);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getUsers();
  }, [searchStatus]);
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
        className="list-container"
      >
        <div className={'ug-header' + (!lightMode ? ' dark' : '')}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: '3rem', height: '3rem' }}
          />
          <p className={'ug-title' + (!lightMode ? ' dark' : '')}>
            Online Users
          </p>
        </div>
        <div className={'sb-search' + (!lightMode ? ' dark' : '')}>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <input
            type="text"
            placeholder="Search"
            className={'search-box' + (!lightMode ? ' dark' : '')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                searchHandler();
              }
            }}
          />
          <IconButton
            onClick={() => {
              setSearch('');
              setSearchStatus(false);
            }}
          >
            <CancelIcon className={'icon' + (!lightMode ? ' dark' : '')} />
          </IconButton>
        </div>
        <div className="ug-list">
          {users?.map((user) => (
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => getChatHandler(user)}
              className={'list-item' + (!lightMode ? ' dark' : '')}
              key={user._id}
            >
              <p className="con-icon">{user.username[0].toUpperCase()}</p>
              <p className={'con-name' + (!lightMode ? ' dark' : '')}>
                {user.username}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Users;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { userData } from '../utils/auth';
import { config } from '../utils/axio.config';
import axios from 'axios';
import logo from '../assets/logo-no-background.png';
import './styles.css';

function Groups() {
  const lightMode = useSelector((state) => state.themeKey);
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState('');
  const [searchStatus, setSearchStatus] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData) {
      navigate('/');
    }
  });
  // search for groups
  const searchHandler = async () => {
    try {
      setSearchStatus(true);
      const response = await axios.get(
        `http://localhost:5000/api/v1/search/groups`,
        { params: { search }, ...config },
      );
      setGroups(response.data);
    } catch (error) {
      setSearchStatus(false);
      console.error(error);
    }
  };
  async function getGroups() {
    try {
      const res = await axios.get(
        'http://localhost:5000/api/v1/groups',
        config,
      );
      setGroups(res.data);
    } catch (e) {
      console.error(e);
    }
  }
  // get the group or join
  async function getGroupHandler(group) {
    try {
      const url = `http://localhost:5000/api/v1/groups/${group._id}`;
      let res;
      const isPartOfGroup = group.users.filter((user) => {
        return user._id === userData._id;
      });
      if (isPartOfGroup.length === 0) {
        res = await axios.post(url, {}, config);
      } else {
        res = await axios.get(url, config);
      }
      navigate(`/app/chat/${res.data?._id}`);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getGroups();
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
            Online Groups
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
          {groups?.map((group) => (
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => getGroupHandler(group)}
              className={'list-item' + (!lightMode ? ' dark' : '')}
              key={group._id}
            >
              <p className="con-icon">{group.name[0].toUpperCase()}</p>
              <p className={'con-name' + (!lightMode ? ' dark' : '')}>
                {group.name}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Groups;

import { useEffect, useState } from 'react';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../Features/themeSlice';
import Conversations from './Conversations';
import { config } from '../utils/axio.config';
import './styles.css';

function SideBar() {
  const lightMode = useSelector((state) => state.themeKey);
  const [conversations, setConversations] = useState([]);
  const [search, setSearch] = useState('');
  const [searchStatus, setSearchStatus] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle logout
  const logoutHandler = () => {
    localStorage.removeItem('userData');
    navigate('/');
  };

  // search for chats
  const searchHandler = async () => {
    try {
      setSearchStatus(true);
      const response = await axios.get(
        `http://localhost:5000/api/v1/search/chats`,
        { params: { search }, ...config },
      );
      setConversations(response.data);
    } catch (error) {
      setSearchStatus(false);
      console.error(error);
    }
  };
  // fetch all user conversations
  async function getConversations() {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/v1/chats',
        config,
      );
      setConversations(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getConversations();
  }, [searchStatus]);
  return (
    <div className="sidebar-container">
      <div className={'sb-header' + (!lightMode ? ' dark' : '')}>
        <IconButton>
          <AccountCircleIcon className={'icon' + (!lightMode ? ' dark' : '')} />
        </IconButton>
        <IconButton id="chat-icon" onClick={() => navigate('chats')}>
          <ChatIcon className={'icon' + (!lightMode ? ' dark' : '')} />
        </IconButton>
        <IconButton onClick={() => navigate('users')}>
          <PersonAddIcon className={'icon' + (!lightMode ? ' dark' : '')} />
        </IconButton>
        <IconButton onClick={() => navigate('groups')}>
          <GroupAddIcon className={'icon' + (!lightMode ? ' dark' : '')} />
        </IconButton>
        <IconButton onClick={() => navigate('create-group')}>
          <AddCircleIcon className={'icon' + (!lightMode ? ' dark' : '')} />
        </IconButton>
        <IconButton onClick={() => dispatch(toggleTheme())}>
          {lightMode ? (
            <NightlightIcon className={'icon' + (lightMode ? '' : ' light')} />
          ) : (
            <LightModeIcon className={'icon' + (!lightMode ? ' dark' : '')} />
          )}
        </IconButton>
        <IconButton onClick={logoutHandler}>
          <LogoutIcon className={'icon' + (!lightMode ? ' dark' : '')} />
        </IconButton>
      </div>
      <div className={'sb-search' + (!lightMode ? ' dark' : '')}>
        <IconButton>
          <SearchIcon className={'icon' + (!lightMode ? ' dark' : '')} />
        </IconButton>
        <input
          type="text"
          placeholder="search"
          className={'search-box ' + (!lightMode ? ' dark' : '')}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchHandler();
            }
          }}
        />
        <IconButton onClick={() => setSearchStatus(false)}>
          <CancelIcon className={'icon' + (!lightMode ? ' dark' : '')} />
        </IconButton>
      </div>
      <Conversations conversations={conversations} />
    </div>
  );
}

export default SideBar;

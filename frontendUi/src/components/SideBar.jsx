import { useState } from 'react';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import ConversationItem from './ConversationItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../Features/themeSlice';
import Conversations from './Conversations';
import './styles.css';

function SideBar() {
  const lightMode = useSelector((state) => state.themeKey);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('userData');
    navigate('/');
  };
  const searchHandler = async () => {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: userData.token,
      },
    };
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/search/chats`,
        { params: { search } },
        config,
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
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
      </div>
      <Conversations />
    </div>
  );
}

export default SideBar;

import { useEffect, useState } from 'react';
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
import { useAuth } from '../contexts/auth.context';
import Axios from '../utils/axio.config';
import './styles.css';

function SideBar() {
  const lightMode = useSelector((state) => state.themeKey);
  const [conversations, setConversations] = useState([]);
  const [search, setSearch] = useState('');
  const [searchStatus, setSearchStatus] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setUser} = useAuth();
  const axios = new Axios();

  // Function to handle logout
  const logoutHandler = () => {
    localStorage.removeItem('userData');
    setUser(null);
    navigate('/');
  };

  // search for chats
  const searchHandler = async () => {
    try {
      setSearchStatus(true);
      const response = await axios.searchChats(search);
      setConversations(response.data);
    } catch (error) {
      setSearchStatus(false);
      console.error(error);
    }
  };
  // fetch all user conversations
  async function getConversations() {
    try {
      const response = await axios.getUserChats();
      console.log('Conversations : ', response);
      setConversations(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getConversations();
    console.log('Conversations : ', conversations);
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
          value={search}
          className={'search-box ' + (!lightMode ? ' dark' : '')}
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
      <Conversations conversations={conversations} />
    </div>
  );
}

export default SideBar;

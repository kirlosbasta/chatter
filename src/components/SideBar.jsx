import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import './styles.css';
import ConversationItem from './ConversationItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../Features/themeSlice';

function SideBar() {
  const lightMode = useSelector((state) => state.themeKey);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([
    {
      name: 'Test #1',
      lastMessage: 'Last message # 1',
      timeStamp: 'today',
    },
    {
      name: 'Test #2',
      lastMessage: 'Last message # 2',
      timeStamp: 'today',
    },
    {
      name: 'Test #3',
      lastMessage: 'Last message # 3',
      timeStamp: 'today',
    },
    {
      name: 'Test #3',
      lastMessage: 'Last message # 3',
      timeStamp: 'today',
    },
    {
      name: 'Test #3',
      lastMessage: 'Last message # 3',
      timeStamp: 'today',
    },
    {
      name: 'Test #3',
      lastMessage: 'Last message # 3',
      timeStamp: 'today',
    },
    {
      name: 'Test #3',
      lastMessage: 'Last message # 3',
      timeStamp: 'today',
    },
  ]);
  return (
    <div className='sidebar-container'>
      <div className={'sb-header' + (!lightMode ? ' dark' : '')}>
        <div>
          <IconButton>
            <AccountCircleIcon
              className={'icon' + (!lightMode ? ' dark' : '')}
            />
          </IconButton>
        </div>
        <div>
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
              <NightlightIcon
                className={'icon' + (lightMode ? '' : ' light')}
              />
            ) : (
              <LightModeIcon className={'icon' + (!lightMode ? ' dark' : '')} />
            )}
          </IconButton>
        </div>
      </div>
      <div className={'sb-search' + (!lightMode ? ' dark' : '')}>
        <IconButton>
          <SearchIcon className={'icon' + (!lightMode ? ' dark' : '')} />
        </IconButton>
        <input
          type='text'
          placeholder='search'
          className={'search-box ' + (!lightMode ? ' dark' : '')}
        />
      </div>
      <div className={'sb-conversations' + (!lightMode ? ' dark' : '')}>
        {conversations.map((conversation) => {
          return (
            <ConversationItem props={conversation} key={conversation.name} />
          );
        })}
      </div>
    </div>
  );
}

export default SideBar;

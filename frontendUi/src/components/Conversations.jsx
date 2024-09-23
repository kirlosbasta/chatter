import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import ConversationItem from './ConversationItem';
import Axios from '../utils/axio.config';
import { setConversations } from '../Features/conversations';

function Conversations() {
  const lightMode = useSelector((state) => state.themeKey);
  const conversations = useSelector((state) => state.conversations);
  const [search, setSearch] = useState('');
  const [searchStatus, setSearchStatus] = useState(false);
  const dispatch = useDispatch();
  const axios = new Axios();

  const searchHandler = async () => {
    try {
      setSearchStatus(true);
      const response = await axios.searchChats(search);
      dispatch(setConversations(response.data));
    } catch (error) {
      setSearchStatus(false);
      console.error(error);
    }
  };

  // fetch all user conversations
  async function getConversations() {
    try {
      const response = await axios.getUserChats();
      dispatch(setConversations(response.data));
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getConversations();
  }, [searchStatus]);
  return (
    <>
      <div className={'sb-conversations' + (!lightMode ? ' dark' : '')}>
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
        {conversations?.map((conversation) => {
          return (
            <ConversationItem props={conversation} key={conversation._id} />
          );
        })}
      </div>
    </>
  );
}

export default Conversations;

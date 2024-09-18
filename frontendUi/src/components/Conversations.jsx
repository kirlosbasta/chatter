import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConversationItem from './ConversationItem';

function Conversations() {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData) {
      navigate('/');
    }
  });
  const lightMode = useSelector((state) => state.themeKey);
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: userData.token,
      },
    };
    async function getConversations() {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/v1/chats',
          config,
        );
        console.log(response);
        setConversations(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getConversations();
  }, [userData]);
  return (
    <div className={'sb-conversations' + (!lightMode ? ' dark' : '')}>
      {conversations.map((conversation) => {
        return (
          <ConversationItem props={conversation} key={conversation.name} />
        );
      })}
    </div>
  );
}

export default Conversations;

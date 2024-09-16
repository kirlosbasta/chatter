import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  const [conversations] = useState([
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
      name: 'Test #4',
      lastMessage: 'Last message # 3',
      timeStamp: 'today',
    },
    {
      name: 'Test #5',
      lastMessage: 'Last message # 3',
      timeStamp: 'today',
    },
    {
      name: 'Test #6',
      lastMessage: 'Last message # 3',
      timeStamp: 'today',
    },
    {
      name: 'Test #7',
      lastMessage: 'Last message # 3',
      timeStamp: 'today',
    },
    {
      name: 'Test #8',
      lastMessage: 'Last message # 3',
      timeStamp: 'today',
    },
  ]);
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

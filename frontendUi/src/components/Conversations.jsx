import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userData } from '../utils/auth';
import ConversationItem from './ConversationItem';

function Conversations({ conversations }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData) {
      navigate('/');
    }
  });
  const lightMode = useSelector((state) => state.themeKey);

  return (
    <div className={'sb-conversations' + (!lightMode ? ' dark' : '')}>
      {conversations.map((conversation) => {
        return <ConversationItem props={conversation} key={conversation._id} />;
      })}
    </div>
  );
}

export default Conversations;

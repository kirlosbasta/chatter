import { useSelector } from 'react-redux';
import ConversationItem from './ConversationItem';

function Conversations({ conversations }) {
  
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

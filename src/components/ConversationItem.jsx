import { useNavigate } from 'react-router-dom';
import './styles.css';
import { useSelector } from 'react-redux';

function ConversationItem({ props }) {
  const navigate = useNavigate();
  const lightMode = useSelector((state) => state.themeKey);
  return (
    <div
      className={'conversations-item' + (!lightMode ? ' dark' : '')}
      onClick={() => navigate('chat')}
    >
      <p className='con-icon'>{props.name[0]}</p>
      <p className={'con-name' + (!lightMode ? ' dark' : '')}>{props.name}</p>
      <p className='con-lastMessage'>{props.lastMessage}</p>
      <p className={'con-timeStamp' + (!lightMode ? ' dark' : '')}>{props.timeStamp}</p>
    </div>
  );
}

export default ConversationItem;

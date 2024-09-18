import { useNavigate } from 'react-router-dom';
import './styles.css';
import { useSelector } from 'react-redux';

function ConversationItem({ props }) {
  const navigate = useNavigate();
  const lightMode = useSelector((state) => state.themeKey);
  console.log(props.lastMessage);
  return (
    <div
      className={'conversations-item' + (!lightMode ? ' dark' : '')}
      onClick={() => {
        // If the screen width is less than or equal to 40em, navigate to '../chat'
        if (window.innerWidth <= 16 * 40) {
          navigate('../chat');
        } else {
          navigate('chat');
        }
      }}
    >
      <p className="con-icon">{props.name[0]}</p>
      <p className={'con-name' + (!lightMode ? ' dark' : '')}>{props.name}</p>
      <p className="con-lastMessage">{props.lastMessage?.content}</p>
      <p className={'con-timeStamp' + (!lightMode ? ' dark' : '')}>
        {props.lastMessage?.updatedAt}
      </p>
    </div>
  );
}

export default ConversationItem;

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './styles.css';

function ConversationItem({ props }) {
  const navigate = useNavigate();
  const lightMode = useSelector((state) => state.themeKey);
  const date = new Date(props.updatedAt);
  const dateFormatted = date.toLocaleString(
    {},
    { hour: '2-digit', minute: '2-digit', hour12: true },
  );
  let content = props.lastMessage?.content;
  if (content?.length > 40) {
    content = content.slice(0, 40) + '...';
  }
  return (
    <div
      className={'conversations-item' + (!lightMode ? ' dark' : '')}
      onClick={() => {
        // If the screen width is less than or equal to 40em, navigate to '../chat'
        if (window.innerWidth <= 16 * 40) {
          navigate(`../chat/${props._id}`);
        } else {
          navigate(`chat/${props._id}`);
        }
      }}
    >
      <p className="con-icon">{props.name[0]}</p>
      <p className={'con-name' + (!lightMode ? ' dark' : '')}>{props.name}</p>
      <p className="con-lastMessage">{content}</p>
      <p className={'con-timeStamp' + (!lightMode ? ' dark' : '')}>
        {dateFormatted}
      </p>
    </div>
  );
}

export default ConversationItem;

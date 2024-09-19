import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userData } from '../utils/auth';
import './styles.css';

function ConversationItem({ props }) {
  const navigate = useNavigate();
  const date = new Date(props.updatedAt);
  const lightMode = useSelector((state) => state.themeKey);
  let name = props.name;
  const dateFormatted = date.toLocaleString(
    {},
    { hour: '2-digit', minute: '2-digit', hour12: true },
  );
  if (!props.isGroupChat) {
    const [otherUser] = props.users.filter((user) => user._id !== userData._id);
    name = otherUser?.username || name;
  }
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
      <p className="con-icon">{name[0]}</p>
      <p className={'con-name' + (!lightMode ? ' dark' : '')}>
        {name}
      </p>
      <p className="con-lastMessage">{content}</p>
      <p className={'con-timeStamp' + (!lightMode ? ' dark' : '')}>
        {dateFormatted}
      </p>
    </div>
  );
}

export default ConversationItem;

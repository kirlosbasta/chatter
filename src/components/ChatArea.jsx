import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import './styles.css';
import { IconButton } from '@mui/material';
import MessageOther from './MessageOther';
import MessageSelf from './MessageSelf';
import { useSelector } from 'react-redux';

function ChatArea() {
  const lightMode = useSelector((state) => state.themeKey);
  const props = {
    name: 'Test #1',
    lastMessage: 'Last message # 1',
    timeStamp: 'today',
  };
  return (
    <div className='chatArea-container'>
      <div className={'chatArea-header' + (!lightMode ? ' dark' : '')}>
        <p className='con-icon'>{props.name[0]}</p>
        <div className={'header-text' + (!lightMode ? ' dark' : '')}>
          <p className={'con-name' + (!lightMode ? ' dark' : '')}>{props.name}</p>
          <p className={'con-timeStamp'  + (!lightMode ? ' dark' : '')}>{props.timeStamp}</p>
        </div>
        <IconButton>
          <DeleteIcon className={ (!lightMode ? ' dark' : '')} />
        </IconButton>
      </div>
      <div className={'messages-container' + (!lightMode ? ' dark' : '')}>
        <MessageOther />
        <MessageOther />
        <MessageOther />
        <MessageSelf />
        <MessageOther />
        <MessageSelf />
        <MessageOther />
        <MessageSelf />
      </div>
      <div className={'text-input-area' + (!lightMode ? ' dark' : '')}>
        <input
          type='text'
          placeholder='Type a message'
          className={'search-box' + (!lightMode ? ' dark' : '')}
        />
        <IconButton className={!lightMode ? 'pink' : ''}>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default ChatArea;

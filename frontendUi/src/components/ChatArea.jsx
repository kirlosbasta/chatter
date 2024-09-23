import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import MessageOther from './MessageOther';
import MessageSelf from './MessageSelf';
import { useSocket } from '../contexts/socket.context';
import { useAuth } from '../contexts/auth.context';
import Axios from '../utils/axio.config';
import { deleteConversation } from '../Features/conversations';
import './styles.css';

function ChatArea() {
  const { chatId } = useParams();
  const lightMode = useSelector((state) => state.themeKey);
  const conversations = useSelector((state) => state.conversations);
  const [chat, setChat] = useState({});
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [chatName, setChatName] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const { user: userData } = useAuth();
  const axios = new Axios();

  async function sendMessageHandler() {
    if (message.trim() === '') return;
    try {
      const res = await axios.sendMessage(chatId, { content: message });
      console.log(res);
      // reset the message input
      setMessage('');
      // to refresh the messages
      getMessages(chatId);
    } catch (error) {
      console.error(error);
    }
  }
  async function getMessages(chatId) {
    console.log('coversations :', conversations);
    try {
      const response = await axios.getChatMessages(chatId);

      // console.log(response.data);
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  // retrieve a chat by the id from url
  async function getChatById() {
    try {
      const response = await axios.getChatById(chatId);

      // console.log(response.data);
      setChat(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getChatById();
    getMessages(chatId);
    socket?.emit('join chat', chatId);
    socket?.on('receive-message', (message) => {
      setNewMessage({ content: message });
    });

    return () => {
      socket?.emit('leave chat', chatId);
      socket?.off('receive-message');
    };
  }, [chatId, socket, newMessage]);

  useEffect(() => {
    if (chat.isGroupChat) {
      setChatName(chat.name);
    } else {
      const otherUser = chat.users?.find((user) => user._id !== userData._id);
      setChatName(otherUser?.username);
    }
  }, [chat, chatId]);

  async function deleteChatHandler() {
    try {
      if (chat.isGroupChat && chat.admin === userData._id) {
        await axios.deleteGroup(chatId);
      } else if (chat.isGroupChat) {
        await axios.leaveGroup(chatId);
      } else {
        await axios.deleteOneOnOneChat(chatId);
      }
      setChat({});
      dispatch(deleteConversation(chatId));
      navigate('../welcome');
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="chatArea-container">
      <div className={'chatArea-header' + (!lightMode ? ' dark' : '')}>
        <p className="con-icon">{chatName?.charAt(0)}</p>
        <div className={'header-text' + (!lightMode ? ' dark' : '')}>
          <p className={'con-name' + (!lightMode ? ' dark' : '')}>{chatName}</p>
          <p className={'con-timeStamp' + (!lightMode ? ' dark' : '')}>
            Online
          </p>
        </div>
        <IconButton onClick={deleteChatHandler}>
          <DeleteIcon className={!lightMode ? ' dark' : ''} />
        </IconButton>
      </div>
      <div className={'messages-container' + (!lightMode ? ' dark' : '')}>
        {/* messages are coming in ascending order the first messages are rendered first
        and lastest messages are appearing first which work fine for now
        but later when the messages are enourmous that will be an issue  */}
        {messages.map((message) => {
          const time = new Date(message.createdAt);
          const timeFormatted = time.toLocaleString(
            {},
            { hour: '2-digit', minute: '2-digit', hour12: true },
          );
          if (message.sender?._id === userData._id) {
            return (
              <MessageSelf
                key={message._id}
                message={message.content}
                time={timeFormatted}
              />
            );
          }
          return (
            <MessageOther
              key={message._id}
              name={message.sender?.username}
              message={message.content}
              time={timeFormatted}
            />
          );
        })}
      </div>
      <div className={'text-input-area' + (!lightMode ? ' dark' : '')}>
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={'search-box' + (!lightMode ? ' dark' : '')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessageHandler();
            }
          }}
        />
        <IconButton
          className={!lightMode ? 'blue' : ''}
          onClick={sendMessageHandler}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessageHandler();
            }
          }}
        >
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default ChatArea;

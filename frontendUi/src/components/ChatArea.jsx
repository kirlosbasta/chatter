import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import MessageOther from './MessageOther';
import MessageSelf from './MessageSelf';
import { config } from '../utils/axio.config';
import { userData } from '../utils/auth';
import { useSocket } from '../contexts/socket.context';
import './styles.css';

function ChatArea() {
  const { chatId } = useParams();
  const lightMode = useSelector((state) => state.themeKey);
  const [chat, setChat] = useState({});
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const { socket } = useSocket();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData) {
      navigate('/');
    }
  }, []);
  async function sendMessageHandler() {
    if (message.trim() === '') return;
    try {
      await axios.post(
        `http://localhost:5000/api/v1/messages/${chatId}`,
        {
          content: message,
        },
        config,
      );
      // reset the message input
      setMessage('');
      // to refresh the messages
      getMessages(chatId);
    } catch (error) {
      console.error(error);
    }
  }
  async function getMessages(chatId) {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/messages/${chatId}`,
        config,
      );
      // console.log(response.data);
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  // retrieve a chat by the id from url
  async function getChatById() {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/chats/${chatId}`,
        config,
      );
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
      setNewMessage(message);
    });
    return () => {
      socket?.emit('leave chat', chatId);
      socket?.off('receive-message');
    }
  }, [chatId, socket, newMessage]);

  async function deleteChatHandler() {
    try {
      let url = chat.isGroupChat
        ? `http://localhost:5000/api/v1/groups/${chatId}/leave`
        : `http://localhost:5000/api/v1/chats/${chatId}`;
      if (chat.isGroupChat && chat.admin === userData._id) {
        url = `http://localhost:5000/api/v1/groups/${chatId}`;
      }
      await axios.delete(url, config);
      setChat({});
      navigate('../welcome');
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="chatArea-container">
      <div className={'chatArea-header' + (!lightMode ? ' dark' : '')}>
        <p className="con-icon">{chat.name?.charAt(0)}</p>
        <div className={'header-text' + (!lightMode ? ' dark' : '')}>
          <p className={'con-name' + (!lightMode ? ' dark' : '')}>
            {chat.name}
          </p>
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
              name={message.sender.username}
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
          className={!lightMode ? 'pink' : ''}
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

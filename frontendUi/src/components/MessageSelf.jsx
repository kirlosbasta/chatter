import React from 'react';

function MessageSelf({message, time}) {
  // console.log('content from self:', content);
  return (
    <div className='self-message-container'>
      <div className='message-box'>
        <p className='con-lastMessage normal-size'>{message}</p>
        <p className='self-timeStamp'>{time}</p>
      </div>
    </div>
  );
}

export default MessageSelf;

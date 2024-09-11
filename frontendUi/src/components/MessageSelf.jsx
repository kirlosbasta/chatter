import React from 'react';

function MessageSelf() {
  const props = { name: 'You', message: 'This is a message from me' };

  return (
    <div className='self-message-container'>
      <div className='message-box'>
        <p className='con-lastMessage normal-size'>{props.message}</p>
        <p className='self-timeStamp'>12:00am</p>
      </div>
    </div>
  );
}

export default MessageSelf;

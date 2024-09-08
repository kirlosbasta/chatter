import React from 'react';

function MessageOther() {
  const props = { name: 'Other User #1', message: 'This is a message from other' };
  return (
    <div className='other-message-container'>
      <div className='conversations-item'>
        <p className='con-icon'>{props.name[0]}</p>
        <div className='other-text-content'>
          <p className='con-lastMessage normal-size'>{props.message}</p>
          <p className="self-timeStamp">12:00am</p>
        </div>
      </div>
    </div>
  );
}

export default MessageOther;

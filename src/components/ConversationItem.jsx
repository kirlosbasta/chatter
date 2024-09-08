import React from 'react';
import './styles.css';

function ConversationItem({ props }) {
  return (
    <div className='conversations-item'>
      <p className='con-icon'>{props.name[0]}</p>
      <p className='con-name'>{props.name}</p>
      <p className='con-lastMessage'>{props.lastMessage}</p>
      <p className='con-timeStamp'>{props.timeStamp}</p>
    </div>
  );
}

export default ConversationItem;

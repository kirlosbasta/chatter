import React from 'react';
import { useSelector } from 'react-redux';

function MessageOther({ name, message, time }) {
  const lightMode = useSelector((state) => state.themeKey);

  return (
    <div className="other-message-container">
      <div className={'conversations-item' + (!lightMode ? ' dark' : '')}>
        <p className="con-icon">{name[0]}</p>
        <div className={'other-text-content' + (!lightMode ? ' pink' : '')}>
          <p className="con-lastMessage normal-size">{message}</p>
          <p className="self-timeStamp">{time}</p>
        </div>
      </div>
    </div>
  );
}

export default MessageOther;

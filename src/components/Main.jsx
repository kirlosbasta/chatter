import React from 'react';
import './styles.css';
import ChatArea from './ChatArea';
import SideBar from './SideBar';

function Main() {
  const conversation = {
    name: 'Test #1',
    lastMessage: 'Last message # 1',
    timeStamp: 'today',
  };

  return (
    <div className='main-container'>
      <SideBar />
      <ChatArea props={conversation} />
    </div>
  );
}

export default Main;

import React from 'react';
import './styles.css';
import ChatArea from './ChatArea';
import SideBar from './SideBar';
import Welcome from './Welcome';
import CreateGroup from './CreateGroup';
import Users_Groups from './Users_Groups';

function Main() {
  const conversation = {
    name: 'Test #1',
    lastMessage: 'Last message # 1',
    timeStamp: 'today',
  };

  return (
    <div className='main-container'>
      <SideBar />
      {/* <Welcome /> */}
      {/* <CreateGroup /> */}
      {/* <ChatArea props={conversation} /> */}
      <Users_Groups />
    </div>
  );
}

export default Main;

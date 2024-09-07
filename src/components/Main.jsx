import React from 'react';
import './styles.css';
import WorkArea from './WorkArea';
import SideBar from './SideBar';

function Main() {
  return (
    <div className='main-container'>
      <SideBar />
      <WorkArea />
    </div>
  );
}

export default Main;

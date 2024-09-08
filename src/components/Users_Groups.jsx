import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import logo from '../assets/logo-no-background.png';
import './styles.css';

function Users_Groups() {
  return (
    <div className='list-container'>
      <div className='ug-header'>
        <img src={logo} alt='Logo' style={{ width: '3rem', height: '3rem' }} />
        <p className="ug-title">Online Users</p>
      </div>
      <div className="sb-search">
        <IconButton>
          <SearchIcon />
        </IconButton>
        <input type="text" placeholder="Search" className='search-box' />
      </div>
      <div className="ug-list">
        <div className="list-item">
          <p className="con-icon">T</p>
          <p className="con-name">Test User</p>
        </div>
        <div className="list-item">
          <p className="con-icon">T</p>
          <p className="con-name">Test User</p>
        </div>
        <div className="list-item">
          <p className="con-icon">T</p>
          <p className="con-name">Test User</p>
        </div>
        <div className="list-item">
          <p className="con-icon">T</p>
          <p className="con-name">Test User</p>
        </div>
        <div className="list-item">
          <p className="con-icon">T</p>
          <p className="con-name">Test User</p>
        </div>
        <div className="list-item">
          <p className="con-icon">T</p>
          <p className="con-name">Test User</p>
        </div>
        <div className="list-item">
          <p className="con-icon">T</p>
          <p className="con-name">Test User</p>
        </div>
        <div className="list-item">
          <p className="con-icon">T</p>
          <p className="con-name">Test User</p>
        </div>
        <div className="list-item">
          <p className="con-icon">T</p>
          <p className="con-name">Test User</p>
        </div>
      </div>
    </div>
  );
}

export default Users_Groups;

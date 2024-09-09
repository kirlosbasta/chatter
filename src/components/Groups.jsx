import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import logo from '../assets/logo-no-background.png';
import './styles.css';
import { useSelector } from 'react-redux';

function Groups() {
  const lightMode = useSelector((state) => state.themeKey);

  return (
    <div className='list-container'>
      <div className={'ug-header' + (!lightMode ? ' dark' : '')}>
        <img src={logo} alt='Logo' style={{ width: '3rem', height: '3rem' }} />
        <p className={'ug-title' + (!lightMode ? ' dark' : '')}>
          Online Groups
        </p>
      </div>
      <div className={'sb-search' + (!lightMode ? ' dark' : '')}>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <input
          type='text'
          placeholder='Search'
          className={'search-box' + (!lightMode ? ' dark' : '')}
        />
      </div>
      <div className='ug-list'>
        <div className={'list-item' + (!lightMode ? ' dark' : '')}>
          <p className='con-icon'>T</p>
          <p className={'con-name' + (!lightMode ? ' dark' : '')}>Test Group</p>
        </div>
        <div className={'list-item' + (!lightMode ? ' dark' : '')}>
          <p className='con-icon'>T</p>
          <p className={'con-name' + (!lightMode ? ' dark' : '')}>Test Group</p>
        </div>
        <div className={'list-item' + (!lightMode ? ' dark' : '')}>
          <p className='con-icon'>T</p>
          <p className={'con-name' + (!lightMode ? ' dark' : '')}>Test Group</p>
        </div>
        <div className={'list-item' + (!lightMode ? ' dark' : '')}>
          <p className='con-icon'>T</p>
          <p className={'con-name' + (!lightMode ? ' dark' : '')}>Test Group</p>
        </div>
        <div className={'list-item' + (!lightMode ? ' dark' : '')}>
          <p className='con-icon'>T</p>
          <p className={'con-name' + (!lightMode ? ' dark' : '')}>Test Group</p>
        </div>
        <div className={'list-item' + (!lightMode ? ' dark' : '')}>
          <p className='con-icon'>T</p>
          <p className={'con-name' + (!lightMode ? ' dark' : '')}>Test Group</p>
        </div>
        <div className={'list-item' + (!lightMode ? ' dark' : '')}>
          <p className='con-icon'>T</p>
          <p className={'con-name' + (!lightMode ? ' dark' : '')}>Test Group</p>
        </div>
        <div className={'list-item' + (!lightMode ? ' dark' : '')}>
          <p className='con-icon'>T</p>
          <p className={'con-name' + (!lightMode ? ' dark' : '')}>Test Group</p>
        </div>
        <div className={'list-item' + (!lightMode ? ' dark' : '')}>
          <p className='con-icon'>T</p>
          <p className={'con-name' + (!lightMode ? ' dark' : '')}>Test Group</p>
        </div>
      </div>
    </div>
  );
}

export default Groups;

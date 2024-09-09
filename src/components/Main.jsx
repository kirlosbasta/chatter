import './styles.css';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Main() {
  const lightMode = useSelector((state) => state.themeKey);
  return (
    <div className={'main-container' + (!lightMode ? ' grey' : '')}>
      <SideBar />
      <Outlet />
    </div>
  );
}

export default Main;

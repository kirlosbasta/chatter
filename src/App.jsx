import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import Login from './components/Login';
import Welcome from './components/Welcome';
import ChatArea from './components/ChatArea';
import CreateGroup from './components/CreateGroup';
import Users from './components/Users';
import Groups from './components/Groups';
import { useSelector } from 'react-redux';

function App() {
  const lightMode = useSelector((state) => state.themeKey);
  return (
    <div className={'app' + (!lightMode ? ' blackish' : '')}>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/app' element={<Main />}>
          <Route path='welcome' element={<Welcome />} />
          <Route path='chat' element={<ChatArea />} />
          <Route path='create-group' element={<CreateGroup />} />
          <Route path='users' element={<Users />} />
          <Route path='groups' element={<Groups />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

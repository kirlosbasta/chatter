import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import Main from './components/Main';
import Login from './components/Login';
import Welcome from './components/Welcome';
import ChatArea from './components/ChatArea';
import CreateGroup from './components/CreateGroup';
import Users from './components/Users';
import Groups from './components/Groups';
import Conversations from './components/Conversations';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const lightMode = useSelector((state) => state.themeKey);
  return (
    <>
      <div className={!lightMode ? ' app-dark' : 'app'}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/app"
            element={
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            }
          >
            <Route path="welcome" element={<Welcome />} />
            <Route path="chat/:chatId" element={<ChatArea />} />
            <Route path="create-group" element={<CreateGroup />} />
            <Route path="users" element={<Users />} />
            <Route path="groups" element={<Groups />} />
            <Route path="chats" element={<Conversations />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;

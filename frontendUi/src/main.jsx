import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SocketProvider } from './contexts/socket.context';
import store from './Features/Store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SocketProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </SocketProvider>
    </BrowserRouter>
  </StrictMode>,
);

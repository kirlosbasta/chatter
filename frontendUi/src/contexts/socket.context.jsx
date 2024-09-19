import { createContext, useContext, useEffect, useState } from 'react';
import socketio from 'socket.io-client';
import { userData } from '../utils/auth';

// Function to establish a socket connection with authorization token
const getSocket = () => {
  if (!userData) return null;
  const token = userData?.token;

  // Create a socket connection with the provided URI and authentication
  const socket = socketio('http://localhost:5000', {
    withCredentials: true,
    auth: { token },
  });
  return socket;
};

// Create a context to hold the socket instance
const SocketContext = createContext({ socket: null });

// Custom hook to access the socket instance from the context
const useSocket = () => useContext(SocketContext);

// SocketProvider component to manage the socket instance and provide it through context
const SocketProvider = ({ children }) => {
  // State to store the socket instance
  const [socket, setSocket] = useState(null);

  // Set up the socket connection when the component mounts
  useEffect(() => {
    setSocket(getSocket());
  }, []);

  return (
    // Provide the socket instance through context to its children
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

// Export the SocketProvider component and the useSocket hook for other components to use
export { SocketProvider, useSocket };

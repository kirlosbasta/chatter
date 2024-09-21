import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Create a context to manage authentication-related data and functions
const AuthContext = createContext({ user: null, setUser: () => {} });

// Create a hook to access the AuthContext
const useAuth = () => useContext(AuthContext);

// Create a component that provides authentication-related data and functions
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const nav = useNavigate();
  // Check for saved user and token in local storage during component initialization
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      setUser(user);
      nav('/app/welcome');
    } else {
      nav('/');
    }
  }, []);

  // Provide authentication-related data and functions through the context
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the context, provider component, and custom hook
export { AuthContext, AuthProvider, useAuth };

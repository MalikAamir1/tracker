// AuthContext.js

import React, {createContext, useState, useContext} from 'react';

// Create the Auth Context
const AuthContext = createContext();

// Custom hook to use the Auth Context
export const useAuth = () => useContext(AuthContext);

// Auth Provider Component
export const AuthProvider = ({children}) => {
  // State to manage authentication status
  const [user, setUser] = useState(null);

  // Method to log in
  const login = userData => {
    // Authenticate user here, e.g., make API calls
    setUser(userData);
  };

  // Method to log out
  const logout = () => {
    // Perform logout actions, e.g., clear local storage
    setUser(null);
  };

  // Context value
  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

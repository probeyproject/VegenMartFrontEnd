import React, { createContext, useState } from "react";

// Create the UserContext
export const UserContext = createContext();

// Create the UserProvider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User object or null
  const [token, setToken] = useState(null); // Token or null
// console.log("data for context ",user);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

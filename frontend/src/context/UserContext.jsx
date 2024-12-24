import { createContext, useState } from "react";

// Create the UserContext
// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};


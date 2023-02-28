//
import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ isUser, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

//Este contexto se usa para saber de forma global si hay un usuario autenticado y para establecer si un usuario está autenticado. 
//También se usa para obtener el objeto usuario y para establecer el objeto usuario.
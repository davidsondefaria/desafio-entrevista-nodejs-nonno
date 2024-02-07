import { createContext } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  setAuth: (value: boolean) => {},
});

export default AuthContext;

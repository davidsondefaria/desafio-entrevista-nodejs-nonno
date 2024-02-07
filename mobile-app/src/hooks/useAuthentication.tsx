import { useContext } from 'react';

import AuthContext from '../contexts/AuthContext';

const useIsAuthenticated = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated;
};

export { useIsAuthenticated };

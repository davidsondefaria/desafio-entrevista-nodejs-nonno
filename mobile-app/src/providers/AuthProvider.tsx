import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

import AuthContext from '../contexts/AuthContext';

const AuthProvider = ({ children }: IAuthProvider) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        // TODO temporary string to boolean parser
        setIsAuthenticated(token === 'true');
      } catch (error) {
        console.error(`Erro na authenticação`, error);
      }
    };

    checkAuth();
  }, []);

  const setAuth = (authenticated: boolean) => setIsAuthenticated(authenticated);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuth }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

interface IAuthProvider {
  children: React.ReactNode;
}

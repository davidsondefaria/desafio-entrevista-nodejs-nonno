import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

import AuthContext from '../contexts/AuthContext';

const AuthProvider = ({ children }: IAuthProvider) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // TODO temporary item
        const auth = await AsyncStorage.getItem('isAuthenticated');
        setIsAuthenticated(!!auth);
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

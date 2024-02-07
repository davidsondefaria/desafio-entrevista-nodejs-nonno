import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useContext, useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';

import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import AuthContext from '../contexts/AuthContext';
import { useIsAuthenticated } from '../hooks/useAuthentication';

export default function Login() {
  const [isNew, setIsNew] = useState(false);

  const isAuthenticated = useIsAuthenticated();
  const { setAuth } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleIsNew = () => {
    setIsNew((old) => !old);
  };

  const handleAuth = () => {
    const auth = isAuthenticated;
    setAuth(!isAuthenticated);
    if (!auth) {
      return navigation.navigate('TabNavigator' as never); // TODO verify this type error
    }
    navigation.navigate('Login' as never); // TODO verify this type error
  };

  return (
    <View className={styles.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Text> Autenticado: {isAuthenticated.toString()}!</Text>
      {isNew ? <SignUp navigation={navigation} /> : <SignIn handleAuth={handleAuth} />}
      <Pressable className={styles.button} onPress={handleIsNew}>
        <Text>{isNew ? 'Já tem cadastro? Faça seu login!' : 'Novo aqui? Cadastre-se!'}</Text>
      </Pressable>
      {isAuthenticated && (
        <Pressable className={styles.button} onPress={handleAuth}>
          <Text>Sair</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = {
  container: 'items-center flex-1 justify-center',
  separator: 'h-[1px] my-7 w-4/5 bg-gray-200',
  title: 'text-xl font-bold',
  button: 'm-4 bg-red-100 rounded',
};

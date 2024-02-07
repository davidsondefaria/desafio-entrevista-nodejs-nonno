import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import AuthContext from '../contexts/AuthContext';
import { useIsAuthenticated } from '../hooks/useAuthentication';

export default function Login() {
  const isAuthenticated = useIsAuthenticated();
  const { setAuth } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleAuth = () => {
    setAuth(!isAuthenticated);
    navigation.navigate('TabNavigator' as never); // TODO verify this type error
  };
  return (
    <View className={styles.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Text className={styles.title}>Login</Text>
      <View className={styles.separator} />
      <EditScreenInfo path="src/screens/modal.tsx" />
      <Pressable className={styles.button} onPress={handleAuth}>
        <Text>Autenticação temporária</Text>
      </Pressable>
    </View>
  );
}

const styles = {
  container: 'items-center flex-1 justify-center',
  separator: 'h-[1px] my-7 w-4/5 bg-gray-200',
  title: 'text-xl font-bold',
  button: 'm-4 bg-red-100 rounded',
};

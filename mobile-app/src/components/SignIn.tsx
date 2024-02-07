import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, Text, View } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';

const SignIn = ({ handleAuth }: any) => {
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
};

export default SignIn;

const styles = {
  container: 'items-center flex-1 justify-center',
  separator: 'h-[1px] my-7 w-4/5 bg-gray-200',
  title: 'text-xl font-bold',
  button: 'm-4 bg-red-100 rounded',
};

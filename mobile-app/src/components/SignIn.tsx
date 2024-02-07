import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Button, Platform, Pressable, Text, View } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ControlledTextInput from './ControlledTextInput';

const defaultValues = {
  email: '',
  password: '',
};

const SignIn = ({ navigation, handleAuth }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISignInForm>({ defaultValues, mode: 'onChange' });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ISignInForm) => {
    setLoading(true);
    try {
      console.log(data);
      // TODO chamada para API
      handleAuth();
    } catch (error) {
      console.error('Erro no login', error);
    } finally {
      console.log('authToken', await AsyncStorage.getItem('authToken'));
      setLoading(false);
      // reset();
    }
  };

  return (
    <View className={styles.container}>
      <Text>Login</Text>
      <ControlledTextInput
        control={control}
        name="email"
        placeholder="Email"
        textContentType="emailAddress"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        }}
      />
      {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}
      <ControlledTextInput
        control={control}
        name="password"
        placeholder="Password"
        secureTextEntry
        textContentType="password"
        rules={{ required: 'Password is required', minLength: 4 }}
      />
      {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}

      <Pressable className={styles.button} onPress={handleAuth}>
        <Text>Autenticação temporária</Text>
      </Pressable>
      <Button
        title="Login"
        disabled={loading || Object.keys(errors).length > 0}
        onPress={handleSubmit(onSubmit)}
      />
      {loading && <ActivityIndicator size="large" />}
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

interface ISignInForm {
  email: string;
  password: string;
}

interface ISignIn {
  navigation: any;
  handleAuth: any;
}

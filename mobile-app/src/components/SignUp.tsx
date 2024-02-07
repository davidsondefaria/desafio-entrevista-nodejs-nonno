import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, Button, ActivityIndicator } from 'react-native';

import ControlledTextInput from './ControlledTextInput';

const defaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUp = ({ navigation }: ISignUp) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ISignUpForm>({ defaultValues, mode: 'onChange' });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ISignUpForm) => {
    setLoading(true);
    try {
      console.log(data);
      // TODO chamada para API
      await AsyncStorage.setItem('authToken', 'true');
    } catch (error) {
      console.error('Erro no cadastro', error);
    } finally {
      navigation.navigate('TabNavigator');
      setLoading(false);
      reset();
    }
  };

  console.log(errors);
  return (
    <View>
      <Text>Cadastra-se</Text>
      <ControlledTextInput
        control={control}
        name="name"
        rules={{ required: 'Nome é obrigatório.' }}
        placeholder="Nome"
      />
      {errors.name && <Text style={{ color: 'red' }}>{errors?.name?.message}</Text>}
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
      <ControlledTextInput
        control={control}
        placeholder="Confirm Password"
        secureTextEntry
        name="confirmPassword"
        textContentType="password"
        rules={{
          required: 'Please confirm your password',
          validate: (value: string) => value === watch('password') || 'Passwords must match',
        }}
      />
      {errors.confirmPassword && (
        <Text style={{ color: 'red' }}>{errors.confirmPassword.message}</Text>
      )}
      <Button
        title="Sign Up"
        disabled={loading || Object.keys(errors).length > 0}
        onPress={handleSubmit(onSubmit)}
      />
      {loading && <ActivityIndicator size="large" />}
    </View>
  );
};

export default SignUp;

interface ISignUpForm {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

interface ISignUp {
  navigation: any;
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './TabLayout';
import { useIsAuthenticated } from '../hooks/useAuthentication';
import Login from '../screens/Login';

export type RootStackParamList = {
  TabNavigator: undefined;
  Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? 'TabNavigator' : 'Login'}>
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ presentation: 'modal', headerLeft: () => null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

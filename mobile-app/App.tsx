import './global.css';

import 'react-native-gesture-handler';

import RootStack from './src/navigation';
import AuthProvider from './src/providers/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <RootStack />
    </AuthProvider>
  );
}

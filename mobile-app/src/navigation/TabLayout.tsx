import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import { Pressable, StyleSheet } from 'react-native';

import { RootStackParamList } from '.';
import AuctionScreen from '../screens/AuctionScreen';
import RegisterAuction from '../screens/RegisterAuction';
import Settings from '../screens/Settings';

const Tab = createBottomTabNavigator();

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={styles.tabBarIcon} {...props} />;
}

type Props = StackScreenProps<RootStackParamList, 'TabNavigator'>;

export default function TabLayout({ navigation }: Props) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tab.Screen
        name="auction"
        component={AuctionScreen}
        options={{
          title: 'Leilão',
          tabBarIcon: ({ color }) => <TabBarIcon name="gavel" color={color} />,
        }}
      />
      <Tab.Screen
        name="registerAuction"
        component={RegisterAuction}
        options={{
          title: 'Registrar',
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
        }}
      />
      <Tab.Screen
        name="settings"
        component={Settings}
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('Login')}>
              {({ pressed }) => (
                <FontAwesome
                  name="info-circle"
                  size={25}
                  color="gray"
                  style={[styles.headerRight, { opacity: pressed ? 0.5 : 1 }]}
                />
              )}
            </Pressable>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 15,
  },
  tabBarIcon: {
    marginBottom: -3,
  },
});

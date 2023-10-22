import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import TopScreenNavigator from '../../components/TopScreenNavigator';
import ConnectBankScreen from '../../screens/ConnectBankScreen'

export default function BottomScreenNavigator() {
    const Tab = createBottomTabNavigator();

    const initTab = '';



    return (
      <Tab.Navigator initialRouteName='Home' screenOptions={{headerShown: true}}>
        <Tab.Screen
          name='Home'
          component={TopScreenNavigator}
          options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='home' color={color} size={size} />
          )
        }}
        />
        <Tab.Screen 
          name='Connect Bank'
          component={ConnectBankScreen} 
        options={{
          tabBarLabel: 'Connect Bank',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='bank' color={color} size={size} />
          ),
        }}
        />
      </Tab.Navigator>

    )
  }
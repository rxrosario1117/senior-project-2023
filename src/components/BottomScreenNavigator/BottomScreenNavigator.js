import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import HomeScreen from '../../screens/HomeScreen';
import OptionsScreen from '../../screens/OptionsScreen';

export default function BottomScreenNavigator() {
    const Tab = createBottomTabNavigator();

    return (
      <Tab.Navigator initialRouteName='Home' screenOptions={{headerShown: true}}>
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='home' color={color} size={size} />
          )
        }}
        />
        <Tab.Screen 
          name='Options'
          component={OptionsScreen} 
        //   options={{title: 'Options'}}
        options={{
          tabBarLabel: 'Options',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='bank' color={color} size={size} />
          ),
        }}
        />
      </Tab.Navigator>

    )
  }
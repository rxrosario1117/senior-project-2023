import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from '../../screens/HomeScreen';
import OptionsScreen from '../../screens/OptionsScreen';

export default function BottomScreenNavigator() {
    const Tab = createBottomTabNavigator();

    return (
      <Tab.Navigator initialRouteName='Home' screenOptions={{headerShown: true}}>
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{title: 'Home'}}
        />
        <Tab.Screen 
          name='Options'
          component={OptionsScreen} 
          options={{title: 'Options'}}
        />
      </Tab.Navigator>

    )
  }
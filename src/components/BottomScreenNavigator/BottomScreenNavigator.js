import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import TopScreenNavigator from '../../components/TopScreenNavigator';
import EducationScreen from '../../screens/EducationScreen';
import ConnectBankScreen from '../../screens/ConnectBankScreen';
import AppHome from '../../../AppHome';

export default function BottomScreenNavigator() {
    const Tab = createBottomTabNavigator();
    
      return (
        <Tab.Navigator initialRouteName='Connect Bank' screenOptions={{headerShown: false}}>
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
            name='Education'
            component={EducationScreen} 
          options={{
            tabBarLabel: 'Education',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='school' color={color} size={size} />
            ),
          }}
          />
          <Tab.Screen 
            name='Goals'
            component={AppHome} 
          options={{
            tabBarLabel: 'Goals',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='bullseye' color={color} size={size} />
            ),
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
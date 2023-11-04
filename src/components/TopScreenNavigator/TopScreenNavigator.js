import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SavingsScreen from '../../screens/SavingsScreen';
import IdentityScreen from '../../screens/IdentityScreen'; 
import BalanceScreen from '../../screens/BalanceScreen';
import AvailableProductsScreen from '../../screens/AvailableProductsScreen';
import TempScreen from '../../screens/TempScreen';

const Tab = createMaterialTopTabNavigator();

export default function TopScreenNavigator() {
  return (
    <Tab.Navigator initialRouteName='temp'>
      <Tab.Screen name="Savings" component={SavingsScreen} />
      <Tab.Screen name="Identity" component={IdentityScreen} />
      <Tab.Screen name="Balance" component={BalanceScreen} />
      <Tab.Screen name="temp" component={TempScreen} />
    </Tab.Navigator>
  );
}